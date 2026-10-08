import { test, expect, norm, money } from "./helpers.js";
import { PRODUCTS } from "../src/data/products.js";

const byName = (n) => PRODUCTS.find((p) => p.name === n);
const card = (page, name) =>
  page.locator("#catalog-grid .product-card").filter({ has: page.getByRole("heading", { name, exact: true }) });

test("ropa exige elegir talla; gorra (talla única) se añade directo", async ({ page }) => {
  await page.goto("/tienda");
  const camiseta = card(page, "Camiseta Hamilton #44");
  await camiseta.getByRole("button", { name: /Añadir al carrito/ }).click();
  await expect(camiseta.getByText("Elige una talla")).toBeVisible();
  await expect(page.getByRole("banner").getByRole("link", { name: "Carrito", exact: true })).toBeVisible();

  await camiseta.getByRole("radio", { name: "M", exact: true }).click();
  await camiseta.getByRole("button", { name: /Añadir al carrito/ }).click();
  await expect(page.getByRole("link", { name: "Carrito, 1 artículo" })).toBeVisible();

  const gorra = card(page, "Gorra Mercedes AMG F1");
  await gorra.getByRole("button", { name: /Añadir al carrito/ }).click();
  await expect(page.getByRole("link", { name: "Carrito, 2 artículos" })).toBeVisible();
});

test("regresión: cambiar filtros varias veces y añadir UNA vez suma 1 unidad (el sitio antiguo sumaba N)", async ({
  page,
}) => {
  await page.goto("/tienda");
  const tipos = page.getByRole("group", { name: "Filtrar por tipo de producto" });
  for (const n of [/Polos/, /Camisas/, /Polos/, /Todos/]) await tipos.getByRole("link", { name: n }).click();
  const gorra = card(page, "Gorra Mercedes AMG F1");
  await gorra.getByRole("button", { name: /Añadir al carrito/ }).click();
  await expect(page.getByRole("link", { name: "Carrito, 1 artículo" })).toBeVisible();
});

test("carrito: persiste al recargar; cantidades, subtotal, envío y texto de WhatsApp coherentes", async ({ page }) => {
  const camiseta = byName("Camiseta Hamilton #44"); // 75.000
  const gorra = byName("Gorra Mercedes AMG F1"); // 60.000
  await page.goto("/tienda");
  const c = card(page, camiseta.name);
  await c.getByRole("radio", { name: "L", exact: true }).click();
  await c.getByRole("button", { name: /Añadir al carrito/ }).click();
  await card(page, gorra.name).getByRole("button", { name: /Añadir al carrito/ }).click();

  await page.goto("/carrito");
  await page.reload(); // persistencia
  const items = page.locator(".cart-item");
  await expect(items).toHaveCount(2);

  // 75.000 + 60.000 = 135.000 < 150.000 → envío 12.000
  let subtotal = camiseta.price + gorra.price;
  await expect(page.locator(".summary-row").filter({ hasText: "Subtotal" })).toContainText(norm(money(subtotal)));
  await expect(page.locator(".summary-row").filter({ hasText: "Envío" })).toContainText(norm(money(12000)));
  await expect(page.getByTestId("cart-total")).toHaveText(norm(money(subtotal + 12000)));
  await expect(page.getByText(/Te faltan/)).toBeVisible();

  // +1 camiseta → 210.000 ≥ 150.000 → envío gratis
  await items.filter({ hasText: camiseta.name }).getByRole("button", { name: /Añadir una unidad/ }).click();
  subtotal += camiseta.price;
  await expect(page.getByTestId("cart-total")).toHaveText(norm(money(subtotal)));
  await expect(page.locator(".summary-row").filter({ hasText: "Envío" })).toContainText("Gratis");
  await expect(items.filter({ hasText: camiseta.name }).locator(".qty-val")).toHaveText("2");

  // Cada clic suma exactamente 1 (bug del sitio antiguo: listeners duplicados)
  await items.filter({ hasText: gorra.name }).getByRole("button", { name: /Añadir una unidad/ }).click();
  await items.filter({ hasText: gorra.name }).getByRole("button", { name: /Añadir una unidad/ }).click();
  await expect(items.filter({ hasText: gorra.name }).locator(".qty-val")).toHaveText("3");
  subtotal += 2 * gorra.price;

  // WhatsApp
  const wa = page.getByTestId("whatsapp-checkout");
  const href = await wa.getAttribute("href");
  expect(href).toMatch(/^https:\/\/wa\.me\/573156532989\?text=/);
  const text = norm(decodeURIComponent(href.split("?text=")[1]));
  expect(text).toContain(`• Camiseta Hamilton #44 | Talla: L | Cant: 2 | ${norm(money(camiseta.price * 2))}`);
  expect(text).toContain(`• Gorra Mercedes AMG F1 | Talla: Única | Cant: 3 | ${norm(money(gorra.price * 3))}`);
  expect(text).toContain(`Subtotal: ${norm(money(subtotal))}`);
  expect(text).toContain("Envío: Gratis");
  expect(text).toContain(`*Total: ${norm(money(subtotal))}*`);
  expect(await wa.getAttribute("target")).toBe("_blank");
  expect(await wa.getAttribute("rel")).toContain("noopener");

  // Persistencia tras otra recarga, quitar ítem y vaciar
  await page.reload();
  await expect(items).toHaveCount(2);
  await items.filter({ hasText: gorra.name }).getByRole("button", { name: /Eliminar/ }).click();
  await expect(items).toHaveCount(1);
  await page.getByRole("button", { name: "Vaciar carrito" }).click();
  await expect(page.getByText("Tu carrito está vacío")).toBeVisible();
});

