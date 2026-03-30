(function () {
  'use strict';

  function escapeHtml(s) {
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

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

  // Trust stats count-up (homepage)
  function renderStatValue(t, format) {
    if (format === 'dollarM') {
      return '$' + Math.round(t) + 'M+';
    }
    if (format === 'plus') {
      return Math.round(t) + '+';
    }
    if (format === 'zero') {
      return '$0';
    }
    if (format === 'yearsPlus') {
      return Math.round(t) + '+';
    }
    return String(t);
  }

  var countEls = document.querySelectorAll('.js-count-up');
  if (countEls.length) {
    var countObs = new IntersectionObserver(
      function (entries, o) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          o.unobserve(el);
          var target = parseFloat(el.getAttribute('data-target') || '0');
          var format = el.getAttribute('data-format') || 'plus';
          var duration = 1500;
          var start = null;

          if (format === 'zero') {
            el.textContent = '$0';
            return;
          }

          function step(ts) {
            if (!start) start = ts;
            var p = Math.min((ts - start) / duration, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            var current = target * eased;
            el.textContent = renderStatValue(current, format);
            if (p < 1) {
              requestAnimationFrame(step);
            } else {
              el.textContent = renderStatValue(target, format);
            }
          }
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.35 }
    );
    countEls.forEach(function (el) {
      countObs.observe(el);
    });
  }

  // Formspree AJAX + success message
  var form = document.getElementById('contact-form');
  var statusEl = document.getElementById('form-status');
  var region = document.getElementById('contact-form-region');
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
            var first = (data.get('First Name') || '').trim() || 'there';
            if (region) {
              region.innerHTML =
                '<div class="form-success-message" role="alert">' +
                '<p>Thank you, ' +
                escapeHtml(first) +
                "! We'll review your claim details and call you within 24 hours.</p>" +
                '</div>';
            } else {
              statusEl.textContent =
                "Thanks! We'll review your claim and contact you shortly.";
              statusEl.style.color = '#1a4a6e';
              form.reset();
            }
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
