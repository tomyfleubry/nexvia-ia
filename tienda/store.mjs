import { products, getVariant, money, shippingCents } from "./catalog.mjs";

const $ = (selector) => document.querySelector(selector);
const catalog = $("#products");
const detail = $("#product-dialog");
const drawer = $("#bag-dialog");
const categories = ["Todas", ...new Set(products.map((product) => product.category))];
const cartKey = "orla-form-bag-v1";
let selectedCategory = "Todas";
let displayLimit = 9;
const pageSize = 9;
let cart = restoreCart();
let toastTimer;
let demoFinished = false;
let checkoutKey = null;
let lastTrigger = null;
const local = ["localhost", "127.0.0.1", "[::1]"].includes(location.hostname);
let stripeAvailable = false;

function restoreCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(cartKey));
    if (!Array.isArray(saved)) return [];
    return saved.filter(({ id, size, qty } = {}) => {
      const variant = getVariant(id, size);
      return variant && Number.isSafeInteger(qty) && qty > 0 && qty <= variant.stock;
    });
  } catch {
    return [];
  }
}

function updateCart() {
  try { localStorage.setItem(cartKey, JSON.stringify(cart)); } catch { /* Cart still works in memory. */ }
  $("#bag-count").textContent = cart.reduce((sum, line) => sum + line.qty, 0);
  checkoutKey = null;
}

function renderProducts() {
  const order = $("#sort").value;
  const visible = products.filter((product) => selectedCategory === "Todas" || product.category === selectedCategory);
  if (order === "low") visible.sort((a, b) => a.cents - b.cents);
  if (order === "high") visible.sort((a, b) => b.cents - a.cents);
  const shown = visible.slice(0, displayLimit);
  $("#product-count").textContent = visible.length + (visible.length === 1 ? " producto" : " productos");
  $("#load-more").hidden = shown.length >= visible.length;
  catalog.innerHTML = shown.map((product) =>
    '<article class="product"><button class="product-button" type="button" data-product="' + product.id +
    '" aria-haspopup="dialog"><span class="product-photo"><img src="img/' + product.id + '.webp" alt="' +
    product.name + ' · ' + product.color + '" width="512" height="512" loading="lazy"></span>' +
    '<span class="product-info"><span><strong>' + product.name + '</strong><small>' + product.color +
    '</small></span><span>' + money(product.cents) + '</span></span></button></article>'
  ).join("");
}

function changeCategory(value) {
  selectedCategory = value;
  displayLimit = pageSize;
  for (const button of $("#categories").children) button.setAttribute("aria-pressed", button.dataset.category === value);
  renderProducts();
}

function closeButton() {
  return '<button type="button" class="close" data-close aria-label="Cerrar">×</button>';
}

function countInCart(id, size) {
  return cart.find((line) => line.id === id && line.size === size)?.qty || 0;
}

function showProduct(product, trigger) {
  lastTrigger = trigger;
  const panel = $("#product-panel");
  let size = null;
  panel.innerHTML =
    '<div class="detail"><img src="img/' + product.id + '.webp" alt="' + product.name + ' · ' + product.color + '">' +
    '<div class="detail-body">' + closeButton() + '<p class="kicker">' + product.category + ' / ' + product.color +
    '</p><h2 id="product-title">' + product.name + '</h2><p class="price">' + money(product.cents) +
    '</p><p class="desc">' + product.desc + '</p><fieldset class="sizes"><legend>Elegí tu talle</legend><div>' +
    Object.entries(product.sizes).map(([label, stock]) =>
      '<button type="button" class="size" data-size="' + label + '" aria-pressed="false"' +
      (stock <= countInCart(product.id, label) ? ' disabled' : '') + '>' + label + '</button>'
    ).join("") +
    '</div></fieldset><p class="stock" aria-live="polite">Seleccioná un talle para agregarlo.</p>' +
    '<button class="button" type="button" data-add disabled>Agregar a la bolsa <span aria-hidden="true">+</span></button></div></div>';
  const add = panel.querySelector("[data-add]");
  panel.addEventListener("click", function choose(event) {
    const button = event.target.closest("button");
    if (!button) return;
    if (button.dataset.size) {
      size = button.dataset.size;
      panel.querySelectorAll("[data-size]").forEach((item) => item.setAttribute("aria-pressed", item === button));
      panel.querySelector(".stock").textContent = (product.sizes[size] - countInCart(product.id, size)) + " disponibles para agregar";
      add.disabled = false;
    }
    if (!button.hasAttribute("data-add") || !size) return;
    const existing = cart.find((line) => line.id === product.id && line.size === size);
    if (countInCart(product.id, size) >= product.sizes[size]) return;
    if (existing) existing.qty++;
    else cart.push({ id: product.id, size, qty: 1 });
    demoFinished = false;
    updateCart();
    detail.close();
    say(product.name + " agregada a la bolsa.");
  }, { signal: modalSignal(detail) });
  detail.showModal();
}

function modalSignal(dialog) {
  const controller = new AbortController();
  dialog.addEventListener("close", () => controller.abort(), { once: true });
  return controller.signal;
}

