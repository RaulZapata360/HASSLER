'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

type ModuleStatus = 'disponible' | 'reservado' | 'vendido';

interface Module {
  id: string;
  name: string;
  type: 'A' | 'B' | 'C';
  status: ModuleStatus;
  image: string;
  size: string;
  slug: string;
}

// Orden real en terreno: Ingreso → (Estac. Discap.) → C → A → A → A → A → B
const modulesData: Module[] = [
  { id: '1', name: 'Módulo 01', type: 'C', status: 'disponible', image: '/galeria/modulos/modulo_1.png', size: '24,91 m² + 6,78 m²', slug: 'tipo-c' },
  { id: '2', name: 'Módulo 02', type: 'A', status: 'disponible', image: '/galeria/modulos/modulo_2.png', size: '24,44 m²', slug: 'tipo-a' },
  { id: '3', name: 'Módulo 03', type: 'A', status: 'disponible', image: '/galeria/modulos/modulo_3.png', size: '24,44 m²', slug: 'tipo-a' },
  { id: '4', name: 'Módulo 04', type: 'A', status: 'reservado',  image: '/galeria/modulos/modulo_4.png', size: '24,44 m²', slug: 'tipo-a' },
  { id: '5', name: 'Módulo 05', type: 'A', status: 'vendido',    image: '/galeria/modulos/modulo_5.png', size: '24,44 m²', slug: 'tipo-a' },
  { id: '6', name: 'Módulo 06', type: 'B', status: 'vendido',    image: '/galeria/modulos/modulo_6.png', size: '24,91 m²', slug: 'tipo-b' },
];

const statusConfig = {
  disponible: { color: '#15803D', bg: '#F0FDF4', label: 'Disponible', fill: '#bbf7d0', stroke: '#15803D' },
  reservado:  { color: '#D97706', bg: '#FFFBEB', label: 'Reservado',  fill: '#fde68a', stroke: '#D97706' },
  vendido:    { color: '#DC2626', bg: '#FEF2F2', label: 'Vendido',    fill: '#fecaca', stroke: '#DC2626' },
};

const counts = {
  disponible: modulesData.filter((m) => m.status === 'disponible').length,
  reservado:  modulesData.filter((m) => m.status === 'reservado').length,
  vendido:    modulesData.filter((m) => m.status === 'vendido').length,
};

const typeColor = { A: '#6B7280', B: '#1E3A5F', C: '#7C4D14' };

