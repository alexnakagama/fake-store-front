// File to handle the main functionality of the application
// This file will initialize the application, set up event listeners, and manage the overall flow of the app
// Import necessary modules

import {renderNavbar} from "./components/navbar.js"
renderNavbar()

window.addEventListener("storage", (e) => {
    if (e.key === "fakestore_cart") {
        renderNavbar();
    }
}) 