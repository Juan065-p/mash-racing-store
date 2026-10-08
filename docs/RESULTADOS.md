# Resultados de build y pruebas

Entorno: Windows 11, Node v24.18.0, npm 11.16.0, Chromium de Playwright 1.62. Ejecutado desde cero (`rm -rf node_modules dist` → `npm install`).

| Comprobación | Resultado |
|---|---|
| `npm install` | OK, 0 vulnerabilidades reportadas |
| `npm run build` | OK. Cliente: JS 321 kB (99 kB gzip), CSS 42 kB (8.8 kB gzip). Prerender de `/`, `/tienda`, `/motogp`, `/escala`, `/carrito`, `/admin` y `404.html` |
| `npm test` (Vitest) | 18/18 pasan: carrito, envío (umbral exacto), mensaje de WhatsApp, filtros, redirecciones `?cat=`, integridad del catálogo (38 productos, ids únicos) |
| `npm run test:e2e` (Playwright, escritorio 1440×900 + móvil Pixel 7) | **63 pasan, 3 omitidas** (pruebas específicas de un solo viewport), 0 fallos |
| `npm run validate:catalog` | 0 errores, 1 aviso (3 carros a escala comparten imagen) |
| Hidratación / consola / CSP | Cada prueba e2e falla si hay `pageerror`, error de hidratación de React o violación de CSP. Ninguna falló |
| Modo `vite dev` | Verificado en el navegador integrado: `/tienda?equipo=Ferrari` muestra 4 productos, título correcto |
| Imágenes reales con CSP activa | Captura con red real: 25/25 imágenes del catálogo cargan en escritorio; 0 violaciones de CSP (en móvil, 20–22/25 al momento de la captura por carga diferida) |

## Qué cubren las pruebas e2e

- **Rutas**: URL directa y recarga de las 5 páginas (200, `<title>`, `<h1>`), 404 real, 7 redirecciones 301 de URLs `.html` antiguas conservando la query, `robots.txt`, cabeceras de seguridad, y que **todos** los enlaces internos de la home existen.
- **Filtros**: `?equipo=`, `?tipo=`, combinados, sin resultados, parámetros inválidos, recarga, enlaces `?cat=` antiguos, MotoGP y Escala, y que **cada destino del menú desplegable** devuelve productos.
- **Carrito**: talla obligatoria en ropa, persistencia tras recargar, cantidades, subtotal, envío ($12.000 / gratis en el umbral exacto de $150.000), texto y URL de WhatsApp (`wa.me/573156532989`), carritos heredados del sitio antiguo, datos corruptos, y las **regresiones** de los bugs del sitio anterior (cantidad ×N, título oculto).
- **Navegación/a11y**: menú móvil (abrir, navegar, Escape), dropdown con teclado, skip-link, enlaces externos con `noopener`.
- **Admin**: sin campos de entrada, sin `mash2026`/`ghp_`/`api.github.com`, sin claves `mr_*` en `localStorage`.

Las pruebas son herméticas (bloquean los hosts externos; las imágenes caen al emoji), así que no dependen de Linktree/Drive/Unsplash.

## Capturas

`docs/screenshots/before/` (sitio anterior, `serve` estático) y `docs/screenshots/after/` (build de producción): inicio, tienda, tienda filtrada por Ferrari, MotoGP, escala y carrito (vacío y, solo después, con ítems), en escritorio y móvil. Las capturas de página completa muestran la barra fija inferior del carrito en mitad de la imagen y los bloques `reveal` sin animar si el desplazamiento automático fue rápido; es un artefacto de la captura.

## Limitaciones reales

1. **No se probó en un despliegue de Netlify.** Las redirecciones y cabeceras se emulan con `scripts/serve-dist.mjs`, que implementa solo lo que usa este proyecto. Hay que revisar en un *deploy preview* que las redirecciones 301 conserven la query (`/tienda.html?equipo=Ferrari`). Si no la conservaran, los enlaces antiguos con filtro caerían a `/tienda` sin filtro (el sitio sigue funcionando).
2. **Sin pruebas en Safari/Firefox ni en dispositivos reales**: solo Chromium (escritorio y emulación Pixel 7). Tableta (768/1024 px) revisada por CSS, sin captura dedicada.
3. **Accesibilidad**: no se corrió un lector de pantalla ni una auditoría automática (axe/Lighthouse); las mejoras se verificaron por código y pruebas de roles/teclado.
4. **Analítica**: no hay herramienta configurada; solo se documentó el esquema.
5. **Imágenes remotas**: dependen de terceros; no se descargaron ni se optimizaron. Tres productos de escala comparten foto.
6. **La CSP usa `style-src 'unsafe-inline'`** (React y el HTML prerenderizado usan atributos `style`); es una CSP útil pero no estricta. Los scripts sí están limitados a `'self'`.
7. **`VITE_SITE_URL` sin definir**: no hay `canonical`, `og:url` ni `sitemap.xml` hasta que el propietario indique el dominio.
8. **El token de GitHub del panel antiguo**, si se usó, sigue vigente hasta que el propietario lo revoque en GitHub.
9. No se verificó el contenido de marca (pilotos, "Temporada 2026", descripciones de producto) ni los derechos de imagen.
