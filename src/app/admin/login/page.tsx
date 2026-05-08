'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.success) {
        router.push('/admin/dashboard');
        router.refresh();
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--background)' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '3rem', boxShadow: 'var(--shadow-2xl)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>LAYEL</div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'var(--foreground-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Panel de Administración</div>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="form-group">
            <label className="form-label">Contraseña de Acceso</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoFocus
            />
          </div>

          {error && (
            <div style={{ color: 'var(--accent)', fontSize: '0.875rem', textAlign: 'center' }}>{error}</div>
          )}

          <button type="submit" disabled={loading} className="btn-accent" style={{ width: '100%', padding: '1rem' }}>
            {loading ? 'Verificando...' : 'Entrar al Dashboard →'}
          </button>
        </form>

        <p style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.75rem', color: 'var(--foreground-subtle)' }}>
          Si olvidaste tu contraseña, búscala en tu archivo local <code>.env.local</code>.
        </p>
      </div>
    </main>
  );
}
