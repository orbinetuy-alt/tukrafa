'use client';

import type { TourDetail } from '@/data/tours';
import { useI18n } from '@/lib/i18n';
import { localizeTour } from '@/lib/tour-i18n';

type TextField = 'title' | 'subtitle' | 'longDescription' | 'duration' | 'maxPax' | 'pickup' | 'sidebarPriceNote';
type ListField = 'sidebarFeatures';

export function LocalizedTourText({ tour, field }: { tour: TourDetail; field: TextField }) {
  const { locale } = useI18n();
  return <>{localizeTour(tour, locale)[field]}</>;
}

export function LocalizedTourList({ tour, field }: { tour: TourDetail; field: ListField }) {
  const { locale } = useI18n();
  const values = localizeTour(tour, locale)[field];
  return (
    <>
      {values.map((value) => (
        <li key={value} className="flex items-center gap-2 text-sm text-gray-600">
          <span className="text-brand-green font-bold">✓</span>
          {value}
        </li>
      ))}
    </>
  );
}

export function LocalizedDetailText({ field }: {
  field: 'home' | 'tours' | 'from' | 'quote' | 'safe' | 'related';
}) {
  const { messages } = useI18n();
  return <>{messages.detail[field]}</>;
}
