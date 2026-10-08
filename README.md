# Mash Racing Store

Tienda de merchandising F1 y MotoGP (Colombia). Frontend en **React 19 + Vite + React Router**, prerenderizado a HTML estático por ruta y desplegado en **Netlify**. El pedido se finaliza por **WhatsApp**; no hay pasarela de pago ni servidor propio.

## Requisitos

- Node.js **≥ 20.19** (LTS; en Netlify se fija `NODE_VERSION=22` en `netlify.toml`).
- npm 10+.

## Comandos

| Comando | Qué hace |
|---|---|
| `npm install` | Instala dependencias |
| `npm run dev` | Servidor de desarrollo con HMR (http://localhost:5173) |
| `npm run build` | Build cliente + build SSR + **prerender** de cada ruta a `dist/` |
| `npm run preview` | Sirve `dist/` imitando a Netlify (rutas limpias, `404.html`, `_redirects`, `_headers`) en http://localhost:4173 |
| `npm test` | Pruebas unitarias (Vitest): carrito, envío, WhatsApp, filtros, integridad del catálogo |
| `npm run test:e2e` | Pruebas de extremo a extremo (Playwright, escritorio + móvil) sobre `dist/`. Requiere `npm run build` antes y `npx playwright install chromium` la primera vez |
| `npm run validate:catalog` | Valida `src/data/products.js` y avisa de datos dudosos (imágenes repetidas, "oficial") |

## Estructura

```
index.html                 Plantilla HTML (marcadores <!--app-head--> / <!--app-html-->)
public/                    Estáticos copiados tal cual: img/, _redirects, _headers
scripts/
  prerender.mjs            Genera dist/<ruta>/index.html, 404.html, robots.txt (y sitemap si hay VITE_SITE_URL)
  serve-dist.mjs           Servidor local que emula Netlify
  validate-catalog.mjs     Validador de catálogo
src/
  main.jsx / entry-server.jsx   Entradas de cliente (hidratación) y de servidor (prerender)
  App.jsx                  Rutas
  components/              Layout (barra, navbar, menú móvil, footer), CatalogPage, ProductCard, TrustStrip, Toast
  pages/                   Home, Catalogs (Tienda, MotoGP, Escala), Carrito, Misc (404, /admin)
  data/                    products.js (catálogo), nav.js (menú y avisos)
  lib/                     cart.js (lógica pura), cartStore.js (localStorage), filters.js, shop.js (envío, WhatsApp), seo.js
  styles/                  styles.css (identidad original) + extras.css (a11y, nuevos componentes)
e2e/                       Pruebas Playwright
tests/                     Pruebas Vitest
docs/                      Diagnóstico, auditoría UX, analítica, evaluación de Supabase, capturas
```

## Rutas

| Ruta | Contenido | Filtros por URL |
|---|---|---|
| `/` | Inicio | — |
| `/tienda` | Ropa, gorras y llaveros F1 | `?tipo=camisa\|polo\|chaqueta\|gorra\|llavero` `&equipo=Ferrari\|RedBull\|Mercedes\|McLaren\|Alpine\|AstonMartin` |
| `/motogp` | Ropa MotoGP | `?tipo=jersey\|polo` |
| `/escala` | Carros a escala 1:64 | `?equipo=Ferrari\|RedBull\|Mercedes\|McLaren` |
| `/carrito` | Carrito y pedido por WhatsApp | — |
| `/admin` | Marcador: el panel antiguo se retiró (ver abajo) | — |

URLs antiguas: `/index.html`, `/tienda.html`, `/motogp.html`, `/escala.html`, `/carrito.html`, `/admin/index.html` → redirección 301 a la ruta limpia (`public/_redirects`). Los enlaces `?cat=…` heredados se redirigen en el cliente (`legacyCatalogTarget`). Cualquier otra URL devuelve `404.html` con estado 404 (ya no hay `/* → /index.html`).

## Datos del catálogo

`src/data/products.js` es la fuente de verdad (mismos 38 productos, precios COP, categorías, tallas e imágenes del sitio anterior). Para editar un producto: cambia ese archivo, ejecuta `npm run validate:catalog` y haz commit; Netlify reconstruye. Reglas comerciales en `src/lib/shop.js`: envío gratis desde **$150.000**, **$12.000** en el resto, WhatsApp **573156532989**.

El carrito se guarda en `localStorage` con la clave `mash_cart` (mismo formato que el sitio anterior, así que los carritos existentes siguen funcionando).

## Variables de entorno

Copia `.env.example` a `.env` (no se versiona). Ninguna es secreta ni obligatoria hoy:

| Variable | Uso |
|---|---|
| `VITE_SITE_URL` | URL pública (sin `/` final). Si se define, se emiten `canonical`, `og:url` y `sitemap.xml`. Defínela también en Netlify (Site settings → Environment variables). |

> Cualquier variable `VITE_*` queda **expuesta en el navegador**. Nunca pongas claves secretas (service role de Supabase, tokens de GitHub, etc.) en variables `VITE_*`.

## Despliegue en Netlify

1. Conecta el repositorio. `netlify.toml` ya define `npm run build` y publica `dist/`.
2. (Opcional) añade `VITE_SITE_URL`.
3. `public/_redirects` y `public/_headers` se aplican solos (redirecciones 301 de `.html`, cabeceras de seguridad y CSP, caché larga para `/assets/*`).
4. Revisa un *deploy preview* antes de producción: comprueba especialmente que `/tienda.html?equipo=Ferrari` conserve la query en la redirección.

Este trabajo **no se ha desplegado**.

## Panel administrativo

El `admin/index.html` anterior se **eliminó**: guardaba una contraseña predeterminada (`mash2026`) comparada en el navegador, guardaba un token personal de GitHub en `localStorage` y publicaba cambios desde el cliente. Eso no es seguro y no se conservó. Hoy `/admin` solo muestra un aviso y el catálogo se edita en el repositorio (ver arriba). La alternativa recomendada (Supabase Auth + RLS, más adelante) está diseñada en [`docs/SUPABASE.md`](docs/SUPABASE.md). **Pendiente del propietario**: decidir cuándo adoptarla; si el token de GitHub antiguo llegó a usarse, **revócalo** en GitHub → Settings → Developer settings.

## Qué corre en Node.js

Solo en **tiempo de build** (Vite, prerender). No hay servidor permanente ni funciones serverless: todo lo que el sitio hace hoy (catálogo, filtros, carrito, enlace a WhatsApp) es estático y del lado del cliente. Un endpoint solo se justificaría si hubiera operaciones con secretos (edición de catálogo, registro de pedidos, pagos); ver `docs/SUPABASE.md`.

## Más documentación

- [`docs/DIAGNOSTICO.md`](docs/DIAGNOSTICO.md) — arquitectura anterior, flujos y problemas hallados
- [`docs/UX-AUDIT.md`](docs/UX-AUDIT.md) — auditoría P0/P1/P2, hecho vs. pendiente, supuestos
- [`docs/ANALYTICS.md`](docs/ANALYTICS.md) — embudo y esquema de eventos propuestos
- [`docs/SUPABASE.md`](docs/SUPABASE.md) — evaluación y recomendación
- [`docs/RESULTADOS.md`](docs/RESULTADOS.md) — resultados de build y pruebas, limitaciones
