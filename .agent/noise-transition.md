# Skill: Noise Transition - Transición de Textura con Ruido Procedural y WebGL

## Descripción

Esta skill implementa una transición de textura con ruido procedural usando WebGL. El efecto incluye dos componentes:
1. **Transición de textura en modelo 3D**: La textura cambia verticalmente con un efecto de ruido en la unión
2. **Ruido radial procedural**: Un anillo de ruido pulsante emana del centro en el background

## Implementación (React + React Three Fiber)

### Estructura del Proyecto

```
proyecto/
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── components/
│   │   ├── Scene.jsx
│   │   ├── CanModel.jsx
│   │   └── RadialNoise.jsx
│   └── shaders/
│       ├── noise.frag
│       └── texture.vert
├── public/
└── package.json
```

### Instalación

```bash
npm install
npm run dev
```

### Dependencias

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.88.0",
    "three": "^0.158.0",
    "gsap": "^3.12.0"
  }
}
```

### Shaders

#### Vertex Shader (Básico)

```glsl
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
```

#### Fragment Shader (Transición con Ruido)

```glsl
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform float uProgress;
uniform float uNoiseScale;
varying vec2 vUv;

// Función de ruido simple
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
    vec2 uv = vUv;
    
    // Crear borde de ruido en la transición
    float noiseValue = noise(uv * uNoiseScale);
    float border = smoothstep(uProgress - 0.1, uProgress + 0.1, uv.y + noiseValue * 0.2);
    
    // Mezclar texturas
    vec4 tex1 = texture2D(uTexture1, uv);
    vec4 tex2 = texture2D(uTexture2, uv);
    
    vec4 finalColor = mix(tex1, tex2, border);
    
    gl_FragColor = finalColor;
}
```

#### Fragment Shader (Ruido Radial)

```glsl
uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
varying vec2 vUv;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
    vec2 center = vec2(0.5, 0.5);
    float dist = distance(vUv, center);
    
    // Anillo pulsante
    float ring = smoothstep(0.3, 0.5, dist) * smoothstep(0.7, 0.5, dist);
    float pulse = sin(uTime * 2.0) * 0.5 + 0.5;
    
    // Ruido procedural
    float n = noise(vUv * 10.0 + uTime * 0.5);
    
    // Combinar
    float alpha = ring * (0.5 + pulse * 0.5) * n;
    vec3 color = mix(uColor1, uColor2, n);
    
    gl_FragColor = vec4(color, alpha);
}
```

### Componente React (CanModel.jsx)

```jsx
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

export function CanModel({ textures, progress }) {
    const meshRef = useRef();
    const materialRef = useRef();
    
    const shaderMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                uTexture1: { value: textures[0] },
                uTexture2: { value: textures[1] },
                uProgress: { value: 0 },
                uNoiseScale: { value: 5.0 }
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D uTexture1;
                uniform sampler2D uTexture2;
                uniform float uProgress;
                uniform float uNoiseScale;
                varying vec2 vUv;
                
                float random(vec2 st) {
                    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
                }
                
                float noise(vec2 st) {
                    vec2 i = floor(st);
                    vec2 f = fract(st);
                    float a = random(i);
                    float b = random(i + vec2(1.0, 0.0));
                    float c = random(i + vec2(0.0, 1.0));
                    float d = random(i + vec2(1.0, 1.0));
                    vec2 u = f * f * (3.0 - 2.0 * f);
                    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
                }
                
                void main() {
                    vec2 uv = vUv;
                    float noiseValue = noise(uv * uNoiseScale);
                    float border = smoothstep(uProgress - 0.1, uProgress + 0.1, uv.y + noiseValue * 0.2);
                    vec4 tex1 = texture2D(uTexture1, uv);
                    vec4 tex2 = texture2D(uTexture2, uv);
                    gl_FragColor = mix(tex1, tex2, border);
                }
            `
        });
    }, []);
    
    useFrame(() => {
        if (materialRef.current) {
            materialRef.current.uniforms.uProgress.value = progress;
        }
    });
    
    return (
        <mesh ref={meshRef}>
            <cylinderGeometry args={[1, 1, 2, 32]} />
            <primitive object={shaderMaterial} ref={materialRef} attach="material" />
        </mesh>
    );
}
```

### Componente RadialNoise (Background)

```jsx
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function RadialNoise() {
    const materialRef = useRef();
    
    const shaderMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uColor1: { value: new THREE.Color('#1a1a2e') },
                uColor2: { value: new THREE.Color('#16213e') }
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float uTime;
                uniform vec3 uColor1;
                uniform vec3 uColor2;
                varying vec2 vUv;
                
                float random(vec2 st) {
                    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
                }
                
                float noise(vec2 st) {
                    vec2 i = floor(st);
                    vec2 f = fract(st);
                    float a = random(i);
                    float b = random(i + vec2(1.0, 0.0));
                    float c = random(i + vec2(0.0, 1.0));
                    float d = random(i + vec2(1.0, 1.0));
                    vec2 u = f * f * (3.0 - 2.0 * f);
                    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
                }
                
                void main() {
                    vec2 center = vec2(0.5, 0.5);
                    float dist = distance(vUv, center);
                    float ring = smoothstep(0.3, 0.5, dist) * smoothstep(0.7, 0.5, dist);
                    float pulse = sin(uTime * 2.0) * 0.5 + 0.5;
                    float n = noise(vUv * 10.0 + uTime * 0.5);
                    float alpha = ring * (0.5 + pulse * 0.5) * n;
                    vec3 color = mix(uColor1, uColor2, n);
                    gl_FragColor = vec4(color, alpha);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide
        });
    }, []);
    
    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
        }
    });
    
    return (
        <mesh>
            <planeGeometry args={[10, 10]} />
            <primitive object={shaderMaterial} ref={materialRef} attach="material" />
        </mesh>
    );
}
```

### App Principal

```jsx
import { Canvas } from '@react-three/fiber';
import { useState, useEffect } from 'react';
import { CanModel } from './components/CanModel';
import { RadialNoise } from './components/RadialNoise';
import { useTexture } from '@react-three/drei';

export default function App() {
    const [progress, setProgress] = useState(0);
    const textures = useTexture([
        '/textures/can1.jpg',
        '/textures/can2.jpg'
    ]);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(p => (p + 0.01) % 1);
        }, 50);
        return () => clearInterval(interval);
    }, []);
    
    return (
        <Canvas camera={{ position: [0, 0, 5] }}>
            <RadialNoise />
            <CanModel textures={textures} progress={progress} />
        </Canvas>
    );
}
```

## Personalización

### Ajustar Escala del Ruido
Modificar `uNoiseScale` - valores más altos = más ruido

### Velocidad de Transición
Cambiar el intervalo en el useEffect

### Colores del Ruido Radial
Modificar `uColor1` y `uColor2` en el shader

## Dependencias del Proyecto

```bash
npm install react react-dom @react-three/fiber @react-three/drei three gsap
```

## Notas

- Requiere WebGL para funcionar
- Usar texturas del mismo tamaño
- Compatible con modelos 3D personalizados
- El ruido radial es optativo como background