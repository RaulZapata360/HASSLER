'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

type Module = {
  id: string;
  name: string;
  type: string;
  status: 'disponible' | 'reservado' | 'vendido';
  slug: string;
};

export default function InventoryPage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    const { data, error } = await supabase.from('modules').select('*').order('slug', { ascending: true });
    if (!error) setModules(data as Module[]);
    setLoading(false);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    const res = await fetch('/api/admin/inventory', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: newStatus }),
    });

    if (res.ok) {
      setModules(modules.map(m => m.id === id ? { ...m, status: newStatus as any } : m));
    }
    setUpdatingId(null);
  };

  const seedInventory = async () => {
    if (!confirm('¿Quieres inicializar los 6 módulos base del proyecto?')) return;
    
    setLoading(true);
    const initialModules = [
      { slug: 'modulo-01', name: 'Módulo 01', type: 'C', status: 'disponible', price: 52000000 },
      { slug: 'modulo-02', name: 'Módulo 02', type: 'A', status: 'disponible', price: 42000000 },
      { slug: 'modulo-03', name: 'Módulo 03', type: 'A', status: 'disponible', price: 42000000 },
      { slug: 'modulo-04', name: 'Módulo 04', type: 'A', status: 'disponible', price: 42000000 },
      { slug: 'modulo-05', name: 'Módulo 05', type: 'A', status: 'disponible', price: 42000000 },
      { slug: 'modulo-06', name: 'Módulo 06', type: 'B', status: 'disponible', price: 45000000 },
    ];

    const { error } = await supabase.from('modules').insert(initialModules);
    if (error) alert('Error: ' + error.message);
    else fetchModules();
  };

  if (loading) return <div>Cargando inventario...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 700 }}>Gestión de Inventario</h1>
          <p style={{ color: 'var(--foreground-muted)' }}>Controla la disponibilidad de las unidades en tiempo real.</p>
        </div>
        {modules.length === 0 && (
          <button onClick={seedInventory} className="btn-accent">Inicializar Módulos</button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {modules.map((mod) => (
          <div key={mod.id} className="card" style={{ padding: '1.5rem', boxShadow: 'var(--shadow-md)', opacity: updatingId === mod.id ? 0.6 : 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Tipo {mod.type}
                </span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, marginTop: '0.25rem' }}>{mod.name}</h3>
              </div>
              <div style={{ 
                width: '12px', height: '12px', borderRadius: '50%', 
                background: mod.status === 'disponible' ? '#15803d' : mod.status === 'reservado' ? '#d97706' : '#dc2626'
              }} />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.75rem' }}>Cambiar Estado</label>
              <select 
                className="form-select" 
                value={mod.status} 
                onChange={(e) => handleStatusChange(mod.id, e.target.value)}
                disabled={updatingId === mod.id}
                style={{ fontSize: '0.875rem' }}
              >
                <option value="disponible">Disponible</option>
                <option value="reservado">Reservado</option>
                <option value="vendido">Vendido</option>
              </select>
            </div>
            
            <p style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--foreground-subtle)' }}>
              Identificador: <code>{mod.slug}</code>
            </p>
          </div>
        ))}
      </div>

      {modules.length === 0 && (
        <div style={{ textAlign: 'center', padding: '5rem', background: 'white', borderRadius: '12px', border: '2px dashed var(--border)' }}>
          <p style={{ color: 'var(--foreground-muted)' }}>No hay módulos cargados en la base de datos.</p>
        </div>
      )}
    </div>
  );
}
