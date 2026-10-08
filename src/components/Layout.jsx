import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { ANNOUNCEMENTS, FOOTER_CATEGORIES, NAV } from "../data/nav.js";
import { countItems, toLines } from "../lib/cart.js";
import { useCartItems } from "../lib/cartStore.js";
import { PRODUCTS } from "../data/products.js";
import { INSTAGRAM_URL, whatsappLink } from "../lib/shop.js";
import { ToastProvider } from "./Toast.jsx";
import { useReveal } from "../lib/hooks.js";

const LOGO_URL =
  "https://ugc.production.linktr.ee/79091f2c-43d2-4fe6-8b72-d2d4feb9e5c2_logo-mash-racing-2026png.png";

function AnnounceBar() {
  const row = ANNOUNCEMENTS.map((i) => (
    <span key={i.text} className="announce-item">
      <i className={`ti ${i.icon}`} aria-hidden="true"></i>
      {i.text}
      <span className="announce-dot" aria-hidden="true"></span>
    </span>
  ));
  return (
    <div className="announce-bar" role="region" aria-label="Avisos de la tienda">
      <div className="announce-track">
        {row}
        <span aria-hidden="true" style={{ display: "contents" }}>
          {row}
          {row}
        </span>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <Link to="/" className="nav-logo" aria-label="Mash Racing Store — inicio">
      <div className="nav-logo-mark">
        <img src={LOGO_URL} alt="" width="44" height="44" />
      </div>
      <div className="logo-text">
        <div>
          <span className="logo-mash">MASH</span>
          <span className="logo-racing"> RACING</span>
        </div>
        <div className="logo-store">STORE</div>
      </div>
    </Link>
  );
}

function NavTarget({ item, className, children, onClick, label }) {
  if (item.href) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick} aria-label={label}>
        {children}
      </a>
    );
  }
  return (
    <NavLink to={item.to} end={item.to === "/"} className={className} onClick={onClick} aria-label={label}>
      {children}
    </NavLink>
  );
}

function Navbar({ open, setOpen, count }) {
  const [scrolled, setScrolled] = useState(false);
  const [barHidden, setBarHidden] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      setBarHidden(window.scrollY > 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`navbar${scrolled ? " scrolled" : ""}${barHidden ? " bar-hidden" : ""}`}
      aria-label="Navegación principal"
    >
      <div className="nav-inner">
        <Logo />
        <ul className="nav-links">
          {NAV.map((item) => (
            <li key={item.label} className={item.columns ? "has-dropdown" : undefined}>
              <NavTarget item={item}>
                {item.label}
                {item.columns && <i className="ti ti-chevron-down nav-arrow" aria-hidden="true"></i>}
              </NavTarget>
              {item.columns && (
                <div className={`nav-dropdown ${item.columns.length > 1 ? "nav-dropdown-2col" : "nav-dropdown-sm"}`}>
                  {item.columns.map((col) => (
                    <div key={col.title} className="nav-dropdown-col">
                      <div className="nav-dropdown-label">
                        <i className={`ti ${col.icon}`} aria-hidden="true"></i>
                        {col.title}
                      </div>
                      {col.links.map((l) => (
                        <NavTarget key={l.label} item={l}>
                          <i className={`ti ${l.icon}`} aria-hidden="true"></i>
                          {l.label}
                        </NavTarget>
                      ))}
                      {col.all && (
                        <Link to={col.all.to} className="nav-dd-all">
                          <i className="ti ti-arrow-right" aria-hidden="true"></i>
                          {col.all.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="nav-icon-btn" aria-label="Instagram">
            <i className="ti ti-brand-instagram" aria-hidden="true"></i>
          </a>
          <Link
            to="/carrito"
            className="nav-icon-btn"
            aria-label={count ? `Carrito, ${count} ${count === 1 ? "artículo" : "artículos"}` : "Carrito"}
            aria-current={pathname === "/carrito" ? "page" : undefined}
          >
            <i className="ti ti-shopping-cart" aria-hidden="true"></i>
            <span className={`cart-count${count > 0 ? " show" : ""}`} aria-hidden="true">
              {count}
            </span>
          </Link>
          <button
            type="button"
            className="nav-burger"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}

function MobileMenu({ open, close }) {
  return (
    <div className={`mobile-menu${open ? " open" : ""}`} id="mobile-menu" hidden={!open}>
      {NAV.map((item) => (
        <div key={item.label} className="mobile-group">
          <NavTarget item={item} onClick={close}>
            {item.label}
          </NavTarget>
          {item.columns && item.to && (
            <div className="mobile-sub">
              {item.columns.flatMap((c) => c.links).map((l) => (
                <NavTarget key={l.label} item={l} onClick={close} label={`${item.label}: ${l.label}`}>
                  {l.label}
                </NavTarget>
              ))}
            </div>
          )}
        </div>
      ))}
      <Link to="/carrito" onClick={close}>
        Carrito
      </Link>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <div className="footer-brand">
              <span className="logo-mash">MASH</span>
              <span className="logo-racing"> RACING</span>
              <span className="logo-store">STORE</span>
            </div>
            <p className="footer-tagline">
              Merchandising de Fórmula 1 y MotoGP en Colombia. Ropa, gorras, llaveros y coleccionables para los fans
              del motorsport.
            </p>
            <div className="footer-socials">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Instagram">
                <i className="ti ti-brand-instagram" aria-hidden="true"></i>
              </a>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="WhatsApp">
                <i className="ti ti-brand-whatsapp" aria-hidden="true"></i>
              </a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Categorías</h4>
            <ul className="footer-links">
              {FOOTER_CATEGORIES.map((c) => (
                <li key={c.label}>
                  <Link to={c.to}>{c.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contacto</h4>
            <ul className="footer-links">
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
              <li>
                <Link to="/carrito">Carrito</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">&copy; {new Date().getFullYear()} Mash Racing Store · Colombia</p>
        </div>
      </div>
    </footer>
  );
}

export default function Layout() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const count = countItems(toLines(useCartItems(), PRODUCTS));
  useReveal(pathname);

  // Cerrar menú y volver arriba al cambiar de página
  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <ToastProvider>
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>
      <header>
        <AnnounceBar />
        <Navbar open={menuOpen} setOpen={setMenuOpen} count={count} />
        <MobileMenu open={menuOpen} close={() => setMenuOpen(false)} />
      </header>
      <main id="contenido" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </ToastProvider>
  );
}

