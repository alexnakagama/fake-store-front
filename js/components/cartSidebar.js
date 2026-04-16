// Cart sidebar component

import { getCart, removeFromCart, updateQuantity, getCartTotal, getCartCount, clearCart } from "../storage/storage.js";

export function renderCartSidebar() {
    if (document.getElementById("cart-sidebar-overlay")) return;

    const overlay = document.createElement("div");
    overlay.id = "cart-sidebar-overlay";
    overlay.innerHTML = `
        <div id="cart-sidebar">
            <div class="cart-sidebar-header">
                <h2 class="cart-sidebar-title">Your Cart</h2>
                <button class="cart-sidebar-close" id="cart-sidebar-close" aria-label="Close cart">&times;</button>
            </div>
            <div class="cart-sidebar-body" id="cart-sidebar-body"></div>
            <div class="cart-sidebar-footer" id="cart-sidebar-footer"></div>
        </div>
    `;
    document.body.appendChild(overlay);

    // Close on backdrop click
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeSidebar();
    });

    document.getElementById("cart-sidebar-close").addEventListener("click", closeSidebar);

    document.getElementById("cart-sidebar").addEventListener("click", (e) => {
        if (e.target.id === "cart-sidebar-checkout") {
            handleCheckout();
            return;
        }

        const id = Number(e.target.dataset.id);
        if (!id) return;

        if (e.target.classList.contains("cart-sidebar-remove")) {
            removeFromCart(id);
            updateSidebarContent();
            updateCartBadge();
            return;
        }

        if (e.target.dataset.action === "increase") {
            const item = getCart().find(i => i.id === id);
            if (item) {
                updateQuantity(id, item.quantity + 1);
                updateSidebarContent();
                updateCartBadge();
            }
            return;
        }

        if (e.target.dataset.action === "decrease") {
            const item = getCart().find(i => i.id === id);
            if (item && item.quantity > 1) {
                updateQuantity(id, item.quantity - 1);
                updateSidebarContent();
                updateCartBadge();
            }
        }
    });
}

export function openCartSidebar() {
    renderCartSidebar(); 
    updateSidebarContent();
    document.getElementById("cart-sidebar-overlay").classList.add("open");
}

function closeSidebar() {
    document.getElementById("cart-sidebar-overlay")?.classList.remove("open");
}

function updateSidebarContent() {
    const cart = getCart();
    const body = document.getElementById("cart-sidebar-body");
    const footer = document.getElementById("cart-sidebar-footer");
    if (!body || !footer) return;

    if (cart.length === 0) {
        body.innerHTML = `<div class="cart-sidebar-empty"><p>Your cart is empty.</p></div>`;
        footer.innerHTML = "";
        return;
    }

    body.innerHTML = cart.map(item => `
        <div class="cart-sidebar-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.title}" class="cart-sidebar-img">
            <div class="cart-sidebar-item-info">
                <p class="cart-sidebar-item-title">${item.title}</p>
                <div class="cart-sidebar-qty">
                    <button
                        class="cart-sidebar-qty-btn"
                        data-action="decrease"
                        data-id="${item.id}"
                        ${item.quantity <= 1 ? "disabled" : ""}
                        aria-label="Decrease quantity">−</button>
                    <span class="cart-sidebar-qty-value">${item.quantity}</span>
                    <button
                        class="cart-sidebar-qty-btn"
                        data-action="increase"
                        data-id="${item.id}"
                        aria-label="Increase quantity">+</button>
                </div>
                <p class="cart-sidebar-item-price">$${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <button class="cart-sidebar-remove" data-id="${item.id}" aria-label="Remove product">&times;</button>
        </div>
    `).join("");

    footer.innerHTML = `
        <div class="cart-sidebar-total">
            <span>Total</span>
            <span>$${getCartTotal().toFixed(2)}</span>
        </div>
        <button class="cart-sidebar-checkout" id="cart-sidebar-checkout">Finalizar Compra</button>
    `;
}

function handleCheckout() {
    clearCart();
    updateSidebarContent();
    updateCartBadge();
    closeSidebar();
    showToast("Shopping finished! Thanks for your purchase");
}

export function updateCartBadge() {
    const badge = document.getElementById("cart-count");
    if (badge) {
        const count = getCartCount();
        badge.textContent = count > 0 ? count : "";
    }
}

export function showToast(message) {
    let toast = document.getElementById("cart-toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "cart-toast";
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toast._hideTimer);
    toast._hideTimer = setTimeout(() => toast.classList.remove("show"), 3000);
}
