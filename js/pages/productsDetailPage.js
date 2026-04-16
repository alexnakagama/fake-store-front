// File to handle the product detail page functionality

import { getProductById } from "../api/products.js";
import { getProducts } from "../api/products.js";
import { addToCart } from "../storage/storage.js";
import { updateCartBadge, showToast } from "../components/cartSidebar.js";

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

let currentProduct = null;

if (productId) {
    getProductById(productId).then((p) => {
        currentProduct = p;

        // Breadcrumb
        document.getElementById("breadcrumb-product-name").textContent = p.title;

        // Image
        const img = document.getElementById("product-detail-img");
        img.src = p.image;
        img.alt = p.title;

        // Category
        document.getElementById("product-detail-category").textContent = p.category;

        // Title
        document.getElementById("product-detail-title").textContent = p.title;

        // Rating
        const rate = p.rating?.rate ?? 0;
        const count = p.rating?.count ?? 0;
        const stars = renderStars(rate);
        document.getElementById("product-detail-rating").innerHTML = `
            <span class="product-detail-stars">${stars}</span>
            <span>${rate} (${count} reviews)</span>
        `;

        // Price
        document.getElementById("product-detail-price").textContent = `$${p.price.toFixed(2)}`;

        // Description
        document.getElementById("product-detail-description").textContent = p.description;

        // Page title
        document.title = p.title;

        // Recommendations
        loadRecommendations(p.id, p.category);
    });
} else {
    window.location.href = "/views/products.html";
}

document.getElementById("btn-add-to-cart").addEventListener("click", () => {
    if (!currentProduct) return;
    addToCart(currentProduct);

    // Update badge in navbar
    updateCartBadge();

    // Toast notification
    showToast(`"${currentProduct.title.slice(0, 40)}..." agregado al carrito.`);

    // Visual feedback on button
    const btn = document.getElementById("btn-add-to-cart");
    const original = btn.textContent;
    btn.textContent = "Added!";
    btn.disabled = true;
    setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
    }, 1200);
});

function loadRecommendations(currentId, currentCategory) {
    getProducts().then((products) => {
        const sameCat = products.filter(p => p.id !== currentId && p.category === currentCategory);
        const others = products.filter(p => p.id !== currentId && p.category !== currentCategory);

        // Prioritize same category, fill up to 4 items
        const pool = [...sameCat, ...others];
        const picks = pool.slice(0, 4);

        const html = picks.map(p => `
            <div class="col">
                <a href="/views/product-detail.html?id=${p.id}" class="text-decoration-none">
                    <div class="card recommendation-card">
                        <img src="${p.image}" class="card-img-top recommendation-img" alt="${p.title}">
                        <div class="card-body p-3">
                            <p class="recommendation-category">${p.category}</p>
                            <h5 class="recommendation-title">${p.title}</h5>
                            <p class="recommendation-price">$${p.price.toFixed(2)}</p>
                        </div>
                    </div>
                </a>
            </div>
        `).join("");

        document.getElementById("recommendations-list").innerHTML = html;
    });
}

function renderStars(rate) {
    const full = Math.floor(rate);
    const half = rate % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return "★".repeat(full) + (half ? "½" : "") + "☆".repeat(empty);
}