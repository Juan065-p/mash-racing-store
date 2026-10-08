/* ── LOGO HTML ───────────────────────────────── */
function logoHTML() {
  return `
    <a href="index.html" class="nav-logo">
      <div class="nav-logo-mark">
        <img src="https://ugc.production.linktr.ee/79091f2c-43d2-4fe6-8b72-d2d4feb9e5c2_logo-mash-racing-2026png.png"
             alt="Mash Racing Store" loading="eager">
      </div>
      <div class="logo-text">
        <div><span class="logo-mash">MASH</span><span class="logo-racing"> RACING</span></div>
        <div class="logo-store">STORE</div>
      </div>
    </a>`;
}

/* ── ANNOUNCE BAR ───────────────────────────── */
function buildAnnounceBar() {
  const el = document.querySelector(".announce-bar");
  if (!el) return;
  const defaultItems = [
    { icon: "ti-truck",         text: "Envíos a toda Colombia" },
    { icon: "ti-brand-whatsapp",text: "Pedidos por WhatsApp" },
    { icon: "ti-certificate",   text: "Productos de alta calidad" },
    { icon: "ti-star",          text: "Colecciones F1 y MotoGP" },
    { icon: "ti-shield-check",  text: "Garantía de satisfacción" },
  ];
  const saved = localStorage.getItem("mr_ann");
  const items = saved ? JSON.parse(saved) : defaultItems;
  const itemsHTML = items.map(i =>
    `<span class="announce-item"><i class="ti ${i.icon}"></i>${i.text}</span><span class="announce-dot"></span>`
  ).join("");
  el.innerHTML = `<div class="announce-track">${itemsHTML.repeat(3)}</div>`;
}

/* ── NAVBAR ─────────────────────────────────── */
function initNav() {
  /* inject logo */
  document.querySelectorAll(".nav-logo-slot").forEach(s => s.outerHTML = logoHTML());

  const nav = document.querySelector(".navbar");
  if (!nav) return;

  /* scroll shrink */
  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle("scrolled", y > 60);
    nav.classList.toggle("bar-hidden", y > 80);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* active link */
  const page = document.body.dataset.page;
  document.querySelectorAll(".nav-links a").forEach(a => {
    const href = a.getAttribute("href") || "";
    if (
      (page === "home"    && href.startsWith("index"))    ||
      (page === "tienda"  && href.startsWith("tienda"))   ||
      (page === "carrito" && href.startsWith("carrito"))
    ) a.classList.add("active");
  });

  /* mobile burger */
  const burger = document.querySelector(".nav-burger");
  const mobileMenu = document.querySelector(".mobile-menu");
  if (burger && mobileMenu) {
    burger.addEventListener("click", () => {
      const open = mobileMenu.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(open));
    });
    document.addEventListener("click", e => {
      if (!nav.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove("open");
      }
    });
  }

  /* cart badge */
  Cart.updateBadges();
}

/* ── REVEAL ANIMATION ───────────────────────── */
function initReveal() {
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
    return;
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
}

/* ── COUNTER ANIMATION ──────────────────────── */
function initCounters() {
  const els = document.querySelectorAll("[data-count]");
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      obs.unobserve(e.target);
      const target = parseFloat(e.target.dataset.count);
      const prefix = e.target.dataset.prefix || "";
      const suffix = e.target.dataset.suffix || "";
      const duration = 1400;
      const start = performance.now();
      const isInt = Number.isInteger(target);
      (function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const val = target * eased;
        e.target.textContent = prefix + (isInt ? Math.round(val) : val.toFixed(1)) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      })(start);
    });
  }, { threshold: 0.5 });
  els.forEach(el => obs.observe(el));
}

/* ── PRODUCT CARD ───────────────────────────── */
function productCardHTML(p) {
  const price = formatPrice(p.price);
  const badge = p.badge
    ? `<span class="tag ${p.badge === "Premium" ? "tag-gold" : p.badge === "Limitado" ? "tag-yellow" : ""}">${p.badge}</span>`
    : "";
  const catMeta = CATEGORY_META[p.category] || {};
  return `
    <article class="product-card" data-id="${p.id}">
      <div class="product-image">
        <span class="product-emoji">${p.emoji}</span>
        <img class="product-img"
             src="${p.image}"
             alt="${p.name}"
             loading="lazy"
             onload="this.classList.add('loaded')"
             onerror="this.remove()">
        ${badge ? `<div class="product-badge">${badge}</div>` : ""}
        <div class="product-overlay">
          <button class="btn btn-primary btn-sm btn-add-cart-quick"
                  data-id="${p.id}" data-size="${p.sizes[0]}">
            <i class="ti ti-shopping-cart-plus"></i>Añadir
          </button>
        </div>
      </div>
      <div class="product-body">
        <div class="product-category">${catMeta.label || p.category}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-price">${price}</div>
      </div>
      <div class="product-footer">
        <button class="btn-add-cart" data-id="${p.id}" data-size="${p.sizes[0]}">
          <i class="ti ti-shopping-cart-plus"></i>Añadir al carrito
        </button>
      </div>
    </article>`;
}

