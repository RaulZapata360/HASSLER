'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

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

const statusConfig = {
  disponible: { color: '#15803D', bg: '#F0FDF4', label: 'Disponible', fill: '#bbf7d0', stroke: '#15803D' },
  reservado:  { color: '#D97706', bg: '#FFFBEB', label: 'Reservado',  fill: '#fde68a', stroke: '#D97706' },
  vendido:    { color: '#DC2626', bg: '#FEF2F2', label: 'Vendido',    fill: '#fecaca', stroke: '#DC2626' },
};

const typeColor = { A: '#6B7280', B: '#1E3A5F', C: '#7C4D14' };

export default function Masterplan() {
  const [modules, setModules] = useState<Module[]>([]);
  const [hoveredModule, setHoveredModule] = useState<Module | null>(null);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [loading, setLoading] = useState(true);
  
  const active = selectedModule || hoveredModule;

  useEffect(() => {
    const fetchModules = async () => {
      // Base static data that doesn't change
      const baseData: Array<{ name: string; type: 'A' | 'B' | 'C'; image: string; size: string; slug: string }> = [
        { name: 'Módulo 01', type: 'C', image: '/galeria/modulos/modulo_1.png', size: '24,91 m² + 6,78 m²', slug: 'modulo-01' },
        { name: 'Módulo 02', type: 'A', image: '/galeria/modulos/modulo_2.png', size: '24,44 m²', slug: 'modulo-02' },
        { name: 'Módulo 03', type: 'A', image: '/galeria/modulos/modulo_3.png', size: '24,44 m²', slug: 'modulo-03' },
        { name: 'Módulo 04', type: 'A', image: '/galeria/modulos/modulo_4.png', size: '24,44 m²', slug: 'modulo-04' },
        { name: 'Módulo 05', type: 'A', image: '/galeria/modulos/modulo_5.png', size: '24,44 m²', slug: 'modulo-05' },
        { name: 'Módulo 06', type: 'B', image: '/galeria/modulos/modulo_6.png', size: '24,91 m²', slug: 'modulo-06' },
      ];

      try {
        const { data: dbModules, error } = await supabase
          .from('modules')
          .select('slug, status');

        if (error || !dbModules || dbModules.length === 0) {
          // Fallback to static if DB is empty or error
          setModules(baseData.map((b, i) => ({ ...b, id: String(i+1), status: 'disponible' as ModuleStatus })));
        } else {
          // Merge DB status into base static data
          const merged = baseData.map((b, i) => {
            const dbMod = dbModules.find(m => m.slug === b.slug);
            return {
              ...b,
              id: String(i+1),
              status: (dbMod?.status || 'disponible') as ModuleStatus
            };
          });
          setModules(merged);
        }
      } catch (err) {
        setModules(baseData.map((b, i) => ({ ...b, id: String(i+1), status: 'disponible' as ModuleStatus })));
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, []);

  const counts = {
    disponible: modules.filter((m) => m.status === 'disponible').length,
    reservado:  modules.filter((m) => m.status === 'reservado').length,
    vendido:    modules.filter((m) => m.status === 'vendido').length,
  };

  const WALL_X = 30;
  const WALL_W = 8;
  const MOD_X = WALL_X + WALL_W;
  const MOD_W = 280;
  const PASILLO_X = MOD_X + MOD_W + 8;
  const PASILLO_W = 60;
  const MOD_H = 88;
  const MOD_GAP = 8;
  const START_Y = 110;

  if (loading) return (
    <section className="section-alt">
      <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
        <p style={{ color: 'var(--foreground-muted)' }}>Sincronizando disponibilidad...</p>
      </div>
    </section>
  );

  return (
    <section id="masterplan" className="section-alt">
      <div className="container">
        <div style={{ marginBottom: '3.5rem' }}>
          <span className="section-label">Disponibilidad en Tiempo Real</span>
          <h2 className="section-heading">Masterplan Interactivo</h2>
          <div className="divider-gold" />
          <p className="section-subheading">
            Terreno lineal con pasillo peatonal en la orilla derecha. Haz clic en un módulo para ver su información.
          </p>
        </div>

        <div className="grid-masterplan">

          <div className="card" style={{ padding: '2rem', boxShadow: 'var(--shadow-lg)', overflow: 'visible' }}>
            <svg viewBox="0 0 420 700" style={{ width: '100%', height: 'auto' }} aria-label="Masterplan del Condominio Rozas 1030">
              <rect x="20" y="10" width="380" height="680" rx="10" fill="var(--background-card)" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="4 3" />
              <text x="210" y="700" textAnchor="middle" fill="var(--foreground-muted)" fontSize="9" fontFamily="'Outfit', sans-serif" letterSpacing="1">MARTÍNEZ DE ROZAS 1030 — VÍA PÚBLICA</text>
              <text x="210" y="30" textAnchor="middle" fill="var(--foreground-subtle)" fontSize="10" fontFamily="'Outfit', sans-serif" fontWeight="600" letterSpacing="0.5">▼ INGRESO AL CONDOMINIO</text>

              <rect x={WALL_X} y="45" width={WALL_W} height="625" fill="var(--foreground-subtle)" opacity="0.4" />
              <text x={WALL_X - 10} y={45 + 625 / 2} textAnchor="middle" fill="var(--foreground-subtle)" fontSize="8" fontFamily="'Outfit', sans-serif" transform={`rotate(-90, ${WALL_X - 10}, ${45 + 625 / 2})`}>MURO DE ALBAÑILERÍA</text>

              <rect x={PASILLO_X} y="45" width={PASILLO_W} height="625" rx="6" fill="var(--background)" opacity="0.7" />
              <text x={PASILLO_X + PASILLO_W / 2} y={45 + 625 / 2} textAnchor="middle" fill="var(--foreground-subtle)" fontSize="9" fontFamily="'Outfit', sans-serif" transform={`rotate(-90, ${PASILLO_X + PASILLO_W / 2}, ${45 + 625 / 2})`}>PASILLO PEATONAL</text>

              <rect x={MOD_X} y="50" width={MOD_W} height="50" rx="8" fill="rgba(59, 130, 246, 0.15)" stroke="#3B82F6" strokeWidth="1.5" />
              <text x={MOD_X + MOD_W / 2} y="72" textAnchor="middle" fill="#60A5FA" fontSize="11" fontFamily="'Outfit', sans-serif" fontWeight="600">♿ Estacionamiento</text>
              <text x={MOD_X + MOD_W / 2} y="89" textAnchor="middle" fill="#93C5FD" fontSize="9" fontFamily="'Outfit', sans-serif">Personas con Discapacidad</text>

              {modules.map((mod, i) => {
                const cfg = statusConfig[mod.status];
                const y = START_Y + i * (MOD_H + MOD_GAP);
                const isActive = active?.id === mod.id;

                return (
                  <g key={mod.id}>
                    <motion.rect
                      x={MOD_X} y={y} width={MOD_W} height={MOD_H} rx="8"
                      fill={cfg.fill} stroke={cfg.stroke} strokeWidth={isActive ? 2.5 : 1.5}
                      style={{ cursor: mod.status === 'vendido' ? 'default' : 'pointer' }}
                      animate={{ opacity: isActive ? 1 : 0.85 }}
                      onHoverStart={() => setHoveredModule(mod)}
                      onHoverEnd={() => setHoveredModule(null)}
                      onClick={() => setSelectedModule(selectedModule?.id === mod.id ? null : mod)}
                    />
                    <rect x={MOD_X + 8} y={y + 8} width={36} height={20} rx="4" fill={typeColor[mod.type as 'A'|'B'|'C']} />
                    <text x={MOD_X + 26} y={y + 23} textAnchor="middle" fill="white" fontSize="10" fontWeight="700" fontFamily="'Outfit', sans-serif">{mod.type}</text>
                    <text x={MOD_X + 52} y={y + 22} fill={cfg.color} fontSize="13" fontWeight="700" fontFamily="'Playfair Display', serif">{mod.name}</text>
                    <text x={MOD_X + 52} y={y + 38} fill={cfg.color} fontSize="9" fontFamily="'Outfit', sans-serif">{mod.size}</text>
                    <text x={MOD_X + MOD_W - 10} y={y + 22} textAnchor="end" fill={cfg.color} fontSize="9" fontWeight="600" fontFamily="'Outfit', sans-serif">● {cfg.label}</text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div style={{ position: 'sticky', top: '5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="card" style={{ padding: '1.75rem', boxShadow: 'var(--shadow-md)' }}>
              <h4 style={{ fontSize: '0.8125rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--foreground-muted)', marginBottom: '1.25rem' }}>Disponibilidad</h4>
              {(Object.keys(statusConfig) as ModuleStatus[]).map((status) => (
                <div key={status} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.875rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: statusConfig[status].color }} />
                    <span style={{ fontSize: '0.875rem' }}>{statusConfig[status].label}</span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, color: statusConfig[status].color }}>{counts[status]}</span>
                </div>
              ))}
            </div>

            <div className="card" style={{ padding: '0', boxShadow: 'var(--shadow-lg)', minHeight: '300px', overflow: 'hidden' }}>
              {active ? (
                <motion.div key={active.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div style={{ height: '160px', overflow: 'hidden' }}>
                    <img src={active.image} alt={active.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                      <div>
                        <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700 }}>{active.name}</h4>
                        <p style={{ color: 'var(--foreground-muted)', fontSize: '0.875rem' }}>Tipo {active.type} · {active.size}</p>
                      </div>
                      <span className={`badge badge-${active.status}`}>{statusConfig[active.status].label}</span>
                    </div>
                    {active.status === 'disponible' ? (
                      <a href={`/tipologias/tipo-${active.type.toLowerCase()}`} className="btn-accent" style={{ width: '100%', textAlign: 'center', padding: '0.75rem', display: 'block' }}>Ver Plano y Cotizar →</a>
                    ) : (
                      <a href="#contacto" className="btn-outline" style={{ width: '100%', textAlign: 'center', padding: '0.75rem', display: 'block' }}>Consultar Estado</a>
                    )}
                  </div>
                </motion.div>
              ) : (
                <div style={{ height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2.5rem', textAlign: 'center' }}>
                  <p style={{ color: 'var(--foreground-subtle)', fontSize: '0.9rem' }}>Selecciona un módulo para ver detalles.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
