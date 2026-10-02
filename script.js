/* Navigation and certificate viewing; content stays readable without JavaScript. */
document.addEventListener('DOMContentLoaded', () => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navLinks');
  const links = [...document.querySelectorAll('.nav-link')];
  const backToTop = document.getElementById('backToTop');
  const sections = [...document.querySelectorAll('section[id]')];
  const closeMenu = () => {
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('active');
  };
  navToggle.addEventListener('click', () => {
    const open = navToggle.getAttribute('aria-expanded') !== 'true';
    navToggle.classList.toggle('active', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navMenu.classList.toggle('active', open);
  });
  links.forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      navToggle.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!document.getElementById('navbar').contains(event.target)) closeMenu();
  });
  const desktop = window.matchMedia('(min-width: 781px)');
  desktop.addEventListener('change', closeMenu);
  let queued = false;
  const updateScroll = () => {
    queued = false;
    backToTop.classList.toggle('visible', window.scrollY > 500);
    const current = [...sections].reverse().find(section => section.getBoundingClientRect().top <= 140);
    links.forEach(link => {
      const active = current && link.getAttribute('href') === '#' + current.id;
      link.classList.toggle('active', Boolean(active));
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };
  window.addEventListener('scroll', () => {
    if (!queued) { queued = true; requestAnimationFrame(updateScroll); }
  }, { passive: true });
  window.addEventListener('resize', updateScroll, { passive: true });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'instant' : 'smooth' }));
  updateScroll();

  const dialog = document.getElementById('awardLightbox');
  const image = document.getElementById('awardLightboxImage');
  const caption = document.getElementById('awardLightboxCaption');
  let proofLink;
  document.addEventListener('click', event => {
    const proof = event.target instanceof Element && event.target.closest('.award-proof');
    if (!proof || proof.dataset.proofType === 'document' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || typeof dialog.showModal !== 'function') return;
    event.preventDefault();
    proofLink = proof;
    image.src = proof.href;
    image.alt = proof.dataset.title || '获奖证明';
    caption.textContent = image.alt;
    dialog.showModal();
  });
  image.addEventListener('error', () => {
    caption.replaceChildren(document.createTextNode('图片暂时无法加载。'));
    const fallback = document.createElement('a');
    fallback.href = proofLink.href;
    fallback.target = '_blank';
    fallback.rel = 'noopener noreferrer';
    fallback.textContent = '打开原始证明';
    caption.append(fallback);
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    image.removeAttribute('src');
    image.alt = '';
    caption.textContent = '';
    if (proofLink) proofLink.focus();
  });
});
