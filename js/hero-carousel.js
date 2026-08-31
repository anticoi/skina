// Automatic image carousel for the hero section (#inicio)
// Rotates through background images every 5 seconds with a smooth fade transition.
// The carousel sits behind the hero text content (z-index lower than text) and
// includes a subtle dark overlay so the text is always readable.

(function () {
    'use strict';

    // Images to cycle through in the hero background
    const HERO_IMAGES = [
        'images/logo_skina.jpeg',
        'images/469395620_122184445220239910_1237380260831878928_n.jpg',
        'images/654178533_18443387599118736_8155461647070952870_n.jpeg',
        'images/719813244_18458188744118736_788835206785703804_n.jpeg',
        'images/WhatsApp Image 2026-08-29 at 18.40.26.jpeg'
    ];

    const SLIDE_INTERVAL_MS = 5000;
    const FADE_TRANSITION_MS = 1200;

    let currentIndex = 0;
    let carouselTimer = null;
    let slides = [];
    let dots = [];

    function initHeroCarousel() {
        const heroSection = document.getElementById('inicio');
        if (!heroSection) return;

        const bgContainer = document.getElementById('hero-background');
        if (!bgContainer) return;

        // Remove the existing single <img> — we will build a stacked carousel instead.
        bgContainer.innerHTML = '';

        // Reset container styles so our stacked slides fill the hero.
        bgContainer.style.position = 'absolute';
        bgContainer.style.inset = '0';
        bgContainer.style.opacity = '1'; // opacity is now handled per-slide
        bgContainer.style.overflow = 'hidden';
        bgContainer.style.zIndex = '0'; // behind the text content (which is z-10)

        // Build one absolutely-positioned slide per image, all stacked on top of
        // each other. Only the active slide is opaque; the rest are transparent.
        HERO_IMAGES.forEach((src, index) => {
            const slide = document.createElement('div');
            slide.style.position = 'absolute';
            slide.style.inset = '0';
            slide.style.backgroundImage = `url("${src}")`;
            slide.style.backgroundSize = 'cover';
            slide.style.backgroundPosition = 'center';
            slide.style.backgroundRepeat = 'no-repeat';
            slide.style.opacity = index === 0 ? '1' : '0';
            slide.style.transition = `opacity ${FADE_TRANSITION_MS}ms ease-in-out`;
            slide.style.willChange = 'opacity';
            bgContainer.appendChild(slide);
            slides.push(slide);
        });

        // Subtle dark overlay so the hero text is always readable regardless of
        // which background image is showing. Sits above the slides but below text.
        const overlay = document.createElement('div');
        overlay.style.position = 'absolute';
        overlay.style.inset = '0';
        overlay.style.background =
            'linear-gradient(180deg, rgba(13,8,29,0.55) 0%, rgba(13,8,29,0.45) 50%, rgba(13,8,29,0.65) 100%)';
        overlay.style.zIndex = '1';
        overlay.style.pointerEvents = 'none';
        bgContainer.appendChild(overlay);

        // Navigation dots — placed at the bottom of the hero, above the overlay
        // but below the text content.
        const dotsWrapper = document.createElement('div');
        dotsWrapper.style.position = 'absolute';
        dotsWrapper.style.bottom = '24px';
        dotsWrapper.style.left = '0';
        dotsWrapper.style.right = '0';
        dotsWrapper.style.display = 'flex';
        dotsWrapper.style.justifyContent = 'center';
        dotsWrapper.style.gap = '10px';
        dotsWrapper.style.zIndex = '5'; // above overlay (1) but below text (10)
        dotsWrapper.style.pointerEvents = 'auto';

        HERO_IMAGES.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.setAttribute('aria-label', `Ir a la imagen ${index + 1} del carrusel`);
            dot.style.width = '12px';
            dot.style.height = '12px';
            dot.style.borderRadius = '50%';
            dot.style.border = '2px solid rgba(255,255,255,0.8)';
            dot.style.cursor = 'pointer';
            dot.style.padding = '0';
            dot.style.margin = '0';
            dot.style.transition = 'background-color 0.3s ease, transform 0.3s ease';
            dot.style.backgroundColor = index === 0 ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.25)';
            dot.style.transform = index === 0 ? 'scale(1.25)' : 'scale(1)';

            dot.addEventListener('click', () => {
                goToSlide(index);
                restartTimer();
            });

            dotsWrapper.appendChild(dot);
            dots.push(dot);
        });

        heroSection.appendChild(dotsWrapper);

        // Start the automatic rotation.
        startTimer();
    }

    function goToSlide(index) {
        if (slides.length === 0) return;
        const safeIndex = ((index % slides.length) + slides.length) % slides.length;
        if (safeIndex === currentIndex) return;

        // Fade out current, fade in new.
        slides[currentIndex].style.opacity = '0';
        slides[safeIndex].style.opacity = '1';

        // Update dot styling.
        dots.forEach((dot, i) => {
            const active = i === safeIndex;
            dot.style.backgroundColor = active
                ? 'rgba(255,255,255,0.95)'
                : 'rgba(255,255,255,0.25)';
            dot.style.transform = active ? 'scale(1.25)' : 'scale(1)';
        });

        currentIndex = safeIndex;
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function startTimer() {
        if (carouselTimer) clearInterval(carouselTimer);
        carouselTimer = setInterval(nextSlide, SLIDE_INTERVAL_MS);
    }

    function restartTimer() {
        startTimer();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeroCarousel);
    } else {
        // DOM already parsed — initialise immediately.
        initHeroCarousel();
    }
})();