/* ── BIND ADD-TO-CART ───────────────────────── */
function bindAddToCart(container) {
  container.addEventListener("click", e => {
    const btn = e.target.closest("[data-id][data-size]");
    if (!btn) return;
    const id   = Number(btn.dataset.id);
    const size = btn.dataset.size;
    Cart.add(id, size);
    btn.classList.add("added");
    setTimeout(() => btn.classList.remove("added"), 1200);
    Cart.updateBadges();
  });
}

/* ── TEAMS SECTION ──────────────────────────── */
function initTeams() {
  const f1Grid   = document.getElementById("teams-f1");
  const motoGrid = document.getElementById("teams-motogp");
  if (!f1Grid || !motoGrid) return;

  const F1_PHOTOS = {
    Ferrari:     "img/teams/ferrari.png",
    RedBull:     "img/teams/redbull.png",
    Mercedes:    "img/teams/mercedes.png",
    McLaren:     "img/teams/mclaren.png",
    Alpine:      "img/teams/alpine.png",
    AstonMartin: "img/teams/astonmartin.png",
  };

  const DRIVERS_F1 = {
    Ferrari:     "Leclerc · Hamilton",
    RedBull:     "Verstappen · Hadjar",
    Mercedes:    "Russell · Antonelli",
    McLaren:     "Norris · Piastri",
    Alpine:      "Gasly · Colapinto",
    AstonMartin: "Alonso · Stroll",
  };

  f1Grid.innerHTML = TEAMS_F1.map(t => `
    <a href="tienda.html?equipo=${t.filter}" class="team-photo-card" style="--tc:${t.color}">
      <div class="card-bg" style="background-image:url(${F1_PHOTOS[t.filter]})"></div>
      <div class="card-overlay"></div>
      <div class="card-color-bar"></div>
      <div class="card-body">
        <div class="card-flag">${t.flag}</div>
        <div class="card-name">${t.name}</div>
        <div class="card-sub">${DRIVERS_F1[t.filter]}</div>
      </div>
    </a>`).join("");

  motoGrid.innerHTML = TEAMS_MOTOGP.map(t => `
    <a href="motogp.html" class="team-moto-card" style="--tc:${t.color}">
      <div class="card-body">
        <div class="card-flag">${t.flag}</div>
        <div class="card-name">${t.name}</div>
        <div class="card-sub">MotoGP · Ropa</div>
      </div>
    </a>`).join("");
}

/* ── HERO CAROUSEL ──────────────────────────── */
function initHeroCarousel() {
  const container = document.getElementById("hero-slides");
  if (!container) return;

  const defaultSlides = [
    { img: "img/cars/ferrari.png",     label: "Ferrari · F1 2026" },
    { img: "img/cars/redbull.png",     label: "Red Bull Racing · F1 2026" },
    { img: "img/cars/mercedes.png",    label: "Mercedes · F1 2026" },
    { img: "img/cars/mclaren.png",     label: "McLaren · F1 2026" },
    { img: "img/cars/astonmartin.png", label: "Aston Martin · F1 2026" },
    { img: "img/cars/williams.png",    label: "Williams · F1 2026" },
    { img: "img/cars/alpine.png",      label: "Alpine · F1 2026" },
    { img: "img/cars/audi.png",        label: "Audi · F1 2026" },
    { img: "img/cars/racingbulls.png", label: "Racing Bulls · F1 2026" },
    { img: "img/cars/haas.png",        label: "Haas · F1 2026" },
    { img: "img/cars/cadillac.png",    label: "Cadillac · F1 2026" },
  ];
  const savedSlides = localStorage.getItem("mr_slides");
  const SLIDES = savedSlides ? JSON.parse(savedSlides) : defaultSlides;

  /* pre-build all slide divs */
  SLIDES.forEach((s, i) => {
    const div = document.createElement("div");
    div.className = "hero-slide" + (i === 0 ? " active" : "");
    div.style.backgroundImage = `url(${s.img})`;
    container.appendChild(div);
  });

  let current = 0;
  const slides = container.querySelectorAll(".hero-slide");

  setInterval(() => {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
  }, 4000);
}

/* ── HOME PAGE ──────────────────────────────── */
function initHome() {
  buildAnnounceBar();
  initHeroCarousel();
  initCounters();

  /* featured grid */
  const grid = document.getElementById("featured-grid");
  if (grid) {
    const featured = PRODUCTS.filter(p => p.featured).slice(0, 8);
    grid.innerHTML = featured.map(productCardHTML).join("");
    bindAddToCart(grid);
  }

  initTeams();
}

