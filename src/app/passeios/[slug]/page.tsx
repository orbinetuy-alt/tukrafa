import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TourAccordions from './TourAccordions';
import { BookingButton } from '@/components/BookingButton';
import { LocalizedDetailText, LocalizedTourList, LocalizedTourText } from '@/components/LocalizedTour';
import {
  getTourBySlug,
  getRelatedTours,
  allTours,
  categoryLabel,
  categoryColor,
  tourImages,
  tourImagePositions,
} from '@/data/tours';
import { siteConfig } from '@/lib/site';

export async function generateStaticParams() {
  return allTours.map((tour) => ({ slug: tour.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) return {};
  return {
    title: tour.title,
    description: tour.description,
    alternates: {
      canonical: `/passeios/${tour.slug}`,
    },
    openGraph: {
      type: 'website',
      url: `/passeios/${tour.slug}`,
      title: tour.title,
      description: tour.description,
      images: [{
        url: tourImages[tour.slug],
        alt: `${tour.title} — Rafa Travel`,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: tour.title,
      description: tour.description,
      images: [tourImages[tour.slug]],
    },
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

const ShieldIcon = () => (
  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

function TourHero({ tour }: { tour: NonNullable<ReturnType<typeof getTourBySlug>> }) {
  return (
    <div className="relative w-full h-72 md:h-96 bg-brand-dark overflow-hidden">
      <Image
        src={tourImages[tour.slug]}
        alt={`${tour.title} — Rafa Travel`}
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{
          objectPosition:
            tour.slug === 'algarve-benagil'
              ? '50% 70%'
              : tourImagePositions[tour.slug],
        }}
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-black/5" />
      <div className="absolute bottom-0 left-0 px-6 md:px-10 py-8">
        <h1 className="font-serif text-3xl md:text-5xl text-white font-bold leading-tight drop-shadow-md">
          <LocalizedTourText tour={tour} field="title" />
        </h1>
        <p className="text-white/80 text-sm md:text-base mt-2"><LocalizedTourText tour={tour} field="subtitle" /></p>
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
      <div className="relative h-44 bg-brand-beige-dark">
        <Image
          src={tourImages[tour.slug]}
          alt={`${tour.title} — Rafa Travel`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          style={{ objectPosition: tourImagePositions[tour.slug] }}
        />
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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: tour.title,
    description: tour.description,
    image: `${siteConfig.url}${encodeURI(tourImages[tour.slug])}`,
    url: `${siteConfig.url}/passeios/${tour.slug}`,
    touristType: 'Private tour',
    provider: {
      '@type': 'TravelAgency',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    offers: tour.priceFrom > 0 ? {
      '@type': 'Offer',
      price: tour.priceFrom,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: `${siteConfig.url}/passeios/${tour.slug}`,
    } : undefined,
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-3 text-sm text-gray-400 flex items-center gap-2">
          <Link href="/" className="hover:text-brand-green transition-colors">
            <LocalizedDetailText field="home" />
          </Link>
          <span>/</span>
          <Link href="/#passeios" className="hover:text-brand-green transition-colors">
            <LocalizedDetailText field="tours" />
          </Link>
          <span>/</span>
          <span className="text-brand-dark font-medium truncate"><LocalizedTourText tour={tour} field="title" /></span>
        </div>
      </div>

      {/* Hero */}
      <TourHero tour={tour} />

      {/* Main content */}
      <div className="max-w-6xl mx-auto w-full px-6 py-10 flex-1">

        {/* Info badges */}
        <div className="flex flex-wrap gap-2 mb-8">
          <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 ${categoryColor[tour.category]}`}>
            {categoryLabel[tour.category]}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-gray-200 text-gray-600">
            <ClockIcon /> <LocalizedTourText tour={tour} field="duration" />
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-gray-200 text-gray-600">
            <PeopleIcon /> <LocalizedTourText tour={tour} field="maxPax" />
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-gray-200 text-gray-600">
            <PinIcon /> <LocalizedTourText tour={tour} field="pickup" />
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
              <LocalizedTourText tour={tour} field="longDescription" />
            </p>

            <TourAccordions tour={tour} />
          </div>

          {/* ── Right sidebar ────────────────────────── */}
          <aside className="w-full lg:w-90 shrink-0">
            <div className="sticky top-24 border border-gray-200 rounded-2xl p-6 shadow-sm">

              {/* Title + price */}
              <p className="text-sm text-gray-500 mb-1"><LocalizedTourText tour={tour} field="title" /></p>
              <div className="flex items-end justify-between mb-1">
                <div>
                  <p className="text-sm text-gray-500 leading-none mb-1"><LocalizedDetailText field="from" /></p>
                  {tour.priceFrom > 0 ? (
                    <p className="text-4xl font-bold text-brand-dark leading-none">
                      €{tour.priceFrom}
                    </p>
                  ) : (
                    <p className="text-2xl font-bold text-brand-dark leading-none">
                      <LocalizedDetailText field="quote" />
                    </p>
                  )}
                </div>
                <p className="text-xs text-gray-400 text-right leading-snug max-w-32">
                  <LocalizedTourText tour={tour} field="sidebarPriceNote" />
                </p>
              </div>

              <hr className="my-4 border-gray-100" />

              {/* Feature checklist */}
              <ul className="space-y-2.5 mb-6">
                <LocalizedTourList tour={tour} field="sidebarFeatures" />
              </ul>

              {/* CTA */}
              <BookingButton tour={tour} />

              {/* Trust */}
              <p className="flex items-center justify-center gap-1.5 text-xs text-gray-400 mt-3">
                <ShieldIcon />
                <LocalizedDetailText field="safe" />
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
              <LocalizedDetailText field="related" />
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
