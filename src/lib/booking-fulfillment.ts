import 'server-only';
import { formatInTimeZone } from 'date-fns-tz';
import {
  confirmBooking, getBookingById, markBookingField, type BookingRecord,
} from './bookings';
import { BOOKING_TIME_ZONE } from './booking-config';
import { createBookingCalendarEvent } from './google-calendar';
import { isWhatsAppConfigured, notifyClientByWhatsApp, notifyRafaByWhatsApp } from './whatsapp';
import { isBookingEmailConfigured, sendPaidBookingEmails } from './booking-email';

function notificationData(booking: BookingRecord) {
  return {
    id: booking.id,
    locale: booking.locale,
    customerName: booking.customer_name,
    customerPhone: booking.customer_phone,
    customerEmail: booking.customer_email,
    tourTitle: booking.tour_title,
    date: formatInTimeZone(booking.starts_at, BOOKING_TIME_ZONE, 'dd/MM/yyyy'),
    time: formatInTimeZone(booking.starts_at, BOOKING_TIME_ZONE, 'HH:mm'),
    optionLabel: booking.option_label,
    people: booking.people,
    pickupAddress: booking.pickup_address,
    depositCents: booking.deposit_cents,
    remainderCents: booking.total_cents - booking.deposit_cents,
  };
}

export async function fulfillPaidBooking(bookingId: string, paymentIntentId: string | null) {
  let booking = await confirmBooking(bookingId, paymentIntentId);
  if (!booking) booking = await getBookingById(bookingId);
  if (!booking || booking.status !== 'confirmed') throw new Error(`Booking ${bookingId} cannot be fulfilled`);
  const data = notificationData(booking);
  const tasks: Promise<unknown>[] = [];

  if (!booking.calendar_synced_at) tasks.push(
    createBookingCalendarEvent({
      id: booking.id, tourTitle: booking.tour_title, optionLabel: booking.option_label,
      startsAt: new Date(booking.starts_at), endsAt: new Date(booking.ends_at),
      customerName: booking.customer_name, customerEmail: booking.customer_email,
      customerPhone: booking.customer_phone, people: booking.people,
      pickupAddress: booking.pickup_address, totalCents: booking.total_cents,
      depositCents: booking.deposit_cents,
    }).then((eventId) => markBookingField(booking.id, 'calendar', eventId)),
  );
  if (isWhatsAppConfigured() && !booking.client_notified_at) tasks.push(
    notifyClientByWhatsApp(data).then(() => markBookingField(booking.id, 'client')),
  );
  if (isWhatsAppConfigured() && !booking.rafa_notified_at) tasks.push(
    notifyRafaByWhatsApp(data).then(() => markBookingField(booking.id, 'rafa')),
  );
  if (isBookingEmailConfigured() && !booking.email_notified_at) tasks.push(
    sendPaidBookingEmails(booking, data.date, data.time).then(() => markBookingField(booking.id, 'email')),
  );
  const results = await Promise.allSettled(tasks);
  const failures = results.filter((result) => result.status === 'rejected');
  failures.forEach((failure) => console.error('[booking fulfillment]', failure));
  if (failures.length) throw new Error(`${failures.length} booking fulfillment task(s) failed`);
  return booking;
}
