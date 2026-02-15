import './style.css'

// ============================= 
// SCROLL ANIMATIONS (AOS-style)
// ============================= 

class ScrollAnimations {
  constructor() {
    this.elements = document.querySelectorAll('[data-aos]');
    this.init();
  }

  init() {
    // Check if elements are in viewport on load
    this.checkElements();

    // Check on scroll (throttled)
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.checkElements();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  checkElements() {
    this.elements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Element is in viewport
      if (rect.top < windowHeight * 0.85 && rect.bottom > 0) {
        element.classList.add('aos-animate');
      }
    });
  }
}

// ============================= 
// SMOOTH SCROLL FOR NAVIGATION
// ============================= 

class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        
        // Skip empty anchors
        if (href === '#') {
          e.preventDefault();
          return;
        }

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          
          // Calculate offset for fixed header
          const headerOffset = 100;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }
}

// ============================= 
// HEADER SHADOW ON SCROLL
// ============================= 

class HeaderEffects {
  constructor() {
    this.header = document.querySelector('header');
    this.init();
  }

  init() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.updateHeader();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  updateHeader() {
    if (!this.header) return;
    if (window.scrollY > 50) {
      this.header.classList.add('header-scrolled');
    } else {
      this.header.classList.remove('header-scrolled');
    }
  }
}

// ============================= 
// PARALLAX EFFECT (SUBTLE)
// ============================= 

class ParallaxEffect {
  constructor() {
    this.heroSection = document.querySelector('.hero-section');
    if (!this.heroSection) return;
    
    this.init();
  }

  init() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.updateParallax();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  updateParallax() {
    const scrolled = window.pageYOffset;
    
    // Only apply when hero is visible
    if (scrolled < window.innerHeight) {
      // Very subtle parallax - moves slower than scroll
      this.heroSection.style.transform = `translateY(${scrolled * 0.2}px)`;
      
      // Fade out as you scroll
      const opacity = Math.max(0, 1 - (scrolled / (window.innerHeight * 0.7)));
      this.heroSection.style.opacity = opacity;
    }
  }
}

// ============================= 
// FEATURE CARD TILT ON HOVER (OPTIONAL)
// ============================= 

class CardTiltEffect {
  constructor() {
    this.cards = document.querySelectorAll('.feature-card');
    this.init();
  }

  init() {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    this.cards.forEach(card => {
      card.addEventListener('mousemove', (e) => this.handleMouseMove(e, card));
      card.addEventListener('mouseleave', (e) => this.handleMouseLeave(e, card));
    });
  }

  handleMouseMove(e, card) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (very subtle - max 2 degrees)
    const rotateX = ((y - centerY) / centerY) * -1;
    const rotateY = ((x - centerX) / centerX) * 1;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  }

  handleMouseLeave(e, card) {
    card.style.transform = '';
  }
}

// ============================= 
// ORNAMENTAL FLOURISH ANIMATIONS
// ============================= 

class OrnamentAnimations {
  constructor() {
    this.ornaments = document.querySelectorAll('.ornament-top svg, .ornament-bottom svg');
    this.init();
  }

  init() {
    // Fade in ornaments on load
    setTimeout(() => {
      this.ornaments.forEach((ornament, index) => {
        setTimeout(() => {
          ornament.style.opacity = '0.4';
          ornament.style.transition = 'opacity 1s ease';
        }, index * 200);
      });
    }, 500);
  }
}

// ============================= 
// PAGE LOAD FADE IN
// ============================= 

class PageTransition {
  constructor() {
    this.init();
  }

  init() {
    // Ensure page is visible on load
    document.body.style.opacity = '0';
    
    window.addEventListener('load', () => {
      setTimeout(() => {
        document.body.style.transition = 'opacity 0.8s ease';
        document.body.style.opacity = '1';
      }, 100);
    });
  }
}

// ============================= 
// INITIALIZE ALL SYSTEMS
// ============================= 

// ============================= 
// THEME TOGGLE (LIGHT / DARK)
// ============================= 

function initThemeToggle() {
  const btn = document.getElementById('themeToggle');
  const root = document.documentElement;
  if (!btn) return;

  function getTheme() {
    return root.getAttribute('data-theme') || 'light';
  }

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    btn.setAttribute('title', theme === 'dark' ? 'Light theme' : 'Dark theme');
  }

  btn.addEventListener('click', () => {
    const next = getTheme() === 'dark' ? 'light' : 'dark';
    setTheme(next);
  });

  setTheme(getTheme());
}

// ============================= 
// BACKGROUND AUDIO + MUTE TOGGLE
// ============================= 

function initAudioToggle() {
  const audio = document.getElementById('bgAudio');
  const btn = document.getElementById('audioToggle');
  if (!audio || !btn) return;

  // Start playback muted (allowed by autoplay policy); loop is set in HTML
  audio.loop = true;
  const playPromise = audio.play();
  if (playPromise && typeof playPromise.catch === 'function') {
    playPromise.catch(() => {});
  }

  function updateState() {
    const unmuted = !audio.muted;
    btn.classList.toggle('is-unmuted', unmuted);
    btn.setAttribute('aria-label', unmuted ? 'Mute background audio' : 'Unmute background audio');
    btn.setAttribute('title', unmuted ? 'Mute' : 'Unmute');
  }

  btn.addEventListener('click', () => {
    audio.muted = !audio.muted;
    if (!audio.muted) {
      const p = audio.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    }
    updateState();
  });

  updateState();
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('📜 Classical European System Initialized');

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Core systems (always run)
  initThemeToggle();
  new SmoothScroll();
  new HeaderEffects();
  initAudioToggle();

  // Visual systems (skip if reduced motion)
  if (!prefersReducedMotion) {
    new ScrollAnimations();
    new ParallaxEffect();
    new CardTiltEffect();
    new OrnamentAnimations();
    new PageTransition();
  } else {
    // Ensure elements are visible
    document.querySelectorAll('[data-aos]').forEach(el => {
      el.classList.add('aos-animate');
    });
    document.body.style.opacity = '1';
  }

  console.log('✨ All systems operational');
});

// ============================= 
// UTILITY: DEBOUNCE FUNCTION
// ============================= 

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ============================= 
// PRINT OPTIMIZATION
// ============================= 

window.addEventListener('beforeprint', () => {
  // Remove animations before printing
  document.querySelectorAll('[data-aos]').forEach(el => {
    el.classList.add('aos-animate');
  });
});