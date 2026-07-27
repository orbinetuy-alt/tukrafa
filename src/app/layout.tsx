import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { Suspense } from 'react';
import { Analytics } from '@vercel/analytics/next';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { siteConfig } from '@/lib/site';
import './globals.css';

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Tours privados em Lisboa e Portugal | Rafa Travel',
    template: '%s | Rafa Travel',
  },
  description: siteConfig.description,
  keywords: [
    'tours em Lisboa',
    'tuk tuk Lisboa',
    'passeios privados Lisboa',
    'excursões Portugal',
    'guia turístico Lisboa',
    'Rafa Travel',
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'pt_PT',
    url: '/',
    siteName: siteConfig.name,
    title: 'Tours privados em Lisboa e Portugal | Rafa Travel',
    description: siteConfig.description,
    images: [{
      url: '/hero.jpg',
      width: 1200,
      height: 630,
      alt: 'Passeio privado com a Rafa Travel em Lisboa',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tours privados em Lisboa e Portugal | Rafa Travel',
    description: siteConfig.description,
    images: ['/hero.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  category: 'travel',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const googleAnalyticsId =
    process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || 'G-Y5D4HVVT1N';

  return (
    <html lang="pt-PT" className={`${playfair.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
        {googleAnalyticsId && (
          <Suspense fallback={null}>
            <GoogleAnalytics measurementId={googleAnalyticsId} />
          </Suspense>
        )}
      </body>
    </html>
  );
}
