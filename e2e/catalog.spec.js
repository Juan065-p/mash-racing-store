import { test, expect } from "./helpers.js";
import { PRODUCTS } from "../src/data/products.js";

const inTienda = (p) => ["ropa", "gorras", "llaveros"].includes(p.category);
const cards = (page) => page.locator("#catalog-grid .product-card");

test("catálogo F1 sin filtros muestra todos los productos de ropa, gorras y llaveros", async ({ page }) => {
  await page.goto("/tienda");
  await expect(cards(page)).toHaveCount(PRODUCTS.filter(inTienda).length);
});

test("?equipo=Ferrari filtra, marca el chip y refleja la URL", async ({ page }) => {
  await page.goto("/tienda?equipo=Ferrari");
  const expected = PRODUCTS.filter((p) => inTienda(p) && p.team === "Ferrari");
  await expect(cards(page)).toHaveCount(expected.length);
  for (const p of expected) await expect(page.getByRole("heading", { name: p.name, exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: /Ferrari/ }).filter({ hasText: String(expected.length) }).first()).toHaveAttribute("aria-current", "true");
});

test("combinar tipo + equipo, y la URL se actualiza al pulsar chips", async ({ page }) => {
  await page.goto("/tienda");
  await page.getByRole("group", { name: "Filtrar por escudería" }).getByRole("link", { name: /Mercedes/ }).click();
  await expect(page).toHaveURL(/\/tienda\?equipo=Mercedes$/);
  await page.getByRole("group", { name: "Filtrar por tipo de producto" }).getByRole("link", { name: /Camisas/ }).click();
  await expect(page).toHaveURL(/tipo=camisa/);
  await expect(page).toHaveURL(/equipo=Mercedes/);
  const expected = PRODUCTS.filter((p) => inTienda(p) && p.team === "Mercedes" && p.tipo === "camisa");
  await expect(cards(page)).toHaveCount(expected.length);
  // recarga conserva el estado
  await page.reload();
  await expect(cards(page)).toHaveCount(expected.length);
});

test("combinación sin resultados muestra estado vacío y permite limpiar", async ({ page }) => {
  await page.goto("/tienda?tipo=chaqueta&equipo=Ferrari");
  await expect(page.getByText("No hay productos con esta combinación")).toBeVisible();
  await page.getByRole("link", { name: "Quitar filtros" }).last().click();
  await expect(cards(page)).toHaveCount(PRODUCTS.filter(inTienda).length);
});

test("parámetros inválidos se ignoran", async ({ page }) => {
  await page.goto("/tienda?equipo=Nada&tipo=zzz");
  await expect(cards(page)).toHaveCount(PRODUCTS.filter(inTienda).length);
});

test("enlaces antiguos ?cat= llevan al destino correcto", async ({ page }) => {
  await page.goto("/tienda?cat=gorras");
  await expect(page).toHaveURL(/\/tienda\?tipo=gorra$/);
  await expect(cards(page)).toHaveCount(PRODUCTS.filter((p) => p.tipo === "gorra").length);

  await page.goto("/tienda?cat=llaveros");
  await expect(cards(page)).toHaveCount(PRODUCTS.filter((p) => p.category === "llaveros").length);

  await page.goto("/tienda?cat=motogp");
  await expect(page).toHaveURL(/\/motogp$/);
  await page.goto("/tienda?cat=escala");
  await expect(page).toHaveURL(/\/escala$/);
  await page.goto("/tienda?cat=ropa&tipo=chaqueta");
  await expect(page).toHaveURL(/\/tienda\?tipo=chaqueta$/);
  await expect(cards(page)).toHaveCount(PRODUCTS.filter((p) => p.tipo === "chaqueta").length);
});

test("MotoGP filtra por tipo vía URL", async ({ page }) => {
  await page.goto("/motogp?tipo=polo");
  await expect(cards(page)).toHaveCount(PRODUCTS.filter((p) => p.category === "motogp" && p.tipo === "polo").length);
  await page.goto("/motogp");
  await expect(cards(page)).toHaveCount(PRODUCTS.filter((p) => p.category === "motogp").length);
});

test("Escala filtra por escudería vía URL", async ({ page }) => {
  await page.goto("/escala?equipo=Ferrari");
  await expect(cards(page)).toHaveCount(PRODUCTS.filter((p) => p.category === "escala" && p.team === "Ferrari").length);
});

test("los destinos del menú desplegable filtran de verdad (ninguno promete contenido inexistente)", async ({ page, isMobile }) => {
  test.skip(isMobile, "El mega-menú es solo de escritorio; el móvil se prueba en cart/mobile");
  await page.goto("/");
  const links = await page.$$eval(".nav-dropdown a[href^='/']", (as) => as.map((a) => a.getAttribute("href")));
  expect(links.length).toBeGreaterThan(10);
  for (const href of links) {
    if (!href.includes("?")) continue;
    await page.goto(href);
    const n = await page.locator("#catalog-grid .product-card").count();
    expect(n, `${href} no debe estar vacío`).toBeGreaterThan(0);
  }
});

test("la ruta de catálogo no tiene filtros de equipos MotoGP inexistentes", async ({ page }) => {
  await page.goto("/motogp");
  await expect(page.getByRole("group", { name: "Filtrar por escudería" })).toHaveCount(0);
});
