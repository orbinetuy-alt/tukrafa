import { addMinutes } from 'date-fns';
import { formatInTimeZone, fromZonedTime, toZonedTime } from 'date-fns-tz';
import {
  BOOKING_CLOSING_HOUR,
  BOOKING_OPENING_HOUR,
  BOOKING_SLOT_INTERVAL_MINUTES,
  BOOKING_TIME_ZONE,
} from './booking-config';

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const TIME_PATTERN = /^([01]\d|2[0-3]):([0-5]\d)$/;

export function zonedDateTimeToUtc(date: string, time: string) {
  if (!DATE_PATTERN.test(date) || !TIME_PATTERN.test(time)) return null;
  const utc = fromZonedTime(`${date}T${time}:00`, BOOKING_TIME_ZONE);
  return Number.isNaN(utc.getTime()) ? null : utc;
}

export function getSlotRange(date: string, time: string, durationMinutes: number) {
  const start = zonedDateTimeToUtc(date, time);
  if (!start) return null;
  return { start, end: addMinutes(start, durationMinutes) };
}

export function isBookableDate(date: string) {
  if (!DATE_PATTERN.test(date)) return false;
  return date >= formatInTimeZone(new Date(), BOOKING_TIME_ZONE, 'yyyy-MM-dd');
}

export function buildCandidateSlots(date: string, durationMinutes: number) {
  const slots: Array<{ time: string; start: Date; end: Date }> = [];
  for (let minutes = BOOKING_OPENING_HOUR * 60; minutes < BOOKING_CLOSING_HOUR * 60; minutes += BOOKING_SLOT_INTERVAL_MINUTES) {
    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;
    const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
    const range = getSlotRange(date, time, durationMinutes);
    if (!range) continue;
    const localEnd = toZonedTime(range.end, BOOKING_TIME_ZONE);
    const closing = new Date(localEnd);
    closing.setHours(BOOKING_CLOSING_HOUR, 0, 0, 0);
    if (localEnd <= closing) slots.push({ time, ...range });
  }
  return slots;
}