/* ── TIENDA PAGE ────────────────────────────── */
function initTienda() {
  buildAnnounceBar();

  const grid       = document.getElementById("catalog-grid");
  const counter    = document.getElementById("catalog-count");
  if (!grid) return;

  const tipoBtns   = document.querySelectorAll(".filter-btn[data-tipo]");
  const equipoPills = document.querySelectorAll(".team-pill[data-equipo]");

  let activeTipo   = "todas";
  let activeEquipo = "todas";

  /* Only F1 ropa + gorras in this page */
  const F1_CATS = ["ropa", "gorras"];

  function renderCatalog() {
    let list = PRODUCTS.filter(p => F1_CATS.includes(p.category));
    if (activeTipo   !== "todas") list = list.filter(p => p.tipo  === activeTipo);
    if (activeEquipo !== "todas") list = list.filter(p => p.team  === activeEquipo);

    grid.innerHTML = list.length
      ? list.map(productCardHTML).join("")
      : `<div style="grid-column:1/-1;text-align:center;padding:4rem 1rem;color:var(--w60)">
           <i class="ti ti-search-off" style="font-size:2.5rem;display:block;margin-bottom:.75rem"></i>
           <p>No hay productos para este filtro</p>
         </div>`;
    if (counter) counter.textContent = `${list.length} producto${list.length !== 1 ? "s" : ""}`;
    bindAddToCart(grid);
    initReveal();
  }

  tipoBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tipoBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeTipo = btn.dataset.tipo;
      renderCatalog();
    });
  });

  equipoPills.forEach(pill => {
    pill.addEventListener("click", () => {
      equipoPills.forEach(b => b.classList.remove("active"));
      pill.classList.add("active");
      activeEquipo = pill.dataset.equipo;
      renderCatalog();
    });
  });

  /* URL params pre-select filters */
  const params = new URLSearchParams(location.search);
  const equipoParam = params.get("equipo");
  const tipoParam   = params.get("tipo");

  if (equipoParam) {
    const pill = document.querySelector(`.team-pill[data-equipo="${equipoParam}"]`);
    if (pill) { pill.click(); return; }
    activeEquipo = equipoParam;
  }
  if (tipoParam) {
    const btn = document.querySelector(`.filter-btn[data-tipo="${tipoParam}"]`);
    if (btn) { btn.click(); return; }
    activeTipo = tipoParam;
  }

  renderCatalog();
}

/* ── CARRITO PAGE ───────────────────────────── */
function initCarrito() {
  buildAnnounceBar();
  renderCart();
}

