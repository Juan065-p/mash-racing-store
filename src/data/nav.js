import { F1_TEAMS, MOTOGP_TIPOS, TIENDA_TIPOS } from "../lib/filters.js";
import { INSTAGRAM_URL, whatsappLink } from "../lib/shop.js";

/** Menú principal. Todo destino apunta a una página/filtro que realmente existe. */
export const NAV = [
  { label: "Inicio", to: "/" },
  {
    label: "F1 Ropa",
    to: "/tienda",
    columns: [
      {
        title: "Escuderías",
        icon: "ti-flag-checkered",
        links: F1_TEAMS.map((t) => ({
          label: t.label,
          to: `/tienda?equipo=${t.value}`,
          icon: "ti-flag-checkered",
        })),
        all: { label: "Ver todas las escuderías", to: "/tienda" },
      },
      {
        title: "Categorías",
        icon: "ti-shirt",
        links: TIENDA_TIPOS.map((t) => ({
          label: t.label,
          to: `/tienda?tipo=${t.value}`,
          icon: t.icon,
        })),
        all: { label: "Ver todo F1", to: "/tienda" },
      },
    ],
  },
  {
    label: "MotoGP",
    to: "/motogp",
    columns: [
      {
        title: "Ropa MotoGP",
        icon: "ti-shirt",
        links: MOTOGP_TIPOS.map((t) => ({
          label: t.label,
          to: `/motogp?tipo=${t.value}`,
          icon: t.icon,
        })),
        all: { label: "Ver todo MotoGP", to: "/motogp" },
      },
    ],
  },
  {
    label: "Escala",
    to: "/escala",
    columns: [
      {
        title: "Carros a escala 1:64",
        icon: "ti-car",
        links: F1_TEAMS.filter((t) => ["Ferrari", "RedBull", "Mercedes", "McLaren"].includes(t.value)).map(
          (t) => ({ label: t.label, to: `/escala?equipo=${t.value}`, icon: "ti-car" }),
        ),
        all: { label: "Ver toda la colección", to: "/escala" },
      },
    ],
  },
  {
    label: "Contacto",
    href: whatsappLink(),
    columns: [
      {
        title: "Escríbenos",
        icon: "ti-message",
        links: [
          { label: "WhatsApp", href: whatsappLink(), icon: "ti-brand-whatsapp" },
          { label: "@mash.racing2", href: INSTAGRAM_URL, icon: "ti-brand-instagram" },
        ],
      },
    ],
  },
];

export const FOOTER_CATEGORIES = [
  { label: "Ropa F1", to: "/tienda" },
  { label: "Gorras", to: "/tienda?tipo=gorra" },
  { label: "Llaveros", to: "/tienda?tipo=llavero" },
  { label: "MotoGP", to: "/motogp" },
  { label: "Carros a escala", to: "/escala" },
];

export const ANNOUNCEMENTS = [
  { icon: "ti-truck", text: "Envíos a toda Colombia" },
  { icon: "ti-brand-whatsapp", text: "Pedidos por WhatsApp" },
  { icon: "ti-gift", text: "Envío gratis desde $150.000" },
  { icon: "ti-star", text: "Colecciones F1 y MotoGP" },
];
