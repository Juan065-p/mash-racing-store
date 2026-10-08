# Embudo medible y esquema de eventos (propuesta)

**Estado:** no hay ninguna herramienta analítica configurada en el repositorio (ni GA4, ni Plausible, ni Meta Pixel, ni PostHog), por lo que **no se implementó instrumentación**. Este documento deja el esquema listo para cablear en un solo lugar cuando el propietario elija herramienta.

## Embudo

```
Vista de categoría → Filtro aplicado → Producto añadido → Carrito visto → Pedido iniciado (clic en WhatsApp)
```

El "pedido iniciado" es el último evento observable: el sitio no puede saber si la conversación de WhatsApp terminó en venta. La conversión real hay que cerrarla manualmente (p. ej. contando pedidos confirmados por semana y comparándolos con `begin_whatsapp_order`).

## Eventos

Nombres en `snake_case`, compatibles con GA4 (`view_item_list`, `add_to_cart`, `begin_checkout` son nombres recomendados por GA4; se proponen alias propios si se usa otra herramienta).

| Evento | Cuándo | Dónde engancharlo | Parámetros |
|---|---|---|---|
| `view_category` | Al mostrar `/tienda`, `/motogp` o `/escala` (y al cambiar de filtro, ya con la URL final) | `CatalogPage` (efecto sobre `pathname` + filtros) | `category` (`f1`\|`motogp`\|`escala`), `results` (n), `tipo`, `equipo` |
| `apply_filter` | Clic en un chip de tipo/escudería | `Chip` en `CatalogPage` | `category`, `filter_name` (`tipo`\|`equipo`), `filter_value`, `results` |
| `clear_filters` | Clic en "Quitar filtros" | `CatalogPage` | `category`, `results` |
| `select_size` | Elegir talla en una tarjeta | `ProductCard` | `product_id`, `size` |
| `size_required_prompt` | Se pulsa "Añadir" sin talla | `ProductCard` | `product_id` (mide fricción del selector) |
| `add_to_cart` | Producto añadido | `cartActions.add` (único punto) | `product_id`, `product_name`, `category`, `team`, `size`, `price` (COP), `quantity`=1, `source` (`home_featured`\|`catalog`) |
| `remove_from_cart` | Eliminar / cantidad a 0 | `cartActions.remove/setQty` | `product_id`, `size` |
| `view_cart` | Montaje de `/carrito` con ítems | `Carrito` | `items`, `subtotal`, `shipping`, `free_shipping` (bool), `value` |
| `begin_whatsapp_order` | Clic en "Pedir por WhatsApp" (botón de resumen o barra fija) | `Carrito` (`onClick`) | `items`, `subtotal`, `shipping`, `value`, `currency`=`COP`, `cta_location` (`summary`\|`sticky`) |
| `click_contact` | Clic en WhatsApp/Instagram fuera del carrito | `Layout`, `Home` | `channel`, `location` |

`currency` = `COP` y `value` en pesos enteros. No enviar texto libre ni datos personales (el mensaje de WhatsApp incluye el pedido pero no nombre ni teléfono del cliente; no registrarlo).

## Métricas derivadas

- Tasa filtro→añadir, añadir→carrito visto, carrito→pedido iniciado.
- Tasa de `size_required_prompt` por producto (si es alta, mostrar la talla más vendida primero o una guía de tallas).
- Ticket medio y % de pedidos que alcanzan envío gratis (`free_shipping`), antes y después de la barra de progreso.
- Categorías/escuderías más vistas vs. más añadidas (para decidir qué foto/inventario priorizar).
- Búsquedas sin resultado de filtros (`view_category` con `results = 0`).

## Cómo cablearlo

Crear `src/lib/analytics.js` con una única función `track(name, params)` que delegue en la herramienta elegida (y no haga nada sin consentimiento, si aplica la normativa colombiana de habeas data / Ley 1581 y se usan cookies de marketing). Llamarla desde los puntos de la tabla; `cartActions` y `CatalogPage` concentran casi todos. Pruebas: reutilizar `e2e/` interceptando `window.dataLayer` o la petición de red.

**Dato que necesito:** qué herramienta quiere usar el propietario (GA4, Plausible, Meta Pixel…) y si hay consentimiento de cookies.
