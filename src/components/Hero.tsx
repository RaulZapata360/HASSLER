'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '700px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background Image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/galeria/hassler_modular_row_cozy.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      />
      {/* Gradient overlay — responsive readbility */}
      <div className="hero-gradient" style={{ position: 'absolute', inset: 0, zIndex: 1 }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '5rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: '600px' }}
        >
          <motion.span
            className="section-label"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Concepción · Región del Biobío
          </motion.span>

          <h1
            className="hero-title"
            style={{
              fontSize: 'clamp(2.75rem, 6vw, 4.5rem)',
              fontWeight: 800,
              color: 'var(--foreground)',
              marginBottom: '1.5rem',
              lineHeight: 1.05,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
            }}
          >
            LAYEL
            <br />
            <em style={{ fontStyle: 'italic', color: 'var(--accent)', textTransform: 'none', letterSpacing: 'normal' }}>Inmobiliaria</em>
          </h1>

          <div className="divider-gold" />

          <p
            style={{
              fontSize: '1.125rem',
              color: 'var(--foreground-muted)',
              marginBottom: '2.5rem',
              fontWeight: 400,
              lineHeight: 1.75,
              maxWidth: '480px',
            }}
          >
            Viviendas unifamiliares con estructura Metalcon de alta eficiencia.
            Rapidez constructiva, confort térmico y diseño moderno en el corazón de Concepción.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="#masterplan" className="btn-accent">
              Ver Disponibilidad
            </Link>
            <Link href="#tipologias" className="btn-outline">
              Explorar Modelos →
            </Link>
          </div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="stat-group"
            style={{ display: 'flex', gap: '2.5rem', marginTop: '3rem' }}
          >
            {[
              { value: '6', label: 'Módulos Disponibles' },
              { value: 'Metalcon', label: 'Tecnología' },
              { value: '100%', label: 'Antisisímico' },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    color: 'var(--accent)',
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.75rem',
                    color: 'var(--foreground-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginTop: '0.25rem',
                    fontWeight: 500,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '4rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.375rem',
          zIndex: 2,
        }}
      >
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', color: 'var(--foreground-subtle)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
          Desliza
        </span>
        <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, var(--accent), transparent)' }} />
      </motion.div>
    </section>
  );
}
