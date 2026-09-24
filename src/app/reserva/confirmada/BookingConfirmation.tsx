'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';
import { StatusCard } from './StatusCard';

export function BookingConfirmation() {
  const sessionId = useSearchParams().get('session_id');
  const [status, setStatus] = useState<'processing' | 'confirmed' | 'error'>(sessionId ? 'processing' : 'error');
  useEffect(() => {
    if (!sessionId) return;
    let attempts = 0;
    const check = async () => {
      try {
        const response = await fetch(`/api/booking-status?session_id=${encodeURIComponent(sessionId)}`, { cache: 'no-store' });
        const result = await response.json();
        if (!response.ok) throw new Error();
        if (result.status === 'confirmed') {
          setStatus('confirmed');
          const key = `purchase-${result.bookingId}`;
          if (!sessionStorage.getItem(key)) {
            trackEvent('purchase', { transaction_id: result.bookingId, value: result.depositCents / 100, currency: 'EUR', items: [{ item_name: result.tourName }] });
            sessionStorage.setItem(key, '1');
          }
          return;
        }
        attempts += 1;
        if (attempts < 10) window.setTimeout(check, 1500); else setStatus('error');
      } catch { setStatus('error'); }
    };
    check();
  }, [sessionId]);
  if (status === 'confirmed') return <StatusCard text="Reserva confirmada!" success />;
  if (status === 'error') return <StatusCard text="O pagamento está a ser processado" />;
  return <StatusCard text="A confirmar o pagamento…" />;
}
