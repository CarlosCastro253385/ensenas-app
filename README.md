# EnSeñas – Aprende Lengua de Señas Mexicana jugando

Juego de memoria (encuentra los pares seña ↔ palabra), pensado para celular.

## Cómo abrirlo
- Para probar: abre `index.html` en el navegador (se ve mejor en modo celular: F12 → icono de móvil).
- Para instalarlo como app ("Agregar a pantalla de inicio") necesita un servidor:

      cd ensenas
      python3 -m http.server 8000
      # abre http://localhost:8000  (en el celular usa la IP de tu compu)

## Estructura
- `index.html`        pantalla base (header, contenedor, barra inferior)
- `css/styles.css`    estilos (colores en `:root`, modo oscuro, ajustes para móvil)
- `js/data.js`        niveles, secciones y palabras  ← aquí agregas contenido
- `js/app.js`         lógica: niveles, juego, racha, mascota, tienda, perfil, ajustes, Premium
- `assets/signs/`     fotos de las señas (una por palabra; el nombre es el campo `f` de data.js)
- `assets/icons/`     iconos de la barra inferior + icono de la app
- `manifest.json`     permite instalarla en el celular

## Cosas que hoy son demo
- Login: los botones de `vMe()` solo muestran un aviso. El progreso vive en `localStorage` (clave `manitos2`).
- Pago Premium: la acción `buy-prem` en `app.js` activa Premium sin cobrar. Falta pasarela (Stripe, Mercado Pago…) y backend.
- Regla gratuita: 1 nivel por día (`canToday()` y `st.dayLv`).

## Agregar una palabra
1. Guarda la foto en `assets/signs/mi_palabra.jpg`.
2. En `js/data.js` añade `{w:"Mi palabra",f:"mi_palabra"}` a una sección.

## Créditos y permisos
Las fotos salen del *Diccionario de Lengua de Señas Mexicana* (Manos con Voz).
Antes de publicar o cobrar, confirma que tienes permiso para usarlas.
