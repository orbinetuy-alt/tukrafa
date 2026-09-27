import 'server-only';
import type { Locale } from './i18n';

const MANYCHAT_API_URL = 'https://api.manychat.com';

interface ManyChatSubscriber { id: string | number }
interface ManyChatResponse<T = unknown> {
  status: 'success' | 'error'; data?: T; message?: string; details?: unknown;
}

export function isClientWhatsAppConfigured() {
  return Boolean(process.env.MANYCHAT_API_TOKEN && process.env.MANYCHAT_BOOKING_FLOW_NS);
}

export function isRafaWhatsAppConfigured() {
  return Boolean(process.env.MANYCHAT_API_TOKEN && process.env.MANYCHAT_RAFA_FLOW_NS && process.env.RAFA_WHATSAPP_NUMBER);
}

function normalizePhone(phone: string) {
  const digits = phone.replace(/[^\d]/g, '');
  return digits ? `+${digits}` : '';
}

async function manyChatRequest<T>(path: string, init?: RequestInit) {
  const token = process.env.MANYCHAT_API_TOKEN;
  if (!token) throw new Error('MANYCHAT_API_TOKEN is not configured');
  const response = await fetch(`${MANYCHAT_API_URL}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
      ...init?.headers,
    },
    cache: 'no-store',
  });
  const payload = await response.json().catch(() => null) as ManyChatResponse<T> | null;
  if (!response.ok || !payload || payload.status !== 'success') {
    throw new Error(`ManyChat API ${response.status}: ${JSON.stringify(payload)}`);
  }
  return payload.data;
}

function firstSubscriber(data: ManyChatSubscriber | ManyChatSubscriber[] | undefined) {
  return Array.isArray(data) ? data[0] : data;
}

async function findSubscriber(field: 'email' | 'phone', value: string) {
  const query = new URLSearchParams({ [field]: value });
  const data = await manyChatRequest<ManyChatSubscriber | ManyChatSubscriber[]>(`/fb/subscriber/findBySystemField?${query}`);
  return firstSubscriber(data);
}

async function getOrCreateSubscriber(notification: BookingNotification) {
  const phone = normalizePhone(notification.customerPhone);
  let subscriber = await findSubscriber('email', notification.customerEmail);
  if (!subscriber && phone) subscriber = await findSubscriber('phone', phone);
  if (subscriber) return subscriber;

  const [firstName, ...lastName] = notification.customerName.trim().split(/\s+/);
  const data = await manyChatRequest<ManyChatSubscriber>('/fb/subscriber/createSubscriber', {
    method: 'POST',
    body: JSON.stringify({
      first_name: firstName || notification.customerName,
      last_name: lastName.join(' '),
      phone,
      whatsapp_phone: phone,
      email: notification.customerEmail,
      has_opt_in_sms: false,
      has_opt_in_email: false,
      consent_phrase: 'Booking confirmation and service updates requested during checkout.',
    }),
  });
  if (!data) throw new Error('ManyChat did not return the created contact');
  return data;
}

async function setBookingFields(subscriberId: string | number, booking: BookingNotification) {
  await manyChatRequest('/fb/subscriber/setCustomFields', {
    method: 'POST',
    body: JSON.stringify({
      subscriber_id: subscriberId,
      fields: [
        { field_name: 'booking_tour', field_value: booking.tourTitle },
        { field_name: 'booking_date', field_value: booking.date },
        { field_name: 'booking_time', field_value: booking.time },
        { field_name: 'booking_duration', field_value: booking.optionLabel },
        { field_name: 'booking_deposit', field_value: euros(booking.depositCents) },
        { field_name: 'booking_balance', field_value: euros(booking.remainderCents) },
        { field_name: 'booking_code', field_value: booking.id },
        { field_name: 'booking_locale', field_value: booking.locale },
      ],
    }),
  });
}

async function sendFlow(subscriberId: string | number, flowNamespace: string) {
  await manyChatRequest('/fb/sending/sendFlow', {
    method: 'POST',
    body: JSON.stringify({ subscriber_id: subscriberId, flow_ns: flowNamespace }),
  });
}

export interface BookingNotification {
  id: string;
  locale: Locale;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  tourTitle: string;
  date: string;
  time: string;
  optionLabel: string;
  people: number;
  pickupAddress: string;
  depositCents: number;
  remainderCents: number;
}

const euros = (cents: number) => `€${(cents / 100).toFixed(2)}`;

export async function notifyClientByWhatsApp(booking: BookingNotification) {
  const flowNamespace = process.env.MANYCHAT_BOOKING_FLOW_NS;
  if (!flowNamespace) throw new Error('MANYCHAT_BOOKING_FLOW_NS is not configured');
  const subscriber = await getOrCreateSubscriber(booking);
  await setBookingFields(subscriber.id, booking);
  await sendFlow(subscriber.id, flowNamespace);
}

export async function notifyRafaByWhatsApp(booking: BookingNotification) {
  const flowNamespace = process.env.MANYCHAT_RAFA_FLOW_NS;
  const rafaPhone = process.env.RAFA_WHATSAPP_NUMBER;
  if (!flowNamespace || !rafaPhone) throw new Error('Rafa ManyChat notification is not configured');
  const subscriber = await getOrCreateSubscriber({
    ...booking,
    customerName: 'Rafa',
    customerPhone: rafaPhone,
    customerEmail: process.env.RAFA_NOTIFICATION_EMAIL ?? 'reservas@elrafatravel.com',
  });
  await setBookingFields(subscriber.id, booking);
  await sendFlow(subscriber.id, flowNamespace);
}
