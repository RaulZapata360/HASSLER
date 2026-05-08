import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export default async function LeadsPage() {
  const { data: leads, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return <div>Error cargando mensajes: {error.message}</div>;
  }

  return (
    <div>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 700 }}>Mensajes y Prospectos</h1>
        <p style={{ color: 'var(--foreground-muted)' }}>Gestión de contactos recibidos a través de los formularios.</p>
      </div>

      <div className="card" style={{ padding: '0', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '1rem 1.5rem', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--foreground-muted)' }}>Fecha</th>
              <th style={{ padding: '1rem 1.5rem', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--foreground-muted)' }}>Nombre</th>
              <th style={{ padding: '1rem 1.5rem', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--foreground-muted)' }}>Contacto</th>
              <th style={{ padding: '1rem 1.5rem', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--foreground-muted)' }}>Mensaje</th>
              <th style={{ padding: '1rem 1.5rem', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--foreground-muted)' }}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {leads && leads.length > 0 ? (
              leads.map((lead) => (
                <tr key={lead.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '1.25rem 1.5rem', fontSize: '0.875rem', whiteSpace: 'nowrap' }}>
                    {new Date(lead.created_at).toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td style={{ padding: '1.25rem 1.5rem', fontSize: '0.875rem', fontWeight: 600 }}>{lead.name}</td>
                  <td style={{ padding: '1.25rem 1.5rem', fontSize: '0.875rem' }}>
                    <div style={{ fontWeight: 500 }}>{lead.email}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--foreground-muted)' }}>{lead.phone}</div>
                  </td>
                  <td style={{ padding: '1.25rem 1.5rem', fontSize: '0.875rem', color: 'var(--foreground-muted)', maxWidth: '300px' }}>
                    <div style={{ whiteSpace: 'pre-wrap', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                      {lead.message}
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem 1.5rem' }}>
                    <span className={`badge`} style={{ 
                      background: lead.status === 'nuevo' ? 'var(--accent-bg)' : '#f1f5f9',
                      color: lead.status === 'nuevo' ? 'var(--accent)' : 'var(--foreground-muted)'
                    }}>
                      {lead.status === 'nuevo' ? 'Nuevo' : lead.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ padding: '4rem', textAlign: 'center', color: 'var(--foreground-muted)' }}>
                  Aún no hay mensajes registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
