/* =============================================
   JavaScript — Academic Homepage
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  // ---------- Typed Text Effect ----------
  const typedText = document.getElementById('typedText');
  const phrases = [
    '红外探测器',
    '读出电路',
    '模拟IC',
    'AI for Science'
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typedText.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedText.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentPhrase.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 500; // Pause before next phrase
    }

    setTimeout(type, typeSpeed);
  }

  if (typedText) {
    type();
  }

  // ---------- Navbar Scroll Effect ----------
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section, .hero');

  function handleScroll() {
    // Navbar background
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active nav link
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  // ---------- Mobile Navigation Toggle ----------
  const navToggle = document.getElementById('navToggle');
  const navLinksContainer = document.getElementById('navLinks');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinksContainer.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinksContainer.classList.remove('active');
      });
    });
  }

  // ---------- Back to Top ----------
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---------- Smooth Scroll for Anchor Links ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        const offsetTop = targetEl.offsetTop - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });

  // ---------- Scroll Reveal Animation ----------
  const revealElements = document.querySelectorAll(
    '.section-header, .about-content, .about-stats, .stat-card, .research-card, ' +
    '.pub-card, .project-card, .timeline-item, .award-card, .contact-card, .contact-map'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  revealElements.forEach(el => observer.observe(el));

  // ---------- Counter Animation ----------
  const statNumbers = document.querySelectorAll('.stat-number');

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'));
          animateCounter(el, 0, target, 1500);
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach(el => counterObserver.observe(el));

  function animateCounter(el, start, end, duration) {
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const current = Math.floor(start + (end - start) * easeProgress);
      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = end + '+';
      }
    }

    requestAnimationFrame(update);
  }

  // ---------- Publication Filters ----------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const pubCards = document.querySelectorAll('.pub-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter publications
      pubCards.forEach(card => {
        const type = card.getAttribute('data-type');
        if (filter === 'all' || type === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeUp 0.5s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ---------- Parallax effect for floating shapes ----------
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        const shapes = document.querySelectorAll('.floating-shape');
        shapes.forEach((shape, i) => {
          const speed = 0.05 * (i + 1);
          shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // ---------- Typewriter Float Effect (About) ----------
  const typewriterBlocks = document.querySelectorAll('.typewriter-block');

  function startTypewriter(block) {
    const textEl = block.querySelector('.typewriter-text');
    const fullText = textEl.getAttribute('data-text');
    if (!fullText) return;

    block.classList.add('active');
    textEl.innerHTML = '';
    let i = 0;

    function typeChar() {
      if (i < fullText.length) {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = fullText[i];
        span.style.animationDelay = '0s';
        textEl.appendChild(span);
        i++;
        const speed = fullText[i - 1] === '.' || fullText[i - 1] === ',' ? 60 : 18;
        setTimeout(typeChar, speed);
      } else {
        block.classList.add('done');
        // Start next block
        const nextBlock = block.nextElementSibling;
        if (nextBlock && nextBlock.classList.contains('typewriter-block')) {
          setTimeout(() => startTypewriter(nextBlock), 400);
        }
      }
    }

    typeChar();
  }

  if (typewriterBlocks.length > 0) {
    const twObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const block = entry.target;
            // Only start the first block; rest chain automatically
            if (block.getAttribute('data-delay') === '0') {
              setTimeout(() => startTypewriter(block), 300);
            }
            twObserver.unobserve(block);
          }
        });
      },
      { threshold: 0.3 }
    );
    // Only observe the first block
    twObserver.observe(typewriterBlocks[0]);
  }

  // ---------- Initial call ----------
  handleScroll();
});