function renderCart() {
  const panel = $("#bag-panel");
  let body = '<div class="bag-inner"><div class="drawer-title"><h2 id="bag-title">Tu bolsa</h2>' + closeButton() + '</div>';
  if (demoFinished) body += '<div class="result" role="status"><strong>Pedido de muestra confirmado</strong>Completaste la simulación. El cargo fue de $0.00.</div>';
  if (!cart.length) {
    panel.innerHTML = body + '<p>Tu bolsa está vacía.</p><button class="button" type="button" data-close>Seguir explorando <span aria-hidden="true">↗</span></button></div>';
    return;
  }
  let subtotal = 0;
  body += '<ul class="bag-lines">';
  for (const [index, line] of cart.entries()) {
    const { product, stock } = getVariant(line.id, line.size);
    subtotal += product.cents * line.qty;
    body += '<li class="bag-line"><img src="img/' + product.id + '.webp" alt=""><div><div class="line-info"><h3>' +
      product.name + '</h3><strong>' + money(product.cents * line.qty) + '</strong></div><p>' + product.color +
      ' · Talle ' + line.size + '</p><div class="qty"><button type="button" data-change="-1" data-index="' + index +
      '" aria-label="Quitar una unidad de ' + product.name + '" ' + (line.qty === 1 ? "disabled" : "") +
      '>−</button><span>' + line.qty + '</span><button type="button" data-change="1" data-index="' + index +
      '" aria-label="Agregar una unidad de ' + product.name + '" ' + (line.qty >= stock ? "disabled" : "") +
      '>+</button><button type="button" class="plain" data-change="remove" data-index="' + index +
      '" aria-label="Eliminar ' + product.name + ' de la bolsa">Eliminar</button></div></div></li>';
  }
  panel.innerHTML = body + '</ul><p class="demo-note">Subtotal ' + money(subtotal) + ' · Envío de ejemplo ' +
    money(shippingCents) + '</p><p class="total"><span>Total de ejemplo</span><span>' +
    money(subtotal + shippingCents) + '</span></p><div class="checkout-actions">' +
    (stripeAvailable ? '<button type="button" class="button" data-checkout="stripe">Abrir Stripe de prueba <span aria-hidden="true">↗</span></button>' : '') +
    '<button type="button" class="button' + (stripeAvailable ? ' button-light' : '') +
    '" data-checkout="demo">Simular compra <span aria-hidden="true">↗</span></button>' +
    '<p class="demo-note">Tienda de demostración. No se cobra dinero.</p><p class="form-note" id="checkout-status" role="status"></p></div></div>';
}

function say(text) {
  $("#toast").textContent = text;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { $("#toast").textContent = ""; }, 3300);
}

$("#categories").innerHTML = categories.map((category) => '<button type="button" data-category="' + category +
  '" aria-pressed="' + (category === selectedCategory) + '">' + category + '</button>').join("");
$("#categories").addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (button) changeCategory(button.dataset.category);
});
$("#sort").addEventListener("change", () => {
  displayLimit = pageSize;
  renderProducts();
});
$("#load-more").addEventListener("click", () => {
  const previous = displayLimit;
  displayLimit += pageSize;
  renderProducts();
  catalog.querySelectorAll("[data-product]")[previous]?.focus();
});
catalog.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-product]");
  if (trigger) showProduct(products.find((product) => product.id === trigger.dataset.product), trigger);
});
$("[data-show]").addEventListener("click", (event) => changeCategory(event.currentTarget.dataset.show));
$("#bag").addEventListener("click", () => { lastTrigger = $("#bag"); renderCart(); drawer.showModal(); });
for (const dialog of [detail, drawer]) {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog || event.target.closest("[data-close]")) dialog.close();
  });
  dialog.addEventListener("close", () => lastTrigger?.focus());
}

drawer.addEventListener("click", async (event) => {
  const button = event.target.closest("button");
  if (!button || button.disabled) return;
  const { checkout, change, index } = button.dataset;
  if (change !== undefined) {
    const line = cart[Number(index)];
    if (!line) return;
    if (change === "remove") cart.splice(Number(index), 1);
    else line.qty += Number(change);
    updateCart();
    renderCart();
    (drawer.querySelector('[data-change="' + change + '"][data-index="' + index + '"]:not(:disabled)') ||
      drawer.querySelector("[data-checkout]") || drawer.querySelector("[data-close]")).focus();
  }
  if (checkout === "demo") {
    cart = [];
    demoFinished = true;
    updateCart();
    renderCart();
    drawer.querySelector("[data-close]").focus();
  }
  if (checkout === "stripe" && stripeAvailable) {
    button.disabled = true;
    const status = $("#checkout-status");
    status.textContent = "Preparando el pedido de prueba…";
    checkoutKey ||= crypto.randomUUID();
    try {
      const response = await fetch("/api/checkout", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId: checkoutKey, items: cart }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "No se pudo iniciar el checkout.");
      const destination = new URL(data.url);
      if (destination.origin !== "https://checkout.stripe.com") throw new Error("El checkout devolvió una dirección inesperada.");
      location.assign(destination.href);
    } catch (error) {
      status.textContent = error.message;
      button.disabled = false;
    }
  }
});

if (local) fetch("/api/config").then((res) => res.json()).then((cfg) => {
  stripeAvailable = cfg.stripeTest === true;
  if (drawer.open) renderCart();
}).catch(() => { /* Static preview remains available. */ });

if (!matchMedia("(prefers-reduced-motion: reduce)").matches && "IntersectionObserver" in window) {
  const title = $("#editorial-title");
  const words = title.textContent.split(" ");
  title.replaceChildren(...words.flatMap((word, index) => {
    const span = document.createElement("span");
    span.dataset.word = "";
    span.textContent = word;
    return index ? [document.createTextNode(" "), span] : [span];
  }));
  const observer = new IntersectionObserver(([entry]) => {
    Array.from(title.children).forEach((span, index) => span.classList.toggle("tint", entry.isIntersecting && index < 2));
  }, { threshold: 0.55 });
  observer.observe(title);
}
updateCart();
renderProducts();
