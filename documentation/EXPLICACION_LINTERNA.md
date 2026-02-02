# Explicación del Efecto de "Linterna" y "Revelado"

Este documento explica cómo funciona el efecto visual interactivo implementado en `app.html` y `app.ts`. El efecto consiste en una luz que sigue el cursor del usuario, revelando imágenes ocultas en el fondo mientras ilumina sutilmente la pantalla.

## 1. Concepto General: Capas (Layers)

Para lograr este efecto, utilizamos una superposición de varias capas controladas por `z-index`. Imagina esto como una pila de papeles transparentes:

| Orden | Capa | Z-Index | Propósito |
| :--- | :--- | :--- | :--- |
| **Fondo** | `bg-black` | `-10` | Fondo negro sólido base. |
| **Imágenes** | "Capa de Revelado" | `20` | Contiene las imágenes (ojos). Tiene una **máscara** que solo deja ver lo que está bajo la "luz". |
| **Contenido** | `main` | `25` | El texto "Hola". Está por encima de las imágenes para ser legible. |
| **Luz** | "Linterna" | `30` | Un brillo azul tenue que sigue el cursor. Está encima de todo para "iluminar". |

---

## 2. Desglose del HTML (`app.html`)

### A. Fondo Negro Fijo
```html
<div class="fixed inset-0 bg-black -z-10"></div>
```
*   **`fixed inset-0`**: Ocupa toda la pantalla y no se mueve al hacer scroll.
*   **`-z-10`**: Se asegura de estar siempre detrás de todo.

### B. La "Linterna" (Brillo Azul)
```html
<div class="pointer-events-none fixed inset-0 z-30 transition duration-300" 
     [ngStyle]="{'background': 'radial-gradient(600px at ' + spotlightX + 'px ' + spotlightY + 'px, rgba(29, 78, 216, 0.15), transparent 80%)'}">
</div>
```
*   **`pointer-events-none`**: Permite que el ratón "atraviese" esta capa para interactuar con lo que hay debajo (links, botones).
*   **`radial-gradient`**: Crea un círculo de luz azul (`rgba(29, 78, 216, 0.15)`) que se desvanece a transparente.
*   **`spotlightX` / `spotlightY`**: Son variables de TypeScript que definen el centro del gradiente (la posición del ratón).

### C. La Capa de "Revelado" (Imágenes Ocultas)
```html
<div class="pointer-events-none fixed inset-0 w-full z-20"
    [style.mask-image]="'radial-gradient(circle 200px at ' + spotlightX + 'px ' + spotlightY + 'px, black 30%, transparent 70%)'">
    <!-- Imágenes... -->
</div>
```
*   **`mask-image`**: Esta es la clave. Una máscara CSS define qué partes de un elemento son visibles.
    *   **`black`**: En máscaras, el color sólido (negro) significa **VISIBLE**.
    *   **`transparent`**: Significa **INVISIBLE**.
    *   **Resultado**: Solo vemos las imágenes que están dentro del círculo de 200px alrededor del ratón. El resto es transparente, dejando ver el fondo negro de la capa inferior.

### D. Layout de Imágenes
```html
@for (item of items; track $index) {
    <div class="absolute ..." [style.left.%]="item.left" [style.top.%]="item.top">
        <img ... />
    </div>
}
```
*   Usamos coordenadas absolutas en porcentajes (`left.%`, `top.%`) para distribuir los ojos aleatoriamente por toda la pantalla.

---

## 3. Lógica de TypeScript (`app.ts`)

La magia ocurre sincronizando la posición del ratón con las variables que usa el HTML.

### Variables de Estado
```typescript
mouseX = 0;
mouseY = 0;
isMobile = false; // Detecta si es un dispositivo móvil
```

### Captura del Movimiento
```typescript
@HostListener('document:mousemove', ['$event'])
onMouseMove(event: MouseEvent) {
  if (!this.isMobile) {
    this.mouseX = event.clientX; // Coordenada X del ratón en la ventana
    this.mouseY = event.clientY; // Coordenada Y del ratón en la ventana
  }
}
```
*   Cada vez que mueves el ratón, actualizamos `mouseX` y `mouseY`.

### Propiedades Calculadas (Getters)
```typescript
get spotlightX(): number {
  // Si es móvil, fija la luz en el centro. Si no, sigue al ratón.
  return this.isMobile ? window.innerWidth / 2 : this.mouseX;
}
```
*   Angular detecta cambios en `mouseX` y recalcula `spotlightX`.
*   El HTML lee `spotlightX` y actualiza la posición de los gradientes (Luz y Máscara) instantáneamente.

## Resumen del Flujo
1.  **Usuario mueve el ratón** -> Se dispara `onMouseMove`.
2.  **TypeScript** actualiza `mouseX` y `mouseY`.
3.  **Angular** detecta el cambio y actualiza los estilos `[ngStyle]` y `[style.mask-image]` en el HTML.
4.  **Navegador** repinta los gradientes en la nueva posición, creando la ilusión de que mueves una linterna.
