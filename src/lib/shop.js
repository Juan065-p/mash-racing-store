/** Constantes comerciales vigentes (heredadas del sitio estático). */
export const WHATSAPP_NUMBER = "573156532989";
export const INSTAGRAM_URL = "https://www.instagram.com/mash.racing2";
export const FREE_SHIPPING_FROM = 150000; // COP
export const SHIPPING_COST = 12000; // COP

export const whatsappLink = (text) =>
  `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export function computeTotals(subtotal) {
  const free = subtotal >= FREE_SHIPPING_FROM;
  const shipping = subtotal === 0 || free ? 0 : SHIPPING_COST;
  return {
    subtotal,
    shipping,
    freeShipping: free,
    total: subtotal + shipping,
    missingForFree: free || subtotal === 0 ? 0 : FREE_SHIPPING_FROM - subtotal,
  };
}
