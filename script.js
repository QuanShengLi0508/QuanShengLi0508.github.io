/* =============================================
   JavaScript — Academic Homepage
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const lowCoreDevice =
    Number.isFinite(navigator.hardwareConcurrency) && navigator.hardwareConcurrency <= 4;
  const lowMemoryDevice =
    Number.isFinite(navigator.deviceMemory) && navigator.deviceMemory <= 4;
  const saveDataEnabled = Boolean(navigator.connection && navigator.connection.saveData);
  const liteEffects =
    reduceMotionQuery.matches || lowCoreDevice || lowMemoryDevice || saveDataEnabled;

  body.classList.toggle('lite-effects', liteEffects);
  body.classList.toggle('full-effects', !liteEffects);

  // ---------- Typed Text Effect ----------
  const typedText = document.getElementById('typedText');
  const phrases = [
    '阻挡杂质带探测器读出电路设计',
    'AI赋能的阻挡杂质带探测器件与机理研究'
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

  if (typedText && liteEffects) {
    typedText.textContent = phrases[0];
  } else if (typedText) {
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
    if (liteEffects) {
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
    const syncHeroNameShadow = (value) => {
      heroName.setAttribute('data-shadow', value);
    };

    heroName.classList.remove('animate-fade-up', 'delay-1');
    heroName.classList.add('hero-name-floating');
    heroName.setAttribute('aria-label', heroNameLabel);
    syncHeroNameShadow(heroNameLabel);
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
      if (liteEffects) {
        heroNameText.textContent = heroNameLabel;
        syncHeroNameShadow(heroNameLabel);
        heroName.classList.add('is-typed');
      } else {
        const startHeroNameCycle = () => {
          let heroNameIndex = 0;
          heroNameText.textContent = '';
          syncHeroNameShadow('');
          heroName.classList.add('is-typing');
          heroName.classList.remove('is-typed');

          const typeHeroName = () => {
            const currentText = heroNameLabel.slice(0, heroNameIndex + 1);
            heroNameText.textContent = currentText;
            syncHeroNameShadow(currentText);
            heroNameIndex += 1;

            if (heroNameIndex < heroNameLabel.length) {
              window.setTimeout(typeHeroName, 260);
            } else {
              heroName.classList.remove('is-typing');
              heroName.classList.add('is-typed');

              window.setTimeout(() => {
                heroNameText.textContent = '';
                syncHeroNameShadow('');
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
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  function setupCustomCursor() {
    if (!cursorDot || !cursorRing || liteEffects) return;

    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const surfaceSelector =
      '.research-card, .pub-card, .project-card, .award-card, ' +
      '.timeline-content, .contact-card, .contact-map';
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
      ringX += (targetX - ringX) * 0.2;
      ringY += (targetY - ringY) * 0.2;
      setRingPosition(ringX, ringY);

      if (Math.abs(targetX - ringX) > 0.2 || Math.abs(targetY - ringY) > 0.2) {
        frameId = window.requestAnimationFrame(renderRing);
      } else {
        ringX = targetX;
        ringY = targetY;
        setRingPosition(ringX, ringY);
        frameId = 0;
      }
    }

    function scheduleRingRender() {
      if (!frameId) {
        frameId = window.requestAnimationFrame(renderRing);
      }
    }

    function handlePointerMove(event) {
      targetX = event.clientX;
      targetY = event.clientY;
      setDotPosition(targetX, targetY);
      body.classList.add('custom-cursor-visible');
      updateCursorState(event.target);
      scheduleRingRender();
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
    }

    function disableCursor() {
      if (!enabled) return;
      enabled = false;
      if (frameId) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      }
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
      '.research-card',
      '.pub-card',
      '.project-card',
      '.contact-card'
    ].join(', ');

    const panels = Array.from(document.querySelectorAll(panelSelector));
    if (!panels.length || liteEffects) return;

    const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!finePointerQuery.matches) return;

    const panelSet = new Set(panels);
    let activePanel = null;
    let pointerX = 0;
    let pointerY = 0;
    let panelFrameId = 0;

    function ensureOverlay(panel, className) {
      if (panel.querySelector(`:scope > .${className}`)) return;

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

    function renderPanelSpotlight() {
      panelFrameId = 0;
      const panel = activePanel;
      if (!panel) return;
      const rect = panel.getBoundingClientRect();
      const rawX = pointerX - rect.left;
      const rawY = pointerY - rect.top;
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

    function clearActivePanel() {
      if (!activePanel) return;
      activePanel.classList.remove('is-pointer-active');
      resetPanel(activePanel);
      activePanel = null;
    }

    function handlePanelPointerMove(event) {
      const panel = event.target.closest('.interactive-panel');
      if (!panel || !panelSet.has(panel)) {
        clearActivePanel();
        return;
      }

      if (activePanel !== panel) {
        clearActivePanel();
        activePanel = panel;
      }

      pointerX = event.clientX;
      pointerY = event.clientY;

      if (!panelFrameId) {
        panelFrameId = window.requestAnimationFrame(renderPanelSpotlight);
      }
    }

    function handlePanelPointerOut(event) {
      if (activePanel && (!event.relatedTarget || !activePanel.contains(event.relatedTarget))) {
        clearActivePanel();
      }
    }

    panels.forEach(panel => {
      panel.classList.add('interactive-panel', 'interactive-panel-enabled');
      ensureOverlay(panel, 'panel-spotlight');
      ensureOverlay(panel, 'panel-frame');
      resetPanel(panel);
    });

    document.addEventListener('pointermove', handlePanelPointerMove, { passive: true });
    document.addEventListener('pointerout', handlePanelPointerOut, { passive: true });
    window.addEventListener('blur', clearActivePanel);
  }

  setupInteractivePanels();

  // ---------- Navbar Scroll Effect ----------
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section, .hero');
  const backToTop = document.getElementById('backToTop');
  let sectionBounds = [];
  let scrollFrameId = 0;
  let boundsFrameId = 0;

  function updateSectionBounds() {
    sectionBounds = Array.from(sections).map(section => ({
      id: section.id,
      top: section.offsetTop - 120,
      bottom: section.offsetTop + section.offsetHeight - 120
    }));
  }

  function renderScrollState() {
    scrollFrameId = 0;
    const scrollY = window.scrollY;
    navbar.classList.toggle('scrolled', scrollY > 50);
    if (backToTop) backToTop.classList.toggle('visible', scrollY > 500);

    let current = '';
    for (const section of sectionBounds) {
      if (scrollY >= section.top && scrollY < section.bottom) {
        current = section.id;
        break;
      }
    }

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }

  function handleScroll() {
    if (!scrollFrameId) {
      scrollFrameId = window.requestAnimationFrame(renderScrollState);
    }
  }

  function scheduleBoundsUpdate() {
    if (boundsFrameId) return;
    boundsFrameId = window.requestAnimationFrame(() => {
      boundsFrameId = 0;
      updateSectionBounds();
      handleScroll();
    });
  }

  updateSectionBounds();
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', scheduleBoundsUpdate, { passive: true });
  window.addEventListener('load', scheduleBoundsUpdate, { once: true });

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
    '.section-header, .research-card, .pub-card, .project-card, .blog-card, ' +
    '.timeline-item, .award-card, .contact-card, .contact-map'
  );

  revealElements.forEach(el => {
    el.classList.add('reveal');
    if (liteEffects) el.classList.add('visible');
  });

  if (!liteEffects) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    revealElements.forEach(el => observer.observe(el));
  }

  // ---------- Publication Filters ----------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const pubCards = document.querySelectorAll('#publications .pub-card');

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

  // ---------- Award Certificate Viewer ----------
  const awardLightbox = document.getElementById('awardLightbox');
  const awardLightboxImage = document.getElementById('awardLightboxImage');
  const awardLightboxCaption = document.getElementById('awardLightboxCaption');

  document.addEventListener('click', event => {
    const target = event.target instanceof Element ? event.target : null;
    const awardProof = target && target.closest('.award-proof');
    if (!awardProof) return;

    const modifiedClick = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    const isDocumentProof = awardProof.dataset.proofType === 'document';
    const canShowDialog =
      awardLightbox &&
      awardLightboxImage &&
      awardLightboxCaption &&
      typeof awardLightbox.showModal === 'function';

    if (modifiedClick || isDocumentProof || !canShowDialog) return;

    event.preventDefault();
    const title = awardProof.dataset.title || '获奖证明';
    awardLightboxImage.src = awardProof.href;
    awardLightboxImage.alt = title;
    awardLightboxCaption.textContent = title;
    awardLightbox.showModal();
  });

  if (awardLightbox && awardLightboxImage && awardLightboxCaption) {
    awardLightbox.addEventListener('click', event => {
      if (event.target !== awardLightbox) return;
      const rect = awardLightbox.getBoundingClientRect();
      const outside =
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom;
      if (outside) awardLightbox.close();
    });

    awardLightbox.addEventListener('close', () => {
      awardLightboxImage.removeAttribute('src');
      awardLightboxImage.alt = '';
      awardLightboxCaption.textContent = '';
    });
  }

  // ---------- Initial call ----------
  handleScroll();
});
