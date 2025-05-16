// Placeholder for future JavaScript functionality
// For example, you could implement chatbot functionality here



document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.section-img');

    images.forEach(img => {
        img.style.opacity = 0; // Start with images hidden
        img.style.transition = 'opacity 1s ease-in-out';

        // Function to fade in the image
        const fadeIn = () => {
            img.style.opacity = 1;
        };

        // Check if the image is in the viewport
        const isInViewport = (element) => {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        };

        const onScroll = () => {
            if (isInViewport(img)) {
                fadeIn();
                window.removeEventListener('scroll', onScroll);
            }
        };

        // Trigger the fade-in effect on scroll
        window.addEventListener('scroll', onScroll);
        // Trigger the effect if the image is already in viewport
        onScroll();
    });
});
