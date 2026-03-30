// Scroll reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const delay = e.target.dataset.delay || 0;
      setTimeout(() => e.target.classList.add('visible'), Number(delay));
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .reveal-left').forEach((el, i) => {
  observer.observe(el);
});

// Staggered children
document.querySelectorAll('[data-stagger]').forEach(parent => {
  Array.from(parent.children).forEach((child, i) => {
    child.classList.add('reveal');
    child.dataset.delay = i * 90;
    observer.observe(child);
  });
});

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// Active nav link
const currentPage = location.pathname.split('/').filter(Boolean).pop() || 'index';
document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.getAttribute('href') && a.getAttribute('href').includes(currentPage)) {
    a.classList.add('active');
  }
});
