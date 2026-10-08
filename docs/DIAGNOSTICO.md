# Diagnóstico del sitio anterior (HTML + JS vanilla)

Capturas de referencia en `docs/screenshots/before/` (escritorio 1440 px y móvil 390 px) y `docs/screenshots/after/`.

## Arquitectura anterior

- 5 páginas HTML (`index`, `tienda`, `motogp`, `escala`, `carrito`) con **navbar, menú móvil, footer y toast copiados en cada una** (el menú de ~100 líneas se repite idéntico en las 5 páginas).
- `js/products.js` (catálogo global `PRODUCTS`), `js/cart.js` (objeto `Cart` sobre `localStorage["mash_cart"]`), `js/main.js` (render por página con `innerHTML`).
- `css/styles.css` (≈ 50 KB; varios bloques duplicados: marquee, statement, speed-numbers).
- Netlify: `publish = "."` y una regla `/* → /index.html 200` (cualquier URL rota respondía 200 con la home).
- `admin/index.html`: panel que guarda productos en `localStorage` y publica con un token de GitHub escrito en el navegador.

## Flujos

1. Inicio → destacados (8) y tarjetas de escudería → `tienda.html?equipo=X`.
2. Catálogo (`tienda`, `motogp`, `escala`) → filtros por tipo/escudería en memoria → "Añadir" (siempre talla = primera de la lista).
3. Carrito → cantidades, subtotal, envío (gratis ≥ $150.000, si no $12.000) → enlace `wa.me/573156532989?text=…`.

## Problemas hallados

| # | Hallazgo | Dónde | Estado |
|---|---|---|---|
| 1 | **El título "Tu carrito" quedaba oculto bajo la barra**: `calc(var(--bar-h)+var(--nav-h)+3rem)` sin espacios es CSS inválido y se descarta el `padding-top` | `css/styles.css` `.cart-page` | Corregido |
| 2 | **Cantidades que se multiplican**: `bindAddToCart` y `renderCart` añadían un listener nuevo en cada render; tras cambiar filtros, un clic sumaba N unidades; en el carrito un `+` sumaba 2, 3… | `js/main.js` | Corregido (React); test de regresión |
| 3 | **No se podía elegir talla**: siempre se añadía `sizes[0]` (S) | `productCardHTML` | Corregido (selector de talla) |
| 4 | Enlaces del menú/inicio a filtros inexistentes: `tienda.html?cat=…` (ignorado), `escala.html?marca=bburago\|hot-wheels`, equipos MotoGP (todos a `motogp.html`), "Bburago 1:43", "Escala 1:18" (el catálogo es 1:64) | nav, footer, banners | Corregido / eliminado |
| 5 | Con `?equipo=` **y** `?tipo=` solo se aplicaba el primero (`pill.click(); return;`) | `initTienda` | Corregido |
| 6 | Llaveros (6 productos) sin página: footer y menú prometían "Llaveros" pero `tienda` solo mostraba ropa y gorras | `F1_CATS` | Corregido: `/tienda?tipo=llavero` |
| 7 | Contraseña predeterminada `mash2026` y token de GitHub en `localStorage`; publica desde el cliente | `admin/index.html` | **Eliminado** |
| 8 | Regla `/* → /index.html 200`: sin 404 reales (SEO: soft-404) | `netlify.toml` | Corregido |
| 9 | Cifras incoherentes: "10 escuderías", "11 equipos F1 2025", "4 equipos MotoGP" (hay 6 escuderías y 0 equipos MotoGP con producto) | home | Derivadas del catálogo |
| 10 | Afirmaciones no verificables: "Tienda/Merchandising oficial", "Garantía de satisfacción", "Productos de alta calidad", "Garantía de calidad en todos los productos" | meta, hero, footer, barra | Retiradas (ver `UX-AUDIT.md`) |
| 11 | `.filter-btn-yellow` (HTML) vs `.filter-btn.yellow` (CSS): el filtro MotoGP nunca era amarillo | motogp | Corregido |
| 12 | Botón "Añadir" del overlay solo visible al hover (inaccesible en táctil) y duplicado | tarjeta | Eliminado (queda el botón visible) |
| 13 | Sin etiquetas semánticas (elemento inventado `<nav-logo-slot>`, filtros como botones sin grupo accesible, `<nav-logo-slot>` inventado), sin foco visible, contraste gris `#555` sobre negro < 4.5:1 | global | Corregido |
| 14 | `.claude/launch.json` apuntaba a `C:/Users/USUARIO/Desktop/...` | tooling | Actualizado |

## Problemas conocidos **no** resueltos (requieren al propietario)

- **Imágenes alojadas en terceros** (Linktree CDN, Google Drive `lh3.googleusercontent.com/d/…`, Unsplash): pueden romperse o limitarse sin aviso. Recomendación: descargarlas a `public/img/products/` (o a Storage de Supabase) cuando el propietario confirme que tiene los derechos.
- **Imágenes repetidas**: 3 carros a escala (`#8`, `#10`, `#13`) usan la misma foto; "Jersey Ducati Márquez #93" usa la variable `IMG.jHondaHRC`. Hay que revisar manualmente.
- Las descripciones de producto existen en los datos pero **no se muestran** (no hay página de producto).
- Algunas descripciones mencionaban "oficial"; se normalizaron en los datos. Confirmar si realmente son productos licenciados.
