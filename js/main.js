/**
 * Blockchain Berlin - Main JavaScript
 * Minimale Interaktivität für bessere UX
 */

(function () {
    'use strict';

    const WEB3FORMS_URL = 'https://api.web3forms.com/submit';

    // Smooth scroll für interne Links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        });
    });

    // Language switcher highlight
    const currentPath = window.location.pathname;
    const langLinks = document.querySelectorAll('.lang-switch a');

    langLinks.forEach((link) => {
        if (
            link.getAttribute('href') === currentPath ||
            (currentPath === '/' && link.getAttribute('href') === '/') ||
            (currentPath.startsWith('/en') && link.getAttribute('href') === '/en/')
        ) {
            link.style.color = 'var(--accent)';
            link.style.backgroundColor = 'var(--accent-light)';
        }
    });

    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle && navLinks) {
        navLinks.setAttribute('aria-hidden', 'true');

        mobileMenuToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
            const newState = !isExpanded;

            mobileMenuToggle.setAttribute('aria-expanded', newState);
            navLinks.setAttribute('aria-hidden', !newState);

            if (newState) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        navLinks.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', function () {
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                navLinks.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            });
        });

        document.addEventListener('click', function (e) {
            const isMenuOpen = navLinks.getAttribute('aria-hidden') === 'false';
            if (
                isMenuOpen &&
                !navLinks.contains(e.target) &&
                !mobileMenuToggle.contains(e.target)
            ) {
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                navLinks.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            }
        });
    }

    const formSuccess = document.getElementById('form-success');
    if (window.location.search.includes('sent=1') && formSuccess) {
        formSuccess.hidden = false;
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        const formError = document.getElementById('form-error');
        const isGerman = document.documentElement.lang === 'de';
        const submitButton = contactForm.querySelector('[type="submit"]');
        const defaultSubmitLabel = submitButton ? submitButton.textContent : '';

        function resetSubmitButton() {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = defaultSubmitLabel;
            }
        }

        function showError(message) {
            if (formError) {
                formError.textContent = message;
                formError.hidden = false;
            }
            if (formSuccess) {
                formSuccess.hidden = true;
            }
        }

        contactForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            const botcheck = contactForm.querySelector('[name="botcheck"]');
            if (botcheck && botcheck.value.trim()) {
                return;
            }

            if (formError) {
                formError.hidden = true;
                formError.textContent = '';
            }
            if (formSuccess) {
                formSuccess.hidden = true;
            }

            const accessKey = window.PANDR_WEB3FORMS_ACCESS_KEY;
            if (!accessKey || accessKey === 'YOUR_ACCESS_KEY_HERE') {
                showError(
                    isGerman
                        ? 'Formular ist noch nicht konfiguriert. Bitte später erneut versuchen.'
                        : 'Form is not configured yet. Please try again later.',
                );
                return;
            }

            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = isGerman ? 'Wird gesendet…' : 'Sending…';
            }

            const formData = new FormData(contactForm);
            const payload = {
                access_key: accessKey,
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message'),
                subject: isGerman ? 'Kontakt from website' : 'Contact from website',
                botcheck: '',
            };

            try {
                const response = await fetch(WEB3FORMS_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    body: JSON.stringify(payload),
                });

                const result = await response.json();

                if (response.ok && result.success) {
                    contactForm.reset();
                    if (formSuccess) {
                        formSuccess.hidden = false;
                        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                } else {
                    showError(
                        isGerman
                            ? 'Senden fehlgeschlagen. Bitte versuchen Sie es später erneut oder buchen Sie einen Termin.'
                            : 'Sending failed. Please try again later or book a call.',
                    );
                }
            } catch {
                showError(
                    isGerman
                        ? 'Senden fehlgeschlagen. Bitte versuchen Sie es später erneut oder buchen Sie einen Termin.'
                        : 'Sending failed. Please try again later or book a call.',
                );
            } finally {
                resetSubmitButton();
            }
        });

        contactForm.addEventListener(
            'invalid',
            function () {
                resetSubmitButton();
            },
            true,
        );
    }
})();
