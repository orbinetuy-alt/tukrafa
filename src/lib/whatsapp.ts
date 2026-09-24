import 'server-only';
import type { Locale } from './i18n';

const languageCodes: Record<Locale, string> = { pt: 'pt_PT', en: 'en_US', es: 'es' };

export function isWhatsAppConfigured() {
  return Boolean(
    process.env.WHATSAPP_ACCESS_TOKEN &&
    process.env.WHATSAPP_PHONE_NUMBER_ID &&
    process.env.RAFA_WHATSAPP_NUMBER,
  );
}

function normalizePhone(phone: string) {
  return phone.replace(/[^\d]/g, '');
}

async function sendTemplate(to: string, templateName: string, languageCode: string, parameters: string[]) {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const apiVersion = process.env.WHATSAPP_API_VERSION ?? 'v23.0';
  if (!token || !phoneNumberId) throw new Error('WhatsApp credentials are not configured');

  const response = await fetch(`https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to: normalizePhone(to),
      type: 'template',
      template: {
        name: templateName,
        language: { code: languageCode },
        components: [{
          type: 'body',
          parameters: parameters.map((text) => ({ type: 'text', text })),
        }],
      },
    }),
  });
  if (!response.ok) throw new Error(`WhatsApp API ${response.status}: ${await response.text()}`);
}

interface BookingNotification {
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
  const template = process.env.WHATSAPP_CLIENT_TEMPLATE_NAME ?? 'booking_confirmation';
  await sendTemplate(booking.customerPhone, template, languageCodes[booking.locale], [
    booking.customerName,
    booking.tourTitle,
    booking.date,
    booking.time,
    booking.optionLabel,
    euros(booking.depositCents),
    euros(booking.remainderCents),
    booking.id,
  ]);
}

export async function notifyRafaByWhatsApp(booking: BookingNotification) {
  const rafaPhone = process.env.RAFA_WHATSAPP_NUMBER;
  if (!rafaPhone) throw new Error('RAFA_WHATSAPP_NUMBER is not configured');
  const template = process.env.WHATSAPP_RAFA_TEMPLATE_NAME ?? 'new_paid_booking';
  await sendTemplate(rafaPhone, template, 'pt_PT', [
    booking.customerName,
    booking.customerPhone,
    booking.customerEmail,
    booking.tourTitle,
    booking.date,
    booking.time,
    booking.optionLabel,
    String(booking.people),
    booking.pickupAddress,
    euros(booking.depositCents),
    euros(booking.remainderCents),
    booking.id,
  ]);
}
