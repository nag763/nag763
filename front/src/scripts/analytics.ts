declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function trackEvent(eventName: string, params: Record<string, string>) {
  if (window.gtag) {
    window.gtag('event', eventName, params);
  }
}

document.querySelectorAll<HTMLElement>('[data-track-event]').forEach(el => {
  el.addEventListener('click', () => {
    const event = el.dataset.trackEvent;
    const label = el.dataset.trackLabel || '';
    const url = (el as HTMLAnchorElement).href || '';
    if (event) {
      trackEvent(event, { link_name: label, link_url: url });
    }
  });
});

const seen = new Set<string>();
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const section = entry.target as HTMLElement;
    const name = section.dataset.trackSection;
    if (entry.isIntersecting && name && !seen.has(name)) {
      seen.add(name);
      trackEvent('section_view', { section_name: name });
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll<HTMLElement>('[data-track-section]').forEach(el => {
  observer.observe(el);
});

export {};
