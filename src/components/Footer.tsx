'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n';

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.3 0 .59.05.87.13V9.4a6.34 6.34 0 105.47 6.27V8.73a8.16 8.16 0 004.77 1.52V6.82c-.34 0-.67-.04-1-.13z" />
  </svg>
);

const TripAdvisorIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4.5c1.93 0 3.722.576 5.218 1.565l1.698-1.698.884.884-1.696 1.697A7.477 7.477 0 0119.5 12c0 4.142-3.358 7.5-7.5 7.5S4.5 16.142 4.5 12 7.858 4.5 12 4.5zm0 2.25a5.25 5.25 0 100 10.5 5.25 5.25 0 000-10.5zm0 2.25a3 3 0 110 6 3 3 0 010-6z" />
  </svg>
);

const basePasseiosLinks = [
  { href: '/passeios/lisboa-total', label: 'Lisboa Total' },
  { href: '/passeios/alfama-graca', label: 'Alfama e Graça' },
  { href: '/passeios/belem-descobrimentos', label: 'Rota dos Descobrimentos' },
  { href: '/passeios/chiado-poetico', label: 'Chiado Romântico' },
  { href: '/passeios/sintra-cascais', label: 'Sintra e Cascais' },
];

const baseExplorarLinks = [
  { href: '/#passeios', label: 'Os nossos passeios' },
  { href: '/#reviews', label: 'Avaliações' },
  { href: '/#sobre', label: 'Sobre nós' },
  { href: '/#contactos', label: 'Contactos' },
];

const externalLinks = [
  { href: 'https://www.tripadvisor.com', label: 'TripAdvisor', icon: <TripAdvisorIcon /> },
  { href: 'https://www.getyourguide.com', label: 'GetYourGuide', icon: null },
  { href: 'https://g.page/r/YOUR_GOOGLE_REVIEW_LINK/review', label: 'Google Reviews', icon: null },
];

export default function Footer() {
  const { locale, messages } = useI18n();
  const t = messages.footer;
  const passeioLabels = locale === 'en'
    ? ['Complete Lisbon', 'Alfama and Graça', 'Discoveries Route', 'Romantic Chiado', 'Sintra and Cascais']
    : locale === 'es'
      ? ['Lisboa Completa', 'Alfama y Graça', 'Ruta de los Descubrimientos', 'Chiado Romántico', 'Sintra y Cascais']
      : basePasseiosLinks.map((link) => link.label);
  const passeiosLinks = basePasseiosLinks.map((link, index) => ({ ...link, label: passeioLabels[index] }));
  const exploreLabels = [messages.nav.tours, messages.nav.reviews, messages.nav.about, messages.nav.contact];
  const explorarLinks = baseExplorarLinks.map((link, index) => ({ ...link, label: exploreLabels[index] }));

  return (
    <footer className="bg-brand-dark text-gray-400">

      {/* Main footer */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand column */}
        <div className="lg:col-span-1 flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-xl p-1">
              <Image src="/logo.png" alt="Rafa Travel" width={48} height={48} className="h-10 w-10 object-contain" />
            </div>
            <span className="font-serif text-lg text-white font-semibold tracking-tight">Rafa Travel</span>
          </div>
          <p className="text-sm leading-relaxed text-gray-400">
            {t.description}
          </p>
          {/* Social icons */}
          <div className="flex items-center gap-3 mt-1">
            <a
              href="https://wa.me/351910706688"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-9 h-9 bg-white/5 hover:bg-green-500 rounded-lg flex items-center justify-center transition-colors text-gray-400 hover:text-white"
            >
              <WhatsAppIcon />
            </a>
            <a
              href="https://www.instagram.com/tuk.rafa/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 bg-white/5 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-colors text-gray-400 hover:text-white"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://www.tiktok.com/@el_rafa_travel"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="w-9 h-9 bg-white/5 hover:bg-black rounded-lg flex items-center justify-center transition-colors text-gray-400 hover:text-white"
            >
              <TikTokIcon />
            </a>
          </div>
        </div>

        {/* Passeios */}
        <div>
          <h4 className="text-white text-sm font-semibold uppercase tracking-widest mb-5">{t.tours}</h4>
          <ul className="flex flex-col gap-3">
            {passeiosLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Explorar */}
        <div>
          <h4 className="text-white text-sm font-semibold uppercase tracking-widest mb-5">{t.explore}</h4>
          <ul className="flex flex-col gap-3">
            {explorarLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contactos */}
        <div>
          <h4 className="text-white text-sm font-semibold uppercase tracking-widest mb-5">{t.contact}</h4>
          <ul className="flex flex-col gap-3 text-sm">
            <li>
              <a href="https://wa.me/351910706688" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                +351 910 706 688
              </a>
            </li>
            <li>
              <a href="mailto:elrafatravelcrm@gmail.com" className="hover:text-white transition-colors">
                elrafatravelcrm@gmail.com
              </a>
            </li>
            <li className="text-gray-500">Lisboa, Portugal</li>
          </ul>

          <div className="mt-6">
            <h4 className="text-white text-sm font-semibold uppercase tracking-widest mb-4">{t.findUs}</h4>
            <ul className="flex flex-col gap-2">
              {externalLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-white transition-colors flex items-center gap-2"
                  >
                    {link.icon}
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} Tukrafa. {t.allRights}</p>
          <div className="flex items-center gap-4">
            <Link href="/privacidade" className="hover:text-gray-400 transition-colors">{t.privacy}</Link>
            <Link href="/termos" className="hover:text-gray-400 transition-colors">{t.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
