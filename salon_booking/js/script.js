document.addEventListener('DOMContentLoaded', () => {
    /* ---------------- Mobile Menu Toggle ---------------- */
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => nav.classList.toggle('active'));

        // Close menu when a nav link is clicked
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => nav.classList.remove('active'));
        });
    }

    /* ---------------- Smooth Scrolling ---------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    /* ---------------- Testimonial Slider ---------------- */
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        const testimonialItems = testimonialSlider.querySelectorAll('.testimonial-item');
        let scrollIndex = 0;

        const scrollStep = testimonialItems[0] ? testimonialItems[0].offsetWidth + 30 : 400;

        // Optional: Auto-scroll or arrow navigation can be added here
        // For now, this just ensures we have width info for possible enhancements
        testimonialSlider.scrollLeft = 0;
    }

    /* ---------------- Active Navigation Link Highlight ---------------- */
    const highlightActiveLink = () => {
        if (!nav) return;

        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        nav.querySelectorAll('a').forEach(link => {
            link.classList.remove('active');
            const linkPath = link.getAttribute('href');
            if (linkPath === currentPath) link.classList.add('active');
        });
    };

    highlightActiveLink();
    window.addEventListener('popstate', highlightActiveLink);

    /* ---------------- Utility: Check for Element Existence ---------------- */
    // This pattern ensures that page-specific code won't break the general script
    const safeQuery = (selector, callback) => {
        const el = document.querySelector(selector);
        if (el && typeof callback === 'function') callback(el);
    };

    // Example usage: safeQuery('#hero', hero => { /* do something */ });
});
