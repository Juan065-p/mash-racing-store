# ¿Debe Supabase ser la base de datos de Mash Racing?

## Decisión: **adoptar después** (no ahora)

Hoy el catálogo son **38 productos**, un único operador, sin inventario por talla, sin pagos en línea y con pedido por WhatsApp. Un archivo versionado cubre eso con cero costo operativo y cero superficie de ataque. Supabase empieza a justificarse cuando la **edición sin desarrollador** o el **stock** se vuelvan el cuello de botella.

### Condiciones que cambiarían la decisión a "adoptar ya"

Basta con que se cumpla una:

1. La persona que gestiona la tienda necesita **editar precios, fotos o disponibilidad sin pasar por Git** más de ~1 vez por semana.
2. Se quiere **stock por talla / agotado** visible (hoy no existe).
3. Más de **una persona** edita el catálogo, o hay > ~100 productos.
4. Se quiere **guardar pedidos** (historial, seguimiento, recompra) en vez de depender solo del chat de WhatsApp.
5. Se quiere cambiar la lógica comercial (envío por ciudad, cupones) sin redeploy.

## Comparación

| Criterio | A. Datos estáticos en el repo (hoy) | B. Supabase | C. Alternativa simple: hoja de Google/Airtable → JSON en build |
|---|---|---|---|
| Editar productos | Editar `products.js` + commit (requiere Git) | Panel/tabla con Auth, sin deploy | Edición en hoja familiar; build programado o webhook |
| Persistencia / auditoría | Git (historial completo gratis) | Postgres; auditoría propia | Historial de la hoja; débil |
| Autenticación del admin | No hace falta (no hay panel) | **Supabase Auth** + RLS (sólido) | Permisos de Google; sin app propia |
| Imágenes | Hoy: terceros (frágil). Se pueden alojar en `public/` | **Storage** con CDN y reglas | Drive/URLs externas (frágil) |
| Inventario | No | Sí (tabla de variantes con `stock`) | Columna manual, sin atomicidad |
| Costo | $0 (Netlify) | Plan gratuito existe; los proyectos gratuitos se **pausan por inactividad** y el plan de pago ronda decenas de USD/mes — **verificar precios vigentes** | $0 – bajo |
| Complejidad | Mínima | Media (esquema, RLS, claves, migración, backups, build/fetch) | Baja-media (credenciales de API, caché, errores de red en build) |
| Seguridad | Máxima (nada expuesto) | Buena **si** se escribe bien la RLS; riesgo si se filtra la `service_role` o se olvida RLS | Depende de compartir la hoja |
| SEO | Prerender trivial | Requiere traer datos **en build** (o SSR) para conservar el HTML prerenderizado | Igual que B |
| Crecimiento esperado | Hasta ~100–200 productos cómodo | Escala sobrado | Se vuelve inmanejable con variantes |

## Si/cuando se adopte: diseño mínimo

Borrador ejecutable (no aplicado a ningún proyecto): [`docs/supabase/0001_catalog.sql`](supabase/0001_catalog.sql).

**Tablas**

- `categories(slug pk, label, sort)` — `ropa`, `motogp`, `gorras`, `llaveros`, `escala`.
- `teams(slug pk, label, color)` — `Ferrari`, `RedBull`… (mismos valores que `p.team` hoy).
- `products(id pk, name, category → categories, tipo, team → teams, price_cop int, badge, featured, emoji, image_url, description, published bool, sort, updated_at)`.
- `product_variants(id pk, product_id → products, size text, stock int null, sku)` — `stock = null` significa "sin control de stock" (comportamiento actual). Una variante por talla (`S/M/L/XL`, `Única`, `1:64`).
- `site_content(key pk, value jsonb)` — barra de anuncios, textos editables.
- `admins(user_id pk → auth.users)` — quién puede escribir.

**RLS**

- `anon` (público): `select` solo de `categories`, `teams`, `site_content` y de `products`/`product_variants` con `published = true`. **Nada de escritura.**
- `authenticated` **y** presente en `admins`: `insert/update/delete` en las tablas del catálogo y en el bucket `product-images`.
- Regla de oro: **RLS activada en todas las tablas**; `admins` solo legible por el propio usuario; la función `is_admin()` es `security definer` con `search_path` fijo.

**Auth:** Supabase Auth con correo + contraseña o *magic link* para 1–2 cuentas; **registro público deshabilitado** (invitar manualmente); MFA recomendado. Sin contraseñas predeterminadas ni compartidas.

**Claves**

- En React solo `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` (clave pública, protegida por RLS).
- La `service_role` **nunca** en el repositorio ni en `VITE_*`. Si hace falta (importación masiva, función que registre pedidos), vive en variables de entorno de Netlify y se usa solo desde una Netlify Function.
- Rotar cualquier clave que se haya pegado en chats o commits.

**Almacenamiento:** bucket `product-images` público para lectura, escritura solo admins; conservar el nombre de archivo original como referencia.

## Ruta de implementación por etapas (con reversión)

| Etapa | Qué | Reversión |
|---|---|---|
| 0 (hoy) | Catálogo en `products.js`; alojar imágenes propias en `public/img/products/` | — |
| 1 | Crear proyecto Supabase **del propietario**; aplicar `0001_catalog.sql` en un proyecto de pruebas; script `scripts/seed-from-products-js.mjs` (usa `service_role` solo en local) que carga los 38 productos | Eliminar el proyecto de pruebas |
| 2 | **Lectura en build**: `scripts/fetch-catalog.mjs` descarga el catálogo con la clave anon y genera `src/data/catalog.generated.json`; `products.js` pasa a leer ese JSON **con el archivo actual como respaldo** si la red falla. El sitio sigue 100 % estático y prerenderizado | Volver a importar `products.js` directamente (un cambio de una línea) |
| 3 | Panel admin real (`/admin`) con Supabase Auth: CRUD de productos, subida de imágenes, botón "Publicar" que dispara un *build hook* de Netlify (el token del hook va en variable del servidor, no en el cliente) | Desactivar el panel; el catálogo vuelve a editarse en Git |
| 4 | Stock por talla: las variantes con `stock = 0` se muestran "Agotado"; lectura en vivo desde el cliente (RLS pública de solo lectura) para no depender de rebuild | Ignorar la columna `stock` (queda `null`) |
| 5 | (Opcional) tabla `orders` + Netlify Function que registre el pedido antes de abrir WhatsApp | Quitar la llamada; el flujo vuelve a ser solo WhatsApp |

**Migración de datos:** el seed lee `src/data/products.js`; mapeo directo 1:1 de campos (`price → price_cop`, `sizes[] → product_variants`). Verificación: contar filas (38 productos) y comparar suma de precios y `featured` contra el archivo. **No se migró ningún dato real ni se creó ningún recurso**: faltan credenciales y la decisión del propietario.

## Alternativa intermedia recomendada para el corto plazo

Alojar las imágenes en el repositorio y mantener `products.js`. Si el problema real es "no sé usar Git", considera primero la opción C o un CMS basado en Git; si lo que se quiere es stock y panel propio, ir directo a las etapas 1–3.
