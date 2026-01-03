/**
 * Blockchain Berlin - Main JavaScript
 * Minimale Interaktivität für bessere UX
 */

(function() {
    'use strict';
    
    // Smooth scroll für interne Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Language switcher highlight
    const currentPath = window.location.pathname;
    const langLinks = document.querySelectorAll('.lang-switch a');
    
    langLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath || 
            (currentPath === '/' && link.getAttribute('href') === '/') ||
            (currentPath.startsWith('/en') && link.getAttribute('href') === '/en/')) {
            link.style.color = 'var(--accent)';
            link.style.backgroundColor = 'var(--accent-light)';
        }
    });
    
    // References Carousel Functionality
    function initReferencesCarousel(carouselId, indicatorsId) {
        const carousel = document.getElementById(carouselId);
        if (!carousel) return;
        
        const container = carousel.closest('.references-carousel-container');
        const prevBtn = container.querySelector('.carousel-btn-prev');
        const nextBtn = container.querySelector('.carousel-btn-next');
        const indicatorsContainer = document.getElementById(indicatorsId);
        const cards = carousel.querySelectorAll('.reference-card');
        
        if (cards.length === 0) return;
        
        let currentIndex = 0;
        const itemsPerView = window.innerWidth > 768 ? 3 : 1;
        const totalItems = cards.length;
        let maxIndex = Math.max(0, totalItems - itemsPerView);
        
        // Create indicators
        if (indicatorsContainer) {
            indicatorsContainer.innerHTML = '';
            for (let i = 0; i <= maxIndex; i++) {
                const indicator = document.createElement('button');
                indicator.className = 'carousel-indicator';
                if (i === 0) indicator.classList.add('active');
                indicator.setAttribute('aria-label', `Go to slide ${i + 1}`);
                indicator.addEventListener('click', () => goToSlide(i));
                indicatorsContainer.appendChild(indicator);
            }
        }
        
        function updateCarousel() {
            const cardWidth = cards[0].offsetWidth;
            const gap = parseFloat(getComputedStyle(carousel).gap);
            const translateX = -currentIndex * (cardWidth + gap);
            carousel.style.transform = `translateX(${translateX}px)`;
            
            // Update button states
            if (prevBtn) prevBtn.disabled = currentIndex === 0;
            if (nextBtn) nextBtn.disabled = currentIndex >= maxIndex;
            
            // Update indicators
            if (indicatorsContainer) {
                const indicators = indicatorsContainer.querySelectorAll('.carousel-indicator');
                indicators.forEach((ind, idx) => {
                    ind.classList.toggle('active', idx === currentIndex);
                });
            }
        }
        
        function next() {
            if (currentIndex < maxIndex) {
                currentIndex = Math.min(currentIndex + 1, maxIndex);
                updateCarousel();
            }
        }
        
        function prev() {
            if (currentIndex > 0) {
                currentIndex = Math.max(currentIndex - 1, 0);
                updateCarousel();
            }
        }
        
        function goToSlide(index) {
            currentIndex = Math.max(0, Math.min(index, maxIndex));
            updateCarousel();
        }
        
        if (nextBtn) nextBtn.addEventListener('click', next);
        if (prevBtn) prevBtn.addEventListener('click', prev);
        
        // Touch/swipe support
        let startX = 0;
        let isDragging = false;
        
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });
        
        carousel.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });
        
        carousel.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) next();
                else prev();
            }
            isDragging = false;
        });
        
        // Initialize
        updateCarousel();
        
        // Recalculate on resize
        window.addEventListener('resize', () => {
            const newItemsPerView = window.innerWidth > 768 ? 3 : 1;
            const newMaxIndex = Math.max(0, totalItems - newItemsPerView);
            maxIndex = newMaxIndex;
            currentIndex = Math.min(currentIndex, maxIndex);
            updateCarousel();
        });
    }
    
    // Initialize carousels
    initReferencesCarousel('referencesCarousel', 'referencesIndicators');
    initReferencesCarousel('referencesCarouselEn', 'referencesIndicatorsEn');
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        // Initialize: menu is closed by default
        navLinks.setAttribute('aria-hidden', 'true');
        
        mobileMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
            const newState = !isExpanded;
            
            mobileMenuToggle.setAttribute('aria-expanded', newState);
            navLinks.setAttribute('aria-hidden', !newState);
            
            // Prevent body scroll when menu is open
            if (newState) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                navLinks.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside (on backdrop)
        document.addEventListener('click', function(e) {
            const isMenuOpen = navLinks.getAttribute('aria-hidden') === 'false';
            if (isMenuOpen && 
                !navLinks.contains(e.target) && 
                !mobileMenuToggle.contains(e.target)) {
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                navLinks.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            }
        });
    }
})();


