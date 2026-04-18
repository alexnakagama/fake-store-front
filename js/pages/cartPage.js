// File to handle the cart page functionality

import { getCart, removeFromCart, updateQuantity, getCartCount, getCartTotal, clearCart } from "../storage/storage.js";
import { updateCartBadge } from "../components/cartSidebar.js";

function renderCart() {
    const cart = getCart();
    const cartItemsEl = document.getElementById("cart-items");
    const summaryCount = document.getElementById("summary-count");
    const summaryTotal = document.getElementById("summary-total");

    summaryCount.textContent = getCartCount();
    summaryTotal.textContent = `$${getCartTotal().toFixed(2)}`;

    if (cart.length === 0) {
        cartItemsEl.innerHTML = `
            <div class="cart-empty">
                <p>Your cart is empty.</p>
                <a href="/views/products.html" class="btn-add-to-cart">Shop Now</a>
            </div>
        `;
        return;
    }

    cartItemsEl.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <a href="/views/product-detail.html?id=${item.id}">
                <img src="${item.image}" alt="${item.title}" class="cart-item-img">
            </a>
            <div class="cart-item-info">
                <p class="cart-item-category">${item.category}</p>
                <a href="/views/product-detail.html?id=${item.id}" class="cart-item-title">${item.title}</a>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-controls">
                <div class="cart-qty-control">
                    <button class="cart-qty-btn" data-action="decrease" data-id="${item.id}">−</button>
                    <span class="cart-qty-value">${item.quantity}</span>
                    <button class="cart-qty-btn" data-action="increase" data-id="${item.id}">+</button>
                </div>
                <p class="cart-item-subtotal">$${(item.price * item.quantity).toFixed(2)}</p>
                <button class="cart-remove-btn" data-id="${item.id}">Remove</button>
            </div>
        </div>
    `).join("");
}

document.getElementById("cart-items").addEventListener("click", (e) => {
    const id = Number(e.target.dataset.id);
    if (!id) return;

    if (e.target.classList.contains("cart-remove-btn")) {
        removeFromCart(id);
        renderCart();
        updateCartBadge();
    }

    if (e.target.dataset.action === "increase") {
    const cart = getCart();
    const item = cart.find(i => i.id === id);
        if (item) {
            if (item.quantity < 20) {
                updateQuantity(id, item.quantity + 1);
            } else {
                alert("You cannot add more than 20 items");
            }
        }
        renderCart();
        updateCartBadge();
    }

    if (e.target.dataset.action === "decrease") {
        const cart = getCart();
        const item = cart.find(i => i.id === id);
        if (item) updateQuantity(id, item.quantity - 1);
        renderCart();
        updateCartBadge();
    }
});

document.getElementById("btn-checkout").addEventListener("click", () => {
    if (getCart().length === 0) return;
    clearCart();
    renderCart();
    updateCartBadge();
    document.getElementById("btn-checkout").textContent = "Order placed!";
});

renderCart();
