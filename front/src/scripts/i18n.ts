import { translations, locales, type Locale } from '../i18n/translations';

function getDefaultLocale(): Locale {
  const stored = localStorage.getItem('locale') as Locale | null;
  if (stored && locales.includes(stored)) return stored;

  const browserLang = navigator.language.split('-')[0].toLowerCase();
  if (locales.includes(browserLang as Locale)) return browserLang as Locale;

  return 'en';
}

function applyLocale(locale: Locale) {
  const strings = translations[locale];
  document.documentElement.lang = locale;
  localStorage.setItem('locale', locale);

  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n!;
    if (strings[key]) {
      el.innerHTML = strings[key];
    }
  });

  // Update active state on switcher buttons
  document.querySelectorAll<HTMLElement>('[data-locale]').forEach(btn => {
    if (btn.dataset.locale === locale) {
      btn.classList.add('text-violet-400', 'border-violet-500/50', 'bg-violet-500/10');
      btn.classList.remove('text-zinc-500', 'border-zinc-800', 'hover:text-zinc-300');
    } else {
      btn.classList.remove('text-violet-400', 'border-violet-500/50', 'bg-violet-500/10');
      btn.classList.add('text-zinc-500', 'border-zinc-800', 'hover:text-zinc-300');
    }
  });
}

// Initialize
const currentLocale = getDefaultLocale();
applyLocale(currentLocale);

// Listen for locale change clicks
document.querySelectorAll<HTMLElement>('[data-locale]').forEach(btn => {
  btn.addEventListener('click', () => {
    const locale = btn.dataset.locale as Locale;
    applyLocale(locale);
  });
});

export {};
