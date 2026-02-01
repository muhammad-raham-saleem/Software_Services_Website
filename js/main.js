// ============================================
// COSMIC PARTICLES BACKGROUND
// ============================================
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = window.innerWidth < 768 ? 30 : 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random size between 2-6px
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;

        // Random animation duration
        const duration = Math.random() * 20 + 10;
        particle.style.animationDuration = `${duration}s`;

        // Random delay
        const delay = Math.random() * 5;
        particle.style.animationDelay = `${delay}s`;

        // Styles
        particle.style.position = 'absolute';
        particle.style.background = `radial-gradient(circle, rgba(255, 0, 128, 0.8), rgba(131, 56, 236, 0.4))`;
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.animation = `floatParticle ${duration}s ease-in-out ${delay}s infinite`;
        particle.style.filter = 'blur(1px)';

        particlesContainer.appendChild(particle);
    }

    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
    @keyframes floatParticle {
      0%, 100% {
        transform: translate(0, 0) scale(1);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      50% {
        transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(${Math.random() + 0.5});
      }
    }
  `;
    document.head.appendChild(style);
}

// ============================================
// HEADER SCROLL EFFECT
// ============================================
function handleHeaderScroll() {
    const header = document.querySelector('.main-header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ============================================
// MOBILE MENU TOGGLE
// ============================================
function initMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ============================================
// SMOOTH SCROLL FOR NAVIGATION
// ============================================
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================
function initScrollAnimations() {
    // Service and advantage cards
    const cards = document.querySelectorAll('.service-card, .advantage-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '-50px'
    });

    cards.forEach(card => cardObserver.observe(card));

    // Ladder rungs - observe each one individually
    const ladderRungs = document.querySelectorAll('.ladder-rung');

    ladderRungs.forEach((rung, index) => {
        // Remove the visible class initially (in case it was added)
        rung.classList.remove('visible');

        const rungObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add a small delay for each rung to create stagger effect
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 150); // 150ms delay between each rung
                }
                // Remove when scrolling back up for re-animation
                else {
                    entry.target.classList.remove('visible');
                }
            });
        }, {
            threshold: 0.2, // Trigger when 20% of the rung is visible
            rootMargin: '-100px 0px' // Trigger 100px before element enters viewport
        });

        rungObserver.observe(rung);
    });
}
// ============================================
// LADDER PROGRESS TRACKING
// ============================================



function initLadderProgress() {
    const progressFill = document.getElementById('ladder-progress');
    const processSection = document.getElementById('process');

    if (!progressFill || !processSection) return;

    let animationFrame = null;

    function updateProgress() {
        const sectionRect = processSection.getBoundingClientRect();
        const sectionTop = sectionRect.top + window.pageYOffset;
        const sectionHeight = processSection.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollPosition = window.pageYOffset + (windowHeight / 2);

        // Calculate progress
        let progress = 0;

        if (scrollPosition > sectionTop) {
            if (scrollPosition < sectionTop + sectionHeight) {
                // We're inside the section
                progress = ((scrollPosition - sectionTop) / sectionHeight) * 100;
            } else {
                // Past the section
                progress = 100;
            }
        }

        progressFill.style.width = Math.min(Math.max(progress, 0), 100) + '%';
        animationFrame = null;
    }

    function onScroll() {
        if (animationFrame) return;
        animationFrame = requestAnimationFrame(updateProgress);
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // Initial update
    updateProgress();
}
// ============================================
// LADDER RUNG CLICK INTERACTION
// ============================================


function initLadderInteraction() {
    const rungs = document.querySelectorAll('.ladder-rung');

    rungs.forEach((rung) => {
        rung.addEventListener('click', () => {
            // Scale effect
            rung.style.transition = 'transform 0.3s ease';
            rung.style.transform = 'translateY(0) scale(1.02)';

            setTimeout(() => {
                rung.style.transform = 'translateY(0) scale(1)';
            }, 300);

            // Create sparkles
            createSparkles(rung);
        });
    });
    // ============================================
    // TILT EFFECT FOR SERVICE CARDS
    // ============================================

    function createSparkles(element) {
        const rect = element.getBoundingClientRect();
        const sparkleCount = 8;

        for (let i = 0; i < sparkleCount; i++) {
            const sparkle = document.createElement('div');
            sparkle.style.cssText = `
        position: fixed;
        left: ${rect.left + rect.width / 2}px;
        top: ${rect.top + rect.height / 2}px;
        width: 8px;
        height: 8px;
        background: radial-gradient(circle, #ff10f0, transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
      `;

            document.body.appendChild(sparkle);

            const angle = (Math.PI * 2 * i) / sparkleCount;
            const distance = 50 + Math.random() * 50;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;

            sparkle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
            ], {
                duration: 800,
                easing: 'cubic-bezier(0, 0.9, 0.3, 1)'
            });

            setTimeout(() => sparkle.remove(), 800);
        }
    }
}



function initTiltEffect() {
    const cards = document.querySelectorAll('[data-tilt]');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ============================================
// TESTIMONIAL SLIDER
// ============================================
function initTestimonialSlider() {
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.testimonial-nav.prev');
    const nextBtn = document.querySelector('.testimonial-nav.next');
    let currentIndex = 0;

    function showTestimonial(index) {
        cards.forEach((card, i) => {
            card.classList.toggle('active', i === index);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        currentIndex = index;
    }

    function nextTestimonial() {
        const nextIndex = (currentIndex + 1) % cards.length;
        showTestimonial(nextIndex);
    }

    function prevTestimonial() {
        const prevIndex = (currentIndex - 1 + cards.length) % cards.length;
        showTestimonial(prevIndex);
    }

    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextTestimonial);
    if (prevBtn) prevBtn.addEventListener('click', prevTestimonial);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showTestimonial(index));
    });

    // Auto-advance every 5 seconds
    setInterval(nextTestimonial, 5000);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevTestimonial();
        if (e.key === 'ArrowRight') nextTestimonial();
    });
}

// ============================================
// MODAL FUNCTIONALITY
// ============================================
function initModal() {
    const modal = document.getElementById('booking-modal');
    const openButtons = document.querySelectorAll('#open-modal, #open-modal-hero, #open-modal-final');
    const closeButton = document.querySelector('.close-modal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const form = document.getElementById('booking-form');

    function openModal() {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';

        // Focus first input
        setTimeout(() => {
            const firstInput = modal.querySelector('input');
            if (firstInput) firstInput.focus();
        }, 300);
    }

    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    // Open modal
    openButtons.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    // Close modal
    if (closeButton) closeButton.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // Form submission
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            console.log('Form submitted:', data);

            // Show success message
            showSuccessMessage();

            // Reset form
            form.reset();

            // Close modal after delay
            setTimeout(closeModal, 2000);
        });
    }

    function showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = '✓ Thank you! We\'ll be in touch soon.';
        successDiv.style.cssText = `
      position: fixed;
      top: 100px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #ff0080, #ff10f0);
      color: white;
      padding: 1rem 2rem;
      border-radius: 50px;
      font-weight: 600;
      box-shadow: 0 10px 40px rgba(255, 0, 128, 0.5);
      z-index: 10000;
      animation: slideDown 0.5s ease-out;
    `;

        document.body.appendChild(successDiv);

        setTimeout(() => {
            successDiv.style.animation = 'slideUp 0.5s ease-out';
            setTimeout(() => successDiv.remove(), 500);
        }, 2000);
    }
}

// Add CSS for success message animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }
  
  @keyframes slideUp {
    from {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
    to {
      opacity: 0;
      transform: translateX(-50%) translateY(-20px);
    }
  }
`;
document.head.appendChild(style);

// ============================================
// CURSOR TRAIL EFFECT (Fun interactive feature)
// ============================================
function initCursorTrail() {
    // Only on desktop
    if (window.innerWidth < 768) return;

    const trail = [];
    const trailLength = 20;

    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail';
        dot.style.cssText = `
      position: fixed;
      width: 6px;
      height: 6px;
      background: radial-gradient(circle, rgba(255, 0, 128, ${1 - i / trailLength}), transparent);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transition: transform 0.1s ease-out;
    `;
        document.body.appendChild(dot);
        trail.push({ element: dot, x: 0, y: 0 });
    }

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateTrail() {
        let currentX = mouseX;
        let currentY = mouseY;

        trail.forEach((dot, index) => {
            dot.x += (currentX - dot.x) * 0.5;
            dot.y += (currentY - dot.y) * 0.5;

            dot.element.style.left = `${dot.x}px`;
            dot.element.style.top = `${dot.y}px`;

            currentX = dot.x;
            currentY = dot.y;
        });

        requestAnimationFrame(animateTrail);
    }

    animateTrail();
}

// ============================================
// PARALLAX EFFECT FOR HERO
// ============================================
function initParallax() {
    const hero = document.getElementById('hero');
    if (!hero) return;

    // Use will-change for better performance
    hero.style.willChange = 'transform';

    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;

        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });
}
// ============================================
// INTERACTIVE GLOW EFFECT ON MOUSE MOVE
// ============================================
function initGlowEffect() {
    const cards = document.querySelectorAll('.service-card, .advantage-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const glow = card.querySelector('.card-glow') || createGlowElement(card);
            glow.style.left = `${x}px`;
            glow.style.top = `${y}px`;
        });
    });

    function createGlowElement(parent) {
        const glow = document.createElement('div');
        glow.className = 'card-glow';
        parent.appendChild(glow);
        return glow;
    }
}

