CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  status text NOT NULL CHECK (status IN ('pending_payment', 'confirmed', 'expired', 'cancelled', 'refunded')),
  tour_slug text NOT NULL,
  tour_title text NOT NULL,
  option_id text NOT NULL,
  option_label text NOT NULL,
  locale text NOT NULL CHECK (locale IN ('pt', 'en', 'es')),
  starts_at timestamptz NOT NULL,
  ends_at timestamptz NOT NULL,
  people integer NOT NULL CHECK (people > 0),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  pickup_address text NOT NULL,
  total_cents integer NOT NULL CHECK (total_cents > 0),
  deposit_cents integer NOT NULL CHECK (deposit_cents > 0),
  currency text NOT NULL DEFAULT 'eur',
  stripe_checkout_session_id text UNIQUE,
  stripe_payment_intent_id text UNIQUE,
  google_calendar_event_id text UNIQUE,
  calendar_synced_at timestamptz,
  client_notified_at timestamptz,
  rafa_notified_at timestamptz,
  email_notified_at timestamptz,
  expires_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS bookings_availability_idx
  ON bookings (starts_at, ends_at, status, expires_at);

CREATE INDEX IF NOT EXISTS bookings_checkout_session_idx
  ON bookings (stripe_checkout_session_id);
