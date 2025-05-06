/**
 * SyntharaAI Premium Animations
 * Refined scroll-based reveal system with minimalist transitions
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize animations
  initScrollAnimations();
  initParallaxEffects();
  initScrollProgress();
  
  // Add scroll event listener
  window.addEventListener('scroll', debounce(handleScroll, 15));
  
  // Trigger initial animation check
  setTimeout(() => {
    handleScroll();
  }, 100);
});

/**
 * Initialize scroll-based animations
 */
function initScrollAnimations() {
  // Add reveal classes to elements
  document.querySelectorAll('.reveal-element, .reveal-scale, .reveal-fade').forEach(el => {
    if (isElementInViewport(el, 0.1)) {
      el.classList.add('revealed');
    }
  });
}

/**
 * Initialize parallax effects
 */
function initParallaxEffects() {
  // Add parallax class to elements
  document.querySelectorAll('.parallax').forEach(el => {
    window.addEventListener('scroll', () => {
      updateParallaxEffects();
    });
  });
}

/**
 * Initialize scroll progress indicator
 */
function initScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    
    progressBar.style.width = progress + '%';
  });
}

/**
 * Handle scroll events
 */
function handleScroll() {
  // Reveal elements when they enter the viewport
  document.querySelectorAll('.reveal-element:not(.revealed), .reveal-scale:not(.revealed), .reveal-fade:not(.revealed)').forEach(el => {
    if (isElementInViewport(el, 0.1)) {
      el.classList.add('revealed');
    }
  });
  
  // Reveal staggered children
  document.querySelectorAll('.stagger-children:not(.revealed)').forEach(el => {
    if (isElementInViewport(el, 0.1)) {
      el.classList.add('revealed');
    }
  });
  
  // Reveal text elements
  document.querySelectorAll('.text-reveal:not(.revealed)').forEach(el => {
    if (isElementInViewport(el, 0.1)) {
      el.classList.add('revealed');
    }
  });
  
  // Reveal highlight borders
  document.querySelectorAll('.highlight-border:not(.revealed)').forEach(el => {
    if (isElementInViewport(el, 0.1)) {
      el.classList.add('revealed');
    }
  });
  
  // Update parallax effects
  updateParallaxEffects();
}

/**
 * Update parallax effects based on scroll position
 */
function updateParallaxEffects() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  document.querySelectorAll('.parallax').forEach(el => {
    const speed = el.classList.contains('parallax-slow') ? 0.03 :
                 el.classList.contains('parallax-fast') ? 0.09 : 0.06;
    
    const yOffset = scrollTop * speed;
    el.style.transform = `translateY(${yOffset}px)`;
  });
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
 * Check if an element is in the viewport
 */
function isElementInViewport(el, offset = 0) {
  const rect = el.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  
  // Element is considered in viewport when its top is below the offset point
  // and its bottom is above the bottom offset point
  return (
    rect.top <= windowHeight * (1 - offset) &&
    rect.bottom >= windowHeight * offset
  );
}
