'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    // Simple way to logout: overwrite cookie with past date via a temp API or just client-side if not httpOnly
    // But since it's httpOnly, let's just use a simple redirect to an API route that clears it
    window.location.href = '/api/admin/logout';
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', minHeight: '100vh', background: '#f8fafc' }}>
      {/* Sidebar */}
      <aside style={{ background: 'white', borderRight: '1px solid var(--border)', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>HASSLER</div>
          <div style={{ fontSize: '0.625rem', color: 'var(--foreground-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Admin Control</div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          <Link 
            href="/admin/dashboard" 
            style={{ 
              display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.875rem 1rem', borderRadius: '8px',
              textDecoration: 'none', color: pathname === '/admin/dashboard' ? 'var(--accent)' : 'var(--foreground-muted)',
              background: pathname === '/admin/dashboard' ? 'var(--accent-bg)' : 'transparent',
              fontWeight: pathname === '/admin/dashboard' ? 600 : 400,
              fontSize: '0.9375rem'
            }}
          >
            <span>📩</span> Mensajes / Leads
          </Link>
          <Link 
            href="/admin/dashboard/inventory" 
            style={{ 
              display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.875rem 1rem', borderRadius: '8px',
              textDecoration: 'none', color: pathname === '/admin/dashboard/inventory' ? 'var(--accent)' : 'var(--foreground-muted)',
              background: pathname === '/admin/dashboard/inventory' ? 'var(--accent-bg)' : 'transparent',
              fontWeight: pathname === '/admin/dashboard/inventory' ? 600 : 400,
              fontSize: '0.9375rem'
            }}
          >
            <span>🏠</span> Gestión Inventario
          </Link>
        </nav>

        <button 
          onClick={handleLogout}
          style={{ 
            marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.875rem 1rem', borderRadius: '8px',
            border: 'none', background: 'transparent', color: '#ef4444', cursor: 'pointer', fontSize: '0.9375rem', textAlign: 'left'
          }}
        >
          <span>🚪</span> Cerrar Sesión
        </button>
      </aside>

      {/* Main Content */}
      <main style={{ padding: '2.5rem' }}>
        {children}
      </main>
    </div>
  );
}
