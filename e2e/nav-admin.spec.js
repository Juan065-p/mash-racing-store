import { test, expect } from "./helpers.js";

test("menú móvil: abre, enlaza a secciones con filtro y se cierra al navegar", async ({ page, isMobile }) => {
  test.skip(!isMobile, "solo móvil");
  await page.goto("/");
  const burger = page.getByRole("button", { name: "Abrir menú" });
  await expect(burger).toHaveAttribute("aria-expanded", "false");
  await burger.click();
  await expect(page.getByRole("button", { name: "Cerrar menú" })).toHaveAttribute("aria-expanded", "true");
  await page.locator("#mobile-menu").getByRole("link", { name: "F1 Ropa: Ferrari" }).click();
  await expect(page).toHaveURL(/\/tienda\?equipo=Ferrari/);
  await expect(page.locator("#mobile-menu")).toBeHidden();
  await page.getByRole("button", { name: "Abrir menú" }).click();
  await page.keyboard.press("Escape");
  await expect(page.locator("#mobile-menu")).toBeHidden();
});

test("navegación por teclado: el desplegable de escritorio se abre con foco", async ({ page, isMobile }) => {
  test.skip(isMobile, "solo escritorio");
  await page.goto("/");
  await page.locator(".nav-links > li.has-dropdown > a").first().focus();
  await expect(page.locator(".nav-dropdown").first()).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(page.locator(".nav-dropdown a").first()).toBeFocused();
});

test("enlace 'saltar al contenido' existe y apunta a main", async ({ page }) => {
  await page.goto("/tienda");
  await expect(page.locator("a.skip-link")).toHaveAttribute("href", "#contenido");
  await expect(page.locator("main#contenido")).toHaveCount(1);
});

test("admin: sin contraseña predeterminada, sin campos de token ni uso de localStorage/GitHub", async ({ page }) => {
  await page.goto("/admin");
  await expect(page.locator("input")).toHaveCount(0);
  const html = await page.content();
  expect(html).not.toMatch(/mash2026|ghp_|api\.github\.com|mr_gh_token|mr_admin_pass/);
  const keys = await page.evaluate(() => Object.keys(localStorage));
  expect(keys.filter((k) => /^mr_/.test(k))).toEqual([]);
});

test("los enlaces externos abren con rel seguro", async ({ page }) => {
  await page.goto("/");
  const rels = await page.$$eval("a[target=_blank]", (as) => as.map((a) => a.rel));
  expect(rels.length).toBeGreaterThan(2);
  for (const rel of rels) expect(rel).toContain("noopener");
});
