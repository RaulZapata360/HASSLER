'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const navLinks = [
  { href: '#tipologias', label: 'Tipologías' },
  { href: '#masterplan', label: 'Masterplan' },
  { href: '#galeria', label: 'Galería' },
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
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img src="/galeria/LOGO-Photoroom.png" alt="LAYEL Inmobiliaria" style={{ height: '80px', width: 'auto', borderRadius: '4px' }} />
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--foreground)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              LAYEL
            </span>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.625rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.25em', fontWeight: 600 }}>
              Inmobiliaria
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
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

        {/* CTA (Desktop) */}
        <Link href="#contacto" className="btn-accent desktop-nav" style={{ padding: '0.625rem 1.5rem', fontSize: '0.875rem' }}>
          Cotizar Ahora
        </Link>

        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-nav-toggle" 
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--foreground)' }}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: 'hidden', background: 'var(--background-card)', borderBottom: '1px solid var(--border)' }}
            className="mobile-nav-dropdown"
          >
            <div style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: 'var(--foreground)',
                    textDecoration: 'none',
                    padding: '0.5rem 0',
                    borderBottom: '1px solid var(--border-subtle)',
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <Link 
                href="#contacto" 
                onClick={() => setMenuOpen(false)}
                className="btn-accent" 
                style={{ textAlign: 'center', marginTop: '0.5rem' }}
              >
                Cotizar Ahora
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
