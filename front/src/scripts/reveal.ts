const reveals = document.querySelectorAll<HTMLElement>('.reveal, .reveal-scale');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target as HTMLElement;
      const delay = el.dataset.delay || '0';
      el.style.transitionDelay = `${delay}ms`;
      el.classList.add('visible');
      observer.unobserve(el);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

reveals.forEach(el => observer.observe(el));

// Magnetic effect on buttons/links with data-magnetic
document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });

  el.addEventListener('mouseleave', () => {
    el.style.transform = 'translate(0, 0)';
    el.style.transition = 'transform 0.4s cubic-bezier(0.33, 1, 0.68, 1)';
  });

  el.addEventListener('mouseenter', () => {
    el.style.transition = 'transform 0.15s ease-out';
  });
});

// Count-up animation for numbers
document.querySelectorAll<HTMLElement>('[data-countup]').forEach(el => {
  const target = parseInt(el.dataset.countup || '0', 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1500;
  let start: number | null = null;

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        requestAnimationFrame(function step(ts) {
          if (!start) start = ts;
          const progress = Math.min((ts - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target) + suffix;
          if (progress < 1) requestAnimationFrame(step);
        });
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  countObserver.observe(el);
});

export {};
