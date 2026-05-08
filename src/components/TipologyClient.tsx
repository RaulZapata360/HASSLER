'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Suspense } from 'react';

const ModelViewer = dynamic(() => import('@/components/ModelViewer'), { ssr: false });

interface Props {
  data: {
    name: string;
    size: string;
    price: string;
    description: string;
    modelUrl: string;
    slug: string;
    specs: { label: string; value: string }[];
    floorplan: string;
  };
}

export default function TipologyClient({ data }: Props) {
  return (
    <main>
      {/* Sticky CTA Bar */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid var(--border)',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.06)',
          padding: '1rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.125rem', fontWeight: 700 }}>{data.name}</div>
          <div style={{ fontFamily: 'var(--font-sans)', color: 'var(--foreground-muted)', fontSize: '0.875rem' }}>
            {data.size} · {data.price}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link href="/#calculadora" className="btn-outline" style={{ padding: '0.75rem 1.5rem' }}>
            Simular Dividendo
          </Link>
          <Link href="/#contacto" className="btn-accent" style={{ padding: '0.75rem 1.5rem' }}>
            Cotizar Ahora →
          </Link>
        </div>
      </div>

      {/* Header */}
      <div style={{ background: 'var(--background-secondary)', padding: '7rem 0 4rem', borderBottom: '1px solid var(--border)', marginTop: '0' }}>
        <div className="container">
          <Link
            href="/"
            style={{ fontFamily: 'var(--font-sans)', color: 'var(--accent)', textDecoration: 'none', fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '0.375rem', marginBottom: '2rem' }}
          >
            ← Volver al Portal
          </Link>
          <span className="section-label">Tipología</span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '0.75rem' }}>
            {data.name}
          </h1>
          <div className="divider-gold" />
          <p style={{ color: 'var(--foreground-muted)', fontSize: '1.0625rem', maxWidth: '560px', lineHeight: 1.75 }}>
            {data.description}
          </p>
        </div>
      </div>

      {/* 3D + Details Grid */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
            {/* 3D Viewer */}
            <div className="card" style={{ height: '460px', padding: 0, overflow: 'hidden', boxShadow: 'var(--shadow-xl)', position: 'relative' }}>
              <div style={{
                position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%)',
                zIndex: 10, background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)',
                padding: '0.4rem 1rem', borderRadius: '999px', border: '1px solid var(--border)',
                fontSize: '0.7rem', fontFamily: 'var(--font-sans)', color: 'var(--foreground-muted)', pointerEvents: 'none',
              }}>
                🖱️ Arrastra para rotar
              </div>
              <Suspense fallback={<div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--background-secondary)', color: 'var(--accent)', fontFamily: 'var(--font-heading)' }}>Cargando modelo 3D...</div>}>
                <ModelViewer src={data.modelUrl} alt={data.name} orientation="90deg 0 0" />
              </Suspense>
            </div>

            {/* Specs */}
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                {data.specs.map((spec) => (
                  <div key={spec.label} className="card" style={{ padding: '1.25rem 1.5rem', boxShadow: 'var(--shadow-sm)' }}>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', color: 'var(--foreground-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.375rem', fontWeight: 500 }}>{spec.label}</p>
                    <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--foreground)' }}>{spec.value}</p>
                  </div>
                ))}
              </div>
              <div className="card" style={{ padding: '1.75rem', boxShadow: 'var(--shadow-sm)', background: 'var(--accent-bg)', border: '1px solid rgba(183,148,85,0.15)' }}>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.125rem', color: 'var(--accent-dark)', marginBottom: '0.75rem' }}>¿Por qué Metalcon?</h4>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingLeft: '1.25rem' }}>
                  {[
                    'Construcción hasta 40% más rápida',
                    'Alta resistencia sísmica (NCh 433)',
                    'Sin humedad ni plagas',
                    'Mejor eficiencia energética'
                  ].map((item) => (
                    <li key={item} style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--foreground-muted)', lineHeight: 1.65 }}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floorplan Section */}
      <section style={{ padding: '5rem 0', background: 'var(--background-secondary)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label">Planta Arquitectónica</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.25rem', fontWeight: 700 }}>Distribución del Espacio</h2>
            <div className="divider-gold" style={{ margin: '1.25rem auto' }} />
          </div>
          <div className="card" style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', boxShadow: 'var(--shadow-xl)' }}>
            <img
              src={data.floorplan}
              alt={`Plano 2D ${data.name}`}
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 'var(--radius-md)' }}
            />
          </div>
        </div>
      </section>

      {/* Padding for sticky bar */}
      <div style={{ height: '80px' }} />
    </main>
  );
}
