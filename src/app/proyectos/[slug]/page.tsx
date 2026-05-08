import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Masterplan from '@/components/Masterplan';
import ContactForm from '@/components/ContactForm';

interface Props {
  params: { slug: string };
}

async function getProjectData(slug: string) {
  const projects: Record<string, any> = {
    'rozas-1030': {
      title: 'Condominio Rozas 1030',
      location: 'Martínez de Rozas 1030, Concepción',
      description: 'Exclusivo condominio de 6 módulos habitacionales en el corazón de Concepción. Una propuesta urbana que combina la rapidez del Metalcon con un diseño interior de alto nivel.',
      features: [
        '6 Unidades Exclusivas',
        'Estacionamiento para Discapacitados',
        'Acceso Peatonal Controlado',
        'Excelente Conectividad',
      ],
    },
  };
  return projects[slug] || null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getProjectData(params.slug);
  if (!data) return { title: 'Proyecto no encontrado | Rozas 1030' };
  return {
    title: `${data.title} | Proyectos en Ejecución`,
    description: data.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const data = await getProjectData(params.slug);

  if (!data) {
    return (
      <main>
        <Navbar />
        <div className="container" style={{ padding: '12rem 0', textAlign: 'center' }}>
          <h1 className="section-heading">Proyecto no encontrado</h1>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Navbar />
      
      {/* Project Hero Mini */}
      <section style={{ paddingTop: '10rem', paddingBottom: '4rem', background: 'var(--background-card)' }}>
        <div className="container">
          <span className="section-label">Proyecto en Ejecución</span>
          <h1 className="section-heading" style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>{data.title}</h1>
          <div className="divider-gold" />
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '4rem', marginTop: '2rem' }}>
            <p style={{ fontSize: '1.125rem', lineHeight: 1.8, color: 'var(--foreground-muted)' }}>
              {data.description}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.25rem' }}>📍</span>
                <span style={{ fontWeight: 600 }}>{data.location}</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {data.features.map((f: string) => (
                  <span key={f} style={{ fontSize: '0.8125rem', background: 'var(--background)', padding: '0.4rem 0.8rem', borderRadius: '4px', border: '1px solid var(--border)' }}>
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Masterplan stays here as it's project-specific */}
      <Masterplan />

      {/* Location Map Placeholder */}
      <section className="section">
        <div className="container">
          <div className="card" style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9', position: 'relative', overflow: 'hidden' }}>
            <div style={{ textAlign: 'center', zIndex: 1 }}>
              <span style={{ fontSize: '3rem' }}>🗺️</span>
              <h3 style={{ fontFamily: 'var(--font-heading)', marginTop: '1rem' }}>Ubicación Estratégica</h3>
              <p style={{ color: 'var(--foreground-muted)' }}>Cercano a universidades, servicios y centro de Concepción.</p>
            </div>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.1, background: 'url("https://www.google.com/maps/vt/pb=!1m4!1m3!1i14!2i4683!3i9575!2m3!1e0!2sm!3i633045811!3m8!2ses-419!3scl!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!1e0!23i4111425") center/cover' }} />
          </div>
        </div>
      </section>

      {/* Contact Project Specific */}
      <section id="contacto" className="section-alt">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label">Cotización Directa</span>
            <h2 className="section-heading">Solicita Información de este Proyecto</h2>
            <div className="divider-gold" style={{ margin: '1.5rem auto' }} />
          </div>
          <div className="card" style={{ padding: '3rem', boxShadow: 'var(--shadow-xl)' }}>
            <ContactForm source="Rozas 1030" />
          </div>
        </div>
      </section>

      <footer style={{ background: 'var(--foreground)', padding: '3rem 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'white', fontWeight: 700 }}>Rozas 1030</span>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>© 2026 Inmobiliaria LAYEL</span>
        </div>
      </footer>
    </main>
  );
}
