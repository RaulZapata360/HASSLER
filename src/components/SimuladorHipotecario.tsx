'use client';

import { useState } from 'react';

const TASA_ANUAL_DEFAULT = 4.8; // % UF anual típico Chile

function calcularDividendo(precio: number, pie: number, tasaAnual: number, plazoAnios: number): number {
  const monto = precio - pie;
  const tasaMensual = tasaAnual / 100 / 12;
  const n = plazoAnios * 12;
  if (tasaMensual === 0) return monto / n;
  return (monto * tasaMensual * Math.pow(1 + tasaMensual, n)) / (Math.pow(1 + tasaMensual, n) - 1);
}

export default function SimuladorHipotecario({ precioBase = 45000000 }: { precioBase?: number }) {
  const [precio, setPrecio] = useState(precioBase);
  const [pie, setPie] = useState(Math.round(precioBase * 0.2));
  const [plazo, setPlazo] = useState(20);
  const [tasa, setTasa] = useState(TASA_ANUAL_DEFAULT);

  const dividendo = calcularDividendo(precio, pie, tasa, plazo);
  const porcentajePie = Math.round((pie / precio) * 100);
  const financiado = precio - pie;

  const fmt = (n: number) =>
    new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(n);

  return (
    <section id="calculadora" className="section-alt">
      <div className="container">
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ marginBottom: '3.5rem' }}>
            <span className="section-label">Herramienta Financiera</span>
            <h2 className="section-heading">Simulador de Dividendo</h2>
            <div className="divider-gold" />
            <p className="section-subheading">
              Estima tu cuota mensual de forma transparente. Ajusta el pie y el plazo para encontrar la opción ideal.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 340px',
              gap: '3rem',
              alignItems: 'start',
            }}
          >
            {/* Controls */}
            <div
              className="card"
              style={{ padding: '2.5rem', boxShadow: 'var(--shadow-lg)' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* Precio */}
                <div className="form-group">
                  <label className="form-label">Precio del Módulo</label>
                  <select
                    className="form-select"
                    value={precio}
                    onChange={(e) => {
                      const p = Number(e.target.value);
                      setPrecio(p);
                      setPie(Math.round(p * 0.2));
                    }}
                  >
                    <option value={45000000}>Tipo B — $45.000.000</option>
                    <option value={58000000}>Tipo C — $58.000.000</option>
                  </select>
                </div>

                {/* Pie */}
                <div className="form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <label className="form-label">Pie (Enganche)</label>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.125rem', color: 'var(--accent)', fontWeight: 600 }}>
                      {porcentajePie}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={Math.round(precio * 0.1)}
                    max={Math.round(precio * 0.5)}
                    step={500000}
                    value={pie}
                    onChange={(e) => setPie(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--accent)', cursor: 'pointer' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--foreground-subtle)', fontFamily: 'var(--font-sans)' }}>10%</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--foreground)', fontFamily: 'var(--font-sans)' }}>{fmt(pie)}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--foreground-subtle)', fontFamily: 'var(--font-sans)' }}>50%</span>
                  </div>
                </div>

                {/* Plazo */}
                <div className="form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <label className="form-label">Plazo</label>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.125rem', color: 'var(--accent)', fontWeight: 600 }}>
                      {plazo} años
                    </span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={30}
                    step={5}
                    value={plazo}
                    onChange={(e) => setPlazo(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--accent)', cursor: 'pointer' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem' }}>
                    {[5, 10, 15, 20, 25, 30].map((y) => (
                      <span key={y} style={{ fontSize: '0.75rem', color: plazo === y ? 'var(--accent)' : 'var(--foreground-subtle)', fontFamily: 'var(--font-sans)', fontWeight: plazo === y ? 600 : 400 }}>
                        {y}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tasa */}
                <div className="form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <label className="form-label">Tasa de Interés Anual</label>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.125rem', color: 'var(--accent)', fontWeight: 600 }}>
                      {tasa.toFixed(1)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={10}
                    step={0.1}
                    value={tasa}
                    onChange={(e) => setTasa(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--accent)', cursor: 'pointer' }}
                  />
                  <p style={{ fontSize: '0.75rem', color: 'var(--foreground-subtle)', fontFamily: 'var(--font-sans)', marginTop: '0.25rem' }}>
                    Tasa referencial BancoEstado: ~{TASA_ANUAL_DEFAULT}% anual
                  </p>
                </div>
              </div>
            </div>

            {/* Result Panel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'sticky', top: '5rem' }}>
              {/* Monthly Payment */}
              <div className="card" style={{ padding: '2rem', textAlign: 'center', background: 'var(--foreground)', border: 'none' }}>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>
                  Dividendo Estimado
                </p>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.25rem', color: 'var(--accent-light)', fontWeight: 700, lineHeight: 1.1 }}>
                  {fmt(Math.round(dividendo))}
                </div>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.5rem' }}>
                  por mes
                </p>
              </div>

              {/* Breakdown */}
              <div className="card" style={{ padding: '1.75rem', boxShadow: 'var(--shadow-md)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    { label: 'Precio total', value: fmt(precio) },
                    { label: 'Pie (enganche)', value: fmt(pie) },
                    { label: 'Monto a financiar', value: fmt(financiado) },
                    { label: 'Total cuotas', value: `${plazo * 12} meses` },
                  ].map((item) => (
                    <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: 'var(--foreground-muted)' }}>{item.label}</span>
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 600, color: 'var(--foreground)' }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a href="#contacto" className="btn-accent" style={{ textAlign: 'center', padding: '1rem' }}>
                Solicitar Pre-Aprobación →
              </a>

              <p style={{ fontSize: '0.6875rem', color: 'var(--foreground-subtle)', fontFamily: 'var(--font-sans)', textAlign: 'center', lineHeight: 1.5 }}>
                * Simulación orientativa. Los valores reales dependen de la evaluación crediticia del banco.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
