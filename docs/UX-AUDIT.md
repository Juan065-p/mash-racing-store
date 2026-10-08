# Auditoría UX/UI y mejora comercial

Método: revisión del código y de capturas (móvil 390 px, escritorio 1440 px; tableta evaluada por reglas CSS y viewport 768/1024, sin capturas dedicadas) del sitio anterior y del nuevo, más pruebas automatizadas (`e2e/`). No hay datos de analítica ni de ventas en el repositorio, así que las prioridades son **por impacto esperado en la compra**, no medidas.

Leyenda: ✅ hecho y comprobado · ⏳ pendiente · ❓ requiere dato del propietario.

## Hallazgos

### P0 — bloquean o dañan directamente la compra

| ID | Hallazgo | Ubicación | Impacto | Estado |
|---|---|---|---|---|
| P0-1 | Título del carrito oculto por CSS inválido (`calc` sin espacios) | Carrito | Primer contacto con el pedido se ve roto | ✅ test `el título 'Tu carrito' no queda oculto…` |
| P0-2 | Cantidades que se multiplican (listeners duplicados) | Catálogo y carrito | Pedidos con cantidades erróneas | ✅ tests de regresión |
| P0-3 | No se puede elegir talla (siempre S) | Tarjeta de producto | Pedidos de talla equivocada, devoluciones | ✅ selector accesible; exige talla en prendas |
| P0-4 | Menú y footer prometen contenido inexistente (`?cat=`, `?marca=`, equipos MotoGP, 1:43/1:18/Hot Wheels) | Navegación | Pérdida de confianza, rebote | ✅ cada enlace filtra de verdad (test recorre todos) o se eliminó; `?cat=` antiguos redirigen |
| P0-5 | Panel admin inseguro publicado | `/admin` | Riesgo de toma de control del repositorio | ✅ eliminado |

### P1 — fricción importante o riesgo de reputación

| ID | Hallazgo | Impacto | Estado |
|---|---|---|---|
| P1-1 | Sin información de envío/pago/proceso en el catálogo (solo en el carrito) | Dudas antes de añadir | ✅ franja `TrustStrip` bajo los filtros (solo afirma lo que el flujo hace) |
| P1-2 | Envío gratis desde $150.000 solo se vería al final | Menos ticket medio | ✅ barra de progreso y "te faltan $X" en el carrito; aviso en la barra superior |
| P1-3 | El botón de WhatsApp queda lejos en carritos largos (móvil) | Abandono | ✅ barra fija inferior con total y CTA (≤ 768 px) |
| P1-4 | Filtros sin conteos, sin estado "sin resultados" útil, sin forma de limpiar | Descubrimiento | ✅ conteos por chip, chips vacíos deshabilitados, "Quitar filtros", estado vacío |
| P1-5 | Filtros no reflejados en la URL de forma consistente, no compartibles | Compartir por WhatsApp/Instagram | ✅ `?tipo=&equipo=`, recarga conserva estado |
| P1-6 | Llaveros inalcanzables; sin enlaces cruzados entre secciones | Descubrimiento | ✅ `/tienda?tipo=llavero`; franja "Sigue explorando" |
| P1-7 | Mensaje de WhatsApp sin subtotal/envío; sin salir de la tienda tras añadir | Claridad | ✅ mensaje con subtotal, envío y total; toast con enlace "Ver carrito" |
| P1-8 | Accesibilidad: sin skip-link, sin foco visible, dropdown solo con hover, `aria` ausente, contraste gris bajo, animaciones sin `prefers-reduced-motion`, objetivos táctiles < 44 px | Usuarios con teclado/lectores/táctil | ✅ (ver abajo) ⏳ auditoría con lector de pantalla real |
| P1-9 | Afirmaciones no verificadas ("oficial", "garantía de satisfacción", "alta calidad", estadísticas inconsistentes) | Riesgo legal/reputacional | ✅ retiradas; cifras derivadas del catálogo |
| P1-10 | SEO: soft-404, sin `robots`, mismo `<head>` para todo | Posicionamiento | ✅ prerender por ruta con `title`/`description`/OG conservados; `404.html` real; `robots.txt`; carrito y admin `noindex` |
| P1-11 | Imágenes en servicios de terceros; 3 escalas con la misma foto | Catálogo roto/engañoso | ⏳ ❓ ver `DIAGNOSTICO.md` |

### P2 — mejoras posteriores

| ID | Propuesta | Estado |
|---|---|---|
| P2-1 | Página de producto / vista rápida con descripción, guía de tallas y galería (las descripciones ya existen en los datos) | ⏳ |
| P2-2 | Búsqueda y orden por precio | ⏳ |
| P2-3 | Optimización de imágenes (WebP/AVIF, `srcset`, alojamiento propio) | ⏳ |
| P2-4 | Limpiar CSS duplicado (marquee/statement/speed-numbers definidos dos veces) y unificar en tokens | ⏳ |
| P2-5 | Filtro por equipo MotoGP (requiere añadir `team` a esos productos) | ⏳ ❓ |
| P2-6 | Prueba social **real** (reseñas, fotos de clientes) cuando existan; hoy no se muestra ninguna | ⏳ ❓ |
| P2-7 | Disponibilidad/stock por talla | ⏳ (depende de Supabase, ver `SUPABASE.md`) |
| P2-8 | Instrumentación del embudo | ⏳ (esquema en `ANALYTICS.md`; no hay herramienta configurada) |

## Cambios de accesibilidad realizados (P1-8)

Enlace "Saltar al contenido", landmarks (`header`, `nav`, `main`, `footer`), `aria-label` en iconos y en el contador del carrito, `aria-expanded/controls` en el menú móvil (Escape lo cierra), dropdown abierto con `:focus-within`, filtros como enlaces con `aria-current` y `role="group"` etiquetado, selector de talla `radiogroup`, región `role="status"` para el conteo de resultados y el toast, foco visible (`:focus-visible`), botones de cantidad de 40 px y chips de 40 px de alto, grises elevados (`#8d8d8d`/`#a8a8a8` sobre `#060606` ≈ 6:1 y 8:1; el original `#555` daba ≈ 2.7:1 y `#888` ≈ 5.7:1), `prefers-reduced-motion` desactiva ticker, marquesinas y revelados.

## Supuestos y datos que necesito confirmar

1. Envío: ¿$12.000 y "gratis desde $150.000" aplican a **toda** Colombia? Se conservó tal cual.
2. ¿Los productos son licenciados/oficiales? Mientras no se confirme, el copy no lo afirma.
3. ¿Medios de pago? El texto dice solo "coordinamos el pago contigo por WhatsApp".
4. Dominio final (para `VITE_SITE_URL`, canonical y sitemap).
5. ¿Se mantienen los llaveros dentro de `/tienda`? (antes no tenían página).
6. Derechos sobre las imágenes de terceros antes de alojarlas.
7. Se asumió "Temporada 2026" y los pilotos de las tarjetas de escudería tal como estaban; no se verificaron.
