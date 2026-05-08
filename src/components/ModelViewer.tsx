'use client';

import { useEffect, useRef, useState } from 'react';

interface ModelViewerProps {
  src: string;
  poster?: string;
  alt?: string;
  orientation?: string;
}

export default function ModelViewer({ src, poster, alt, orientation }: ModelViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const modelRef = useRef<any>(null);

  useEffect(() => {
    // Dynamically import the model-viewer library only on the client
    import('@google/model-viewer');
    
    const modelViewer = modelRef.current;
    if (modelViewer) {
      const handleLoad = () => setIsLoading(false);
      modelViewer.addEventListener('load', handleLoad);
      return () => modelViewer.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      height: '100%', 
      minHeight: '400px',
      background: 'rgba(255,255,255,0.02)',
      borderRadius: '1.5rem',
      overflow: 'hidden'
    }}>
      {isLoading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
          background: 'var(--background)'
        }}>
          <div className="text-gradient" style={{ fontWeight: 600 }}>Cargando Experiencia 3D...</div>
        </div>
      )}
      
      {/* @ts-ignore */}
      <model-viewer
        ref={modelRef}
        src={src}
        poster={poster}
        alt={alt || "Modelo 3D de Vivienda Metalcon"}
        auto-rotate
        camera-controls
        shadow-intensity="1"
        environment-image="neutral"
        exposure="1"
        orientation={orientation || "0 0 0"}
        loading="lazy"
        style={{
          width: '100%',
          height: '100%',
          outline: 'none'
        }}
      >
        <div slot="progress-bar" style={{ display: 'none' }}></div>
      {/* @ts-ignore */}
      </model-viewer>
    </div>
  );
}
