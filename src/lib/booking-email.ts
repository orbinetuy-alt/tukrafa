import 'server-only';
import { Resend } from 'resend';
import type { BookingRecord } from './bookings';

const escapeHtml = (value: string) => value
  .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;').replaceAll("'", '&#039;');

const euros = (cents: number) => `€${(cents / 100).toFixed(2)}`;

export function isBookingEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY);
}

export async function sendPaidBookingEmails(booking: BookingRecord, date: string, time: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error('RESEND_API_KEY is not configured');
  const resend = new Resend(apiKey);
  const rafaEmail = process.env.RAFA_EMAIL ?? 'elrafatravelcrm@gmail.com';
  const fromEmail = process.env.FROM_EMAIL ?? 'reservas@elrafatravel.com';
  const safe = {
    name: escapeHtml(booking.customer_name), tour: escapeHtml(booking.tour_title),
    phone: escapeHtml(booking.customer_phone), email: escapeHtml(booking.customer_email),
    pickup: escapeHtml(booking.pickup_address), option: escapeHtml(booking.option_label),
  };
  const remainder = booking.total_cents - booking.deposit_cents;
  const details = `
    <div style="background:#f7f3ec;border-radius:12px;padding:20px;margin:24px 0;line-height:1.7">
      <div><strong>Tour:</strong> ${safe.tour}</div><div><strong>Data:</strong> ${date}</div>
      <div><strong>Hora:</strong> ${time}</div><div><strong>Duração:</strong> ${safe.option}</div>
      <div><strong>Pessoas:</strong> ${booking.people}</div><div><strong>Pick-up:</strong> ${safe.pickup}</div>
      <div><strong>Sinal pago:</strong> ${euros(booking.deposit_cents)}</div>
      <div><strong>Restante:</strong> ${euros(remainder)}</div>
      <div><strong>Reserva:</strong> ${booking.id}</div>
    </div>`;
  const [client, rafa] = await Promise.all([
    resend.emails.send({
      from: `Rafa Travel <${fromEmail}>`, to: booking.customer_email, replyTo: rafaEmail,
      subject: `Reserva confirmada — ${booking.tour_title}`,
      html: `<div style="font-family:sans-serif;max-width:560px;margin:auto;color:#1a1a1a"><h2 style="color:#2D6A4F">Reserva confirmada, ${safe.name}!</h2><p>Recebemos o sinal de 30% e o seu passeio já está reservado.</p>${details}<p>Pode cancelar com reembolso do sinal até 48 horas antes do início do passeio.</p><p>Obrigado por escolher a Rafa Travel!</p></div>`,
    }),
    resend.emails.send({
      from: `Rafa Travel <${fromEmail}>`, to: rafaEmail, replyTo: booking.customer_email,
      subject: `✅ Reserva paga — ${booking.tour_title}`,
      html: `<div style="font-family:sans-serif;max-width:560px;margin:auto;color:#1a1a1a"><h2 style="color:#2D6A4F">Nova reserva confirmada</h2><p><strong>Cliente:</strong> ${safe.name}<br><strong>WhatsApp:</strong> ${safe.phone}<br><strong>Email:</strong> ${safe.email}</p>${details}</div>`,
    }),
  ]);
  if (client.error || rafa.error) throw new Error(`Resend error: ${client.error?.message ?? rafa.error?.message}`);
}
