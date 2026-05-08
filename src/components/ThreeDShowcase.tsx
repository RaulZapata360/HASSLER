'use client';

import dynamic from 'next/dynamic';
import { Suspense, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const ModelViewer = dynamic(() => import('@/components/ModelViewer'), { ssr: false });

const models = [
  { 
    id: 'A', 
    name: 'Módulo A', 
    size: '24,44 m²', 
    price: '800 UF', 
    features: ['Acceso Oriente', '1 Dormitorio', 'Baño en Suite', 'Concepto Abierto'],
    slug: 'modulo-a',
    modelUrl: '/models/house.glb' 
  },
  { 
    id: 'B', 
    name: 'Módulo B', 
    size: '24,91 m²', 
    price: '820 UF', 
    features: ['Espejo Tipo A', 'Ventilación Cruzada', 'Alta Luminosidad', 'Estructura Metalcon'],
    slug: 'modulo-b',
    modelUrl: '/models/house.glb' 
  },
  { 
    id: 'C', 
    name: 'Módulo C', 
    size: '24,91 m² + Terraza 6,79 m²', 
    price: '900 UF', 
    features: ['Terraza Techada', 'Quincho Incorporado', 'Máxima Superficie', 'Acabados Premium'],
    slug: 'modulo-c',
    modelUrl: '/models/house.glb' 
  },
];

export default function ThreeDShowcase() {
  const [activeModel, setActiveModel] = useState(models[0]);

  return (
    <section id="modulos" className="section-alt">
      <div className="container">
        <div style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
          <span className="section-label">3 Modelos, Una Misma Calidad</span>
          <h2 className="section-heading">Catálogo de Módulos</h2>
          <div className="divider-gold" style={{ margin: '1.5rem auto' }} />
          <p className="section-subheading" style={{ margin: '0 auto', maxWidth: '700px' }}>
            Cada módulo comparte la estructura Metalcon y el acabado premium. 
            La diferencia está en la orientación y los beneficios exclusivos de cada una. 
            <strong> Selecciona un módulo para explorar su formato 3D.</strong>
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
                <div style={{ marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '0.5rem' }}>
                        Seleccionado
                      </span>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 800, margin: 0, color: 'var(--foreground)', lineHeight: 1.1 }}>
                        {activeModel.name}
                      </h3>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--foreground-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>
                        Valor Desde
                      </div>
                      <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent)', lineHeight: 1.1 }}>
                        {activeModel.price}
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                    <div style={{ background: 'var(--background-secondary)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
                      <div style={{ fontSize: '0.6875rem', color: 'var(--foreground-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', fontWeight: 600 }}>Superficie</div>
                      <div style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--foreground)' }}>{activeModel.size}</div>
                    </div>
                    <div style={{ background: 'var(--background-secondary)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
                      <div style={{ fontSize: '0.6875rem', color: 'var(--foreground-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', fontWeight: 600 }}>Estructura</div>
                      <div style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--foreground)' }}>Metalcon Premium</div>
                    </div>
                  </div>

                  <div style={{ marginBottom: '2.5rem' }}>
                    <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--foreground)', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Características Principales</h4>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      {activeModel.features.map((feat) => (
                        <li key={feat} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--foreground-muted)', lineHeight: 1.4 }}>
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', marginTop: '0.4rem', flexShrink: 0 }} />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Selectors: Floorplan Thumbnails */}
                <div style={{ marginBottom: '2rem' }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--foreground-subtle)', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.05em' }}>
                    Cambiar Módulo:
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
                  <Link href={`/proyectos/${activeModel.slug}`} className="btn-accent" style={{ textAlign: 'center', width: '100%', padding: '1rem' }}>
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