export default function Masterplan() {
  const [hoveredModule, setHoveredModule] = useState<Module | null>(null);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const active = selectedModule || hoveredModule;

  // SVG layout: vertical strip. Each module is stacked top-to-bottom.
  // ViewBox: 480 wide × 680 tall
  // Left zone: pasillo (50px wide) + modules (260px wide). Right zone: info strip reserved for SVG labels.
  // Entrance at top. Parking at top-left. Then modules C → A → A → A → A → B downward.

  const WALL_X = 30;
  const WALL_W = 8;
  const MOD_X = WALL_X + WALL_W;
  const MOD_W = 280;
  const PASILLO_X = MOD_X + MOD_W + 8;
  const PASILLO_W = 60;
  const MOD_H = 88;
  const MOD_GAP = 8;
  const START_Y = 110; // after parking block

  return (
    <section id="masterplan" className="section-alt">
      <div className="container">
        <div style={{ marginBottom: '3.5rem' }}>
          <span className="section-label">Disponibilidad en Tiempo Real</span>
          <h2 className="section-heading">Masterplan Interactivo</h2>
          <div className="divider-gold" />
          <p className="section-subheading">
            Terreno lineal con pasillo peatonal en la orilla larga. Haz clic en un módulo para ver su información.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '3rem', alignItems: 'start' }}>

          {/* SVG Masterplan — vertical linear layout */}
          <div className="card" style={{ padding: '2rem', boxShadow: 'var(--shadow-lg)', overflow: 'visible' }}>
            <svg viewBox="0 0 420 700" style={{ width: '100%', height: 'auto' }} aria-label="Masterplan del Condominio Rozas 1030">

              {/* Terrain outline */}
              <rect x="20" y="10" width="380" height="680" rx="10"
                fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="4 3" />

              {/* Street label */}
              <text x="210" y="700" textAnchor="middle" fill="#94A3B8" fontSize="9"
                fontFamily="'Outfit', sans-serif" letterSpacing="1" textDecoration="none">
                MARTÍNEZ DE ROZAS 1030 — VÍA PÚBLICA
              </text>

              {/* Ingreso arrow */}
              <text x="210" y="30" textAnchor="middle" fill="#64748B" fontSize="10"
                fontFamily="'Outfit', sans-serif" fontWeight="600" letterSpacing="0.5">
                ▼  INGRESO AL CONDOMINIO
              </text>

              {/* Muro de albañilería (Izquierda) */}
              <rect x={WALL_X} y="45" width={WALL_W} height="625" fill="#94A3B8" opacity="0.4" />
              <text
                x={WALL_X - 10}
                y={45 + 625 / 2}
                textAnchor="middle"
                fill="#94A3B8"
                fontSize="8"
                fontFamily="'Outfit', sans-serif"
                letterSpacing="1"
                transform={`rotate(-90, ${WALL_X - 10}, ${45 + 625 / 2})`}
              >
                MURO DE ALBAÑILERÍA
              </text>

              {/* Pasillo peatonal (Derecha) */}
              <rect x={PASILLO_X} y="45" width={PASILLO_W} height="625" rx="6"
                fill="#E2E8F0" opacity="0.7" />
              <text
                x={PASILLO_X + PASILLO_W / 2}
                y={45 + 625 / 2}
                textAnchor="middle"
                fill="#94A3B8"
                fontSize="9"
                fontFamily="'Outfit', sans-serif"
                letterSpacing="2"
                transform={`rotate(-90, ${PASILLO_X + PASILLO_W / 2}, ${45 + 625 / 2})`}
              >
                PASILLO PEATONAL
              </text>

              {/* Parking discapacitados */}
              <rect x={MOD_X} y="50" width={MOD_W} height="50" rx="8"
                fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1.5" />
              <text x={MOD_X + MOD_W / 2} y="72" textAnchor="middle"
                fill="#3B82F6" fontSize="11" fontFamily="'Outfit', sans-serif" fontWeight="600">
                ♿  Estacionamiento
              </text>
              <text x={MOD_X + MOD_W / 2} y="89" textAnchor="middle"
                fill="#93C5FD" fontSize="9" fontFamily="'Outfit', sans-serif">
                Personas con Discapacidad
              </text>

              {/* Modules */}
              {modulesData.map((mod, i) => {
                const cfg = statusConfig[mod.status];
                const y = START_Y + i * (MOD_H + MOD_GAP);
                const isActive = active?.id === mod.id;

                return (
                  <g key={mod.id}>
                    <motion.rect
                      x={MOD_X}
                      y={y}
                      width={MOD_W}
                      height={MOD_H}
                      rx="8"
                      fill={cfg.fill}
                      stroke={cfg.stroke}
                      strokeWidth={isActive ? 2.5 : 1.5}
                      style={{
                        cursor: mod.status === 'vendido' ? 'default' : 'pointer',
                        filter: isActive ? `drop-shadow(0 4px 10px ${cfg.stroke}50)` : 'none',
                      }}
                      animate={{ opacity: isActive ? 1 : 0.85 }}
                      whileHover={{ opacity: 1 }}
                      onHoverStart={() => setHoveredModule(mod)}
                      onHoverEnd={() => setHoveredModule(null)}
                      onClick={() => setSelectedModule(selectedModule?.id === mod.id ? null : mod)}
                    />

                    {/* Type badge */}
                    <rect x={MOD_X + 8} y={y + 8} width={36} height={20} rx="4"
                      fill={typeColor[mod.type]} style={{ pointerEvents: 'none' }} />
                    <text x={MOD_X + 26} y={y + 23} textAnchor="middle"
                      fill="white" fontSize="10" fontWeight="700"
                      fontFamily="'Outfit', sans-serif" style={{ pointerEvents: 'none' }}>
                      {mod.type}
                    </text>

                    {/* Module name */}
                    <text x={MOD_X + 52} y={y + 22} fill={cfg.color}
                      fontSize="13" fontWeight="700"
                      fontFamily="'Playfair Display', serif" style={{ pointerEvents: 'none' }}>
                      {mod.name}
                    </text>

                    {/* Size */}
                    <text x={MOD_X + 52} y={y + 38} fill={cfg.color}
                      fontSize="9" fontFamily="'Outfit', sans-serif" style={{ pointerEvents: 'none' }}>
                      {mod.size}
                    </text>

                    {/* Status label */}
                    <text x={MOD_X + MOD_W - 10} y={y + 22} textAnchor="end"
                      fill={cfg.color} fontSize="9" fontWeight="600"
                      fontFamily="'Outfit', sans-serif" textDecoration="none"
                      style={{ pointerEvents: 'none' }}>
                      ● {cfg.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Info Panel */}
          <div style={{ position: 'sticky', top: '5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Legend */}
            <div className="card" style={{ padding: '1.75rem', boxShadow: 'var(--shadow-md)' }}>
              <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--foreground-muted)', marginBottom: '1.25rem' }}>
                Disponibilidad
              </h4>
              {(Object.keys(statusConfig) as ModuleStatus[]).map((status) => (
                <div key={status} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.875rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: statusConfig[status].color }} />
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--foreground)' }}>{statusConfig[status].label}</span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, color: statusConfig[status].color }}>
                    {counts[status]}
                  </span>
                </div>
              ))}
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', marginTop: '0.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {(['A', 'B', 'C'] as const).map((t) => (
                  <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    <div style={{ width: '14px', height: '14px', borderRadius: '3px', background: typeColor[t] }} />
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'var(--foreground-muted)' }}>Tipo {t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Detail Panel */}
            <div className="card" style={{ padding: '0', boxShadow: 'var(--shadow-lg)', minHeight: '300px', overflow: 'hidden' }}>
              {active ? (
                <motion.div key={active.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
                  <div style={{ height: '160px', overflow: 'hidden' }}>
                    <img src={active.image} alt={active.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                      <div>
                        <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700 }}>{active.name}</h4>
                        <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--foreground-muted)', fontSize: '0.875rem' }}>
                          Tipo {active.type} · {active.size}
                        </p>
                      </div>
                      <span className={`badge badge-${active.status}`}>{statusConfig[active.status].label}</span>
                    </div>
                    {active.type === 'C' && (
                      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'var(--accent-dark)', background: 'var(--accent-bg)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', marginBottom: '0.75rem' }}>
                        ☀️ Incluye Quincho + Terraza Privada 6,78 m²
                      </p>
                    )}
                    {active.status === 'disponible' ? (
                      <a href={`/tipologias/${active.slug}`} className="btn-accent" style={{ width: '100%', textAlign: 'center', padding: '0.75rem', fontSize: '0.875rem', display: 'block', boxSizing: 'border-box' }}>
                        Ver Plano y Cotizar →
                      </a>
                    ) : (
                      <a href="#contacto" className="btn-outline" style={{ width: '100%', textAlign: 'center', padding: '0.75rem', fontSize: '0.875rem', display: 'block', boxSizing: 'border-box' }}>
                        {active.status === 'reservado' ? 'Lista de espera' : 'Módulo vendido'}
                      </a>
                    )}
                  </div>
                </motion.div>
              ) : (
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2.5rem', textAlign: 'center', minHeight: '300px' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🏠</div>
                  <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--foreground-subtle)', fontSize: '0.9rem', lineHeight: 1.65 }}>
                    Selecciona un módulo<br />en el plano para ver<br />información detallada.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
