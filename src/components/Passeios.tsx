'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import {
  tukTukTours,
  excursionTours,
  categoryLabel,
  categoryColor,
  tourImages,
  tourImagePositions,
} from '@/data/tours';
import type { TourDetail } from '@/data/tours';
import { BookingModal } from '@/components/BookingModal';
import { useI18n } from '@/lib/i18n';
import { localizeTour } from '@/lib/tour-i18n';

const ClockIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
  </svg>
);

const PeopleIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

type Tab = 'tuktuk' | 'excursoes';

export default function Passeios() {
  const { locale, messages } = useI18n();
  const t = messages.tours;
  const [activeTab, setActiveTab] = useState<Tab>('tuktuk');
  const [bookingTour, setBookingTour] = useState<TourDetail | null>(null);
  const tours = (activeTab === 'tuktuk' ? tukTukTours : excursionTours).map((tour) => localizeTour(tour, locale));

  return (
    <>
    <section id="passeios" className="relative isolate bg-gray-50 py-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-10">
          <p className="text-brand-green text-xs font-bold tracking-widest uppercase mb-3">
            {t.eyebrow}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-brand-dark mb-5">
            {t.title}
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="relative z-20 inline-flex bg-white rounded-2xl p-1.5 shadow-sm border border-gray-100">
            <button
              type="button"
              onClick={() => setActiveTab('tuktuk')}
              className={`touch-control min-h-11 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'tuktuk'
                  ? 'bg-brand-green text-white shadow-sm'
                  : 'text-gray-500 hover:text-brand-dark'
              }`}
            >
              🛺 Tuk-Tuk
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('excursoes')}
              className={`touch-control min-h-11 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'excursoes'
                  ? 'bg-brand-green text-white shadow-sm'
                  : 'text-gray-500 hover:text-brand-dark'
              }`}
            >
              🚌 {t.excursions}
            </button>
          </div>
        </div>

        {/* Cards grid */}
        {tours.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map((tour) => (
              <div
                key={tour.slug}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col"
              >
                {/* Image */}
                <div className="relative h-52 shrink-0">
                  <Image
                    src={tourImages[tour.slug]}
                    alt={`${tour.title} — Rafa Travel`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                    style={{ objectPosition: tourImagePositions[tour.slug] }}
                  />
                  {/* Category badge */}
                  <div className={`absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold ${categoryColor[tour.category]}`}>
                    {tour.category === 'historico' ? t.categories.historical : tour.category === 'costa' ? t.categories.coast : tour.category === 'cultural' ? t.categories.cultural : categoryLabel[tour.category]}
                  </div>
                  {/* Price badge */}
                  <div className="absolute bottom-3 right-3 bg-white rounded-full px-3 py-1.5 shadow text-sm font-bold text-brand-red">
                    {tour.priceDisplay}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  {/* Meta row */}
                  <div className="flex items-center gap-4 text-gray-400 text-xs mb-3">
                    <span className="flex items-center gap-1">
                      <ClockIcon />
                      {tour.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <PeopleIcon />
                      {tour.capacityNote}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl text-brand-dark mb-1">{tour.title}</h3>
                  <p className="text-xs text-brand-green font-medium mb-3">{tour.subtitle}</p>
                  <p className="text-sm text-gray-500 leading-relaxed mb-2 flex-1">
                    {tour.description}
                  </p>
                  <p className="text-xs text-gray-400 mb-4">{tour.priceNote}</p>

                  {/* Buttons */}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setBookingTour(tour)}
                      className="touch-control flex-1 min-h-11 bg-brand-red hover:bg-brand-red-dark text-white text-sm font-semibold py-2.5 rounded-xl transition-colors">
                      {t.book}
                    </button>
                    <Link
                      href={`/passeios/${tour.slug}`}
                      className="flex-1 text-center border border-gray-300 hover:border-brand-green hover:text-brand-green text-gray-600 text-sm font-semibold py-2.5 rounded-xl transition-colors"
                    >
                      {t.more}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <p className="text-4xl mb-4">🚌</p>
            <p className="font-semibold text-gray-500 mb-1">Em breve</p>
            <p className="text-sm">As nossas excursões estarão disponíveis em breve.</p>
          </div>
        )}

        {/* Groups note */}
        <p className="text-center text-xs text-gray-400 mt-8">
          {activeTab === 'tuktuk'
            ? <>Tuk-tuk: grupos de 1–3 pax · A partir de 4 pessoas: preço <span className="font-medium text-gray-500">sob consulta</span> · hora extra: €40</>
            : <>Excursões: grupos de 1–4 pax e 5–8 pax (preços distintos) · Circuitos multidía: <span className="font-medium text-gray-500">sob consulta</span></>}
        </p>

      </div>
    </section>

    {bookingTour && (
      <BookingModal tour={bookingTour} onClose={() => setBookingTour(null)} />
    )}
    </>
  );
}
