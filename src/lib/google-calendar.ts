import 'server-only';
import { google } from 'googleapis';
import { BOOKING_TIME_ZONE } from './booking-config';

function getCalendarClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  if (!email || !key) throw new Error('Google Calendar credentials are not configured');
  const auth = new google.auth.JWT({
    email,
    key,
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });
  return google.calendar({ version: 'v3', auth });
}

function getCalendarId() {
  const id = process.env.GOOGLE_CALENDAR_ID;
  if (!id) throw new Error('GOOGLE_CALENDAR_ID is not configured');
  return id;
}

export function isGoogleCalendarConfigured() {
  return Boolean(
    process.env.GOOGLE_CALENDAR_ID &&
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
    process.env.GOOGLE_PRIVATE_KEY,
  );
}

export async function getCalendarBusyRanges(timeMin: Date, timeMax: Date) {
  const calendarId = getCalendarId();
  const response = await getCalendarClient().freebusy.query({
    requestBody: {
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      timeZone: BOOKING_TIME_ZONE,
      items: [{ id: calendarId }],
    },
  });
  return (response.data.calendars?.[calendarId]?.busy ?? [])
    .filter((range) => range.start && range.end)
    .map((range) => ({ start: new Date(range.start!), end: new Date(range.end!) }));
}

interface CalendarBooking {
  id: string;
  tourTitle: string;
  optionLabel: string;
  startsAt: Date;
  endsAt: Date;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  people: number;
  pickupAddress: string;
  totalCents: number;
  depositCents: number;
}

export async function createBookingCalendarEvent(booking: CalendarBooking) {
  const eventId = `rt${booking.id.replaceAll('-', '')}`;
  const remainder = booking.totalCents - booking.depositCents;
  const description = [
    `Reserva confirmada: ${booking.id}`,
    `Cliente: ${booking.customerName}`,
    `Email: ${booking.customerEmail}`,
    `WhatsApp: ${booking.customerPhone}`,
    `Pessoas: ${booking.people}`,
    `Duração: ${booking.optionLabel}`,
    `Sinal pago: €${(booking.depositCents / 100).toFixed(2)}`,
    `Restante a cobrar: €${(remainder / 100).toFixed(2)}`,
    `Pick-up: ${booking.pickupAddress}`,
  ].join('\n');

  try {
    const response = await getCalendarClient().events.insert({
      calendarId: getCalendarId(),
      sendUpdates: 'none',
      requestBody: {
        id: eventId,
        summary: `Rafa Travel · ${booking.tourTitle} · ${booking.customerName}`,
        description,
        location: booking.pickupAddress,
        start: { dateTime: booking.startsAt.toISOString(), timeZone: BOOKING_TIME_ZONE },
        end: { dateTime: booking.endsAt.toISOString(), timeZone: BOOKING_TIME_ZONE },
        extendedProperties: { private: { bookingId: booking.id } },
      },
    });
    return response.data.id ?? eventId;
  } catch (error: unknown) {
    const status = typeof error === 'object' && error && 'code' in error ? Number(error.code) : 0;
    if (status === 409) return eventId;
    throw error;
  }
}
