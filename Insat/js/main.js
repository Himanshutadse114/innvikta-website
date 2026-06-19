/**
 * InSAT Website Interactions
 * Vanilla JS implementations of UI components.
 */

document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    initFaqAccordion();
    initLanguageSelector();
    initTestimonialSlider();
});

/**
 * 1. Mobile Navigation Menu Toggle
 */
function initMobileNav() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNavDrawer = document.getElementById('mobileNavDrawer');
    const mobileNavBackdrop = document.getElementById('mobileNavBackdrop');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (!mobileMenuBtn || !mobileNavDrawer || !mobileNavBackdrop) return;

    function toggleMenu() {
        const isActive = mobileMenuBtn.classList.toggle('active');
        mobileNavDrawer.classList.toggle('active', isActive);
        mobileNavBackdrop.classList.toggle('active', isActive);
        document.body.style.overflow = isActive ? 'hidden' : 'auto';
    }

    function closeMenu() {
        mobileMenuBtn.classList.remove('active');
        mobileNavDrawer.classList.remove('active');
        mobileNavBackdrop.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    mobileMenuBtn.addEventListener('click', toggleMenu);
    mobileNavBackdrop.addEventListener('click', closeMenu);
    
    // Close menu when clicking on any mobile nav links
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

/**
 * 2. FAQ Accordion Collapsible Logic
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        if (!trigger) return;

        trigger.addEventListener('click', () => {
            const isCurrentlyActive = item.classList.contains('active');
            
            // Close other FAQ items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                const otherTrigger = otherItem.querySelector('.faq-trigger');
                if (otherTrigger) {
                    otherTrigger.setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle current FAQ item
            if (!isCurrentlyActive) {
                item.classList.add('active');
                trigger.setAttribute('aria-expanded', 'true');
            } else {
                item.classList.remove('active');
                trigger.setAttribute('aria-expanded', 'false');
            }
        });
    });
}

/**
 * 3. Language Selector Toggle
 */
function initLanguageSelector() {
    const langSelector = document.getElementById('langSelector');
    if (!langSelector) return;

    const btn = langSelector.querySelector('.lang-btn');
    if (!btn) return;

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', !expanded);
        langSelector.classList.toggle('active');
    });

    // Close language dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!langSelector.contains(e.target)) {
            btn.setAttribute('aria-expanded', 'false');
            langSelector.classList.remove('active');
        }
    });
}

/**
 * 4. Client Testimonials Slider/Carousel
 */
function initTestimonialSlider() {
    const wrapper = document.getElementById('sliderWrapper');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('sliderPrevBtn');
    const nextBtn = document.getElementById('sliderNextBtn');
    
    if (!wrapper || slides.length === 0) return;
    
    let currentIndex = 0;
    const spacing = 12; // margin-right in px matching css style sheet

    function updateSlider() {
        // Compute offset translation for slide wrapper
        let offset = 0;
        for (let i = 0; i < currentIndex; i++) {
            offset += slides[i].offsetWidth + spacing;
        }

        wrapper.style.transform = `translate3d(-${offset}px, 0, 0)`;

        // Update button states
        if (prevBtn) {
            prevBtn.disabled = (currentIndex === 0);
        }

        if (nextBtn) {
            // Check if there are remaining slides to show.
            // On large screens, multiple slides might fit, so we disable Next when we reach the end of display width.
            const containerWidth = wrapper.parentElement.offsetWidth;
            let totalRemainingWidth = 0;
            
            for (let i = currentIndex + 1; i < slides.length; i++) {
                totalRemainingWidth += slides[i].offsetWidth + spacing;
            }

            // Disable Next button if remaining slides fits within current viewport width
            nextBtn.disabled = (totalRemainingWidth <= containerWidth);
        }
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentIndex < slides.length - 1) {
                currentIndex++;
                updateSlider();
            }
        });
    }

    // Initialize and bind window resize event
    updateSlider();
    window.addEventListener('resize', updateSlider);
}
