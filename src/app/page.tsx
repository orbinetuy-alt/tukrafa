import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Passeios from '@/components/Passeios';
import Reviews from '@/components/Reviews';
import SobreNos from '@/components/SobreNos';
import Contacto from '@/components/Contacto';
import Footer from '@/components/Footer';
import { siteConfig } from '@/lib/site';

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    image: `${siteConfig.url}/hero.jpg`,
    description: siteConfig.description,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    areaServed: ['Lisboa', 'Portugal'],
    sameAs: [siteConfig.instagram, siteConfig.tiktok],
  };

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Passeios />
        <Reviews />
        <SobreNos />
        <Contacto />
      </main>
      <Footer />
    </div>
  );
}
