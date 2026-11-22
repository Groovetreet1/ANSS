/* ============================================================
   ANSS — Site interactions
   ============================================================ */
(function () {
  'use strict';

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------------------------------------------------------
     1. Header shadow on scroll
  --------------------------------------------------------- */
  const header = $('#header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------------------------------------------------
     2. Mobile navigation
  --------------------------------------------------------- */
  const menuToggle = $('#menuToggle');
  const navLinks = $('#navLinks');

  function closeMenu() {
    navLinks.classList.remove('is-open');
    menuToggle.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
  menuToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('is-open');
    menuToggle.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
  });
  $$('.nav-link', navLinks).forEach(a => a.addEventListener('click', closeMenu));

  /* ---------------------------------------------------------
     3. Hero slider
  --------------------------------------------------------- */
  const hero = $('.hero');
  const slides = $$('.hero-slide');
  const dots = $$('#sliderDots .dot');
  let current = 0;
  let slideTimer = null;

  const slideCurrent = $('#slideCurrent');
  const slideTotal = $('#slideTotal');
  if (slideTotal) slideTotal.textContent = String(slides.length).padStart(2, '0');

  function goToSlide(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle('is-active', i === current));
    dots.forEach((d, i) => d.classList.toggle('is-active', i === current));
    if (slideCurrent) slideCurrent.textContent = String(current + 1).padStart(2, '0');
  }
  function startSlider() {
    stopSlider();
    slideTimer = setInterval(() => goToSlide(current + 1), 5500);
  }
  function stopSlider() { if (slideTimer) clearInterval(slideTimer); }

  $('#prevSlide').addEventListener('click', () => { goToSlide(current - 1); startSlider(); });
  $('#nextSlide').addEventListener('click', () => { goToSlide(current + 1); startSlider(); });
  dots.forEach(d => d.addEventListener('click', () => { goToSlide(+d.dataset.go); startSlider(); }));
  hero.addEventListener('mouseenter', stopSlider);
  hero.addEventListener('mouseleave', startSlider);
  document.addEventListener('visibilitychange', () => document.hidden ? stopSlider() : startSlider());
  startSlider();

  /* ---------------------------------------------------------
     4. Animated counters (run once when visible)
  --------------------------------------------------------- */
  const counters = $$('.counter');
  const nf = new Intl.NumberFormat('fr-FR');
  function runCounter(el) {
    const target = +el.dataset.target || 0;
    const format = el.dataset.format === 'space';
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const value = Math.round(target * eased);
      el.textContent = (format ? nf.format(value) : value) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) { runCounter(e.target); obs.unobserve(e.target); }
    });
  }, { threshold: .4 });
  counters.forEach(c => counterObserver.observe(c));

  /* ---------------------------------------------------------
     5. Scroll reveal animations
  --------------------------------------------------------- */
  const revealTargets = $$('.section-head, .about-visual, .about-copy, .domain-card, .step, .news-card, .news-row, .info-card, .contact-form, .impact-item');
  revealTargets.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = Math.min(i % 4, 3) * 70 + 'ms';
  });
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); }
    });
  }, { threshold: .08, rootMargin: '0px 0px -40px 0px' });
  revealTargets.forEach(el => revealObserver.observe(el));

  /* ---------------------------------------------------------
     6. Active navigation link on scroll
  --------------------------------------------------------- */
  const navAnchors = $$('.nav-link[href^="#"]');
  const sections = navAnchors.map(a => $(a.getAttribute('href'))).filter(Boolean);
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => sectionObserver.observe(s));

  /* ---------------------------------------------------------
     7. Toast notifications
  --------------------------------------------------------- */
  const toast = $('#toast');
  let toastTimer;
  let lastToast = null;
  function renderToast() {
    if (!lastToast) return;
    const ar = lang === 'ar';
    $('#toastTitle').textContent = ar && lastToast.titleAr ? lastToast.titleAr : lastToast.title;
    $('#toastMsg').textContent = ar && lastToast.messageAr ? lastToast.messageAr : lastToast.message;
  }
  function showToast(title, message, titleAr, messageAr) {
    lastToast = { title, message, titleAr, messageAr };
    renderToast();
    toast.classList.add('is-open');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-open'), 4800);
  }
  $('#toastClose').addEventListener('click', () => toast.classList.remove('is-open'));

  /* ---------------------------------------------------------
     8. Modals
  --------------------------------------------------------- */
  const overlay = $('#modalOverlay');
  const modals = $$('.modal');
  let lastFocused = null;

  function openModal(id) {
    const modal = document.getElementById('modal-' + id);
    if (!modal) return;
    closeMenu();
    lastFocused = document.activeElement;
    overlay.hidden = false;
    modal.hidden = false;
    requestAnimationFrame(() => {
      overlay.classList.add('is-open');
      modal.classList.add('is-open');
    });
    document.body.classList.add('no-scroll');
    setTimeout(() => { const f = $('input, select, textarea, button', modal); if (f) f.focus(); }, 120);
  }
  function closeModal() {
    modals.forEach(m => m.classList.remove('is-open'));
    overlay.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
    setTimeout(() => {
      modals.forEach(m => { m.hidden = true; });
      overlay.hidden = true;
    }, 300);
    if (lastFocused) lastFocused.focus();
  }

  document.addEventListener('click', e => {
    const opener = e.target.closest('[data-open]');
    if (opener) { e.preventDefault(); openModal(opener.dataset.open); return; }
    if (e.target.closest('[data-close]') || e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  /* ---------------------------------------------------------
     9. Donation amount selection (shared between band & modal)
  --------------------------------------------------------- */
  let selectedAmount = 50;
  $$('.amount-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedAmount = +btn.dataset.amount;
      $$('.amount-btn').forEach(b => b.classList.toggle('is-selected', +b.dataset.amount === selectedAmount));
    });
  });
  $('#donBandBtn').addEventListener('click', () => openModal('don'));

  /* ---------------------------------------------------------
     10. Form validation
  --------------------------------------------------------- */
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  function setError(field, msg) {
    field.classList.toggle('has-error', !!msg);
    const err = $('.field-error', field);
    if (err) err.textContent = msg || '';
  }
  function validate(form) {
    let ok = true;
    $$('[required]', form).forEach(input => {
      const field = input.closest('.field') || input.parentElement;
      const value = input.value.trim();
      let msg = '';
      if (!value) msg = lang === 'ar' ? 'هذا الحقل إلزامي.' : 'Ce champ est obligatoire.';
      else if (input.type === 'email' && !emailRe.test(value)) msg = lang === 'ar' ? 'البريد الإلكتروني غير صالح.' : 'Email invalide.';
      setError(field, msg);
      if (msg) ok = false;
    });
    return ok;
  }
  $$('input, textarea', document).forEach(el => {
    el.addEventListener('input', () => {
      const field = el.closest('.field');
      if (field && field.classList.contains('has-error')) setError(field, '');
    });
  });

  const contactForm = $('#contactForm');
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    if (!validate(contactForm)) return;
    showToast('Message envoyé !', 'Merci, nous vous répondrons sous 48 heures.', 'تم إرسال الرسالة !', 'شكراً لك، سنرد عليك خلال 48 ساعة.');
    contactForm.reset();
  });

  const loginForm = $('#loginForm');
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    if (!validate(loginForm)) return;
    closeModal();
    showToast('Bienvenue 👋', 'Vous êtes connecté à votre espace ANSS.', 'مرحباً 👋', 'لقد تم تسجيل دخولك إلى حسابك في ANSS.');
    loginForm.reset();
  });

  const registerForm = $('#registerForm');
  registerForm.addEventListener('submit', e => {
    e.preventDefault();
    if (!validate(registerForm)) return;
    const pass = $('#regPassword').value;
    const confirm = $('#regConfirm').value;
    if (pass !== confirm) {
      setError($('#regConfirm').closest('.field'), lang === 'ar' ? 'كلمات المرور غير متطابقة.' : 'Les mots de passe ne correspondent pas.');
      return;
    }
    closeModal();
    showToast('Bienvenue chez ANSS !', 'Votre compte a été créé avec succès.', 'مرحباً بك في ANSS !', 'تم إنشاء حسابك بنجاح.');
    registerForm.reset();
  });

  const donForm = $('#donForm');
  donForm.addEventListener('submit', e => {
    e.preventDefault();
    if (!validate(donForm)) return;
    const amount = selectedAmount;
    closeModal();
    showToast('Merci pour votre don !', `${amount} DH — votre générosité fait une réelle différence.`, 'شكراً لتبرعك !', `${amount} درهم — كرمك يحدث فرقاً حقيقياً.`);
    donForm.reset();
  });

  const newsletterForm = $('#newsletterForm');
  const nlField = $('#newsletterEmail').closest('.nl-field');
  $('#newsletterEmail').addEventListener('input', () => nlField.classList.remove('has-error'));
  newsletterForm.addEventListener('submit', e => {
    e.preventDefault();
    const input = $('#newsletterEmail');
    if (!emailRe.test(input.value.trim())) {
      nlField.classList.add('has-error');
      input.focus();
      return;
    }
    nlField.classList.remove('has-error');
    input.value = '';
    showToast('Inscription confirmée !', 'Vous recevrez bientôt nos actualités.', 'تم تأكيد التسجيل !', 'ستصلك أخبارنا قريباً.');
  });

  /* ---------------------------------------------------------
     10b. Partner logos: graceful text fallback
  --------------------------------------------------------- */
  $$('.partners-section img').forEach(img => {
    const fail = () => {
      if (img.classList.contains('section-icon')) img.classList.add('img-missing');
      else if (img.parentElement) img.parentElement.classList.add('no-logo');
    };
    if (img.complete && img.naturalWidth === 0) fail();
    img.addEventListener('error', fail);
  });

  /* ---------------------------------------------------------
     11. Bilingual FR / AR toggle
  --------------------------------------------------------- */
  const langButtons = $$('.lang-opt');
  const translatable = $$('[data-ar], [data-ph-ar]');
  let lang = 'fr';

  function prepTranslation(el) {
    if (el.dataset.frReady) return;
    if (el.hasAttribute('data-ar')) el.dataset.frHtml = el.innerHTML;
    if (el.hasAttribute('data-ph-ar')) el.dataset.phFr = el.getAttribute('placeholder') || '';
    el.dataset.frReady = '1';
  }
  translatable.forEach(prepTranslation);

  function applyLanguage(next) {
    lang = next;
    translatable.forEach(el => {
      if (el.hasAttribute('data-ar')) {
        if (next === 'fr') el.innerHTML = el.dataset.frHtml;
        else el.textContent = el.dataset.ar;
      }
      if (el.hasAttribute('data-ph-ar')) {
        el.setAttribute('placeholder', next === 'ar' ? el.dataset.phAr : el.dataset.phFr);
      }
    });
    document.documentElement.lang = next;
    document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('lang-ar', next === 'ar');
    langButtons.forEach(b => b.classList.toggle('is-active', b.dataset.lang === next));
    renderToast();
  }
  langButtons.forEach(b => b.addEventListener('click', () => {
    if (b.dataset.lang !== lang) applyLanguage(b.dataset.lang);
  }));

})();
