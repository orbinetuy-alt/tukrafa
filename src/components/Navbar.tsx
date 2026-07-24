'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { locales, useI18n } from '@/lib/i18n';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { locale, messages, setLocale } = useI18n();
  const isHome = pathname === '/';
  const navLinks = [
    { hash: 'passeios', label: messages.nav.tours },
    { hash: 'reviews', label: messages.nav.reviews },
    { hash: 'sobre', label: messages.nav.about },
    { hash: 'contactos', label: messages.nav.contact },
  ];

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const linkHref = (hash: string) => (isHome ? `#${hash}` : `/#${hash}`);

  return (
    <header className="relative isolate bg-white border-b border-gray-100 sticky top-0 z-[100] shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Rafa Travel" width={120} height={48} className="h-12 w-auto object-contain" priority />
          <span className="font-serif text-lg text-brand-dark font-semibold tracking-tight">Rafa Travel</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.hash}
              href={linkHref(link.hash)}
              className="text-gray-700 hover:text-brand-green text-sm font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-1.5" aria-label="Language selector">
          {locales.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setLocale(item)}
              aria-pressed={locale === item}
              className={`touch-control ${locale === item
                ? 'bg-brand-green text-white text-xs font-bold px-3 py-1.5 rounded-full'
                : 'text-gray-500 hover:text-gray-800 text-xs font-medium px-2 py-1.5 rounded-full hover:bg-gray-100 transition-colors'}`}
            >
              {item.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="touch-control md:hidden min-w-11 min-h-11 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label="Abrir menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {menuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div id="mobile-navigation" className="relative z-[110] md:hidden border-t border-gray-100 bg-white px-6 py-5 flex flex-col gap-2 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.hash}
              href={linkHref(link.hash)}
              className="touch-control text-gray-700 hover:text-brand-green text-sm font-medium min-h-11 py-3 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-2 pt-2 border-t border-gray-100" aria-label="Language selector">
            {locales.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setLocale(item);
                  setMenuOpen(false);
                }}
                aria-pressed={locale === item}
                className={`touch-control min-h-11 min-w-11 ${locale === item
                  ? 'bg-brand-green text-white text-xs font-bold px-3 py-1.5 rounded-full'
                  : 'text-gray-500 text-xs font-medium px-3 py-1.5 rounded-full'}`}
              >
                {item.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
