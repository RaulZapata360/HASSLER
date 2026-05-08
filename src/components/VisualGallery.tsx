'use client';

import { motion, Variants } from 'framer-motion';
import { useState } from 'react';

const images = [
  {
    src: '/galeria/modulos/tipo_a.jpg',
    hoverSrc: '/galeria/casa_exterior.png',
    title: 'Módulo A',
    desc: 'Un dormitorio con acceso oriente, diseño compacto y funcional.',
    tag: '24,44 m²'
  },
  {
    src: '/galeria/modulos/tipo_b.jpg',
    hoverSrc: '/galeria/interior.png',
    title: 'Módulo B',
    desc: 'Distribución espejo con alta luminosidad y ventilación cruzada.',
    tag: '24,91 m²'
  },
  {
    src: '/galeria/modulos/tipo_c.jpg',
    hoverSrc: '/galeria/masterplan.png',
    title: 'Módulo C',
    desc: 'Máxima superficie disponible con terraza techada incorporada.',
    tag: '31,69 m²'
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function VisualGallery() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="galeria" className="section">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="section-label">Galería del Proyecto</span>
            <h2 className="section-heading">Visualiza tu Inversión</h2>
            <div className="divider-gold" />
          </div>
          <p style={{ color: 'var(--foreground-muted)', maxWidth: '320px', fontSize: '0.9375rem', textAlign: 'right' }}>
            Renders de alta definición que capturan la calidad constructiva del proyecto.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.75rem',
          }}
        >
          {images.map((img, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="card"
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="card-img-wrapper" style={{ height: '280px', position: 'relative', background: 'var(--background-secondary)' }}>
                {/* Imagen Base: Planta */}
                <img 
                  src={img.src} 
                  alt={img.title} 
                  style={{ 
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain', padding: '1.5rem',
                    opacity: hoveredIndex === index ? 0 : 1,
                    transition: 'opacity 0.4s ease'
                  }} 
                />
                {/* Imagen Hover: Render Final */}
                <img 
                  src={img.hoverSrc} 
                  alt={`${img.title} Render`} 
                  style={{ 
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover',
                    opacity: hoveredIndex === index ? 1 : 0,
                    transition: 'opacity 0.4s ease'
                  }} 
                />
              </div>

              <div style={{ padding: '1.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 600 }}>{img.title}</h3>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      padding: '0.25rem 0.75rem',
                      background: 'var(--accent-bg)',
                      color: 'var(--accent-dark)',
                      borderRadius: '999px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {img.tag}
                  </span>
                </div>
                <p style={{ color: 'var(--foreground-muted)', fontSize: '0.9rem', lineHeight: 1.65 }}>{img.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
