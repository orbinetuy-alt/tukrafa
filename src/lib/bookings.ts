import 'server-only';
import type { PoolClient } from '@neondatabase/serverless';
import { addMinutes } from 'date-fns';
import { BOOKING_BUFFER_MINUTES, BOOKING_HOLD_MINUTES } from './booking-config';
import { getPool } from './db';
import type { Locale } from './i18n';

export interface BookingRecord {
  id: string;
  status: 'pending_payment' | 'confirmed' | 'expired' | 'cancelled' | 'refunded';
  tour_slug: string;
  tour_title: string;
  option_id: string;
  option_label: string;
  locale: Locale;
  starts_at: Date;
  ends_at: Date;
  people: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  pickup_address: string;
  total_cents: number;
  deposit_cents: number;
  currency: string;
  stripe_checkout_session_id: string | null;
  stripe_payment_intent_id: string | null;
  google_calendar_event_id: string | null;
  calendar_synced_at: Date | null;
  client_notified_at: Date | null;
  rafa_notified_at: Date | null;
  email_notified_at: Date | null;
  expires_at: Date;
}

export interface NewBooking {
  tourSlug: string;
  tourTitle: string;
  optionId: string;
  optionLabel: string;
  locale: Locale;
  startsAt: Date;
  endsAt: Date;
  people: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  pickupAddress: string;
  totalCents: number;
  depositCents: number;
}

export async function createPendingBooking(input: NewBooking) {
  const client = await getPool().connect();
  try {
    await client.query('BEGIN ISOLATION LEVEL SERIALIZABLE');
    await client.query("SELECT pg_advisory_xact_lock(hashtext('rafa-travel-single-vehicle'))");
    await client.query("UPDATE bookings SET status = 'expired', updated_at = now() WHERE status = 'pending_payment' AND expires_at <= now()");

    const conflict = await client.query(
      `SELECT id FROM bookings
       WHERE (status = 'confirmed' OR (status = 'pending_payment' AND expires_at > now()))
         AND starts_at < $2::timestamptz + ($3 * interval '1 minute')
         AND ends_at > $1::timestamptz - ($3 * interval '1 minute')
       LIMIT 1`,
      [input.startsAt.toISOString(), input.endsAt.toISOString(), BOOKING_BUFFER_MINUTES],
    );
    if (conflict.rowCount) {
      await client.query('ROLLBACK');
      return null;
    }

    const expiresAt = addMinutes(new Date(), BOOKING_HOLD_MINUTES);
    const result = await client.query<BookingRecord>(
      `INSERT INTO bookings (
        status, tour_slug, tour_title, option_id, option_label, locale,
        starts_at, ends_at, people, customer_name, customer_email,
        customer_phone, pickup_address, total_cents, deposit_cents, expires_at
      ) VALUES (
        'pending_payment', $1, $2, $3, $4, $5, $6, $7, $8,
        $9, $10, $11, $12, $13, $14, $15
      ) RETURNING *`,
      [input.tourSlug, input.tourTitle, input.optionId, input.optionLabel, input.locale,
        input.startsAt.toISOString(), input.endsAt.toISOString(), input.people,
        input.customerName, input.customerEmail, input.customerPhone, input.pickupAddress,
        input.totalCents, input.depositCents, expiresAt.toISOString()],
    );
    await client.query('COMMIT');
    return result.rows[0];
  } catch (error) {
    await safeRollback(client);
    throw error;
  } finally {
    client.release();
  }
}

async function safeRollback(client: PoolClient) {
  try { await client.query('ROLLBACK'); } catch { /* connection already closed */ }
}

export async function deletePendingBooking(id: string) {
  await getPool().query("DELETE FROM bookings WHERE id = $1 AND status = 'pending_payment'", [id]);
}

export async function attachCheckoutSession(id: string, sessionId: string) {
  await getPool().query('UPDATE bookings SET stripe_checkout_session_id = $2, updated_at = now() WHERE id = $1', [id, sessionId]);
}

export async function getBusyBookingRanges(timeMin: Date, timeMax: Date) {
  const result = await getPool().query<{ starts_at: Date; ends_at: Date }>(
    `SELECT starts_at, ends_at FROM bookings
     WHERE (status = 'confirmed' OR (status = 'pending_payment' AND expires_at > now()))
       AND starts_at < $2 AND ends_at > $1`,
    [timeMin.toISOString(), timeMax.toISOString()],
  );
  return result.rows.map((row) => ({ start: new Date(row.starts_at), end: new Date(row.ends_at) }));
}

export async function getBookingById(id: string) {
  const result = await getPool().query<BookingRecord>('SELECT * FROM bookings WHERE id = $1 LIMIT 1', [id]);
  return result.rows[0] ?? null;
}

export async function getBookingByCheckoutSession(sessionId: string) {
  const result = await getPool().query<BookingRecord>('SELECT * FROM bookings WHERE stripe_checkout_session_id = $1 LIMIT 1', [sessionId]);
  return result.rows[0] ?? null;
}

export async function confirmBooking(id: string, paymentIntentId: string | null) {
  const result = await getPool().query<BookingRecord>(
    `UPDATE bookings SET status = 'confirmed', stripe_payment_intent_id = COALESCE($2, stripe_payment_intent_id), updated_at = now()
     WHERE id = $1 AND status IN ('pending_payment', 'confirmed') RETURNING *`,
    [id, paymentIntentId],
  );
  return result.rows[0] ?? null;
}

export async function expireBooking(id: string) {
  await getPool().query("UPDATE bookings SET status = 'expired', updated_at = now() WHERE id = $1 AND status = 'pending_payment'", [id]);
}

export async function markBookingField(id: string, field: 'calendar' | 'client' | 'rafa' | 'email', value?: string) {
  const statements = {
    calendar: ['google_calendar_event_id = $2, calendar_synced_at = now()', value ?? null],
    client: ['client_notified_at = now()', null],
    rafa: ['rafa_notified_at = now()', null],
    email: ['email_notified_at = now()', null],
  } as const;
  const [set, parameter] = statements[field];
  if (field === 'calendar') {
    await getPool().query(`UPDATE bookings SET ${set}, updated_at = now() WHERE id = $1`, [id, parameter]);
  } else {
    await getPool().query(`UPDATE bookings SET ${set}, updated_at = now() WHERE id = $1`, [id]);
  }
}
