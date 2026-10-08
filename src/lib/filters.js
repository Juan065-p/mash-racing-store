/**
 * Filtros del catálogo. Fuente de verdad: parámetros de URL.
 *   /tienda  ?tipo=camisa|polo|chaqueta|gorra|llavero  &equipo=Ferrari|RedBull|...
 *   /motogp  ?tipo=jersey|polo
 *   /escala  ?equipo=Ferrari|RedBull|...
 * Enlaces antiguos con ?cat= se redirigen (ver legacyCatalogTarget).
 */
export const TIENDA_CATEGORIES = ["ropa", "gorras", "llaveros"];

export const TIENDA_TIPOS = [
  { value: "camisa", label: "Camisas", icon: "ti-shirt" },
  { value: "polo", label: "Polos", icon: "ti-shirt" },
  { value: "chaqueta", label: "Chaquetas", icon: "ti-jacket" },
  { value: "gorra", label: "Gorras", icon: "ti-hanger" },
  { value: "llavero", label: "Llaveros", icon: "ti-key" },
];

export const MOTOGP_TIPOS = [
  { value: "jersey", label: "Jerseys", icon: "ti-shirt" },
  { value: "polo", label: "Polos", icon: "ti-shirt" },
];

/** Escuderías con al menos un producto (value = p.team). */
export const F1_TEAMS = [
  { value: "Ferrari", label: "Ferrari", flag: "🇮🇹", color: "#E8002D" },
  { value: "RedBull", label: "Red Bull", flag: "🇦🇹", color: "#3671C6" },
  { value: "Mercedes", label: "Mercedes", flag: "🇩🇪", color: "#27F4D2" },
  { value: "McLaren", label: "McLaren", flag: "🇬🇧", color: "#FF8000" },
  { value: "Alpine", label: "Alpine", flag: "🇫🇷", color: "#0093CC" },
  { value: "AstonMartin", label: "Aston Martin", flag: "🇬🇧", color: "#358C75" },
];

/**
 * Enlaces antiguos /tienda?cat=… : devuelve el destino canónico, o null si no hay `cat`.
 * Conserva el resto de parámetros.
 */
export function legacyCatalogTarget(params) {
  const cat = params.get("cat");
  if (cat === null) return null;
  const rest = new URLSearchParams(params);
  rest.delete("cat");
  const build = (pathname, extra = {}) => {
    const q = new URLSearchParams(rest);
    Object.entries(extra).forEach(([k, v]) => q.set(k, v));
    const s = q.toString();
    return { pathname, search: s ? `?${s}` : "" };
  };
  switch (cat) {
    case "motogp":
      return build("/motogp");
    case "escala":
      return build("/escala");
    case "gorras":
      return build("/tienda", { tipo: "gorra" });
    case "llaveros":
      return build("/tienda", { tipo: "llavero" });
    default: // "ropa" u otro valor: catálogo completo
      return build("/tienda");
  }
}

const valid = (value, options) => (options.some((o) => o.value === value) ? value : null);

export function readTiendaFilters(params) {
  return {
    tipo: valid(params.get("tipo"), TIENDA_TIPOS),
    equipo: valid(params.get("equipo"), F1_TEAMS),
  };
}

export const readMotogpFilters = (params) => ({ tipo: valid(params.get("tipo"), MOTOGP_TIPOS) });
export const readEscalaFilters = (params) => ({ equipo: valid(params.get("equipo"), F1_TEAMS) });

export function filterProducts(products, { categories, tipo, equipo }) {
  return products.filter(
    (p) =>
      (!categories || categories.includes(p.category)) &&
      (!tipo || p.tipo === tipo) &&
      (!equipo || p.team === equipo),
  );
}

/** Devuelve nuevos params con `key` fijado (o eliminado si value es null). */
export function withParam(params, key, value) {
  const next = new URLSearchParams(params);
  if (value) next.set(key, value);
  else next.delete(key);
  return next;
}
