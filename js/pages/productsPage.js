// File to handle the the products page functionality

import { getProducts } from "../api/products.js";

getProducts().then((products) => {

    let html = "";

    products.forEach(p => {
        let template = `
        <div class="col">
            <div class="card">
                <img src="${p.image}" class="card-img-top" alt="${p.title}">
                <div class="card-body">
                    <h5 class="card-title">${p.title}</h5>
                    <p class="card-text">${p.description}</p>
                </div>
            </div>
        </div>
        `;
        html += template;
    });
    document.getElementById("products-list").innerHTML = html
})