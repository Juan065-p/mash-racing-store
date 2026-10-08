// Genera un HTML estático por ruta (SEO + primer pintado rápido). Se ejecuta tras `vite build` y el build SSR.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const dist = path.join(root, "dist");
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
if (!template.includes("<!--app-html-->") || !template.includes("<!--app-head-->")) {
  throw new Error("dist/index.html no contiene los marcadores <!--app-head--> / <!--app-html-->");
}

const server = await import(pathToFileURL(path.join(root, "dist-server", "entry-server.js")).href);
const { render, headTags, PRERENDER_ROUTES, SITE_URL } = server;

const page = (route, url) =>
  template.replace("<!--app-head-->", headTags(route)).replace("<!--app-html-->", render(url));

const write = (file, html) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
};

for (const route of PRERENDER_ROUTES) {
  const file = route === "/" ? "index.html" : path.join(route.slice(1), "index.html");
  write(path.join(dist, file), page(route, route));
  console.log("prerender", route.padEnd(10), "→", file);
}
write(path.join(dist, "404.html"), page("/404", "/__no-existe__"));
console.log("prerender 404        → 404.html");

// robots.txt y sitemap.xml
const indexable = PRERENDER_ROUTES.filter((r) => !["/carrito", "/admin"].includes(r));
let robots = "User-agent: *\nAllow: /\nDisallow: /carrito\nDisallow: /admin\n";
if (SITE_URL) {
  robots += `Sitemap: ${SITE_URL}/sitemap.xml\n`;
  const urls = indexable.map((r) => `  <url><loc>${SITE_URL}${r === "/" ? "/" : r}</loc></url>`).join("\n");
  write(
    path.join(dist, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  );
  console.log("sitemap.xml generado para", SITE_URL);
} else {
  console.log("VITE_SITE_URL no definida: se omiten canonical, og:url y sitemap.xml");
}
write(path.join(dist, "robots.txt"), robots);

fs.rmSync(path.join(root, "dist-server"), { recursive: true, force: true });