test("envío por debajo del umbral: llavero (8.000) + 12.000 de envío", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("mash_cart", JSON.stringify([{ id: 5, size: "Única", qty: 1 }])));
  await page.goto("/carrito");
  await expect(page.getByTestId("cart-total")).toHaveText(norm(money(8000 + 12000)));
});

test("envío gratis exactamente en 150.000", async ({ page }) => {
  // 2 × Polo 110.000 no sirve; 150.000 = 2 × Camiseta 75.000
  await page.addInitScript(() => localStorage.setItem("mash_cart", JSON.stringify([{ id: 1, size: "S", qty: 2 }])));
  await page.goto("/carrito");
  await expect(page.locator(".summary-row").filter({ hasText: "Envío" })).toContainText("Gratis");
  await expect(page.getByTestId("cart-total")).toHaveText(norm(money(150000)));
});

test("compatibilidad con carritos del sitio antiguo (mash_cart) y limpieza de datos corruptos", async ({ page }) => {
  await page.addInitScript(() => {
    if (sessionStorage.getItem("seeded")) return;
    sessionStorage.setItem("seeded", "1");
    localStorage.setItem(
      "mash_cart",
      JSON.stringify([
        { id: 1, size: "M", qty: 2 },
        { id: 99999, size: "S", qty: 1 }, // producto que ya no existe
        { id: 3, size: "Única", qty: -4 }, // cantidad inválida
      ]),
    );
  });
  await page.goto("/carrito");
  await expect(page.locator(".cart-item")).toHaveCount(1);
  await expect(page.locator(".cart-item .qty-val")).toHaveText("2");

  await page.evaluate(() => localStorage.setItem("mash_cart", "{no es json"));
  await page.reload();
  await expect(page.getByText("Tu carrito está vacío")).toBeVisible();
});

test("el título 'Tu carrito' no queda oculto bajo la barra de navegación (bug calc() heredado)", async ({ page }) => {
  await page.goto("/carrito");
  const h1 = await page.locator("h1").boundingBox();
  const nav = await page.locator(".navbar").boundingBox();
  expect(h1.y).toBeGreaterThanOrEqual(nav.y + nav.height - 1);
});

test("estado vacío del carrito lleva a la tienda", async ({ page }) => {
  await page.goto("/carrito");
  await page.getByRole("link", { name: "Ver tienda" }).click();
  await expect(page).toHaveURL(/\/tienda$/);
});
