import { Metadata } from 'next';
import TipologyClient from '@/components/TipologyClient';

interface Props {
  params: { slug: string };
}

async function getModuleData(slug: string) {
  const modules: Record<string, any> = {
    'tipo-a': {
      name: 'Módulo Tipo A',
      slug: 'tipo-a',
      size: '24,44 m²',
      price: '$42.000.000',
      description: 'Planta compacta y funcional. Dormitorio, cocina, baño completo y área de estar independiente. Acceso orientado al oriente.',
      modelUrl: '/models/house.glb',
      floorplan: '/galeria/plano_tipo_a.jpg',
      specs: [
        { label: 'Superficie Útil', value: '24,44 m²' },
        { label: 'Dormitorios', value: '1 Dormitorio' },
        { label: 'Precio Desde', value: '$42.000.000' },
        { label: 'Estado', value: 'Disponible' },
        { label: 'Tecnología', value: 'Metalcon' },
        { label: 'Entrega', value: 'Inmediata' },
      ],
    },
    'tipo-b': {
      name: 'Módulo Tipo B',
      slug: 'tipo-b',
      size: '24,91 m²',
      price: '$45.000.000',
      description: 'Espejo del Tipo A con acceso reorientado. Misma eficiencia de espacio, cocina equipada, baño completo y dormitorio amplio.',
      modelUrl: '/models/house.glb',
      floorplan: '/galeria/plano_tipo_b.jpg',
      specs: [
        { label: 'Superficie Útil', value: '24,91 m²' },
        { label: 'Dormitorios', value: '1 Dormitorio' },
        { label: 'Precio Desde', value: '$45.000.000' },
        { label: 'Estado', value: 'Disponible' },
        { label: 'Tecnología', value: 'Metalcon' },
        { label: 'Entrega', value: 'Inmediata' },
      ],
    },
    'tipo-c': {
      name: 'Módulo Tipo C',
      slug: 'tipo-c',
      size: '24,91 m² + 6,78 m²',
      price: '$52.000.000',
      description: 'El módulo con mayor valor agregado. Incluye terraza privada de 6,78 m² y quincho propio, ideal para quienes disfrutan al aire libre.',
      modelUrl: '/models/house.glb',
      floorplan: '/galeria/plano_tipo_c.jpg',
      specs: [
        { label: 'Superficie Útil', value: '24,91 m²' },
        { label: 'Terraza Privada', value: '6,78 m²' },
        { label: 'Precio Desde', value: '$52.000.000' },
        { label: 'Estado', value: 'Disponible' },
        { label: 'Tecnología', value: 'Metalcon' },
        { label: 'Quincho', value: 'Incluido' },
      ],
    },
  };
  return modules[slug] || null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getModuleData(params.slug);
  if (!data) return { title: 'Módulo no encontrado | Rozas 1030' };
  return {
    title: `${data.name} — ${data.size} | Condominio Rozas 1030`,
    description: `${data.description} Precio desde ${data.price}. Concepción, Región del Biobío.`,
    openGraph: {
      title: `${data.name} | Condominio Rozas 1030`,
      description: data.description,
      images: [{ url: data.floorplan }],
    },
  };
}

export default async function TipologyPage({ params }: Props) {
  const data = await getModuleData(params.slug);
  if (!data) {
    return (
      <div className="container" style={{ padding: '12rem 0', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--foreground)' }}>Módulo no encontrado</h1>
      </div>
    );
  }
  return <TipologyClient data={data} />;
}
