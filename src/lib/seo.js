/**
 * Metadatos por ruta. Los títulos y descripciones conservan los del sitio estático
 * (para no perder posicionamiento), salvo las afirmaciones de "oficial" no verificadas.
 * SITE_URL es opcional: si VITE_SITE_URL no está definida no se emite canonical ni og:url.
 */
export const SITE_NAME = "Mash Racing Store";
export const SITE_URL = (import.meta.env?.VITE_SITE_URL ?? "").replace(/\/+$/, "");

export const ROUTE_META = {
  "/": {
    title: "Mash Racing Store — Ropa F1 & MotoGP Colombia",
    description:
      "Tienda de merchandising F1 y MotoGP en Colombia. Ropa, gorras, llaveros y carros escala de tus escuderías favoritas. Envíos a todo el país.",
  },
  "/tienda": {
    title: "F1 Ropa — Mash Racing Store",
    description:
      "Camisas, polos, gorras y chaquetas de Fórmula 1. Colección por escudería: Ferrari, Red Bull, Mercedes, McLaren, Alpine, Aston Martin. Envíos a toda Colombia.",
  },
  "/motogp": {
    title: "MotoGP — Mash Racing Store",
    description:
      "Ropa MotoGP: jerseys y polos de tus pilotos y equipos favoritos. Envíos a toda Colombia.",
  },
  "/escala": {
    title: "Autos a Escala — Mash Racing Store",
    description:
      "Carros a escala F1 coleccionables. Réplicas Bburago 1:64 de Ferrari, Red Bull, Mercedes y McLaren. Envíos a toda Colombia.",
  },
  "/carrito": {
    title: "Carrito — Mash Racing Store",
    description: "Revisa tu pedido y envíalo por WhatsApp.",
    noindex: true,
  },
  "/admin": {
    title: "Panel de administración — Mash Racing Store",
    description: "Panel de administración en preparación.",
    noindex: true,
  },
  "/404": {
    title: "Página no encontrada — Mash Racing Store",
    description: "La página que buscas no existe.",
    noindex: true,
  },
};

export const PRERENDER_ROUTES = Object.keys(ROUTE_META).filter((r) => r !== "/404");

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/** Cadena <title>/<meta> para inyectar en el <head> de cada página prerenderizada. */
export function headTags(route) {
  const m = ROUTE_META[route] ?? ROUTE_META["/404"];
  const url = SITE_URL ? SITE_URL + (route === "/" ? "/" : route) : "";
  return [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    m.noindex ? `<meta name="robots" content="noindex, follow" />` : "",
    url ? `<link rel="canonical" href="${esc(url)}" />` : "",
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="es_CO" />`,
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    url ? `<meta property="og:url" content="${esc(url)}" />` : "",
  ]
    .filter(Boolean)
    .join("\n    ");
}
