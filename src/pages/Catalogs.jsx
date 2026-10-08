import CatalogPage from "../components/CatalogPage.jsx";
import { MOTOGP_TIPOS, TIENDA_TIPOS } from "../lib/filters.js";

export function Tienda() {
  return (
    <CatalogPage
      route="/tienda"
      breadcrumb="F1 Ropa"
      eyebrow="Colección F1"
      title="Ropa & Accesorios"
      titleAccent="F1"
      intro="Camisas, polos, chaquetas, gorras y llaveros de las escuderías de Fórmula 1. Envíos a toda Colombia."
      categories={["ropa", "gorras", "llaveros"]}
      tipoOptions={TIENDA_TIPOS}
      teamFilter
      legacyCat
    />
  );
}

export function MotoGP() {
  return (
    <CatalogPage
      route="/motogp"
      breadcrumb="MotoGP"
      eyebrow="Colección MotoGP"
      title="Ropa"
      titleAccent="MotoGP"
      intro="Jerseys y polos de pilotos y equipos del mundial de MotoGP. Envíos a toda Colombia."
      categories={["motogp"]}
      tipoOptions={MOTOGP_TIPOS}
      accent="yellow"
    />
  );
}

export function Escala() {
  return (
    <CatalogPage
      route="/escala"
      breadcrumb="Autos a Escala"
      eyebrow="Coleccionables F1"
      title="Autos"
      titleAccent="a Escala"
      intro="Réplicas coleccionables F1 a escala 1:64 de Ferrari, Red Bull, Mercedes y McLaren. Envíos a toda Colombia."
      categories={["escala"]}
      teamFilter
    />
  );
}
