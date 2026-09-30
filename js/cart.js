const Cart = (() => {
  const KEY = "mash_cart";
  let items = [];

  function load() {
    try { items = JSON.parse(localStorage.getItem(KEY)) || []; }
    catch { items = []; }
  }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(items)); }
    catch {}
    updateBadges();
  }

  function add(productId, size) {
    load();
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    const idx = items.findIndex(i => i.id === productId && i.size === size);
    if (idx > -1) {
      items[idx].qty += 1;
    } else {
      items.push({ id: productId, size: size || "Única", qty: 1 });
    }
    save();
    showToast(`${product.name} agregado al carrito`);
  }

  function remove(productId, size) {
    load();
    items = items.filter(i => !(i.id === productId && i.size === size));
    save();
  }

  function setQty(productId, size, qty) {
    load();
    if (qty <= 0) { remove(productId, size); return; }
    const idx = items.findIndex(i => i.id === productId && i.size === size);
    if (idx > -1) items[idx].qty = qty;
    save();
  }

  function getItems() {
    load();
    return items
      .map(i => ({ ...i, product: PRODUCTS.find(p => p.id === i.id) }))
      .filter(i => i.product);
  }

  function getCount() {
    load();
    return items.reduce((s, i) => s + i.qty, 0);
  }

  function getTotal() {
    return getItems().reduce((s, i) => s + i.product.price * i.qty, 0);
  }

  function clear() { items = []; save(); }

  function updateBadges() {
    const count = getCount();
    document.querySelectorAll(".cart-count").forEach(el => {
      el.textContent = count;
      el.classList.toggle("show", count > 0);
    });
  }

  return { add, remove, setQty, getItems, getCount, getTotal, clear, load, updateBadges };
})();

function showToast(msg) {
  const t = document.getElementById("toast") || document.querySelector(".toast");
  if (!t) return;
  const msgEl = document.getElementById("toast-msg") || t.querySelector(".toast-msg");
  if (msgEl) msgEl.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._tid);
  t._tid = setTimeout(() => t.classList.remove("show"), 3000);
}
