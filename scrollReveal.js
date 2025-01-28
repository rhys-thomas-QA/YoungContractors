document.addEventListener("DOMContentLoaded", function() {
    // Check if ScrollReveal is available
    if (typeof ScrollReveal !== "undefined") {
        ScrollReveal().reveal('.hero', {
            delay: 300,
            duration: 800,
            distance: '50px',
            origin: 'bottom',
            easing: 'ease-in-out'
        });

        ScrollReveal().reveal('.about-us', {
            delay: 500,
            duration: 1000,
            distance: '50px',
            origin: 'left'
        });

        ScrollReveal().reveal('.services', {
            delay: 700,
            duration: 1000,
            distance: '50px',
            origin: 'right'
        });

        ScrollReveal().reveal('.tiling-solutions, .why-choose-us, .get-in-touch, .gallery', {
            delay: 400,
            duration: 900,
            distance: '40px',
            origin: 'bottom',
            interval: 200 // Staggers the animations for each item
        });
    } else {
        console.warn("ScrollReveal.js is not loaded.");
    }
});
