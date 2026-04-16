// File to handle the the products page functionality

import { getProducts } from "../api/products.js";

getProducts().then((products) => {
    const productsList = document.getElementById("products-list");
    const searchForm = document.getElementById("search-form");
    const searchInput = document.getElementById("search-input");

    function renderProducts(filteredProducts) {
        let html = "";
        filteredProducts.forEach(p => {
            let template = `
            <div class="col">
                <a href="/views/product-detail.html?id=${p.id}" class="text-decoration-none">
                    <div class="card">
                        <img src="${p.image}" class="card-img-top" alt="${p.title}">
                        <div class="card-body">
                            <h5 class="card-title">${p.title}</h5>
                            <p class="card-text">${p.description}</p>
                        </div>
                    </div>
                </a>
            </div>
            `;
            html += template;
        });
        productsList.innerHTML = html;
    }

    // Render all products initially
    renderProducts(products);

    // Search functionality
    searchForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const query = searchInput.value.trim().toLowerCase();
        const filtered = products.filter(p =>
            p.title.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)
        );
        renderProducts(filtered);
    });

    // Optional: live search as you type
    searchInput.addEventListener("input", function() {
        const query = searchInput.value.trim().toLowerCase();
        const filtered = products.filter(p =>
            p.title.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)
        );
        renderProducts(filtered);
    });
});