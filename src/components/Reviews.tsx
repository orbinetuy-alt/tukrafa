'use client';

import { useEffect, useState } from 'react';
import type { ReviewsData } from '@/app/api/reviews/route';
import { useI18n } from '@/lib/i18n';

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    className={`w-4 h-4 ${filled ? 'text-amber-400' : 'text-gray-200'}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const Stars = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <StarIcon key={i} filled={i <= rating} />
    ))}
  </div>
);

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

function timeAgo(timestamp: number, locale: 'pt' | 'en' | 'es', labels: ReturnType<typeof useI18n>['messages']['reviews']): string {
  const seconds = Math.floor(Date.now() / 1000 - timestamp);
  if (seconds < 60 * 60 * 24 * 30) return labels.month;
  const months = Math.floor(seconds / (60 * 60 * 24 * 30));
  if (months < 12) return locale === 'en' ? `${months} ${labels.months}` : `${labels.ago} ${months} ${months === 1 ? (locale === 'es' ? 'mes' : 'mês') : labels.months}`;
  const years = Math.floor(months / 12);
  return locale === 'en' ? `${years} ${years === 1 ? labels.year : labels.years}` : `${labels.ago} ${years} ${years === 1 ? labels.year : labels.years}`;
}

const AVATAR_COLORS = [
  'bg-brand-green text-white',
  'bg-brand-red text-white',
  'bg-amber-500 text-white',
  'bg-sky-600 text-white',
  'bg-violet-600 text-white',
];

export default function Reviews() {
  const { locale, messages } = useI18n();
  const t = messages.reviews;
  const [data, setData] = useState<ReviewsData | null>(null);

  useEffect(() => {
    fetch('/api/reviews')
      .then((r) => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <section id="reviews" className="bg-brand-beige py-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-brand-green text-xs font-bold tracking-widest uppercase mb-3">
            {t.eyebrow}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-brand-dark mb-4">
            {t.title}
          </h2>

          {/* Overall rating */}
          {data && (
            <div className="flex items-center justify-center gap-3 mt-6">
              <GoogleIcon />
              <span className="text-3xl font-bold text-brand-dark">{data.rating.toFixed(1)}</span>
              <Stars rating={Math.round(data.rating)} />
              <span className="text-gray-400 text-sm">({data.user_ratings_total} {t.count})</span>
            </div>
          )}

          {!data && (
            <div className="flex items-center justify-center gap-2 mt-6 text-gray-400 text-sm">
              <span className="inline-block w-4 h-4 border-2 border-gray-300 border-t-brand-green rounded-full animate-spin" />
              {t.loading}
            </div>
          )}
        </div>

        {/* Review cards */}
        {data && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.reviews.map((review, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4"
              >
                {/* Header */}
                <div className="flex items-center gap-3">
                  {review.profile_photo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={review.profile_photo_url}
                      alt={review.author_name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}
                    >
                      {getInitials(review.author_name)}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-brand-dark truncate">{review.author_name}</p>
                    <p className="text-xs text-gray-400">{timeAgo(review.time, locale, t)}</p>
                  </div>
                  <div className="ml-auto shrink-0">
                    <GoogleIcon />
                  </div>
                </div>

                {/* Stars */}
                <Stars rating={review.rating} />

                {/* Text */}
                <p className="text-sm text-gray-600 leading-relaxed flex-1">{review.text}</p>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-10">
          <a
            href="https://g.page/r/YOUR_GOOGLE_REVIEW_LINK/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-gray-300 hover:border-brand-green hover:text-brand-green text-gray-600 text-sm font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            <GoogleIcon />
            {t.all}
          </a>
        </div>

      </div>
    </section>
  );
}
