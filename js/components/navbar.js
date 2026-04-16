// File to handle the navigation bar functionality

import { getCartCount } from "../storage/storage.js";
import { openCartSidebar } from "./cartSidebar.js";

export function renderNavbar() {
  const navbarContainer = document.getElementById('navbar');
  if (!navbarContainer) return;

  navbarContainer.innerHTML = `
    <nav class="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
      <div class="container">
        <a class="navbar-brand fw-bold" href="/index.html">Fake Store</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto align-items-center">
            <li class="nav-item">
                <a class="nav-link" href="/index.html">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/views/products.html">Products</a>
            </li>
            <li class="nav-item">
              <button class="cart-nav-btn" id="cart-nav-btn" type="button" aria-label="Open cart">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 01-8 0"/>
                </svg>
                <span id="cart-count" class="badge">${getCartCount() || ""}</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `;

  document.getElementById("cart-nav-btn")?.addEventListener("click", openCartSidebar);
}

