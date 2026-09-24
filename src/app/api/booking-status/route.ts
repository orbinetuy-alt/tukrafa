import { NextResponse } from 'next/server';
import { getBookingByCheckoutSession } from '@/lib/bookings';

export async function GET(request: Request) {
  const sessionId = new URL(request.url).searchParams.get('session_id');
  if (!sessionId?.startsWith('cs_')) return NextResponse.json({ error: 'Invalid session' }, { status: 400 });
  try {
    const booking = await getBookingByCheckoutSession(sessionId);
    if (!booking) return NextResponse.json({ status: 'processing' });
    return NextResponse.json({
      status: booking.status,
      bookingId: booking.id,
      tourName: booking.tour_title,
      depositCents: booking.deposit_cents,
      currency: booking.currency,
    });
  } catch (error) {
    console.error('[booking status]', error);
    return NextResponse.json({ error: 'Unable to read booking' }, { status: 500 });
  }
}
