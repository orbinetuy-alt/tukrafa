'use client';

import { useState } from 'react';
import { BookingModal } from '@/components/BookingModal';
import type { TourDetail } from '@/data/tours';
import { useI18n } from '@/lib/i18n';
import { trackEvent } from '@/lib/analytics';

export function BookingButton({ tour }: { tour: TourDetail }) {
  const [open, setOpen] = useState(false);
  const { messages } = useI18n();

  return (
    <>
      <button
        type="button"
        onClick={() => {
          trackEvent('begin_checkout', {
            tour_slug: tour.slug,
            tour_name: tour.title,
            value: tour.priceFrom,
            currency: 'EUR',
          });
          setOpen(true);
        }}
        className="touch-control block w-full min-h-12 bg-brand-red hover:bg-brand-red-dark text-white text-sm font-bold py-4 rounded-xl text-center tracking-wider transition-colors"
      >
        {messages.detail.book}
      </button>
      {open && <BookingModal tour={tour} onClose={() => setOpen(false)} />}
    </>
  );
}
