'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Link from 'next/link';

const ModelViewer = dynamic(() => import('@/components/ModelViewer'), { ssr: false });

export default function ThreeDShowcase() {
  return (
    <section id="tipologias" className="section">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="section-label">Experiencia 3D</span>
            <h2 className="section-heading">Explora tu Futuro Hogar</h2>
            <div className="divider-gold" />
          </div>
          <p style={{ color: 'var(--foreground-muted)', maxWidth: '300px', fontSize: '0.9375rem', textAlign: 'right' }}>
            Rota, acerca y explora cada ángulo de la vivienda antes de visitar la obra.
          </p>
        </div>

        {/* 3D Viewer */}
        <div
          className="card"
          style={{
            height: '580px',
            padding: '0',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-xl)',
            position: 'relative',
          }}
        >
          {/* Hint overlay */}
          <div
            style={{
              position: 'absolute',
              bottom: '1.5rem',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(8px)',
              padding: '0.5rem 1.25rem',
              borderRadius: '999px',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-sm)',
              pointerEvents: 'none',
            }}
          >
            <span style={{ fontSize: '1rem' }}>🖱️</span>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'var(--foreground-muted)', fontWeight: 500 }}>
              Arrastra para rotar · Pellizca para zoom
            </span>
          </div>

          <Suspense
            fallback={
              <div
                style={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: '1rem',
                  background: 'var(--background-secondary)',
                }}
              >
                <div style={{ fontFamily: 'var(--font-heading)', color: 'var(--accent)', fontSize: '1.125rem' }}>
                  Cargando modelo 3D...
                </div>
                <div style={{ width: '40px', height: '2px', background: 'var(--accent)', borderRadius: '1px', animation: 'none' }} />
              </div>
            }
          >
            <ModelViewer
              src="/models/house.glb"
              alt="Módulo Metalcon — Condominio Rozas 1030"
              orientation="90deg 0 0"
            />
          </Suspense>
        </div>

        {/* CTA strip */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '2.5rem',
            padding: '1.5rem 2rem',
            background: 'var(--background-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-sm)',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.25rem' }}>
              Módulo Tipo B · 24.91 m²
            </h4>
            <p style={{ color: 'var(--foreground-muted)', fontSize: '0.875rem', fontFamily: 'var(--font-sans)' }}>
              Estructura Metalcon · Entrega Inmediata · Concepción
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/tipologias/tipo-b" className="btn-outline">
              Ver Ficha Técnica
            </Link>
            <Link href="/tipologias/tipo-c" className="btn-outline">
              Ver Tipo C
            </Link>
            <Link href="#contacto" className="btn-accent">
              Cotizar →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
