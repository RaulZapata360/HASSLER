'use client';

import dynamic from 'next/dynamic';
import { Suspense, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const ModelViewer = dynamic(() => import('@/components/ModelViewer'), { ssr: false });

const models = [
  { 
    id: 'A', 
    name: 'Tipo A', 
    size: '24,44 m²', 
    price: '$42.000.000', 
    features: ['Acceso Oriente', '1 Dormitorio', 'Baño en Suite', 'Concepto Abierto'],
    slug: 'tipo-a',
    modelUrl: '/models/house.glb' 
  },
  { 
    id: 'B', 
    name: 'Tipo B', 
    size: '24,91 m²', 
    price: '$45.000.000', 
    features: ['Espejo Tipo A', 'Ventilación Cruzada', 'Alta Luminosidad', 'Estructura Metalcon'],
    slug: 'tipo-b',
    modelUrl: '/models/house.glb' 
  },
  { 
    id: 'C', 
    name: 'Tipo C', 
    size: '24,91 m² + 6,78 m²', 
    price: '$52.000.000', 
    features: ['Terraza Techada', 'Quincho Incorporado', 'Máxima Superficie', 'Acabados Premium'],
    slug: 'tipo-c',
    modelUrl: '/models/house.glb' 
  },
];

export default function ThreeDShowcase() {
  const [activeModel, setActiveModel] = useState(models[0]);

  return (
    <section id="tipologias" className="section-alt">
      <div className="container">
        <div style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
          <span className="section-label">3 Modelos, Una Misma Calidad</span>
          <h2 className="section-heading">Catálogo de Tipologías</h2>
          <div className="divider-gold" style={{ margin: '1.5rem auto' }} />
          <p className="section-subheading" style={{ margin: '0 auto', maxWidth: '700px' }}>
            Cada tipología comparte la estructura Metalcon y el acabado premium. 
            La diferencia está en la orientación y los beneficios exclusivos de cada una. 
            <strong> Selecciona una planta para explorar su modelo 3D.</strong>
          </p>
        </div>

        <div className="grid-showcase">
          
          {/* Left: 3D Viewer Container */}
          <div
            className="card"
            style={{
              padding: '0',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-xl)',
              position: 'relative',
              background: 'var(--background-card)',
              border: '1px solid var(--border)',
            }}
          >
            {/* Viewer Hint */}
            <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', zIndex: 10, display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--foreground-subtle)', fontSize: '0.75rem', background: 'var(--glass-nav-bg)', padding: '0.4rem 0.8rem', borderRadius: '4px', backdropFilter: 'blur(4px)' }}>
              <span>🖱️ Arrastra para rotar · Scroll para Zoom</span>
            </div>

            <Suspense fallback={
              <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                Cargando visor 3D...
              </div>
            }>
              <ModelViewer
                key={activeModel.id}
                src={activeModel.modelUrl}
                alt={`Módulo ${activeModel.name}`}
                orientation="90deg 0 0"
              />
            </Suspense>
          </div>

          {/* Right: Details & Selectors Interface */}
          <div className="card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', boxShadow: 'var(--shadow-lg)', background: 'var(--background-card)' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModel.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        Seleccionado
                      </span>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.25rem', fontWeight: 700, marginTop: '0.25rem' }}>
                        {activeModel.name}
                      </h3>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--foreground)' }}>{activeModel.price}</div>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--foreground-muted)' }}>Entrega 2026</div>
                    </div>
                  </div>
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                    <div style={{ background: 'var(--background)', padding: '1rem', borderRadius: '8px' }}>
                      <div style={{ fontSize: '0.625rem', color: 'var(--foreground-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Superficie</div>
                      <div style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{activeModel.size}</div>
                    </div>
                    <div style={{ background: 'var(--background)', padding: '1rem', borderRadius: '8px' }}>
                      <div style={{ fontSize: '0.625rem', color: 'var(--foreground-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Estructura</div>
                      <div style={{ fontWeight: 600, fontSize: '0.9375rem' }}>Metalcon</div>
                    </div>
                  </div>

                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                    {activeModel.features.map((feat) => (
                      <li key={feat} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', fontSize: '0.875rem', color: 'var(--foreground-muted)' }}>
                        <span style={{ color: 'var(--accent)' }}>✦</span> {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Selectors: Floorplan Thumbnails */}
                <div style={{ marginBottom: '2rem' }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--foreground-subtle)', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.05em' }}>
                    Cambiar Tipología:
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                    {models.map((mod) => (
                      <button
                        key={mod.id}
                        onClick={() => setActiveModel(mod)}
                        style={{
                          padding: '0',
                          background: 'var(--background-card)',
                          border: activeModel.id === mod.id ? '2px solid var(--accent)' : '1px solid var(--border)',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          transform: activeModel.id === mod.id ? 'scale(1.05)' : 'scale(1)',
                          boxShadow: activeModel.id === mod.id ? 'var(--shadow-md)' : 'none',
                        }}
                      >
                        <div style={{ height: '60px', background: 'var(--background-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px' }}>
                          <img 
                            src={`/galeria/plano_tipo_${mod.id.toLowerCase()}.jpg`} 
                            alt={mod.name} 
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                          />
                        </div>
                        <div style={{ fontSize: '0.625rem', fontWeight: 700, padding: '0.4rem 0', color: activeModel.id === mod.id ? 'var(--accent)' : 'var(--foreground-muted)' }}>
                          {mod.name}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <Link href={`/tipologias/${activeModel.slug}`} className="btn-accent" style={{ textAlign: 'center', width: '100%', padding: '1rem' }}>
                    Ver Ficha y Planos →
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
