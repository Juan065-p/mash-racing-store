import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import { PRODUCTS } from "../data/products.js";
import { F1_TEAMS } from "../lib/filters.js";
import { formatPrice } from "../lib/format.js";
import { useDocumentMeta } from "../lib/hooks.js";
import { ROUTE_META } from "../lib/seo.js";
import { FREE_SHIPPING_FROM, whatsappLink } from "../lib/shop.js";

const TEAM_PHOTO = {
  Ferrari: "/img/teams/ferrari.png",
  RedBull: "/img/teams/redbull.png",
  Mercedes: "/img/teams/mercedes.png",
  McLaren: "/img/teams/mclaren.png",
  Alpine: "/img/teams/alpine.png",
  AstonMartin: "/img/teams/astonmartin.png",
};
const TEAM_DRIVERS = {
  Ferrari: "Leclerc · Hamilton",
  RedBull: "Verstappen · Hadjar",
  Mercedes: "Russell · Antonelli",
  McLaren: "Norris · Piastri",
  Alpine: "Gasly · Colapinto",
  AstonMartin: "Alonso · Stroll",
};

const productCount = PRODUCTS.length;
const teamCount = F1_TEAMS.length;
const featured = PRODUCTS.filter((p) => p.featured).slice(0, 8);

const MARQUEE_1 = [
  "Mash Racing Store",
  "F1 Colombia",
  "MotoGP",
  "Temporada 2026",
  "Envíos a todo Colombia",
  "Ropa F1",
  "Carros a escala 1:64",
];

function Marquee({ items, className, highlight = false }) {
  const row = items.map((t, i) => (
    <span key={t} className="marquee-item">
      {i === 0 && !highlight && <span className="m-star">★</span>}
      {highlight && i % 2 === 1 ? <span className="m-hl">{t}</span> : t}
      <span className="m-dot"></span>
    </span>
  ));
  return (
    <div className={`marquee-band ${className}`} aria-hidden="true">
      <div className={`marquee-track${highlight ? " slow" : ""}`}>
        {row}
        {row}
      </div>
    </div>
  );
}

