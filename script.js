/* UNUS Arquitetura — LP v2 (iter 2) */
(function () {
  'use strict';

  // ===== Header scroll state =====
  var header = document.getElementById('siteHeader');
  function onScroll() {
    var y = window.pageYOffset;
    if (y > 30) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ===== Mobile menu =====
  var navToggle = document.getElementById('navToggle');
  var mobileMenu = document.getElementById('mobileMenu');

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = navToggle.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      if (isOpen) {
        mobileMenu.hidden = false;
        document.body.style.overflow = 'hidden';
      } else {
        mobileMenu.hidden = true;
        document.body.style.overflow = '';
      }
    });

    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.hidden = true;
        document.body.style.overflow = '';
      });
    });
  }

  // ===== Reveal on scroll =====
  if ('IntersectionObserver' in window) {
    document.documentElement.classList.add('js');
    var targets = document.querySelectorAll(
      '.section-head, .entry, .case, .bonus__card, .passo, .depo, .quem__body, .pull-quote, .para-quem__copy, .garantia__inner, .cta-final__inner, .feature-card, .dor--premium'
    );
    targets.forEach(function (el) { el.classList.add('reveal'); });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    targets.forEach(function (el) { io.observe(el); });
  }

  // ===== FAQ exclusive accordion =====
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (item.open) {
        faqItems.forEach(function (other) {
          if (other !== item && other.open) other.open = false;
        });
      }
    });
  });

  // ===== Gallery slideshow =====
  var slides = document.querySelectorAll('.gallery-slideshow .slide');
  if (slides.length > 0) {
    var current = 0;
    setInterval(function () {
      slides[current].classList.remove('is-active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('is-active');
    }, 4500);
  }

  // ===== Footer year =====
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
