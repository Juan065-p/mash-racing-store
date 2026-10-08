// Valida src/data/products.js: campos obligatorios, duplicados y avisos de calidad de datos.
// Uso: npm run validate:catalog   (sale con código 1 si hay errores; los avisos no fallan)
import { CATEGORY_META, PRODUCTS } from "../src/data/products.js";

const errors = [];
const warnings = [];
const ids = new Set();
const imageUse = new Map();

for (const p of PRODUCTS) {
  const tag = `#${p.id} ${p.name}`;
  if (ids.has(p.id)) errors.push(`${tag}: id duplicado`);
  ids.add(p.id);
  if (!CATEGORY_META[p.category]) errors.push(`${tag}: categoría desconocida "${p.category}"`);
  if (!Number.isInteger(p.price) || p.price <= 0) errors.push(`${tag}: precio inválido`);
  if (!Array.isArray(p.sizes) || !p.sizes.length) errors.push(`${tag}: sin tallas`);
  if (!/^https:\/\//.test(p.image ?? "")) errors.push(`${tag}: imagen no es https`);
  imageUse.set(p.image, [...(imageUse.get(p.image) ?? []), tag]);
  if (/\boficial(es)?\b/i.test(p.description ?? "")) warnings.push(`${tag}: la descripción dice "oficial" (verificar)`);
}
for (const [img, users] of imageUse) {
  if (users.length > 1) warnings.push(`Imagen repetida en ${users.length} productos: ${users.join(" | ")}`);
}

console.log(`${PRODUCTS.length} productos revisados.`);
warnings.forEach((w) => console.warn("AVISO ", w));
errors.forEach((e) => console.error("ERROR ", e));
process.exit(errors.length ? 1 : 0);
