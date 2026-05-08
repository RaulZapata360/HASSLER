import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ThreeDShowcase from '@/components/ThreeDShowcase';
import VisualGallery from '@/components/VisualGallery';
import ContactForm from '@/components/ContactForm';


export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />

      {/* Features Strip */}
      <section style={{ padding: '5rem 0', background: 'var(--background-card)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0', position: 'relative' }}>
            {[
              { value: '3', label: 'Tipologías Únicas' },
              { value: 'Metalcon', label: 'Tecnología' },
              { value: '100%', label: 'Antisísmico' },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  padding: '2.5rem 3rem',
                  borderRight: '1px solid var(--border)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent)' }}>{stat.value}</div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: 'var(--foreground)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ThreeDShowcase />

      {/* Proyectos Section */}
      <section id="proyectos" className="section">
        <div className="container">
          <div className="grid-responsive-2">
            <div className="card-img-wrapper" style={{ height: '500px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-2xl)' }}>
              <img src="/galeria/rozas_1030_render.png" alt="Rozas 1030 Exterior" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <span className="section-label">Nuestros Proyectos</span>
              <h2 className="section-heading" style={{ fontSize: '3rem' }}>Condominio<br />Rozas 1030</h2>
              <div className="divider-gold" />
              <p style={{ color: 'var(--foreground-muted)', fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                Descubre nuestro primer desarrollo en el centro de Concepción. Un condominio exclusivo diseñado bajo los más altos estándares de eficiencia y modernidad.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '3rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {['6 Unidades Habitacionales', 'Ubicación Estratégica', 'Entrega 2026'].map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 500 }}>
                    <span style={{ color: 'var(--accent)' }}>✔</span> {item}
                  </li>
                ))}
              </ul>
              <a href="/proyectos/rozas-1030" className="btn-accent" style={{ padding: '1.25rem 2.5rem', fontSize: '1rem', textDecoration: 'none', display: 'inline-block' }}>
                Explorar Proyecto y Masterplan →
              </a>
            </div>
          </div>
        </div>
      </section>

      <VisualGallery />

      {/* Contact Section */}
      <section id="contacto" className="section">
        <div className="container">
          <div className="grid-responsive-2">
            {/* Left copy */}
            <div>
              <span className="section-label">Conversemos</span>
              <h2 className="section-heading">Inicia tu Inversión</h2>
              <div className="divider-gold" />
              <p style={{ color: 'var(--foreground-muted)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                Completa el formulario y un ejecutivo de HASSLER te contactará en menos de 24 horas para agendar tu visita a la obra o resolver cualquier consulta.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { icon: '📍', text: 'Martínez de Rozas 1030, Concepción' },
                  { icon: '📞', text: 'Contáctanos para más información' },
                  { icon: '✉️', text: 'hashler@constructora.cl' },
                ].map((item) => (
                  <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                    <span style={{ fontSize: '1.125rem' }}>{item.icon}</span>
                    <span style={{ fontFamily: 'var(--font-sans)', color: 'var(--foreground-muted)', fontSize: '0.9375rem' }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="card" style={{ padding: '2.5rem', boxShadow: 'var(--shadow-xl)' }}>
              <ContactForm source="Home Page" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: 'var(--foreground)', padding: '3rem 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.25rem', textTransform: 'uppercase' }}>
              HASSLER
            </div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              Constructora
            </div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8125rem', fontFamily: 'var(--font-sans)' }}>
            © 2026 Constructora Hashler · Concepción, Región del Biobío
          </p>
        </div>
      </footer>
    </main>
  );
}
