'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const navLinks = [
  { href: '#tipologias', label: 'Tipologías' },
  { href: '#masterplan', label: 'Masterplan' },
  { href: '#galeria', label: 'Galería' },
  { href: '#calculadora', label: 'Calculadora' },
  { href: '#contacto', label: 'Contacto' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.4s ease',
        background: scrolled ? 'var(--glass-nav-bg)' : 'transparent',
        backdropFilter: scrolled ? `blur(var(--glass-nav-blur))` : 'none',
        WebkitBackdropFilter: scrolled ? `blur(var(--glass-nav-blur))` : 'none',
        borderBottom: scrolled ? `1px solid var(--glass-nav-border)` : '1px solid transparent',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.125rem', fontWeight: 700, color: 'var(--foreground)', letterSpacing: '-0.02em' }}>
            Rozas 1030
          </span>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.625rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>
            Constructora Hashler
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'var(--foreground-muted)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                letterSpacing: '0.02em',
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = 'var(--foreground)')}
              onMouseOut={(e) => (e.currentTarget.style.color = 'var(--foreground-muted)')}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <Link href="#contacto" className="btn-accent" style={{ padding: '0.625rem 1.5rem', fontSize: '0.875rem' }}>
          Cotizar Ahora
        </Link>
      </div>
    </header>
  );
}
