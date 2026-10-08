import { test, expect } from "./helpers.js";

const ROUTES = [
  ["/", /Mash Racing Store — Ropa F1 & MotoGP Colombia/, "MASH"],
  ["/tienda", /F1 Ropa — Mash Racing Store/, "Ropa & Accesorios"],
  ["/motogp", /MotoGP — Mash Racing Store/, "Ropa MotoGP"],
  ["/escala", /Autos a Escala — Mash Racing Store/, "Autos a Escala"],
  ["/carrito", /Carrito — Mash Racing Store/, "Tu carrito"],
];

for (const [path, title, h1] of ROUTES) {
  test(`URL directa ${path}: 200, título y h1 correctos, sin errores de consola`, async ({ page }) => {
    const res = await page.goto(path);
    expect(res.status()).toBe(200);
    await expect(page).toHaveTitle(title);
    await expect(page.locator("h1")).toContainText(h1);
    await page.reload();
    await expect(page).toHaveTitle(title);
  });
}

test("URLs antiguas .html redirigen (301) conservando parámetros", async ({ request }) => {
  const cases = [
    ["/index.html", "/"],
    ["/tienda.html", "/tienda"],
    ["/tienda.html?equipo=Ferrari", "/tienda?equipo=Ferrari"],
    ["/motogp.html", "/motogp"],
    ["/escala.html", "/escala"],
    ["/carrito.html", "/carrito"],
    ["/admin/index.html", "/admin"],
  ];
  for (const [from, to] of cases) {
    const r = await request.get(from, { maxRedirects: 0 });
    expect(r.status(), from).toBe(301);
    expect(r.headers().location, from).toBe(to);
  }
});

test("ruta inexistente devuelve 404 con página propia", async ({ page }) => {
  const res = await page.goto("/no-existe");
  expect(res.status()).toBe(404);
  await expect(page.locator("h1")).toContainText("Página no encontrada");
});

test("cabeceras de seguridad presentes y CSP no bloquea la página", async ({ page }) => {
  const res = await page.goto("/");
  const h = res.headers();
  expect(h["content-security-policy"]).toContain("default-src 'self'");
  expect(h["x-frame-options"]).toBe("DENY");
  await expect(page.locator(".hero-title")).toBeVisible();
});

test("robots.txt no indexa carrito ni admin", async ({ request }) => {
  const txt = await (await request.get("/robots.txt")).text();
  expect(txt).toContain("Disallow: /carrito");
  expect(txt).toContain("Disallow: /admin");
});

test("los enlaces internos del menú y la home apuntan a destinos existentes", async ({ page, request, baseURL }) => {
  await page.goto("/");
  const hrefs = await page.$$eval("a[href^='/']", (as) => [...new Set(as.map((a) => a.getAttribute("href")))]);
  expect(hrefs.length).toBeGreaterThan(15);
  for (const href of hrefs) {
    const r = await request.get(baseURL + href.split("?")[0]);
    expect(r.status(), href).toBe(200);
  }
});
