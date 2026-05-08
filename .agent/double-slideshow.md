# Skill: DoubleSlideshow - Transiciones de Fondo con Zoom Cinemático

## Descripción

Esta skill proporciona instrucciones para implementar el efecto **DoubleSlideshow** de Codrops: un slideshow de fondo/foreground con transiciones de zoom cinematográficas. El efecto utiliza dos capas (background y foreground) con imágenes de diferentes tamaños que se mueven en direcciones opuestas creando una experiencia visual inmersiva.

## Implementación

### Estructura HTML

```html
<!-- Slider de fondo (imágenes grandes) -->
<div class="slider slider--bg">
    <div class="slider__item">
        <div class="slider__item-inner" style="background-image:url(img/1.jpg)"></div>
    </div>
    <div class="slider__item">
        <div class="slider__item-inner" style="background-image:url(img/2.jpg)"></div>
    </div>
    <!-- más items... -->
</div>

<!-- Slider de foreground (imágenes pequeñas) -->
<div class="slider slider--fg">
    <div class="slider__item">
        <div class="slider__item-inner" style="background-image:url(img/1-small.jpg)"></div>
    </div>
    <!-- más items... -->
</div>

<!-- Títulos animados -->
<div class="type">
    <div class="type__item">Título 1</div>
    <div class="type__item">Título 2</div>
</div>

<!-- Navegación -->
<nav class="slider-nav">
    <button class="unbutton slider-nav__item slider-nav__item--prev"><span>Prev</span></button>
    <button class="unbutton slider-nav__item slider-nav__item--next"><span>Next</span></button>
</nav>
```

### CSS Básico

```css
.slider {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.slider--bg {
    /* Fondo más grande */
    width: 120%;
    height: 120%;
    left: -10%;
    top: -10%;
}

.slider--fg {
    /* Foreground más pequeño y centrado */
    width: 80%;
    height: 80%;
    left: 10%;
    top: 10%;
}

.slider__item {
    position: absolute;
    width: 100%;
    height: 100%;
    will-change: transform;
}

.slider__item-inner {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
}
```

### JavaScript (GSAP)

```javascript
import gsap from 'gsap';

class Slider {
    #current = 0;
    
    constructor(element, reverseDirection = false) {
        this.element = element;
        this.reverseDirection = reverseDirection;
        this.items = [...element.querySelectorAll('.slider__item')];
        this.itemsInner = this.items.map(item => item.querySelector('.slider__item-inner'));
        this.itemsTotal = this.items.length;
        
        this.items[this.current].classList.add('slider__item--current');
        gsap.set([this.items, this.itemsInner], {'will-change': 'transform'});
    }
    
    get current() { return this.#current; }
    
    set current(value) { this.#current = value; }
    
    navigate(direction) {
        if (this.isAnimating) return false;
        this.isAnimating = true;
        
        const previous = this.current;
        this.current = direction === 1 
            ? (this.current < this.itemsTotal - 1 ? ++this.current : 0)
            : (this.current > 0 ? --this.current : this.itemsTotal - 1);

        const currentItem = this.items[previous];
        const currentInner = this.itemsInner[previous];
        const upcomingItem = this.items[this.current];
        const upcomingInner = this.itemsInner[this.current];
        
        gsap.timeline({
            defaults: {duration: 1.1, ease: 'power3.inOut'},
            onComplete: () => {
                this.items[previous].classList.remove('slider__item--current');
                this.items[this.current].classList.add('slider__item--current');
                this.isAnimating = false;
            }
        })
        .to(currentItem, {
            yPercent: this.reverseDirection ? direction * 100 : -direction * 100,
            onComplete: () => gsap.set(currentItem, {opacity: 0})
        })
        .to(currentInner, {
            yPercent: this.reverseDirection ? -direction * 30 : direction * 30,
            rotation: -direction * 15,
            scaleY: 2.8
        }, 0)
        .to(upcomingItem, {
            startAt: {opacity: 1, yPercent: this.reverseDirection ? -direction * 80 : direction * 80},
            yPercent: 0
        }, 0)
        .to(upcomingInner, {
            startAt: {
                yPercent: this.reverseDirection ? direction * 30 : -direction * 30,
                scaleY: 2.8,
                rotation: direction * 15
            },
            yPercent: 0,
            scaleY: 1,
            rotation: 0
        }, 0);
    }
    
    next() { this.navigate(1); }
    prev() { this.navigate(-1); }
}

// Inicialización
const sliderBG = new Slider(document.querySelector('.slider--bg'));
const sliderFG = new Slider(document.querySelector('.slider--fg'), true);

// Navegación
document.querySelector('.slider-nav__item--next').addEventListener('click', () => {
    sliderBG.next();
    sliderFG.next();
});
```

## Personalización

### Ajustar Velocidad
Cambiar `duration: 1.1` en las timelines de GSAP.

### Ajustar Intensidad del Zoom
Modificar `scaleY: 2.8` - valores más altos = más zoom.

### Cambiar Dirección
Pasar `true` como segundo parámetro al constructor del Slider para revertir la dirección.

## Dependencias Requeridas

- **GSAP 3.11+**: `npm install gsap`
- **imagesloaded**: `npm install imagesloaded` (para preload de imágenes)
- **Splitting.js** (opcional): Para animaciones de texto carácter por carácter

## Notas

- Las imágenes de background deben ser más grandes que las de foreground
- Usar imágenes del mismo aspect ratio para ambos sliders
- La clase `will-change: transform` optimiza el rendimiento
- Compatible con scroll/swipe usando GSAP Observer