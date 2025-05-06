/**
 * SyntharaAI Premium Interface
 * Refined scroll-based animations and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize premium animations
  initPremiumAnimations();

  // Add scroll event listeners
  window.addEventListener('scroll', debounce(handlePremiumScroll, 10));

  // Add resize event listener
  window.addEventListener('resize', debounce(handleResize, 100));

  // Initialize floating elements animation
  animateFloatingElements();

  // Trigger initial animation check
  setTimeout(() => {
    handlePremiumScroll();
  }, 100);
});

/**
 * Initialize premium animations
 */
function initPremiumAnimations() {
  // Add subtle parallax effect to header
  const header = document.querySelector('.premium-header');
  if (header) {
    window.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;

      const moveX = (mouseX - 0.5) * 15;
      const moveY = (mouseY - 0.5) * 15;

      document.querySelectorAll('.visual-element').forEach(el => {
        const speed = el.classList.contains('visual-circle') ? 0.4 :
                     el.classList.contains('visual-dots') ? 0.2 : 0.1;

        el.style.transform = `translate(calc(-50% + ${moveX * speed}px), calc(-50% + ${moveY * speed}px))`;
      });
    });
  }

  // Add hover effect to capability cards
  document.querySelectorAll('.capability-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-3px)';
      card.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.04)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = 'none';
    });
  });
}

/**
 * Handle premium scroll events
 */
function handlePremiumScroll() {
  // Handle sticky navigation
  handleStickyNav();

  // Update parallax effects
  updatePremiumParallax();
}

/**
 * Handle resize events
 */
function handleResize() {
  // Update parallax effects
  updatePremiumParallax();
}

/**
 * Handle sticky navigation
 */
function handleStickyNav() {
  const nav = document.querySelector('.premium-nav');
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (nav) {
    if (scrollTop > 100) {
      nav.style.background = 'rgba(42, 42, 42, 0.8)';
      nav.style.backdropFilter = 'blur(10px)';
      nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.08)';
      nav.style.position = 'fixed';
      nav.style.padding = '0.75rem 0';
      nav.classList.add('scrolled');

      // Update logo color for sticky nav
      const logoImg = nav.querySelector('.logo img');
      if (logoImg) {
        logoImg.style.filter = 'brightness(0) invert(1)';
      }
    } else {
      nav.style.background = 'transparent';
      nav.style.backdropFilter = 'none';
      nav.style.boxShadow = 'none';
      nav.style.position = 'absolute';
      nav.style.padding = '1rem 0';
      nav.classList.remove('scrolled');

      // Restore logo color
      const logoImg = nav.querySelector('.logo img');
      if (logoImg) {
        logoImg.style.filter = 'brightness(0) invert(1)';
      }
    }
  }
}

/**
 * Update premium parallax effects
 */
function updatePremiumParallax() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Parallax for hero section
  const hero = document.querySelector('.premium-hero');
  if (hero) {
    const heroOffset = scrollTop * 0.25;
    hero.style.transform = `translateY(${heroOffset}px)`;
  }

  // Parallax for section visuals
  document.querySelectorAll('.section-visual').forEach(visual => {
    const rect = visual.getBoundingClientRect();
    const centerY = rect.top + rect.height / 2;
    const viewportCenter = window.innerHeight / 2;
    const distanceFromCenter = centerY - viewportCenter;

    const parallaxOffset = distanceFromCenter * 0.03;
    visual.style.transform = `translateY(${-parallaxOffset}px)`;
  });
}

/**
 * Animate floating elements
 */
function animateFloatingElements() {
  const floatingElements = document.querySelectorAll('.floating-element');

  floatingElements.forEach((el, index) => {
    // Create subtle animation parameters
    const duration = 20 + (index * 5);
    const delay = index * 2;

    // Apply animation
    el.style.animation = `float ${duration}s ease-in-out ${delay}s infinite alternate`;
  });

  // Add keyframes for floating animation if not already added
  if (!document.querySelector('#float-keyframes')) {
    const style = document.createElement('style');
    style.id = 'float-keyframes';
    style.textContent = `
      @keyframes float {
        0% {
          transform: translate(0, 0);
        }
        50% {
          transform: translate(15px, -15px);
        }
        100% {
          transform: translate(-15px, 15px);
        }
      }
    `;
    document.head.appendChild(style);
  }
}

/**
 * Debounce function to limit function calls
 */
function debounce(func, wait) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

/**
 * Smooth scroll to anchor links
 */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Calculate offset for sticky header
        const navHeight = document.querySelector('.premium-nav').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
