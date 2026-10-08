// Servidor estático mínimo que imita a Netlify para probar `dist/` en local:
// rutas limpias (/tienda → tienda/index.html), 404.html con estado 404, public/_redirects y public/_headers.
import fs from "node:fs";
import http from "node:http";
import path from "node:path";

const dist = path.resolve("dist");
const port = Number(process.env.PORT || 4173);
const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".png": "image/png",
  ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".txt": "text/plain", ".xml": "application/xml", ".json": "application/json",
};

const lines = (f) => (fs.existsSync(f) ? fs.readFileSync(f, "utf8").split(/\r?\n/) : []);
const redirects = lines(path.join(dist, "_redirects"))
  .map((l) => l.trim()).filter((l) => l && !l.startsWith("#"))
  .map((l) => { const [from, to, status] = l.split(/\s+/); return { from, to, status: parseInt(status, 10) || 301 }; });

const headerRules = [];
for (const l of lines(path.join(dist, "_headers"))) {
  if (!l.trim()) continue;
  if (!/^\s/.test(l)) headerRules.push({ pattern: l.trim(), headers: {} });
  else { const i = l.indexOf(":"); headerRules.at(-1).headers[l.slice(0, i).trim()] = l.slice(i + 1).trim(); }
}
const matches = (pattern, p) => (pattern.endsWith("*") ? p.startsWith(pattern.slice(0, -1)) : pattern === p);

http.createServer((req, res) => {
  const url = new URL(req.url, "http://x");
  const p = decodeURIComponent(url.pathname);
  const extra = Object.assign({}, ...headerRules.filter((r) => matches(r.pattern, p)).map((r) => r.headers));

  const rule = redirects.find((r) => r.from === p);
  if (rule) { res.writeHead(rule.status, { Location: rule.to + url.search, ...extra }); return res.end(); }

  const candidates = [p, path.join(p, "index.html")];
  for (const c of candidates) {
    const f = path.join(dist, c);
    if (f.startsWith(dist) && fs.existsSync(f) && fs.statSync(f).isFile()) {
      res.writeHead(200, { "Content-Type": TYPES[path.extname(f)] || "application/octet-stream", ...extra });
      return fs.createReadStream(f).pipe(res);
    }
  }
  const nf = path.join(dist, "404.html");
  res.writeHead(404, { "Content-Type": TYPES[".html"], ...extra });
  res.end(fs.existsSync(nf) ? fs.readFileSync(nf) : "404");
}).listen(port, () => console.log(`dist/ en http://localhost:${port}`));
