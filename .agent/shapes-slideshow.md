# Skill: ShapesSlideshow - Transiciones con Clip-Path

## Descripción

Esta skill implementa un slideshow experimental que usa `clip-path` para crear transiciones de forma entre slides. Las formas pueden ser círculos, elipses, polígonos o cualquier `basic-shape` de CSS. El efecto crea transiciones visuales únicas donde la imagen nueva "emerge" de una forma geométrica.

## Efectos Disponibles

1. **Pill** - Forma de pastilla/rectángulo redondeado
2. **Blob** - Forma orgánica/irregular
3. **Wave** - Ondas
4. **Ventana** - Formas de ventana

## Implementación

### HTML

```html
<div class="slideshow">
    <div class="slide slide--current">
        <div class="slide__inner" style="background-image: url(img1.jpg)"></div>
    </div>
    <div class="slide">
        <div class="slide__inner" style="background-image: url(img2.jpg)"></div>
    </div>
    <!-- más slides -->
</div>

<nav class="slideshow-nav">
    <button class="slideshow-nav__btn" data-dir="prev">Prev</button>
    <button class="slideshow-nav__btn" data-dir="next">Next</button>
</nav>
```

### CSS

```css
.slideshow {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
}

.slide {
    position: absolute;
    inset: 0;
    opacity: 0;
    visibility: hidden;
}

.slide--current {
    opacity: 1;
    visibility: visible;
}

.slide__inner {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
}

/* Efecto con clip-path */
.slide--current .slide__inner {
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
    transition: clip-path 0.8s cubic-bezier(0.7, 0, 0.3, 1);
}
```

### JavaScript (GSAP)

```javascript
import gsap from 'gsap';

class ShapeSlideshow {
    constructor(element) {
        this.element = element;
        this.slides = [...element.querySelectorAll('.slide')];
        this.current = 0;
        this.isAnimating = false;
        
        // Formas de clip-path
        this.shapes = {
            pill: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            circle: 'circle(50% at 50% 50%)',
            ellipse: 'ellipse(50% 50% at 50% 50%)',
            polygon: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)'
        };
    }
    
    navigate(direction) {
        if (this.isAnimating) return;
        this.isAnimating = true;
        
        const prev = this.current;
        this.current = direction === 1 
            ? (this.current < this.slides.length - 1 ? this.current + 1 : 0)
            : (this.current > 0 ? this.current - 1 : this.slides.length - 1);
            
        this.transition(prev, this.current, direction);
    }
    
    transition(prevIndex, currentIndex, direction) {
        const prevSlide = this.slides[prevIndex];
        const currentSlide = this.slides[currentIndex];
        
        // Animación de entrada
        gsap.fromTo(currentSlide.querySelector('.slide__inner'),
            { 
                clipPath: 'circle(0% at 50% 50%)',
                scale: 1.5
            },
            {
                clipPath: 'circle(75% at 50% 50%)',
                scale: 1,
                duration: 1.2,
                ease: 'power4.inOut'
            }
        );
        
        // Mostrar slide
        currentSlide.classList.add('slide--current');
        
        gsap.to(prevSlide, {
            opacity: 0,
            duration: 0.8,
            onComplete: () => {
                prevSlide.classList.remove('slide--current');
                this.isAnimating = false;
            }
        });
    }
    
    next() { this.navigate(1); }
    prev() { this.navigate(-1); }
}

// Inicialización
const slideshow = new ShapeSlideshow(document.querySelector('.slideshow'));
```

## Formas de Clip-Path

```javascript
// Diferentes formas para transiciones
const clipPaths = {
    // Círculo que expande
    circleExpand: 'circle(0% at 50% 50%) → circle(100% at 50% 50%)',
    
    // Elipse horizontal
    ellipseHorizontal: 'ellipse(0% 50% at 50% 50%) → ellipse(100% 50% at 50% 50%)',
    
    // Rectángulo redondeado (pill)
    pill: 'inset(50% 0% 50% 0% round 50px)',
    
    // Polígono (pentágono)
    polygon: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
    
    // Wave (múltiples puntos)
    wave: 'polygon(0% 20%, 20% 10%, 40% 30%, 60% 10%, 80% 30%, 100% 20%, 100% 100%, 0% 100%)'
};
```

## Efecto Blob Orgánico

```javascript
const blobAnimation = {
    // Frame 0
    '0%': 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
    // Frame 25
    '25%': 'polygon(40% 10%, 60% 0%, 90% 20%, 100% 50%, 80% 90%, 50% 100%, 20% 80%, 10% 50%)',
    // Frame 50
    '50%': 'polygon(30% 20%, 70% 10%, 80% 40%, 90% 70%, 60% 90%, 30% 80%, 10% 60%, 20% 30%)',
    // Frame 75
    '75%': 'polygon(20% 10%, 80% 0%, 70% 30%, 100% 60%, 70% 100%, 40% 90%, 10% 70%, 30% 40%)',
    // Frame 100
    '100%': 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
};
```

## Dependencias

- **GSAP 3.11+**: `npm install gsap`
- **Vite** (opcional): Para bundling

## Notas

- Usar imágenes del mismo tamaño para mejores resultados
- El fallback para navegadores sin soporte: transición suave sin clip-path
- Personalizar la velocidad ajustando `duration` en GSAP
- Combinar con scale para efectos más dinámicos