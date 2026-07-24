'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n';

const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-green-500 shrink-0">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

export default function Hero() {
  const { messages } = useI18n();
  const t = messages.hero;

  return (
    <section
      className="relative bg-brand-beige"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='44' height='44' viewBox='0 0 44 44' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M22 0 L44 22 L22 44 L0 22 Z' fill='none' stroke='%232D6A4F' stroke-width='0.6'/%3E%3C/svg%3E")`,
        backgroundSize: '44px 44px',
      }}
    >
      {/* Overlay to soften the pattern */}
      <div className="absolute inset-0 bg-brand-beige/85 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28 flex flex-col lg:flex-row items-center gap-14 lg:gap-20">

        {/* ── Left column ── */}
        <div className="flex-1 flex flex-col items-start gap-6 lg:max-w-[52%]">

          {/* Badge */}
          <div className="flex items-center gap-2.5 bg-white/80 border border-brand-green/25 rounded-full px-4 py-2 backdrop-blur-sm">
            <span className="w-2.5 h-2.5 bg-brand-green rounded-sm shrink-0" />
            <span className="text-brand-green text-sm font-medium">{t.badge}</span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-5xl lg:text-6xl text-brand-dark leading-[1.1] tracking-tight">
            {t.title}
          </h1>

          {/* Subtext */}
          <p className="text-gray-600 text-lg leading-relaxed max-w-lg">
            {t.subtitle}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center gap-3 mt-1">
            <Link
              href="#passeios"
              className="bg-brand-red hover:bg-brand-red-dark text-white font-semibold px-7 py-3.5 rounded-full transition-colors shadow-sm"
            >
              {t.book}
            </Link>
            <Link
              href="https://wa.me/351910706688"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border-2 border-gray-300 hover:border-brand-green text-gray-800 font-semibold px-7 py-3.5 rounded-full transition-colors bg-white/60"
            >
              <WhatsAppIcon />
              {t.whatsapp}
            </Link>
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} className="w-4 h-4 text-yellow-400" />
              ))}
            </div>
            <span className="font-semibold text-gray-800">4.9 Google</span>
            <span className="text-gray-300">|</span>
            <span>{t.travelers}</span>
          </div>
        </div>

        {/* ── Right column — image card ── */}
        <div className="flex-1 flex justify-center lg:justify-end w-full lg:max-w-[48%]">
          <div className="relative w-full max-w-80 lg:max-w-90">

            {/* Decorative offset border */}
            <div className="absolute inset-0 border-4 border-brand-green rounded-2xl translate-x-3 translate-y-3 rounded-br-3xl" />

            {/* Tour image */}
            <div className="relative z-10 w-full aspect-9/16 bg-brand-beige-dark rounded-2xl border border-brand-green/15 overflow-hidden">
              <Image
                src="/hero.jpg"
                alt="Rafa com uma família durante um passeio de tuk-tuk em Lisboa"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 440px"
                className="object-cover object-center"
              />
            </div>

            {/* TripAdvisor badge — top right */}
            <div className="absolute -top-5 -right-5 z-20 bg-white rounded-xl shadow-lg px-3.5 py-2.5 flex flex-col items-center min-w-34 border border-gray-100">
              <div className="flex items-center gap-0.5 text-yellow-400 mb-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className="w-3.5 h-3.5" />
                ))}
              </div>
              <span className="text-xs font-bold text-gray-700">TripAdvisor</span>
              <span className="text-[10px] text-gray-400">{t.certified}</span>
            </div>

            {/* Price badge — bottom left */}
            <div className="absolute -bottom-5 left-5 z-20 bg-brand-red rounded-xl px-4 py-3 text-white shadow-lg">
              <p className="text-[10px] uppercase font-bold tracking-widest opacity-80 mb-0.5">{t.from}</p>
              <p className="text-2xl font-bold leading-none">
                €120{' '}
                <span className="text-sm font-medium opacity-85">{t.privateTour}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
