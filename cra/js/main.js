(function () {
  'use strict';

  var prefersMobile =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(max-width: 768px)').matches;

  // Custom cursor (desktop-only)
  var canUseFinePointer =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(pointer: fine)').matches;
  var cur = document.getElementById('cur');
  var curRing = document.getElementById('cur-r');
  if (canUseFinePointer && cur && curRing) {
    var mx = window.innerWidth * 0.5;
    var my = window.innerHeight * 0.5;
    var rx = mx;
    var ry = my;

    function setCursorHover(on) {
      if (on) {
        cur.style.background = 'var(--blue)';
        curRing.style.width = '48px';
        curRing.style.height = '48px';
        curRing.style.borderColor = 'rgba(30, 111, 255, 0.8)';
        curRing.style.backgroundColor = 'rgba(30, 111, 255, 0.18)';
      } else {
        cur.style.background = 'var(--gold)';
        curRing.style.width = '34px';
        curRing.style.height = '34px';
        curRing.style.borderColor = 'rgba(242, 240, 236, 0.4)';
        curRing.style.backgroundColor = 'transparent';
      }
    }

    document.addEventListener('mousemove', function (e) {
      mx = e.clientX;
      my = e.clientY;
      cur.style.transform = 'translate(' + mx + 'px, ' + my + 'px) translate(-50%, -50%)';
    });

    function cursorLoop() {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      curRing.style.transform =
        'translate(' + rx + 'px, ' + ry + 'px) translate(-50%, -50%)';
      requestAnimationFrame(cursorLoop);
    }
    requestAnimationFrame(cursorLoop);

    document.querySelectorAll('a, button').forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        setCursorHover(true);
      });
      el.addEventListener('mouseleave', function () {
        setCursorHover(false);
      });
    });
  }

  function escapeHtml(s) {
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
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

  // Fade-up on scroll (non-.grid-3 cards; grids use GSAP stagger)
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

  // Trust stats count-up (GSAP ScrollTrigger)
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

  function runStatCountUps() {
    countEls.forEach(function (el) {
      var target = parseFloat(el.getAttribute('data-target') || '0');
      var format = el.getAttribute('data-format') || 'plus';
      if (format === 'zero') {
        el.textContent = '$0';
        return;
      }
      var proxy = { v: 0 };
      gsap.to(proxy, {
        v: target,
        duration: 1.5,
        ease: 'power3.out',
        onUpdate: function () {
          el.textContent = renderStatValue(proxy.v, format);
        },
        onComplete: function () {
          el.textContent = renderStatValue(target, format);
        },
      });
    });
  }

  var statsBar = document.querySelector('.trust-stats-bar');
  if (statsBar && countEls.length) {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      var stCountDone = false;
      ScrollTrigger.create({
        trigger: statsBar,
        start: 'top 80%',
        once: true,
        onEnter: function () {
          if (stCountDone) return;
          stCountDone = true;
          runStatCountUps();
        },
      });
    } else {
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
  }

  // Homepage hero — word reveal, parallax, sequencing
  var heroBg = document.querySelector('.hero__bg');
  var heroWords = document.querySelectorAll('.hero__word');
  var heroSubtitle = document.querySelector('.hero__subtitle');
  var heroCtas = document.querySelectorAll('.hero__actions .btn');
  var heroPills = document.querySelectorAll('.hero__trust-pill');

  if (
    typeof gsap !== 'undefined' &&
    heroWords.length &&
    heroSubtitle &&
    heroCtas.length
  ) {
    gsap.set([heroSubtitle].concat(Array.from(heroCtas), Array.from(heroPills)), {
      opacity: 0,
    });
    if (heroPills.length) {
      gsap.set(heroPills, { y: 20 });
    }
    gsap.set(heroCtas, { y: 24 });

    var heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTl.from(heroWords, {
      y: 60,
      opacity: 0,
      rotateX: -15,
      duration: 0.9,
      stagger: 0.08,
    });
    var headEnd = (heroWords.length - 1) * 0.08 + 0.9;
    heroTl.to(
      heroSubtitle,
      { opacity: 1, duration: 0.65, ease: 'power2.out' },
      headEnd + 0.3
    );
    heroTl.to(heroCtas, {
      y: 0,
      opacity: 1,
      duration: 0.55,
      stagger: 0.1,
      ease: 'power2.out',
    }, '>+=0.2');
    if (heroPills.length) {
      heroTl.to(
        heroPills,
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
        '>'
      );
    }
  }

  if (
    typeof gsap !== 'undefined' &&
    heroBg &&
    !prefersMobile &&
    typeof ScrollTrigger !== 'undefined'
  ) {
    // Parallax: ~0.4× apparent motion vs a stronger baseline (tune yPercent if needed)
    gsap.to(heroBg, {
      yPercent: 10,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  // Section headings: underline span + reveal
  function setupSectionTitleLines() {
    document.querySelectorAll('.section-title').forEach(function (h) {
      if (h.closest('.page-hero')) return;
      if (h.querySelector('.section-title__line')) return;
      h.classList.add('section-title--gsap');
      var line = document.createElement('span');
      line.className = 'section-title__line';
      line.setAttribute('aria-hidden', 'true');
      h.appendChild(line);
      gsap.set(line, { width: 0 });
      gsap.to(line, {
        width: 60,
        duration: 0.55,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: h,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    });
  }

  function setupSectionHeadingReveals() {
    document
      .querySelectorAll(
        'main .section .section-label, main .section .section-title'
      )
      .forEach(function (el) {
        if (el.closest('.page-hero')) return;
        if (el.closest('.hero')) return;
        gsap.from(el, {
          y: 30,
          opacity: 0,
          duration: 0.65,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      });
  }

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    setupSectionTitleLines();
    setupSectionHeadingReveals();
  }

  // Grid-3 card stagger
  var gridStagger = prefersMobile ? 0.08 : 0.15;
  var gridDuration = prefersMobile ? 0.5 : 0.7;

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    document.querySelectorAll('.grid-3').forEach(function (grid) {
      var cards = grid.querySelectorAll('.card');
      if (!cards.length) return;
      gsap.from(cards, {
        y: 50,
        opacity: 0,
        duration: gridDuration,
        stagger: gridStagger,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: grid,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    });
  }

  // Testimonials carousel
  function starsStr(n) {
    var r = Math.min(5, Math.max(0, Math.round(Number(n) || 5)));
    return new Array(r + 1).join('★');
  }

  function getMaxReviews(carousel) {
    var a = carousel.getAttribute('data-max-reviews');
    if (a === null || a === '') return 5;
    var n = parseInt(a, 10);
    if (isNaN(n) || n < 1) return 5;
    if (n > 10) return 10;
    return n;
  }

  function buildSlideHtml(r, i, active) {
    var claim = String(r.claimType || '').trim();
    var claimHtml = claim
      ? '<span class="claim-type">' + escapeHtml(claim) + '</span>'
      : '';
    var maps = r.googleMapsUri
      ? '<p class="testimonial-maps-link"><a href="' +
        escapeHtml(String(r.googleMapsUri)) +
        '" target="_blank" rel="noopener noreferrer">View on Google Maps</a></p>'
      : '';
    var cl = 'testimonial-slide' + (active ? ' is-active' : '');
    return (
      '<article class="' +
      cl +
      '" data-index="' +
      i +
      '">' +
      '<p class="stars testimonial-slide__stars">' +
      starsStr(r.rating) +
      '</p>' +
      '<p class="testimonial-decor" aria-hidden="true">“</p>' +
      '<blockquote class="testimonial-quote testimonial-quote--carousel">' +
      escapeHtml(String(r.quote || '')) +
      '</blockquote>' +
      '<p class="testimonial-attrib">' +
      escapeHtml(String(r.author || '')) +
      '</p>' +
      maps +
      claimHtml +
      '</article>'
    );
  }

  function renderTestimonialCarousel(carousel, list, maxReviews) {
    if (maxReviews == null || !isFinite(maxReviews) || maxReviews < 1) {
      maxReviews = Infinity;
    }
    var filtered = (list || []).filter(function (r) {
      return String(r.quote || '').trim().length > 0;
    });
    if (filtered.length > maxReviews) {
      filtered = filtered.slice(0, maxReviews);
    }
    if (!filtered.length) return false;
    var slidesWrap = carousel.querySelector('.testimonial-slides');
    if (!slidesWrap) return false;
    slidesWrap.innerHTML = filtered
      .map(function (r, i) {
        return buildSlideHtml(r, i, i === 0);
      })
      .join('');
    return true;
  }

  var testimonialCarouselTimer = null;

  function destroyTestimonialCarousel() {
    if (testimonialCarouselTimer) {
      clearInterval(testimonialCarouselTimer);
      testimonialCarouselTimer = null;
    }
  }

  function initTestimonialCarousel(root) {
    destroyTestimonialCarousel();
    var slides = root.querySelectorAll('.testimonial-slide');
    var dotsWrap = root.querySelector('.testimonial-dots');
    if (!slides.length || !dotsWrap) return;

    var idx = 0;
    var n = slides.length;

    dotsWrap.innerHTML = '';
    for (var i = 0; i < n; i++) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'testimonial-dot' + (i === 0 ? ' is-active' : '');
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-label', 'Show testimonial ' + (i + 1));
      b.setAttribute('data-index', String(i));
      dotsWrap.appendChild(b);
    }

    var dots = dotsWrap.querySelectorAll('.testimonial-dot');

    function goTo(nextIdx, animate) {
      nextIdx = ((nextIdx % n) + n) % n;
      if (nextIdx === idx && animate) return;
      var prev = idx;
      idx = nextIdx;
      dots.forEach(function (d, j) {
        d.classList.toggle('is-active', j === idx);
      });

      if (typeof gsap === 'undefined') {
        slides.forEach(function (s, j) {
          s.classList.toggle('is-active', j === idx);
          s.style.opacity = j === idx ? '1' : '0';
        });
        return;
      }

      if (!animate) {
        slides.forEach(function (s, j) {
          gsap.killTweensOf(s);
          gsap.set(s, { opacity: j === idx ? 1 : 0 });
          s.classList.toggle('is-active', j === idx);
        });
        return;
      }

      var prevEl = slides[prev];
      var nextEl = slides[idx];
      if (prevEl && prevEl !== nextEl) {
        gsap.to(prevEl, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete: function () {
            prevEl.classList.remove('is-active');
          },
        });
      }
      nextEl.classList.add('is-active');
      gsap.fromTo(
        nextEl,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power2.inOut' }
      );
    }

    slides.forEach(function (s, j) {
      if (typeof gsap !== 'undefined') {
        gsap.set(s, { opacity: j === 0 ? 1 : 0 });
      }
      s.classList.toggle('is-active', j === 0);
    });

    dots.forEach(function (d) {
      d.addEventListener('click', function () {
        var di = parseInt(d.getAttribute('data-index'), 10);
        if (!isNaN(di)) goTo(di, true);
      });
    });

    if (n > 1) {
      testimonialCarouselTimer = setInterval(function () {
        goTo(idx + 1, true);
      }, 5000);
    }
  }

  function applyGoogleAttribution(attrEl, data) {
    if (!attrEl || !data) return;
    var html = '';
    var attrs = data.attributions;
    if (attrs && attrs.length) {
      var parts = [];
      for (var i = 0; i < attrs.length; i++) {
        var a = attrs[i];
        if (!a.provider) continue;
        var p = escapeHtml(a.provider);
        var u = a.providerUri && String(a.providerUri).trim();
        if (u && /^https?:\/\//i.test(u)) {
          parts.push(
            '<a href="' +
              escapeHtml(u) +
              '" target="_blank" rel="noopener noreferrer">' +
              p +
              '</a>'
          );
        } else {
          parts.push(p);
        }
      }
      if (parts.length) {
        html = parts.join(' · ') + '.';
      }
    }
    if (!html && data.googleMapsUri) {
      var g = String(data.googleMapsUri);
      if (/^https?:\/\//i.test(g)) {
        html =
          'Reviews from <a href="' +
          escapeHtml(g) +
          '" target="_blank" rel="noopener noreferrer">Google Maps</a>.';
      }
    }
    if (!html) {
      html = 'Reviews from Google Maps.';
    }
    attrEl.innerHTML = html;
    attrEl.removeAttribute('hidden');
  }

  function setFallbackNoteVisible(visible) {
    var note = document.getElementById('reviews-fallback-note');
    if (!note) return;
    if (visible) note.removeAttribute('hidden');
    else note.setAttribute('hidden', '');
  }

  var reviewsCarousel = document.getElementById('reviews-carousel');
  var attrEl = document.getElementById('reviews-google-attribution');
  if (reviewsCarousel) {
    initTestimonialCarousel(reviewsCarousel);

    var maxReviews = getMaxReviews(reviewsCarousel);
    fetch('/api/google-reviews', { headers: { Accept: 'application/json' } })
      .then(function (res) {
        if (!res.ok) throw new Error('api');
        return res.json();
      })
      .then(function (data) {
        if (
          !data ||
          data.source !== 'google' ||
          !renderTestimonialCarousel(reviewsCarousel, data.reviews, maxReviews)
        ) {
          throw new Error('no google');
        }
        setFallbackNoteVisible(false);
        applyGoogleAttribution(attrEl, data);
        initTestimonialCarousel(reviewsCarousel);
      })
      .catch(function () {
        return fetch('data/reviews.json', {
          headers: { Accept: 'application/json' },
        })
          .then(function (res) {
            if (!res.ok) throw new Error('json');
            return res.json();
          })
          .then(function (data) {
            var list = data && data.reviews;
            if (
              !Array.isArray(list) ||
              !list.length ||
              !renderTestimonialCarousel(reviewsCarousel, list, maxReviews)
            ) {
              throw new Error('empty');
            }
            setFallbackNoteVisible(true);
            if (attrEl) {
              attrEl.innerHTML = '';
              attrEl.setAttribute('hidden', '');
            }
            initTestimonialCarousel(reviewsCarousel);
          });
      })
      .catch(function () {
        setFallbackNoteVisible(true);
        if (attrEl) {
          attrEl.innerHTML = '';
          attrEl.setAttribute('hidden', '');
        }
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

  if (typeof ScrollTrigger !== 'undefined') {
    window.addEventListener('load', function () {
      ScrollTrigger.refresh();
    });
  }
})();
