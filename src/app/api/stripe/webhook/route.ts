import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { expireBooking } from '@/lib/bookings';
import { fulfillPaidBooking } from '@/lib/booking-fulfillment';
import { getStripe } from '@/lib/stripe';

export async function POST(request: Request) {
  const signature = request.headers.get('stripe-signature');
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !secret) return NextResponse.json({ error: 'Webhook not configured' }, { status: 400 });
  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(await request.text(), signature, secret);
  } catch (error) {
    console.error('[stripe webhook signature]', error);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
      const session = event.data.object;
      const bookingId = session.metadata?.bookingId ?? session.client_reference_id;
      if (bookingId && session.payment_status === 'paid') {
        const paymentIntent = typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id ?? null;
        await fulfillPaidBooking(bookingId, paymentIntent);
      }
    }
    if (event.type === 'checkout.session.expired' || event.type === 'checkout.session.async_payment_failed') {
      const session = event.data.object;
      const bookingId = session.metadata?.bookingId ?? session.client_reference_id;
      if (bookingId) await expireBooking(bookingId);
    }
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('[stripe webhook fulfillment]', error);
    return NextResponse.json({ error: 'Fulfillment failed' }, { status: 500 });
  }
}
