'use client';

import { useState } from 'react';
import { submitLead } from '@/app/actions';

interface ContactFormProps {
  source?: string;
  defaultInterest?: string;
}

export default function ContactForm({ source = 'General', defaultInterest = '' }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const formData = new FormData(e.currentTarget);
    formData.append('source', source);

    const result = await submitLead(formData);

    if (result.success) {
      setStatus('success');
      (e.target as HTMLFormElement).reset();
    } else {
      setStatus('error');
      setErrorMsg(result.error || 'Hubo un error');
    }
  };

  if (status === 'success') {
    return (
      <div style={{ textAlign: 'center', padding: '3rem 2rem', background: 'var(--background)', borderRadius: 'var(--radius-lg)' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✓</div>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Mensaje Enviado</h3>
        <p style={{ color: 'var(--foreground-muted)' }}>Un ejecutivo se contactará contigo en breve.</p>
        <button onClick={() => setStatus('idle')} className="btn-outline" style={{ marginTop: '1.5rem' }}>Enviar otro mensaje</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div className="form-group">
          <label className="form-label" htmlFor="nombre">Nombre</label>
          <input name="nombre" id="nombre" type="text" required className="form-input" placeholder="Juan Pérez" disabled={status === 'loading'} />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="telefono">Teléfono</label>
          <input name="telefono" id="telefono" type="tel" className="form-input" placeholder="+56 9 XXXX XXXX" disabled={status === 'loading'} />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="email">Correo Electrónico</label>
        <input name="email" id="email" type="email" required className="form-input" placeholder="correo@ejemplo.com" disabled={status === 'loading'} />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="interes">Módulo de Interés</label>
        <select name="interes" id="interes" className="form-select" defaultValue={defaultInterest} disabled={status === 'loading'}>
          <option value="">Selecciona un módulo...</option>
          {source === 'Rozas 1030' ? (
            <>
              <option value="modulo-01">Módulo 01 (Tipo C)</option>
              <option value="modulo-02">Módulo 02 (Tipo A)</option>
              <option value="modulo-03">Módulo 03 (Tipo A)</option>
            </>
          ) : (
            <>
              <option value="modulo-01-A">Módulo 01 — Tipo A · Disponible</option>
              <option value="modulo-03-C">Módulo 03 — Tipo C · Disponible (con Quincho)</option>
              <option value="modulo-04-A">Módulo 04 — Tipo A · Disponible</option>
            </>
          )}
          <option value="general">Consulta General</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="mensaje">Mensaje (Opcional)</label>
        <textarea name="mensaje" id="mensaje" className="form-textarea" placeholder="¿Tienes alguna pregunta específica?" style={{ resize: 'vertical', minHeight: '100px' }} disabled={status === 'loading'} />
      </div>

      {status === 'error' && (
        <div style={{ color: 'var(--accent)', fontSize: '0.875rem' }}>{errorMsg}</div>
      )}

      <button type="submit" disabled={status === 'loading'} className="btn-accent" style={{ width: '100%', padding: '1rem', fontSize: '1rem', opacity: status === 'loading' ? 0.7 : 1 }}>
        {status === 'loading' ? 'Enviando...' : 'Agendar Visita →'}
      </button>
      <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--foreground-subtle)', fontFamily: 'var(--font-sans)' }}>
        Respuesta garantizada en menos de 24 horas hábiles.
      </p>
    </form>
  );
}
