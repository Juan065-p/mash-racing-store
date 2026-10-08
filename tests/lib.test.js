import { describe, expect, it } from "vitest";
import { PRODUCTS } from "../src/data/products.js";
import {
  addItem,
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  removeItem,
  sanitizeStored,
  setQty,
  subtotalOf,
  toLines,
} from "../src/lib/cart.js";
import { filterProducts, legacyCatalogTarget, withParam } from "../src/lib/filters.js";
import { FREE_SHIPPING_FROM, SHIPPING_COST, computeTotals } from "../src/lib/shop.js";

const nbsp = (s) => s.replace(/ /g, " ");

describe("carrito (lógica pura)", () => {
  it("suma cantidades del mismo producto y talla, y separa tallas distintas", () => {
    let items = addItem([], 1, "M");
    items = addItem(items, 1, "M");
    items = addItem(items, 1, "L");
    expect(items).toEqual([
      { id: 1, size: "M", qty: 2 },
      { id: 1, size: "L", qty: 1 },
    ]);
  });

  it("setQty <= 0 elimina; remove solo quita la talla indicada", () => {
    const items = [
      { id: 1, size: "M", qty: 2 },
      { id: 1, size: "L", qty: 1 },
    ];
    expect(setQty(items, 1, "M", 0)).toEqual([{ id: 1, size: "L", qty: 1 }]);
    expect(removeItem(items, 1, "L")).toEqual([{ id: 1, size: "M", qty: 2 }]);
    expect(setQty(items, 1, "L", 5)[1].qty).toBe(5);
  });

  it("no muta el arreglo original", () => {
    const items = Object.freeze([Object.freeze({ id: 1, size: "M", qty: 1 })]);
    expect(() => addItem(items, 1, "M")).not.toThrow();
    expect(items[0].qty).toBe(1);
  });

  it("sanitizeStored descarta basura y conserva el formato heredado", () => {
    expect(sanitizeStored(null)).toEqual([]);
    expect(sanitizeStored("x")).toEqual([]);
    expect(
      sanitizeStored([{ id: 1, size: "M", qty: 2 }, { id: "1", qty: 1 }, { id: 2, qty: 0 }, null, { id: 3, qty: 1 }]),
    ).toEqual([
      { id: 1, size: "M", qty: 2 },
      { id: 3, size: "Única", qty: 1 },
    ]);
  });

  it("toLines ignora productos que ya no existen", () => {
    const lines = toLines([{ id: 1, size: "M", qty: 1 }, { id: 99999, size: "S", qty: 1 }], PRODUCTS);
    expect(lines).toHaveLength(1);
    expect(subtotalOf(lines)).toBe(PRODUCTS.find((p) => p.id === 1).price);
  });
});

describe("envío", () => {
  it("vacío: sin envío", () => expect(computeTotals(0).total).toBe(0));
  it("por debajo del umbral cobra el envío", () => {
    const t = computeTotals(FREE_SHIPPING_FROM - 1);
    expect(t.shipping).toBe(SHIPPING_COST);
    expect(t.total).toBe(FREE_SHIPPING_FROM - 1 + SHIPPING_COST);
    expect(t.missingForFree).toBe(1);
  });
  it("en el umbral exacto es gratis", () => {
    const t = computeTotals(FREE_SHIPPING_FROM);
    expect(t.freeShipping).toBe(true);
    expect(t.total).toBe(FREE_SHIPPING_FROM);
  });
  it("constantes comerciales vigentes", () => {
    expect(FREE_SHIPPING_FROM).toBe(150000);
    expect(SHIPPING_COST).toBe(12000);
  });
});

describe("mensaje de WhatsApp", () => {
  const lines = toLines(
    [
      { id: 1, size: "L", qty: 2 },
      { id: 3, size: "Única", qty: 1 },
    ],
    PRODUCTS,
  );

  it("incluye líneas, subtotal, envío y total coherentes", () => {
    const msg = nbsp(buildWhatsAppMessage(lines));
    const sub = 75000 * 2 + 60000; // 210.000 → envío gratis
    expect(msg).toContain("• Camiseta Hamilton #44 | Talla: L | Cant: 2 | $ 150.000");
    expect(msg).toContain("• Gorra Mercedes AMG F1 | Talla: Única | Cant: 1 | $ 60.000");
    expect(msg).toContain(`Subtotal: $ ${sub.toLocaleString("es-CO")}`);
    expect(msg).toContain("Envío: Gratis");
    expect(msg).toContain("*Total: $ 210.000*");
  });

  it("cobra envío por debajo del umbral", () => {
    const one = toLines([{ id: 5, size: "Única", qty: 1 }], PRODUCTS); // llavero 8.000
    const msg = nbsp(buildWhatsAppMessage(one));
    expect(msg).toContain("Envío: $ 12.000");
    expect(msg).toContain("*Total: $ 20.000*");
  });

  it("la URL apunta al número correcto y codifica el texto", () => {
    const url = buildWhatsAppUrl(lines);
    expect(url.startsWith("https://wa.me/573156532989?text=")).toBe(true);
    expect(decodeURIComponent(url.split("?text=")[1])).toBe(buildWhatsAppMessage(lines));
  });
});

describe("filtros", () => {
  const tienda = ["ropa", "gorras", "llaveros"];
  it("filtra por tipo y equipo", () => {
    const r = filterProducts(PRODUCTS, { categories: tienda, tipo: "camisa", equipo: "Mercedes" });
    expect(r.length).toBeGreaterThan(0);
    expect(r.every((p) => p.tipo === "camisa" && p.team === "Mercedes")).toBe(true);
  });
  it("sin filtros devuelve toda la categoría", () => {
    expect(filterProducts(PRODUCTS, { categories: ["motogp"] }).every((p) => p.category === "motogp")).toBe(true);
  });
  it("legacyCatalogTarget normaliza ?cat=", () => {
    const t = (q) => legacyCatalogTarget(new URLSearchParams(q));
    expect(t("")).toBeNull();
    expect(t("cat=motogp")).toEqual({ pathname: "/motogp", search: "" });
    expect(t("cat=escala&equipo=Ferrari")).toEqual({ pathname: "/escala", search: "?equipo=Ferrari" });
    expect(t("cat=gorras")).toEqual({ pathname: "/tienda", search: "?tipo=gorra" });
    expect(t("cat=ropa&tipo=chaqueta")).toEqual({ pathname: "/tienda", search: "?tipo=chaqueta" });
  });
  it("withParam fija y elimina", () => {
    expect(withParam(new URLSearchParams("a=1"), "b", "2").toString()).toBe("a=1&b=2");
    expect(withParam(new URLSearchParams("a=1&b=2"), "b", null).toString()).toBe("a=1");
  });
});

describe("catálogo (integridad de datos)", () => {
  it("ids únicos, precios COP enteros positivos y tallas definidas", () => {
    const ids = PRODUCTS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const p of PRODUCTS) {
      expect(Number.isInteger(p.price) && p.price > 0, p.name).toBe(true);
      expect(p.sizes.length, p.name).toBeGreaterThan(0);
      expect(p.image, p.name).toMatch(/^https:\/\//);
    }
  });
  it("se conservan los 38 productos del catálogo original", () => expect(PRODUCTS).toHaveLength(38));
});
