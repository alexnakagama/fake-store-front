// Handles all localStorage operations for the cart

const CART_KEY = "fakestore_cart";

export function getCart() {
    try {
        return JSON.parse(localStorage.getItem(CART_KEY)) ?? [];
    } catch {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(product) {
    const cart = getCart();
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            category: product.category,
            quantity: 1,
        });
    }
    saveCart(cart);
}

export function removeFromCart(productId) {
    const cart = getCart().filter(item => item.id !== productId);
    saveCart(cart);
}

export function updateQuantity(productId, quantity) {
    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    const cart = getCart();
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity = quantity;
        saveCart(cart);
    }
}

export function getCartCount() {
    return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

export function getCartTotal() {
    return getCart().reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function clearCart() {
    localStorage.removeItem(CART_KEY);
}
