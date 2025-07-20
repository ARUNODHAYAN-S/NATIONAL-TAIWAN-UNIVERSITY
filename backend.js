document.addEventListener('DOMContentLoaded', () => {
    // Navigation Bar Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        const isExpanded = navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close mobile menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Quote Animation for index.html
    if (document.querySelector('.quote-box')) {
        const quoteBox = document.querySelector('.quote-box');
        quoteBox.style.opacity = '0'; // Ensure initial state for animation
        setTimeout(() => {
            quoteBox.style.opacity = '1';
            quoteBox.style.transform = 'translate(-50%, -50%)';
        }, 100); // Delay for smooth load
    }

    // Handle window resize for responsive navbar
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
});