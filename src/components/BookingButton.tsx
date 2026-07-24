'use client';

import { useState } from 'react';
import { BookingModal } from '@/components/BookingModal';
import type { TourDetail } from '@/data/tours';

export function BookingButton({ tour }: { tour: TourDetail }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="block w-full bg-brand-red hover:bg-brand-red-dark text-white text-sm font-bold py-4 rounded-xl text-center tracking-wider transition-colors"
      >
        RESERVE O TOUR AGORA
      </button>
      {open && <BookingModal tour={tour} onClose={() => setOpen(false)} />}
    </>
  );
}
