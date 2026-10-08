import { test as base, expect } from "@playwright/test";

/** Falla cualquier prueba si hay errores de JS, errores de hidratación o violaciones de CSP. */
export const test = base.extend({
  page: async ({ page }, use) => {
    const problems = [];
    // Pruebas herméticas: nada de terceros (fuentes, CDN, imágenes remotas). Las imágenes caen al emoji.
    await page.route(/^https?:\/\/(?!localhost)/, (route) => route.abort());
    page.on("pageerror", (e) => problems.push(`pageerror: ${e.message}`));
    page.on("console", (m) => {
      if (m.type() !== "error") return;
      const t = m.text();
      // Imágenes remotas caídas no son un fallo del código; sí lo son CSP e hidratación.
      if (/Failed to load resource/.test(t) && !/Content Security Policy/i.test(t)) return;
      problems.push(`console.error: ${t}`);
    });
    await use(page);
    expect(problems, problems.join("\n")).toEqual([]);
  },
});

export { expect };

export const money = (n) => new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);

/** Normaliza espacios no separables que Intl inserta. */
export const norm = (s) => s.replace(/ /g, " ");
