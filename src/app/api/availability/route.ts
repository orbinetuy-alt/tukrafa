import { addMinutes } from 'date-fns';
import { NextResponse } from 'next/server';
import { BOOKING_BUFFER_MINUTES, getBookingSelection } from '@/lib/booking-config';
import { buildCandidateSlots, isBookableDate, zonedDateTimeToUtc } from '@/lib/booking-time';
import { getBusyBookingRanges } from '@/lib/bookings';
import { getCalendarBusyRanges, isGoogleCalendarConfigured } from '@/lib/google-calendar';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date') ?? '';
    const selection = getBookingSelection(searchParams.get('tour') ?? '', searchParams.get('option') ?? '');
    if (!selection || !isBookableDate(date)) {
      return NextResponse.json({ error: 'Parâmetros inválidos.' }, { status: 400 });
    }

    const candidates = buildCandidateSlots(date, selection.option.durationMinutes);
    if (!candidates.length) return NextResponse.json({ slots: [] });
    const dayStart = zonedDateTimeToUtc(date, '00:00')!;
    const dayEnd = addMinutes(dayStart, 24 * 60 + selection.option.durationMinutes);
    const [databaseBusy, calendarBusy] = await Promise.all([
      getBusyBookingRanges(dayStart, dayEnd),
      isGoogleCalendarConfigured() ? getCalendarBusyRanges(dayStart, dayEnd) : Promise.resolve([]),
    ]);
    const busy = [...databaseBusy, ...calendarBusy];
    const now = new Date();
    const slots = candidates
      .filter(({ start }) => start > now)
      .filter(({ start, end }) => !busy.some((range) =>
        start < addMinutes(range.end, BOOKING_BUFFER_MINUTES) &&
        end > addMinutes(range.start, -BOOKING_BUFFER_MINUTES)))
      .map(({ time }) => time);
    return NextResponse.json({ slots });
  } catch (error) {
    console.error('[availability]', error);
    return NextResponse.json({ error: 'Não foi possível consultar a disponibilidade.' }, { status: 500 });
  }
}