export default function Home() {
  const meta = ROUTE_META["/"];
  useDocumentMeta(meta.title, meta.description);

  return (
    <>
      <section className="hero">
        <div className="hero-stripe"></div>
        <div className="hero-anim-lines" aria-hidden="true">
          <div className="hal-line"></div>
          <div className="hal-line"></div>
          <div className="hal-line"></div>
          <div className="hal-line"></div>
        </div>
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="hero-tag">🇨🇴 Colombia</span>
            <span className="hero-tag">F1 · MotoGP</span>
            <span className="hero-tag">Temporada 2026</span>
          </div>
          <h1 className="hero-title">
            <span className="htl">
              <span className="htw htw-1">MASH</span>
            </span>
            <span className="htl">
              <span className="htw htw-2">RACING</span>
            </span>
            <span className="sr-only"> Store — ropa F1 y MotoGP en Colombia</span>
          </h1>
          <p className="hero-sub">
            Ropa, gorras, llaveros y coleccionables F1 y MotoGP.
            <br />
            Elige, arma tu pedido y envíalo por WhatsApp.
          </p>
          <div className="hero-ctas">
            <Link to="/tienda" className="btn btn-primary">
              <i className="ti ti-shopping-bag" aria-hidden="true"></i>Ver tienda
            </Link>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <i className="ti ti-brand-whatsapp" aria-hidden="true"></i>WhatsApp
            </a>
          </div>
        </div>
        <ul className="hero-stats-bar">
          <li className="hero-stat-item">
            <div className="hero-stat-val">
              <em>+{productCount}</em>
            </div>
            <div className="hero-stat-lbl">Productos en tienda</div>
          </li>
          <li className="hero-stat-item">
            <div className="hero-stat-val">
              <em>{teamCount}</em>
            </div>
            <div className="hero-stat-lbl">Escuderías F1 con producto</div>
          </li>
          <li className="hero-stat-item">
            <div className="hero-stat-val">
              <em>{formatPrice(FREE_SHIPPING_FROM).replace(/\s/g, "")}</em>
            </div>
            <div className="hero-stat-lbl">Envío gratis desde</div>
          </li>
          <li className="hero-stat-item">
            <div className="hero-stat-val">🇨🇴</div>
            <div className="hero-stat-lbl">Envíos a Colombia</div>
          </li>
        </ul>
      </section>

      <Marquee items={MARQUEE_1} className="red" />

      <section className="teams" aria-labelledby="teams-title">
        <div className="container">
          <div className="teams-header" style={{ position: "relative" }}>
            <span className="section-num" aria-hidden="true">
              01
            </span>
            <div>
              <div className="eyebrow reveal">Nuestras escuderías</div>
              <h2 id="teams-title" className="section-title reveal reveal-delay-1">
                Elige tu <span>equipo</span>
              </h2>
            </div>
            <Link to="/tienda" className="btn btn-outline btn-sm reveal">
              Ver todo
            </Link>
          </div>
          <div style={{ marginBottom: "1.5rem" }}>
            <p className="teams-kicker">
              <i className="ti ti-flag-checkered" aria-hidden="true"></i> Fórmula 1
            </p>
            <div className="teams-grid-f1">
              {F1_TEAMS.map((t) => (
                <Link key={t.value} to={`/tienda?equipo=${t.value}`} className="team-photo-card" style={{ "--tc": t.color }}>
                  <div className="card-bg" style={{ backgroundImage: `url(${TEAM_PHOTO[t.value]})` }}></div>
                  <div className="card-overlay"></div>
                  <div className="card-color-bar"></div>
                  <div className="card-body">
                    <div className="card-flag" aria-hidden="true">
                      {t.flag}
                    </div>
                    <div className="card-name">{t.label}</div>
                    <div className="card-sub">{TEAM_DRIVERS[t.value]}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="teams-kicker yellow">
              <i className="ti ti-motorbike" aria-hidden="true"></i> MotoGP
            </p>
            <div className="teams-grid-moto">
              <Link to="/motogp?tipo=jersey" className="team-moto-card" style={{ "--tc": "#CC0000" }}>
                <div className="card-body">
                  <div className="card-name">Jerseys</div>
                  <div className="card-sub">MotoGP · Manga larga</div>
                </div>
              </Link>
              <Link to="/motogp?tipo=polo" className="team-moto-card" style={{ "--tc": "#FFD200" }}>
                <div className="card-body">
                  <div className="card-name">Polos</div>
                  <div className="card-sub">MotoGP · Ropa</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="editorial">
        <div className="editorial-inner">
          <div className="editorial-text">
            <div className="eyebrow reveal">Colección F1</div>
            <h2 className="section-title reveal reveal-delay-1">
              Viste la <span>velocidad</span>
            </h2>
            <p className="reveal reveal-delay-2">
              Camisas, polos, chaquetas y gorras inspiradas en las escuderías de la Fórmula 1. Filtra por equipo y
              encuentra la prenda de tu favorito.
            </p>
            <div className="reveal reveal-delay-3">
              <Link to="/tienda" className="btn btn-primary">
                <i className="ti ti-shirt" aria-hidden="true"></i>Ver ropa F1
              </Link>
            </div>
          </div>
          <div className="editorial-img">
            <img
              src="https://images.unsplash.com/photo-1541348263662-e068662d82af?w=900&auto=format&fit=crop&q=80"
              alt="Auto de Fórmula 1 en pista"
              loading="lazy"
              width="900"
              height="600"
            />
            <div className="editorial-img-overlay"></div>
          </div>
        </div>
      </section>

      <section className="editorial" style={{ background: "var(--dark)" }}>
        <div className="editorial-inner reverse">
          <div className="editorial-text">
            <div className="eyebrow reveal" style={{ color: "var(--yellow)" }}>
              Colección MotoGP
            </div>
            <h2 className="section-title reveal reveal-delay-1">
              La adrenalina <span className="y">de las</span> <span>motos</span>
            </h2>
            <p className="reveal reveal-delay-2">
              Jerseys y polos de equipos y pilotos del mundial de MotoGP, para quienes viven las carreras sobre dos
              ruedas.
            </p>
            <div className="reveal reveal-delay-3">
              <Link to="/motogp" className="btn btn-yellow">
                <i className="ti ti-motorbike" aria-hidden="true"></i>Ver MotoGP
              </Link>
            </div>
          </div>
          <div className="editorial-img">
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&auto=format&fit=crop&q=80"
              alt="Moto de carreras en pista"
              loading="lazy"
              width="900"
              height="600"
            />
            <div
              className="editorial-img-overlay"
              style={{ background: "linear-gradient(135deg,rgba(255,210,0,.12) 0%,transparent 60%)" }}
            ></div>
          </div>
        </div>
      </section>

      <section className="statement-section" aria-label="Ir a la tienda">
        <div className="container">
          <div className="statement-inner">
            <div className="statement-tag reveal">La tienda de los fans</div>
            <p className="statement-title reveal reveal-delay-1">
              <span className="red">Viste</span>{" "}
              <span className="ghost">con</span>{" "}
              <span className="yl">orgullo</span>
            </p>
            <div className="statement-cta-row reveal reveal-delay-2">
              <Link to="/tienda" className="btn btn-primary">
                <i className="ti ti-flame" aria-hidden="true"></i>Ver toda la tienda
              </Link>
              <div className="statement-stat-inline">
                <span className="num">+{productCount}</span>
                <span className="lbl">productos disponibles</span>
              </div>
              <div className="statement-stat-inline">
                <span className="num">{teamCount}</span>
                <span className="lbl">escuderías F1</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Marquee items={F1_TEAMS.map((t) => t.label)} className="black" highlight />

      <section className="products section" aria-labelledby="featured-title">
        <div className="container">
          <div className="products-header" style={{ position: "relative" }}>
            <span className="section-num" aria-hidden="true">
              02
            </span>
            <div>
              <div className="eyebrow reveal">Más populares</div>
              <h2 id="featured-title" className="section-title reveal reveal-delay-1">
                Destacados <span>de la tienda</span>
              </h2>
            </div>
            <Link to="/tienda" className="btn btn-outline btn-sm reveal">
              Ver todo el catálogo
            </Link>
          </div>
          <div className="products-grid" id="featured-grid">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <div className="collection-banners">
        <Link to="/escala" className="collection-banner">
          <img
            src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&auto=format&fit=crop&q=80"
            alt=""
            loading="lazy"
            width="800"
            height="533"
          />
          <div className="collection-banner-overlay"></div>
          <div className="collection-banner-body">
            <div className="collection-banner-eyebrow">Coleccionables · Escala 1:64</div>
            <div className="collection-banner-title">
              Carros a<br />
              escala F1
            </div>
            <div className="collection-banner-cta">
              Explorar colección <i className="ti ti-arrow-right" aria-hidden="true"></i>
            </div>
          </div>
        </Link>
        <Link to="/tienda?tipo=gorra" className="collection-banner">
          <img
            src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80"
            alt=""
            loading="lazy"
            width="800"
            height="533"
          />
          <div className="collection-banner-overlay"></div>
          <div className="collection-banner-body">
            <div className="collection-banner-eyebrow">Gorras · Snapback · Trucker</div>
            <div className="collection-banner-title">
              Gorras
              <br />
              Racing
            </div>
            <div className="collection-banner-cta">
              Ver gorras <i className="ti ti-arrow-right" aria-hidden="true"></i>
            </div>
          </div>
        </Link>
      </div>

      <section className="about section" aria-labelledby="about-title">
        <div className="container">
          <div className="about-inner" style={{ position: "relative" }}>
            <span className="section-num" style={{ right: "auto", left: 0, color: "rgba(255,255,255,.02)" }} aria-hidden="true">
              03
            </span>
            <div className="about-visual reveal">
              <div className="about-visual-placeholder">
                <div className="about-stat-block">
                  <div className="about-stat-num">{teamCount}</div>
                  <div className="about-stat-lbl">
                    Escuderías
                    <br />
                    F1
                  </div>
                </div>
                <div className="about-stat-block">
                  <div className="about-stat-num">+{productCount}</div>
                  <div className="about-stat-lbl">
                    Productos
                    <br />
                    en tienda
                  </div>
                </div>
                <div className="about-stat-block">
                  <div className="about-stat-num">2</div>
                  <div className="about-stat-lbl">
                    Mundiales:
                    <br />
                    F1 y MotoGP
                  </div>
                </div>
                <div className="about-stat-block">
                  <div className="about-stat-num">🇨🇴</div>
                  <div className="about-stat-lbl">
                    Envíos a
                    <br />
                    Colombia
                  </div>
                </div>
              </div>
            </div>
            <div className="about-body">
              <div className="eyebrow reveal">Sobre Mash Racing</div>
              <h2 id="about-title" className="section-title reveal reveal-delay-1">
                Pasión por <span>las carreras</span>
              </h2>
              <p className="reveal reveal-delay-2">
                Somos un emprendimiento colombiano de merchandising de Fórmula 1 y MotoGP. Queremos llevar la emoción
                del motorsport a tus manos con prendas y accesorios de tus equipos favoritos.
              </p>
              <p className="reveal reveal-delay-2">
                Atendemos cada pedido por WhatsApp: confirmamos disponibilidad y coordinamos pago y envío contigo.
              </p>
              <ul className="about-features reveal reveal-delay-3">
                <li className="about-feature">
                  <i className="ti ti-truck" aria-hidden="true"></i>Envíos a toda Colombia
                </li>
                <li className="about-feature">
                  <i className="ti ti-gift" aria-hidden="true"></i>Envío gratis desde {formatPrice(FREE_SHIPPING_FROM)}
                </li>
                <li className="about-feature">
                  <i className="ti ti-brand-whatsapp" aria-hidden="true"></i>Atención personalizada por WhatsApp
                </li>
                <li className="about-feature">
                  <i className="ti ti-checklist" aria-hidden="true"></i>Confirmamos disponibilidad por WhatsApp
                </li>
              </ul>
              <div className="about-ctas reveal">
                <Link to="/tienda" className="btn btn-primary">
                  <i className="ti ti-shopping-bag" aria-hidden="true"></i>Ir a la tienda
                </Link>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                  <i className="ti ti-brand-whatsapp" aria-hidden="true"></i>WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="insta-strip">
        <div className="insta-lbl">Síguenos en Instagram</div>
        <div className="insta-handle">
          <a href="https://www.instagram.com/mash.racing2" target="_blank" rel="noopener noreferrer">
            @mash.racing2
          </a>
        </div>
      </div>
    </>
  );
}
