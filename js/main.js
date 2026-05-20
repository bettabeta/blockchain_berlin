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


