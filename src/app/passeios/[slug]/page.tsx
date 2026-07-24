import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TourAccordions from './TourAccordions';
import { BookingButton } from '@/components/BookingButton';
import {
  getTourBySlug,
  getRelatedTours,
  allTours,
  categoryLabel,
  categoryColor,
} from '@/data/tours';

export async function generateStaticParams() {
  return allTours.map((tour) => ({ slug: tour.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) return {};
  return {
    title: `${tour.title} — Rafa Travel`,
    description: tour.description,
  };
}

// ── Reusable icon components ────────────────────────────────────────────────

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

const PinIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const GlobeIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-4 h-4 shrink-0 text-brand-green" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

// ── Image placeholder ────────────────────────────────────────────────────────

function HeroPlaceholder({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="relative w-full h-72 md:h-96 bg-linear-to-br from-brand-dark via-brand-green-dark to-brand-green overflow-hidden">
      {/* subtle texture */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 px-6 md:px-10 py-8">
        <h1 className="font-serif text-3xl md:text-5xl text-white font-bold leading-tight drop-shadow-md">
          {title}
        </h1>
        <p className="text-white/80 text-sm md:text-base mt-2">{subtitle}</p>
      </div>
    </div>
  );
}

function ThumbnailPlaceholder({ active }: { active?: boolean }) {
  return (
    <div
      className={`h-16 md:h-20 w-24 md:w-32 rounded-lg shrink-0 overflow-hidden border-2 transition-colors ${
        active ? 'border-brand-green' : 'border-transparent'
      }`}
    >
      <div className="w-full h-full bg-brand-beige-dark flex items-center justify-center">
        <svg className="w-6 h-6 opacity-20" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    </div>
  );
}

function RelatedTourCard({
  tour,
}: {
  tour: ReturnType<typeof getTourBySlug> & {};
}) {
  return (
    <Link href={`/passeios/${tour.slug}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Image placeholder */}
      <div className="h-44 bg-brand-beige-dark flex items-center justify-center">
        <svg className="w-10 h-10 opacity-20" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-1.5">
          <span>{tour.duration}</span>
          <span>·</span>
          <span>{tour.maxPax}</span>
        </div>
        <h3 className="font-serif text-base text-brand-dark font-semibold group-hover:text-brand-green transition-colors leading-snug mb-2">
          {tour.title}
        </h3>
        <p className="text-brand-red font-bold text-sm">{tour.priceDisplay}</p>
      </div>
    </Link>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);

  if (!tour) notFound();

  const related = getRelatedTours(slug, tour.type);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-3 text-sm text-gray-400 flex items-center gap-2">
          <Link href="/" className="hover:text-brand-green transition-colors">
            Início
          </Link>
          <span>/</span>
          <Link href="/#passeios" className="hover:text-brand-green transition-colors">
            Passeios
          </Link>
          <span>/</span>
          <span className="text-brand-dark font-medium truncate">{tour.title}</span>
        </div>
      </div>

      {/* Hero */}
      <HeroPlaceholder title={tour.title} subtitle={tour.subtitle} />

      {/* Thumbnail gallery strip */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex gap-3 overflow-x-auto">
          <ThumbnailPlaceholder active />
          <ThumbnailPlaceholder />
          <ThumbnailPlaceholder />
          <ThumbnailPlaceholder />
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto w-full px-6 py-10 flex-1">

        {/* Info badges */}
        <div className="flex flex-wrap gap-2 mb-8">
          <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 ${categoryColor[tour.category]}`}>
            {categoryLabel[tour.category]}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-gray-200 text-gray-600">
            <ClockIcon /> {tour.duration}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-gray-200 text-gray-600">
            <PeopleIcon /> {tour.maxPax}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-gray-200 text-gray-600">
            <PinIcon /> {tour.pickup}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-gray-200 text-gray-600">
            <GlobeIcon /> {tour.languages.join(' · ')}
          </span>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-10">

          {/* ── Left column ─────────────────────────── */}
          <div className="flex-1 min-w-0">
            <p className="text-gray-600 leading-relaxed text-base">
              {tour.longDescription}
            </p>

            <TourAccordions
              itinerary={tour.itinerary}
              howItWorks={tour.howItWorks}
              durationOptions={tour.durationOptions}
              canInclude={tour.canInclude}
              included={tour.included}
              notIncluded={tour.notIncluded}
            />
          </div>

          {/* ── Right sidebar ────────────────────────── */}
          <aside className="w-full lg:w-90 shrink-0">
            <div className="sticky top-24 border border-gray-200 rounded-2xl p-6 shadow-sm">

              {/* Title + price */}
              <p className="text-sm text-gray-500 mb-1">{tour.title}</p>
              <div className="flex items-end justify-between mb-1">
                <div>
                  <p className="text-sm text-gray-500 leading-none mb-1">A partir de</p>
                  {tour.priceFrom > 0 ? (
                    <p className="text-4xl font-bold text-brand-dark leading-none">
                      €{tour.priceFrom}
                    </p>
                  ) : (
                    <p className="text-2xl font-bold text-brand-dark leading-none">
                      Sob consulta
                    </p>
                  )}
                </div>
                <p className="text-xs text-gray-400 text-right leading-snug max-w-32">
                  {tour.sidebarPriceNote}
                </p>
              </div>

              <hr className="my-4 border-gray-100" />

              {/* Feature checklist */}
              <ul className="space-y-2.5 mb-6">
                {tour.sidebarFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckIcon />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <BookingButton tour={tour} />

              {/* Trust */}
              <p className="flex items-center justify-center gap-1.5 text-xs text-gray-400 mt-3">
                <ShieldIcon />
                Reserva segura · Sem compromisso
              </p>
            </div>
          </aside>

        </div>
      </div>

      {/* Related tours */}
      {related.length > 0 && (
        <section className="bg-gray-50 py-14 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl text-brand-dark mb-8">
              Outros passeios que vai adorar
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((t) => (
                <RelatedTourCard key={t.slug} tour={t} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
