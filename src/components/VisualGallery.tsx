'use client';

import { motion } from 'framer-motion';

const images = [
  {
    src: '/galeria/casa_exterior.png',
    title: 'Arquitectura Metalcon',
    desc: 'Estructura metálica de alta eficiencia con acabados contemporáneos.',
    tag: 'Exterior'
  },
  {
    src: '/galeria/interior.png',
    title: 'Espacios Inteligentes',
    desc: 'Diseño interior optimizado para el confort y la funcionalidad.',
    tag: 'Interior'
  },
  {
    src: '/galeria/masterplan.png',
    title: 'Condominio Planificado',
    desc: 'Distribución estratégica de módulos con áreas comunes de calidad.',
    tag: 'Proyecto'
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function VisualGallery() {
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.75rem',
          }}
        >
          {images.map((img, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="card"
              style={{ cursor: 'pointer' }}
            >
              {/* Image wrapper — SOLO la imagen escala, no el contenedor */}
              <div className="card-img-wrapper" style={{ height: '280px' }}>
                <img src={img.src} alt={img.title} />
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
