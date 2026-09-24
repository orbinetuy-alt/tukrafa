export const BOOKING_TIME_ZONE = 'Europe/Lisbon';
export const BOOKING_OPENING_HOUR = 8;
export const BOOKING_CLOSING_HOUR = 20;
export const BOOKING_SLOT_INTERVAL_MINUTES = 60;
export const BOOKING_BUFFER_MINUTES = 30;
// Stripe requires Checkout Sessions to expire at least 30 minutes in the future.
// Five extra minutes avoid falling below that limit while the request is processed.
export const BOOKING_HOLD_MINUTES = 35;
export const DEPOSIT_PERCENT = 30;

export interface BookingOption {
  id: string;
  label: string;
  durationMinutes: number;
  totalCents: number;
}

export interface BookableTour {
  slug: string;
  maxPeople: number;
  options: BookingOption[];
}

const bookableTours: BookableTour[] = [
  { slug: 'lisboa-total', maxPeople: 3, options: [{ id: '6h', label: '6 horas', durationMinutes: 360, totalCents: 34000 }] },
  { slug: 'alfama-graca', maxPeople: 3, options: [
    { id: '90min', label: '90 minutos', durationMinutes: 90, totalCents: 12000 },
    { id: '2h', label: '2 horas', durationMinutes: 120, totalCents: 15000 },
  ] },
  { slug: 'belem-descobrimentos', maxPeople: 3, options: [{ id: '2h', label: '2 horas', durationMinutes: 120, totalCents: 15000 }] },
  { slug: 'chiado-poetico', maxPeople: 3, options: [
    { id: '90min', label: '90 minutos', durationMinutes: 90, totalCents: 12000 },
    { id: '2h', label: '2 horas', durationMinutes: 120, totalCents: 15000 },
  ] },
  { slug: 'cascais-cabo-da-roca', maxPeople: 3, options: [{ id: '6h', label: '6 horas', durationMinutes: 360, totalCents: 34000 }] },
  { slug: 'sintra-cascais', maxPeople: 8, options: [{ id: '8h', label: 'Dia inteiro · 8 horas', durationMinutes: 480, totalCents: 35000 }] },
  { slug: 'fatima-nazare-obidos', maxPeople: 8, options: [{ id: '9h', label: 'Dia inteiro · 9 horas', durationMinutes: 540, totalCents: 40000 }] },
  { slug: 'queluz-mafra-ericeira', maxPeople: 8, options: [{ id: '8h', label: 'Dia inteiro · 8 horas', durationMinutes: 480, totalCents: 35000 }] },
  { slug: 'arrabida-cristo-rei', maxPeople: 8, options: [{ id: '8h', label: 'Dia inteiro · 8 horas', durationMinutes: 480, totalCents: 35000 }] },
  { slug: 'evora-vinhos', maxPeople: 8, options: [{ id: '9h', label: 'Dia inteiro · 9 horas', durationMinutes: 540, totalCents: 42000 }] },
  { slug: 'templarios', maxPeople: 8, options: [{ id: '8h', label: 'Dia inteiro · 8 horas', durationMinutes: 480, totalCents: 40000 }] },
  { slug: 'coimbra-aveiro', maxPeople: 8, options: [{ id: '10h', label: 'Dia inteiro · 10 horas', durationMinutes: 600, totalCents: 45000 }] },
  { slug: 'porto-1-dia', maxPeople: 8, options: [{ id: '10h', label: 'Dia inteiro · 10 horas', durationMinutes: 600, totalCents: 50000 }] },
  { slug: 'algarve-benagil', maxPeople: 8, options: [{ id: '12h', label: 'Dia inteiro · até 12 horas', durationMinutes: 720, totalCents: 55000 }] },
];

export const BOOKABLE_TOURS = new Map(bookableTours.map((tour) => [tour.slug, tour]));

export function getBookingSelection(tourSlug: string, optionId: string) {
  const tour = BOOKABLE_TOURS.get(tourSlug);
  const option = tour?.options.find((item) => item.id === optionId);
  return tour && option ? { tour, option } : null;
}

export function getDepositCents(totalCents: number) {
  return Math.round(totalCents * DEPOSIT_PERCENT / 100);
}
