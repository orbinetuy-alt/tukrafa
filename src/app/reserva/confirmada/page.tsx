import { Suspense } from 'react';
import { BookingConfirmation } from './BookingConfirmation';
import { StatusCard } from './StatusCard';

export default function ConfirmedBookingPage() {
  return <main className="min-h-screen bg-[#f7f6f2] flex items-center justify-center p-5"><Suspense fallback={<StatusCard text="A confirmar o pagamento…" />}><BookingConfirmation /></Suspense></main>;
}