function renderCart() {
  const container = document.getElementById("cart-container");
  if (!container) return;

  const items = Cart.getItems();
  const total = Cart.getTotal();

  if (!items.length) {
    container.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon"><i class="ti ti-shopping-cart-off"></i></div>
        <h2>Tu carrito está vacío</h2>
        <p>Descubre nuestra colección F1 y MotoGP</p>
        <a href="tienda.html" class="btn btn-primary">Ver tienda</a>
      </div>`;
    return;
  }

  const itemsHTML = items.map(item => {
    const p   = PRODUCTS.find(x => x.id === item.id);
    if (!p) return "";
    return `
      <div class="cart-item" data-id="${item.id}">
        <div class="cart-item-img">
          <span>${p.emoji}</span>
          <img src="${p.image}" alt="${p.name}" loading="lazy"
               onload="this.style.opacity=1" onerror="this.remove()"
               style="opacity:0;transition:opacity .3s">
        </div>
        <div>
          <div class="cart-item-name">${p.name}</div>
          <div class="cart-item-meta">Talla: ${item.size} · ${CATEGORY_META[p.category]?.label || p.category}</div>
          <div class="cart-qty">
            <button class="qty-btn" data-action="dec" data-id="${item.id}" data-size="${item.size}">
              <i class="ti ti-minus"></i>
            </button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn" data-action="inc" data-id="${item.id}" data-size="${item.size}">
              <i class="ti ti-plus"></i>
            </button>
            <button class="btn-remove" data-action="remove" data-id="${item.id}" data-size="${item.size}">
              <i class="ti ti-trash"></i>Eliminar
            </button>
          </div>
        </div>
        <div class="cart-item-price">${formatPrice(p.price * item.qty)}</div>
      </div>`;
  }).join("");

  const shipping  = total >= 150000 ? "Gratis" : formatPrice(12000);
  const totalShow = total >= 150000 ? total    : total + 12000;

  const waText = encodeURIComponent(
    `Hola Mash Racing! 🏎️\n\nQuiero hacer el siguiente pedido:\n\n` +
    items.map(item => {
      const p = PRODUCTS.find(x => x.id === item.id);
      return `• ${p?.name || "?"} | Talla: ${item.size} | Cant: ${item.qty} | ${formatPrice((p?.price || 0) * item.qty)}`;
    }).join("\n") +
    `\n\n*Total: ${formatPrice(totalShow)}*\n\nPor favor confirmen disponibilidad. ¡Gracias!`
  );

  container.innerHTML = `
    <div class="cart-layout">
      <div>
        <div class="cart-items-list">${itemsHTML}</div>
      </div>
      <div class="order-summary">
        <h2>Resumen del pedido</h2>
        <div class="summary-row"><span>Subtotal</span><span>${formatPrice(total)}</span></div>
        <div class="summary-row"><span>Envío</span><span>${shipping}</span></div>
        ${total < 150000 ? `<div class="summary-row" style="font-size:.75rem;color:var(--yellow)"><span>Envío gratis desde ${formatPrice(150000)}</span></div>` : ""}
        <div class="summary-total"><span>Total</span><span>${formatPrice(totalShow)}</span></div>
        <a href="https://wa.me/573156532989?text=${waText}" target="_blank" class="btn-checkout">
          <i class="ti ti-brand-whatsapp"></i>Pedir por WhatsApp
        </a>
        <p class="summary-note">Te contactaremos para confirmar disponibilidad y coordinar el pago.</p>
      </div>
    </div>`;

  /* qty / remove delegation */
  container.addEventListener("click", e => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    const id   = Number(btn.dataset.id);
    const size = btn.dataset.size;
    const action = btn.dataset.action;
    const currentQty = Cart.getItems().find(i => i.id === id && i.size === size)?.qty || 1;
    if (action === "inc")    { Cart.setQty(id, size, currentQty + 1); }
    if (action === "dec")    { Cart.setQty(id, size, currentQty - 1); }
    if (action === "remove") { Cart.remove(id, size); }
    Cart.updateBadges();
    renderCart();
  });
}

/* ── MOTOGP PAGE ────────────────────────────── */
function initMotoGP() {
  buildAnnounceBar();

  const grid    = document.getElementById("catalog-grid");
  const counter = document.getElementById("catalog-count");
  if (!grid) return;

  const tipoBtns = document.querySelectorAll(".filter-btn[data-tipo]");
  let activeTipo = "todas";

  function renderCatalog() {
    let list = PRODUCTS.filter(p => p.category === "motogp");
    if (activeTipo !== "todas") list = list.filter(p => p.tipo === activeTipo);
    grid.innerHTML = list.length
      ? list.map(productCardHTML).join("")
      : `<div style="grid-column:1/-1;text-align:center;padding:4rem 1rem;color:var(--w60)">
           <i class="ti ti-search-off" style="font-size:2.5rem;display:block;margin-bottom:.75rem"></i>
           <p>No hay productos para este filtro</p>
         </div>`;
    if (counter) counter.textContent = `${list.length} producto${list.length !== 1 ? "s" : ""}`;
    bindAddToCart(grid);
    initReveal();
  }

  tipoBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tipoBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeTipo = btn.dataset.tipo;
      renderCatalog();
    });
  });

  renderCatalog();
}

/* ── ESCALA PAGE ────────────────────────────── */
function initEscala() {
  buildAnnounceBar();

  const grid    = document.getElementById("catalog-grid");
  const counter = document.getElementById("catalog-count");
  if (!grid) return;

  const equipoPills = document.querySelectorAll(".team-pill[data-equipo]");
  let activeEquipo  = "todas";

  function renderCatalog() {
    let list = PRODUCTS.filter(p => p.category === "escala");
    if (activeEquipo !== "todas") list = list.filter(p => p.team === activeEquipo);
    grid.innerHTML = list.length
      ? list.map(productCardHTML).join("")
      : `<div style="grid-column:1/-1;text-align:center;padding:4rem 1rem;color:var(--w60)">
           <i class="ti ti-search-off" style="font-size:2.5rem;display:block;margin-bottom:.75rem"></i>
           <p>No hay productos para este filtro</p>
         </div>`;
    if (counter) counter.textContent = `${list.length} producto${list.length !== 1 ? "s" : ""}`;
    bindAddToCart(grid);
    initReveal();
  }

  equipoPills.forEach(pill => {
    pill.addEventListener("click", () => {
      equipoPills.forEach(b => b.classList.remove("active"));
      pill.classList.add("active");
      activeEquipo = pill.dataset.equipo;
      renderCatalog();
    });
  });

  renderCatalog();
}

/* ── ROUTER ─────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  Cart.load();
  initNav();
  initReveal();

  const page = document.body.dataset.page;
  if (page === "home")    initHome();
  if (page === "tienda")  initTienda();
  if (page === "motogp")  initMotoGP();
  if (page === "escala")  initEscala();
  if (page === "carrito") initCarrito();
});
