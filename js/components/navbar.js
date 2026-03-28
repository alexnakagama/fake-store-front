// File to handle the navigation bar functionality

export function renderNavbar() {
  const navbarContainer = document.getElementById('navbar');
  if (!navbarContainer) return;

  navbarContainer.innerHTML = `
    <nav class="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
      <div class="container">
        <a class="navbar-brand fw-bold" href="/index.html">FakeStore</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto align-items-center">
            <li class="nav-item">
              <a class="nav-link" href="/views/products.html">Products</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/views/cart.html">
                <span id="cart-count" class="badge bg-primary">0</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `;
}

renderNavbar();

