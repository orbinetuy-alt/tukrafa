'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navLinks = [
  { hash: 'passeios', label: 'Passeios' },
  { hash: 'reviews', label: 'Reviews' },
  { hash: 'sobre', label: 'Sobre Nós' },
  { hash: 'contactos', label: 'Contactos' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  const linkHref = (hash: string) => (isHome ? `#${hash}` : `/#${hash}`);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
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

        {/* Language selector */}
        <div className="hidden md:flex items-center gap-1.5">
          <button className="bg-brand-green text-white text-xs font-bold px-3 py-1.5 rounded-full">
            PT
          </button>
          <button className="text-gray-500 hover:text-gray-800 text-xs font-medium px-2 py-1.5 rounded-full hover:bg-gray-100 transition-colors">
            EN
          </button>
          <button className="text-gray-500 hover:text-gray-800 text-xs font-medium px-2 py-1.5 rounded-full hover:bg-gray-100 transition-colors">
            ES
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
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
        <div className="md:hidden border-t border-gray-100 bg-white px-6 py-5 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.hash}
              href={linkHref(link.hash)}
              className="text-gray-700 hover:text-brand-green text-sm font-medium py-1 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
            <button className="bg-brand-green text-white text-xs font-bold px-3 py-1.5 rounded-full">PT</button>
            <button className="text-gray-500 text-xs font-medium px-2 py-1.5">EN</button>
            <button className="text-gray-500 text-xs font-medium px-2 py-1.5">ES</button>
          </div>
        </div>
      )}
    </header>
  );
}
