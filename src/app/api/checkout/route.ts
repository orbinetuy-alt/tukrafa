import { addMinutes } from 'date-fns';
import { NextResponse } from 'next/server';
import { BOOKING_HOLD_MINUTES, getBookingSelection, getDepositCents } from '@/lib/booking-config';
import { getSlotRange, isBookableDate } from '@/lib/booking-time';
import { attachCheckoutSession, createPendingBooking, deletePendingBooking } from '@/lib/bookings';
import { getStripe } from '@/lib/stripe';
import { getTourBySlug } from '@/data/tours';
import type { Locale } from '@/lib/i18n';

interface CheckoutBody {
  tourSlug?: string;
  optionId?: string;
  date?: string;
  time?: string;
  people?: number;
  name?: string;
  email?: string;
  phone?: string;
  pickupAddress?: string;
  locale?: Locale;
}

const locales: Locale[] = ['pt', 'en', 'es'];

export async function POST(request: Request) {
  let bookingId: string | undefined;
  try {
    const body = await request.json() as CheckoutBody;
    const selection = getBookingSelection(body.tourSlug ?? '', body.optionId ?? '');
    const tour = getTourBySlug(body.tourSlug ?? '');
    const people = Number(body.people);
    const locale = locales.includes(body.locale as Locale) ? body.locale as Locale : 'pt';
    const name = body.name?.trim() ?? '';
    const email = body.email?.trim().toLowerCase() ?? '';
    const phone = body.phone?.trim() ?? '';
    const pickupAddress = body.pickupAddress?.trim() ?? '';
    if (!selection || !tour || !body.date || !body.time || !isBookableDate(body.date) ||
        !Number.isInteger(people) || people < 1 || people > selection.tour.maxPeople ||
        name.length < 2 || !email.includes('@') || phone.length < 7 || pickupAddress.length < 4) {
      return NextResponse.json({ error: 'Revise os dados da reserva.' }, { status: 400 });
    }
    const range = getSlotRange(body.date, body.time, selection.option.durationMinutes);
    if (!range || range.start <= new Date()) {
      return NextResponse.json({ error: 'Horário inválido.' }, { status: 400 });
    }
    const depositCents = getDepositCents(selection.option.totalCents);
    const booking = await createPendingBooking({
      tourSlug: tour.slug,
      tourTitle: tour.title,
      optionId: selection.option.id,
      optionLabel: selection.option.label,
      locale,
      startsAt: range.start,
      endsAt: range.end,
      people,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      pickupAddress,
      totalCents: selection.option.totalCents,
      depositCents,
    });
    if (!booking) return NextResponse.json({ error: 'Este horário acabou de ser reservado. Escolha outro.' }, { status: 409 });
    bookingId = booking.id;

    // Keep test payments inside their Preview deployment. Production continues
    // using the canonical public URL configured for the site.
    const requestOrigin = new URL(request.url).origin;
    const origin = process.env.VERCEL_ENV === 'production'
      ? (process.env.NEXT_PUBLIC_SITE_URL ?? requestOrigin)
      : requestOrigin;
    const session = await getStripe().checkout.sessions.create({
      mode: 'payment',
      customer_email: email,
      client_reference_id: booking.id,
      metadata: { bookingId: booking.id },
      payment_intent_data: { metadata: { bookingId: booking.id } },
      line_items: [{
        quantity: 1,
        price_data: {
          currency: 'eur',
          unit_amount: depositCents,
          product_data: {
            name: `Sinal 30% · ${tour.title}`,
            description: `${selection.option.label} · ${body.date} às ${body.time}`,
          },
        },
      }],
      expires_at: Math.floor(addMinutes(new Date(), BOOKING_HOLD_MINUTES).getTime() / 1000),
      success_url: `${origin}/reserva/confirmada?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/reserva/cancelada?booking_id=${booking.id}`,
      locale: locale === 'pt' ? 'pt' : locale,
    });
    if (!session.url) throw new Error('Stripe did not return a checkout URL');
    await attachCheckoutSession(booking.id, session.id);
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('[checkout]', error);
    if (bookingId) await deletePendingBooking(bookingId).catch(() => undefined);
    return NextResponse.json({ error: 'Não foi possível iniciar o pagamento.' }, { status: 500 });
  }
}
