// Fetch products from the API and display them on the page

export function getProducts() {
    return fetch('https://fakestoreapi.com/products')
        .then((response) => response.json());
}

export function getProductById(id) {
    return fetch(`https://fakestoreapi.com/products/${id}`)
        .then((response) => response.json());
}