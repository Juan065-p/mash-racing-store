import { formatPrice } from "./format.js";
import { computeTotals, whatsappLink } from "./shop.js";

/** Un ítem guardado es { id, size, qty }. Misma forma que el carrito heredado ("mash_cart"). */

export function addItem(items, id, size = "Única", qty = 1) {
  const i = items.findIndex((x) => x.id === id && x.size === size);
  if (i === -1) return [...items, { id, size, qty }];
  return items.map((x, k) => (k === i ? { ...x, qty: x.qty + qty } : x));
}

export function removeItem(items, id, size) {
  return items.filter((x) => !(x.id === id && x.size === size));
}

export function setQty(items, id, size, qty) {
  if (qty <= 0) return removeItem(items, id, size);
  return items.map((x) => (x.id === id && x.size === size ? { ...x, qty } : x));
}

/** Une los ítems con su producto; descarta ids que ya no existen en el catálogo. */
export function toLines(items, products) {
  const byId = new Map(products.map((p) => [p.id, p]));
  return items
    .map((it) => ({ ...it, product: byId.get(it.id) }))
    .filter((l) => l.product && Number.isFinite(l.qty) && l.qty > 0);
}

export const countItems = (lines) => lines.reduce((s, l) => s + l.qty, 0);
export const subtotalOf = (lines) => lines.reduce((s, l) => s + l.product.price * l.qty, 0);

export function sanitizeStored(raw) {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((x) => x && Number.isInteger(x.id) && Number.isInteger(x.qty) && x.qty > 0)
    .map((x) => ({ id: x.id, size: typeof x.size === "string" ? x.size : "Única", qty: x.qty }));
}

export function buildWhatsAppMessage(lines) {
  const totals = computeTotals(subtotalOf(lines));
  const rows = lines.map(
    (l) =>
      `• ${l.product.name} | Talla: ${l.size} | Cant: ${l.qty} | ${formatPrice(l.product.price * l.qty)}`,
  );
  return [
    "Hola Mash Racing! 🏎️",
    "",
    "Quiero hacer el siguiente pedido:",
    "",
    ...rows,
    "",
    `Subtotal: ${formatPrice(totals.subtotal)}`,
    `Envío: ${totals.freeShipping ? "Gratis" : formatPrice(totals.shipping)}`,
    `*Total: ${formatPrice(totals.total)}*`,
    "",
    "Por favor confirmen disponibilidad. ¡Gracias!",
  ].join("\n");
}

export const buildWhatsAppUrl = (lines) => whatsappLink(buildWhatsAppMessage(lines));
