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

  // ---------- Hero Motto Loop ----------
  const heroMottoText = document.getElementById('heroMottoText');
  const heroMotto = document.querySelector('.hero-motto');
  const heroMottoState = document.querySelector('.hero-motto-state');
  const heroMottoQuotes = [
    '世界上有些悲剧，没有解法。',
    '每个人心里都住着一个死小孩。',
    '你不懂那种看着一个人离开，却无能为力的感觉。',
    '命运这种东西，生来就是要被踏于足下的。',
    '有些时间点错过一次，就好比错过了一生。',
    '孤独是与生俱来的。',
    '真正重要的东西，往往是没有的人比拥有的人更清楚。',
    '人总要抱着点什么，才知道自己为什么活着。',
    '所谓弃族的命运，就是要穿越荒原，再次竖起战旗。',
    '如果喜欢谁，就满世界去找她，别等她来找你。',
    '你要去变得很强，强到足够保护你想保护的人。',
    '有些事不是看到了希望才坚持，而是坚持了才能看到希望。'
  ];

  if (heroMottoText && heroMotto) {
    const heroMottoReduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (heroMottoReduceMotionQuery.matches) {
      heroMottoText.textContent = heroMottoQuotes[0];
      heroMotto.classList.add('is-idle');
      if (heroMottoState) {
        heroMottoState.textContent = 'STABLE';
      }
    } else {
      let heroMottoIndex = 0;
      let heroMottoCharIndex = 0;
      let heroMottoDeleting = false;

      const updateHeroMottoState = (state) => {
        if (!heroMottoState) return;
        heroMottoState.textContent = state;
      };

      const cycleHeroMotto = () => {
        const currentQuote = heroMottoQuotes[heroMottoIndex];

        heroMotto.classList.toggle('is-deleting', heroMottoDeleting);
        heroMotto.classList.toggle('is-typing', !heroMottoDeleting);

        if (heroMottoDeleting) {
          heroMottoText.textContent = currentQuote.slice(0, Math.max(0, heroMottoCharIndex - 1));
          heroMottoCharIndex -= 1;
          updateHeroMottoState('PURGE');
        } else {
          heroMottoText.textContent = currentQuote.slice(0, heroMottoCharIndex + 1);
          heroMottoCharIndex += 1;
          updateHeroMottoState('WRITE');
        }

        let nextDelay = heroMottoDeleting ? 42 : 115;

        if (!heroMottoDeleting && heroMottoCharIndex >= currentQuote.length) {
          heroMottoDeleting = true;
          heroMotto.classList.remove('is-typing');
          heroMotto.classList.add('is-idle');
          updateHeroMottoState('LOCK');
          nextDelay = 2600;
        } else if (heroMottoDeleting && heroMottoCharIndex <= 0) {
          heroMottoDeleting = false;
          heroMottoIndex = (heroMottoIndex + 1) % heroMottoQuotes.length;
          heroMotto.classList.remove('is-deleting', 'is-idle');
          updateHeroMottoState('SHIFT');
          nextDelay = 560;
        } else {
          heroMotto.classList.remove('is-idle');
        }

        window.setTimeout(cycleHeroMotto, nextDelay);
      };

      window.setTimeout(cycleHeroMotto, 900);
    }
  }

  // ---------- Hero Name Visibility Safeguard ----------
  const heroName = document.querySelector('.hero-name');

  if (heroName) {
    const heroNameLabel = heroName.textContent.trim();
    const heroNameReduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    heroName.classList.remove('animate-fade-up', 'delay-1');
    heroName.classList.add('hero-name-floating');
    heroName.setAttribute('aria-label', heroNameLabel);
    heroName.style.setProperty('opacity', '1', 'important');
    heroName.style.setProperty('visibility', 'visible', 'important');
    heroName.style.setProperty('background', 'none', 'important');
    heroName.style.setProperty('color', '#ffffff', 'important');
    heroName.style.setProperty('-webkit-text-fill-color', '#ffffff', 'important');
    heroName.style.setProperty(
      'text-shadow',
      '0 10px 26px rgba(125, 211, 252, 0.16), 0 0 22px rgba(255, 255, 255, 0.08)',
      'important'
    );

    heroName.innerHTML =
      '<span class="hero-name-text" aria-hidden="true"></span>' +
      '<span class="hero-name-caret" aria-hidden="true"></span>';

    const heroNameText = heroName.querySelector('.hero-name-text');

    if (heroNameText) {
      if (heroNameReduceMotionQuery.matches) {
        heroNameText.textContent = heroNameLabel;
        heroName.classList.add('is-typed');
      } else {
        const startHeroNameCycle = () => {
          let heroNameIndex = 0;
          heroNameText.textContent = '';
          heroName.classList.add('is-typing');
          heroName.classList.remove('is-typed');

          const typeHeroName = () => {
            heroNameText.textContent = heroNameLabel.slice(0, heroNameIndex + 1);
            heroNameIndex += 1;

            if (heroNameIndex < heroNameLabel.length) {
              window.setTimeout(typeHeroName, 260);
            } else {
              heroName.classList.remove('is-typing');
              heroName.classList.add('is-typed');

              window.setTimeout(() => {
                heroNameText.textContent = '';
                heroName.classList.add('is-typing');
                heroName.classList.remove('is-typed');
                window.setTimeout(startHeroNameCycle, 280);
              }, 2200);
            }
          };

          typeHeroName();
        };

        window.setTimeout(startHeroNameCycle, 260);
      }
    }
  }

  // ---------- Custom Cursor ----------
  const body = document.body;
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  function setupCustomCursor() {
    if (!cursorDot || !cursorRing) return;

    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const surfaceSelector =
      '.about-console, .stat-card, .techstack-card, .research-card, .pub-card, ' +
      '.project-card, .award-card, .timeline-content, .contact-card, .contact-map';
    const actionSelector =
      'a, button, .btn, .social-btn, .nav-link, .nav-logo, .filter-btn, .back-to-top';

    let enabled = false;
    let frameId = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;

    function setDotPosition(x, y) {
      cursorDot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }

    function setRingPosition(x, y) {
      cursorRing.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }

    function clearCursorState() {
      body.classList.remove(
        'custom-cursor-visible',
        'custom-cursor-hover',
        'custom-cursor-action',
        'custom-cursor-pressed'
      );
    }

    function updateCursorState(target) {
      const isAction = Boolean(target && target.closest(actionSelector));
      const isSurface = isAction || Boolean(target && target.closest(surfaceSelector));
      body.classList.toggle('custom-cursor-hover', isSurface);
      body.classList.toggle('custom-cursor-action', isAction);
    }

    function renderRing() {
      const easing = reduceMotionQuery.matches ? 1 : 0.18;
      ringX += (targetX - ringX) * easing;
      ringY += (targetY - ringY) * easing;
      setRingPosition(ringX, ringY);
      frameId = window.requestAnimationFrame(renderRing);
    }

    function handlePointerMove(event) {
      targetX = event.clientX;
      targetY = event.clientY;
      setDotPosition(targetX, targetY);
      body.classList.add('custom-cursor-visible');
      updateCursorState(event.target);
    }

    function handlePointerDown() {
      body.classList.add('custom-cursor-pressed');
    }

    function handlePointerUp() {
      body.classList.remove('custom-cursor-pressed');
    }

    function handleMouseOut(event) {
      if (!event.relatedTarget) {
        clearCursorState();
      }
    }

    function enableCursor() {
      if (enabled) return;
      enabled = true;
      body.classList.add('custom-cursor-enabled');
      targetX = window.innerWidth / 2;
      targetY = window.innerHeight / 2;
      ringX = targetX;
      ringY = targetY;
      setDotPosition(targetX, targetY);
      setRingPosition(ringX, ringY);
      document.addEventListener('pointermove', handlePointerMove, { passive: true });
      document.addEventListener('pointerdown', handlePointerDown, { passive: true });
      document.addEventListener('pointerup', handlePointerUp, { passive: true });
      document.addEventListener('mouseout', handleMouseOut);
      window.addEventListener('blur', clearCursorState);
      frameId = window.requestAnimationFrame(renderRing);
    }

    function disableCursor() {
      if (!enabled) return;
      enabled = false;
      window.cancelAnimationFrame(frameId);
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('blur', clearCursorState);
      body.classList.remove('custom-cursor-enabled');
      clearCursorState();
      setDotPosition(-100, -100);
      setRingPosition(-100, -100);
    }

    function syncCursorMode(event) {
      if (event.matches) {
        enableCursor();
      } else {
        disableCursor();
      }
    }

    syncCursorMode(mediaQuery);

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', syncCursorMode);
    } else if (typeof mediaQuery.addListener === 'function') {
      mediaQuery.addListener(syncCursorMode);
    }
  }

  setupCustomCursor();

  // ---------- Interactive Panel Spotlight ----------
  function setupInteractivePanels() {
    const panelSelector = [
      '.hero-content',
      '.about-grid',
      '.about-console',
      '.research-grid',
      '.publications-list',
      '.projects-grid',
      '.awards-grid',
      '.timeline',
      '.contact-grid',
      '.footer-content',
      '.stat-card',
      '.research-card',
      '.pub-card',
      '.project-card',
      '.timeline-content',
      '.award-card',
      '.contact-card',
      '.contact-map'
    ].join(', ');

    const panels = Array.from(document.querySelectorAll(panelSelector)).filter(
      panel => !panel.closest('#education')
    );
    if (!panels.length) return;

    const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let enabled = false;

    function ensureOverlay(panel, className) {
      const exists = Array.from(panel.children).some(
        child => child.classList && child.classList.contains(className)
      );
      if (exists) return;

      const overlay = document.createElement('span');
      overlay.className = className;
      overlay.setAttribute('aria-hidden', 'true');
      panel.appendChild(overlay);
    }

    function resetPanel(panel) {
      panel.style.setProperty('--pointer-x', '50%');
      panel.style.setProperty('--pointer-y', '50%');
      panel.style.setProperty('--tilt-x', '0deg');
      panel.style.setProperty('--tilt-y', '0deg');
      panel.style.setProperty('--pointer-alpha', '0');
      panel.style.setProperty('--beam-angle', '0deg');
    }

    function handlePanelEnter(event) {
      event.currentTarget.classList.add('is-pointer-active');
    }

    function handlePanelMove(event) {
      const panel = event.currentTarget;
      const closestPanel = event.target.closest('.interactive-panel');
      if (closestPanel && closestPanel !== panel) return;

      const rect = panel.getBoundingClientRect();
      const rawX = event.clientX - rect.left;
      const rawY = event.clientY - rect.top;
      const x = Math.max(0, Math.min(rawX, rect.width));
      const y = Math.max(0, Math.min(rawY, rect.height));
      const normalizedX = rect.width ? x / rect.width : 0.5;
      const normalizedY = rect.height ? y / rect.height : 0.5;
      const tiltX = ((0.5 - normalizedY) * 6).toFixed(2);
      const tiltY = ((normalizedX - 0.5) * 8).toFixed(2);

      panel.style.setProperty('--pointer-x', `${(normalizedX * 100).toFixed(2)}%`);
      panel.style.setProperty('--pointer-y', `${(normalizedY * 100).toFixed(2)}%`);
      panel.style.setProperty('--tilt-x', `${tiltX}deg`);
      panel.style.setProperty('--tilt-y', `${tiltY}deg`);
      panel.style.setProperty('--pointer-alpha', '1');
      panel.style.setProperty('--beam-angle', `${((normalizedX * 180) - 90).toFixed(2)}deg`);
      panel.classList.add('is-pointer-active');
    }

    function handlePanelLeave(event) {
      const panel = event.currentTarget;
      panel.classList.remove('is-pointer-active');
      resetPanel(panel);
    }

    function enablePanels() {
      if (enabled) return;
      enabled = true;
      panels.forEach(panel => {
        panel.classList.add('interactive-panel-enabled');
        panel.addEventListener('pointerenter', handlePanelEnter);
        panel.addEventListener('pointermove', handlePanelMove, { passive: true });
        panel.addEventListener('pointerleave', handlePanelLeave);
      });
    }

    function disablePanels() {
      if (!enabled) {
        panels.forEach(panel => {
          panel.classList.remove('interactive-panel-enabled', 'is-pointer-active');
          resetPanel(panel);
        });
        return;
      }

      enabled = false;
      panels.forEach(panel => {
        panel.classList.remove('interactive-panel-enabled', 'is-pointer-active');
        panel.removeEventListener('pointerenter', handlePanelEnter);
        panel.removeEventListener('pointermove', handlePanelMove);
        panel.removeEventListener('pointerleave', handlePanelLeave);
        resetPanel(panel);
      });
    }

    function syncPanelMode() {
      if (finePointerQuery.matches && !reduceMotionQuery.matches) {
        enablePanels();
      } else {
        disablePanels();
      }
    }

    panels.forEach(panel => {
      panel.classList.add('interactive-panel');
      ensureOverlay(panel, 'panel-spotlight');
      ensureOverlay(panel, 'panel-frame');
      resetPanel(panel);
    });

    syncPanelMode();

    const syncHandler = () => syncPanelMode();
    if (typeof finePointerQuery.addEventListener === 'function') {
      finePointerQuery.addEventListener('change', syncHandler);
      reduceMotionQuery.addEventListener('change', syncHandler);
    } else {
      finePointerQuery.addListener(syncHandler);
      reduceMotionQuery.addListener(syncHandler);
    }
  }

  setupInteractivePanels();

  // ---------- About Me Typing Effect ----------
  const aboutConsole = document.getElementById('aboutConsole');
  const aboutTypeTargets = document.querySelectorAll('.about-type-target');

  function typeAboutLine(target, done) {
    const text = target.dataset.text || '';
    const line = target.closest('.about-type-line');
    let index = 0;

    function step() {
      target.textContent = text.slice(0, index);
      index += 1;

      if (index <= text.length) {
        const delay = text[index - 1] === ' ' ? 12 : 18;
        window.setTimeout(step, delay);
      } else {
        if (line) {
          line.classList.add('done');
        }
        done();
      }
    }

    step();
  }

  if (aboutConsole && aboutTypeTargets.length) {
    let aboutAnimated = false;
    aboutTypeTargets.forEach(target => {
      target.textContent = '';
    });

    const aboutObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !aboutAnimated) {
            aboutAnimated = true;
            let currentIndex = 0;

            function runNextLine() {
              const currentTarget = aboutTypeTargets[currentIndex];
              if (!currentTarget) {
                aboutObserver.disconnect();
                return;
              }

              typeAboutLine(currentTarget, () => {
                currentIndex += 1;
                runNextLine();
              });
            }

            runNextLine();
          }
        });
      },
      { threshold: 0.35 }
    );

    aboutObserver.observe(aboutConsole);
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

  // ---------- Particle Canvas Animation ----------
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const PARTICLE_COUNT = 80;
    const CONNECTION_DIST = 120;
    let mouse = { x: -1000, y: -1000 };
    let animId;

    function resizeCanvas() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    canvas.parentElement.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    canvas.parentElement.addEventListener('mouseleave', () => {
      mouse.x = -1000;
      mouse.y = -1000;
    });

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
      }
      update() {
        // Mouse repulsion
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150 * 0.02;
          this.vx += dx * force;
          this.vy += dy * force;
        }
        // Damping
        this.vx *= 0.99;
        this.vy *= 0.99;
        this.x += this.vx;
        this.y += this.vy;
        // Wrap
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(142, 187, 255, ${this.opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const opacity = (1 - dist / CONNECTION_DIST) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(142, 187, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      drawConnections();
      animId = requestAnimationFrame(animateParticles);
    }

    // Only animate when hero is visible
    const heroEl = document.getElementById('hero');
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateParticles();
        } else {
          cancelAnimationFrame(animId);
        }
      });
    }, { threshold: 0 });
    heroObserver.observe(heroEl);
  }

  // ---------- Initial call ----------
  handleScroll();
});
