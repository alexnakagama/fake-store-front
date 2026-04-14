// File to handle the product detail page functionality

import { getProductById } from "../api/products.js";

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

if (productId) {
    getProductById(productId).then((p) => {
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
    });
} else {
    window.location.href = "/views/products.html";
}

function renderStars(rate) {
    const full = Math.floor(rate);
    const half = rate % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return "★".repeat(full) + (half ? "½" : "") + "☆".repeat(empty);
}