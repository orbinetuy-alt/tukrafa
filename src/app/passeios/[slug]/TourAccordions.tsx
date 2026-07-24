'use client';

import { useState } from 'react';
import type { TourDetail } from '@/data/tours';
import { useI18n } from '@/lib/i18n';
import { localizeTour } from '@/lib/tour-i18n';

interface Props {
  tour: TourDetail;
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-5 h-5 text-gray-400 transition-transform duration-200 shrink-0 ${open ? 'rotate-180' : ''}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden mb-3">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-5 text-left font-semibold text-brand-dark hover:bg-gray-50 transition-colors"
      >
        <span>{title}</span>
        <ChevronIcon open={open} />
      </button>
      {open && <div className="px-6 pb-6 pt-1">{children}</div>}
    </div>
  );
}

const PinIcon = () => (
  <svg className="w-4 h-4 shrink-0 text-brand-red" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-4 h-4 shrink-0 text-brand-green" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const XIcon = () => (
  <svg className="w-4 h-4 shrink-0 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default function TourAccordions({
  tour: sourceTour,
}: Props) {
  const { locale, messages } = useI18n();
  const tour = localizeTour(sourceTour, locale);
  const { itinerary, howItWorks, durationOptions, canInclude, included, notIncluded } = tour;
  const labels = messages.detail;
  const isFlexible = !!durationOptions;
  const firstTitle = isFlexible ? labels.customRoute : labels.route;

  return (
    <div className="mt-8">
      {/* Accordion 1: Itinerary or Flexible route */}
      <Accordion title={firstTitle} defaultOpen>
        {isFlexible ? (
          <div className="space-y-6">
            {/* How it works */}
            {howItWorks && (
              <div>
                <p className="text-sm font-semibold text-brand-dark mb-3">{labels.how}</p>
                <ol className="space-y-3">
                  {howItWorks.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-green text-white text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-sm text-gray-600 leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Duration selector */}
            {durationOptions && (
              <div>
                <p className="text-sm font-semibold text-brand-dark mb-3">{labels.duration}</p>
                <div className="flex flex-wrap gap-2">
                  {durationOptions.map((opt) => (
                    <div
                      key={opt.label}
                      className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-brand-dark font-medium"
                    >
                      {opt.label}{' '}
                      <span className="text-brand-green font-semibold">{opt.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Can include */}
            {canInclude && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <p className="text-sm font-semibold text-brand-dark">{labels.canInclude}</p>
                  <span className="text-xs bg-brand-green/10 text-brand-green font-medium px-2 py-0.5 rounded-full">
                    {labels.yourChoice}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6">
                  {canInclude.map((place) => (
                    <div key={place} className="flex items-center gap-2">
                      <PinIcon />
                      <span className="text-sm text-gray-600">{place}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <ol className="space-y-3">
            {itinerary?.map((stop, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-beige-dark text-brand-dark text-xs font-bold shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-sm text-gray-600 leading-relaxed">{stop}</span>
              </li>
            ))}
          </ol>
        )}
      </Accordion>

      {/* Accordion 2: What's included */}
      <Accordion title={labels.included}>
        <ul className="space-y-2.5">
          {included.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckIcon />
              <span className="text-sm text-gray-600">{item}</span>
            </li>
          ))}
        </ul>
      </Accordion>

      {/* Accordion 3: What's not included */}
      <Accordion title={labels.notIncluded}>
        <ul className="space-y-2.5">
          {notIncluded.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <XIcon />
              <span className="text-sm text-gray-400">{item}</span>
            </li>
          ))}
        </ul>
      </Accordion>
    </div>
  );
}
