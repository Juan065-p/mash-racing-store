import { Link, Navigate, useLocation, useSearchParams } from "react-router-dom";
import { PRODUCTS } from "../data/products.js";
import { F1_TEAMS, filterProducts, legacyCatalogTarget, withParam } from "../lib/filters.js";
import { useDocumentMeta, useHydrated } from "../lib/hooks.js";
import { ROUTE_META } from "../lib/seo.js";
import ProductCard from "./ProductCard.jsx";
import TrustStrip from "./TrustStrip.jsx";

const NO_PARAMS = new URLSearchParams();

const OTHER_SECTIONS = [
  { to: "/tienda", label: "Ropa y accesorios F1", icon: "ti-flag-checkered" },
  { to: "/motogp", label: "Ropa MotoGP", icon: "ti-motorbike" },
  { to: "/escala", label: "Carros a escala", icon: "ti-car" },
];

function Chip({ to, active, count, className, style, children }) {
  const empty = count === 0 && !active;
  if (empty) {
    return (
      <span className={`${className} is-empty`} style={style} aria-disabled="true">
        {children}
        <small className="chip-count">0</small>
      </span>
    );
  }
  return (
    <Link to={to} replace className={`${className}${active ? " active" : ""}`} style={style} aria-current={active ? "true" : undefined}>
      {children}
      <small className="chip-count">{count}</small>
    </Link>
  );
}

/**
 * Página de catálogo reutilizable (/tienda, /motogp, /escala).
 * El estado de los filtros vive en la URL (?tipo=…&equipo=…) para poder compartir y recargar.
 */
export default function CatalogPage({
  route,
  eyebrow,
  title,
  titleAccent,
  intro,
  categories,
  tipoOptions = [],
  teamFilter = false,
  accent = "red",
  breadcrumb,
  legacyCat = false,
}) {
  const [urlParams] = useSearchParams();
  const hydrated = useHydrated();
  const params = hydrated ? urlParams : NO_PARAMS;
  const { pathname } = useLocation();
  const meta = ROUTE_META[route];
  useDocumentMeta(meta.title, meta.description);

  const legacy = legacyCat ? legacyCatalogTarget(params) : null;
  if (legacy) return <Navigate to={legacy} replace />;

  const scope = filterProducts(PRODUCTS, { categories });
  const tipos = tipoOptions.filter((t) => scope.some((p) => p.tipo === t.value));
  const teams = teamFilter ? F1_TEAMS.filter((t) => scope.some((p) => p.team === t.value)) : [];

  const tipo = tipos.some((t) => t.value === params.get("tipo")) ? params.get("tipo") : null;
  const equipo = teams.some((t) => t.value === params.get("equipo")) ? params.get("equipo") : null;
  const list = filterProducts(scope, { tipo, equipo });

  const href = (key, value) => {
    const q = withParam(params, key, value);
    ["cat"].forEach((k) => q.delete(k));
    const s = q.toString();
    return `${pathname}${s ? `?${s}` : ""}`;
  };
  const countFor = (key, value) =>
    filterProducts(scope, { tipo: key === "tipo" ? value : tipo, equipo: key === "equipo" ? value : equipo }).length;

  const activeTeam = teams.find((t) => t.value === equipo);
  const activeTipo = tipos.find((t) => t.value === tipo);
  const filtered = Boolean(tipo || equipo);

  return (
    <>
      <section className="catalog-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Migas de pan">
            <Link to="/">Inicio</Link> / <span aria-current="page">{breadcrumb}</span>
          </nav>
          <div className="eyebrow" style={accent === "yellow" ? { color: "var(--yellow)" } : undefined}>
            {eyebrow}
          </div>
          <h1 className="section-title" style={{ margin: ".4rem 0 .75rem" }}>
            {title} <span>{titleAccent}</span>
          </h1>
          <p className="catalog-intro">{intro}</p>

          {tipos.length > 0 && (
            <div className="filter-bar" role="group" aria-label="Filtrar por tipo de producto">
              <Chip to={href("tipo", null)} active={!tipo} count={countFor("tipo", null)} className={`filter-btn${accent === "yellow" ? " yellow" : ""}`}>
                <i className="ti ti-layout-grid" aria-hidden="true"></i>Todos
              </Chip>
              {tipos.map((t) => (
                <Chip
                  key={t.value}
                  to={href("tipo", t.value)}
                  active={tipo === t.value}
                  count={countFor("tipo", t.value)}
                  className={`filter-btn${accent === "yellow" ? " yellow" : ""}`}
                >
                  <i className={`ti ${t.icon}`} aria-hidden="true"></i>
                  {t.label}
                </Chip>
              ))}
            </div>
          )}

          {teams.length > 0 && (
            <div className="filter-teams" role="group" aria-label="Filtrar por escudería">
              <span className="filter-teams-label">
                <i className="ti ti-flag-checkered" aria-hidden="true"></i> Escudería
              </span>
              <Chip to={href("equipo", null)} active={!equipo} count={countFor("equipo", null)} className="team-pill">
                Todas
              </Chip>
              {teams.map((t) => (
                <Chip
                  key={t.value}
                  to={href("equipo", t.value)}
                  active={equipo === t.value}
                  count={countFor("equipo", t.value)}
                  className="team-pill"
                  style={{ "--tc": t.color }}
                >
                  <span aria-hidden="true">{t.flag}</span> {t.label}
                </Chip>
              ))}
            </div>
          )}

          <div className="catalog-count" role="status" aria-live="polite">
            {list.length} producto{list.length !== 1 ? "s" : ""}
            {activeTipo ? ` · ${activeTipo.label}` : ""}
            {activeTeam ? ` · ${activeTeam.label}` : ""}
            {filtered && (
              <>
                {" "}
                <Link to={pathname} replace className="clear-filters">
                  Quitar filtros
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      <TrustStrip />

      <section className="section catalog-section">
        <div className="container">
          {list.length ? (
            <div className="products-grid" id="catalog-grid">
              {list.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <i className="ti ti-search-off" aria-hidden="true"></i>
              <h2>No hay productos con esta combinación</h2>
              <p>Prueba con otro tipo o escudería, o mira todo el catálogo.</p>
              <Link to={pathname} replace className="btn btn-primary">
                Quitar filtros
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="more-sections" aria-label="Otras secciones de la tienda">
        <div className="container more-inner">
          <span className="more-label">Sigue explorando</span>
          {OTHER_SECTIONS.filter((s) => s.to !== route).map((s) => (
            <Link key={s.to} to={s.to} className="btn btn-outline btn-sm">
              <i className={`ti ${s.icon}`} aria-hidden="true"></i>
              {s.label}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
