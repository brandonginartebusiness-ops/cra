(function () {
  'use strict';

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Fade-up on scroll
  var fadeEls = document.querySelectorAll('.fade-up');
  if (fadeEls.length) {
    var obs = new IntersectionObserver(
      function (entries, o) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            o.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: '0px', threshold: 0.15 }
    );
    fadeEls.forEach(function (el) {
      obs.observe(el);
    });
  }

  // Formspree AJAX
  var form = document.getElementById('contact-form');
  var statusEl = document.getElementById('form-status');
  if (form && statusEl) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      fetch(form.action, {
        method: form.method,
        body: data,
        headers: { Accept: 'application/json' },
      })
        .then(function (res) {
          if (res.ok) {
            statusEl.textContent =
              'Thanks for your submission! We will review your claim and contact you shortly.';
            statusEl.style.color = '#1a4a6e';
            form.reset();
          } else {
            statusEl.textContent =
              'Something went wrong. Please try again or call (786) 223-7867.';
            statusEl.style.color = '#b00020';
          }
        })
        .catch(function () {
          statusEl.textContent =
            'Something went wrong. Please try again or call (786) 223-7867.';
          statusEl.style.color = '#b00020';
        });
    });
  }
})();
