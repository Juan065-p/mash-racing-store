import { useEffect, useSyncExternalStore } from "react";

/** Actualiza <title> y meta description al navegar (el HTML prerenderizado ya trae los de cada ruta). */
export function useDocumentMeta(title, description) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      let el = document.head.querySelector('meta[name="description"]');
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", "description");
        document.head.appendChild(el);
      }
      el.setAttribute("content", description);
    }
  }, [title, description]);
}

/** Marca .reveal como .visible al entrar al viewport (o de inmediato con prefers-reduced-motion). */
export function useReveal(key) {
  useEffect(() => {
    const els = [...document.querySelectorAll(".reveal:not(.visible)")];
    if (!els.length) return;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("visible"));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [key]);
}

const noop = () => () => {};

/**
 * false en el servidor y durante la hidratación; true después.
 * El HTML prerenderizado no conoce la query string (?tipo=…), así que el primer render del cliente
 * debe coincidir con él y luego aplicar los filtros reales.
 */
export function useHydrated() {
  return useSyncExternalStore(noop, () => true, () => false);
}