// ============================================
// COUNTING ANIMATION FOR NUMBERS
// ============================================
function initCountingAnimation() {
    const badges = document.querySelectorAll('.badge-number');
    let hasAnimated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                badges.forEach(badge => {
                    const target = badge.textContent;
                    const isPercentage = target.includes('%');
                    const isPlus = target.includes('+');
                    const numericValue = parseInt(target);

                    animateCount(badge, 0, numericValue, 2000, isPercentage, isPlus);
                });
            }
        });
    }, { threshold: 0.5 });

    badges.forEach(badge => observer.observe(badge));

    function animateCount(element, start, end, duration, isPercentage, isPlus) {
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (end - start) * easeOutQuart);

            let displayValue = current.toString();
            if (isPercentage) displayValue += '%';
            if (isPlus) displayValue += '+';

            element.textContent = displayValue;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }
}

// ============================================
// FAQ ACCORDION
// ============================================
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');

        question.addEventListener('click', () => {
            const isOpen = question.getAttribute('aria-expanded') === 'true';

            // Close all other FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherQuestion = otherItem.querySelector('.faq-question');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = otherItem.querySelector('.faq-icon');

                    otherQuestion.setAttribute('aria-expanded', 'false');
                    otherAnswer.style.maxHeight = '0';
                    otherIcon.textContent = '+';
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current FAQ
            if (isOpen) {
                question.setAttribute('aria-expanded', 'false');
                answer.style.maxHeight = '0';
                icon.textContent = '+';
                item.classList.remove('active');
            } else {
                question.setAttribute('aria-expanded', 'true');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.textContent = '−';
                item.classList.add('active');
            }
        });
    });
}

// ============================================
// INITIALIZE ALL FEATURES
// ============================================
function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
        return;
    }

    // Initialize all features
    createParticles();
    handleHeaderScroll();
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initLadderProgress();
    initLadderInteraction();
    initTiltEffect();
    initTestimonialSlider();
    initModal();
    initCursorTrail();
    initParallax();
    initGlowEffect();
    initCountingAnimation();
    initFAQ();

    console.log('🚀 InnovateTech website initialized!');
}

// Start the magic
init();

// ============================================
// PERFORMANCE: LAZY LOAD IMAGES
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// EASTER EGG: KONAMI CODE
// ============================================
(function () {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateEasterEgg() {
        // Create rainbow effect
        document.body.style.animation = 'rainbow 2s ease-in-out infinite';

        const style = document.createElement('style');
        style.textContent = `
      @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
      }
    `;
        document.head.appendChild(style);

        alert('🎉 You found the secret! Cosmic mode activated!');

        setTimeout(() => {
            document.body.style.animation = '';
            style.remove();
        }, 10000);
    }
})();

