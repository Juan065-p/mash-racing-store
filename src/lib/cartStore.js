import { useSyncExternalStore } from "react";
import { addItem, removeItem, sanitizeStored, setQty } from "./cart.js";

export const CART_KEY = "mash_cart";
const EMPTY = Object.freeze([]);

let items = EMPTY;
let loaded = false;
const listeners = new Set();

function read() {
  try {
    return Object.freeze(sanitizeStored(JSON.parse(localStorage.getItem(CART_KEY))));
  } catch {
    return EMPTY;
  }
}

function ensureLoaded() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  items = read();
  window.addEventListener("storage", (e) => {
    if (e.key === CART_KEY || e.key === null) {
      items = read();
      listeners.forEach((l) => l());
    }
  });
}

function commit(next) {
  items = Object.freeze(next);
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch {
    /* modo privado o cuota llena: el carrito sigue en memoria */
  }
  listeners.forEach((l) => l());
}

function subscribe(cb) {
  ensureLoaded();
  listeners.add(cb);
  return () => listeners.delete(cb);
}

const getSnapshot = () => {
  ensureLoaded();
  return items;
};
const getServerSnapshot = () => EMPTY;

export const cartActions = {
  add(id, size) {
    ensureLoaded();
    commit(addItem(items, id, size));
  },
  remove(id, size) {
    ensureLoaded();
    commit(removeItem(items, id, size));
  },
  setQty(id, size, qty) {
    ensureLoaded();
    commit(setQty(items, id, size, qty));
  },
  clear() {
    ensureLoaded();
    commit([]);
  },
};

export function useCartItems() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
