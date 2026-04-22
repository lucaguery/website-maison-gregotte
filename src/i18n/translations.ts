export const languages = {
  fr: 'Français',
  en: 'English',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'fr';

export const translations = {
  fr: {
    'nav.home': 'Accueil',
    'nav.art': 'l\'art',
    'nav.about': 'A propos',
    'nav.contact': 'Contact',
    'hero.title': 'laura gregori',
    'hero.subtitle': 'collections de peintures & collages',
    'hero.stamp': 'provence · mmxxvi',
    'hero.cta': 'voir l\'art',
    'art.title': 'l\'art',
    'art.subtitle': 'peintures, moodboards et objets chinés — un corpus vivant.',
    'art.filter.all': 'tout',
    'art.filter.paintings': 'peintures',
    'art.filter.moodboards': 'moodboards',
    'art.filter.vintage': 'vintage',
    'art.kind.painting': 'peinture',
    'art.kind.moodboard': 'moodboard',
    'art.kind.vintage': 'vintage',
    'shop.paintings': 'Peintures',
    'shop.vintage': 'Objets vintage',
    'shop.addToCart': 'Ajouter au panier',
    'shop.sold': 'vendu',
    'shop.all': 'Tout',
    'about.title': 'a propos',
    'about.subtitle': 'l\'histoire derrière laura gregori',
    'contact.title': 'contact',
    'contact.subtitle': 'n\'hésitez pas à nous écrire',
    'contact.name': 'Nom',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Envoyer',
    'footer.rights': 'Tous droits réservés',
  },
  en: {
    'nav.home': 'Home',
    'nav.art': 'the art',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'hero.title': 'laura gregori',
    'hero.subtitle': 'paintings & collages collections',
    'hero.stamp': 'provence · mmxxvi',
    'hero.cta': 'enter the art',
    'art.title': 'the art',
    'art.subtitle': 'paintings, moodboards and vintage finds — one living body of work.',
    'art.filter.all': 'all',
    'art.filter.paintings': 'paintings',
    'art.filter.moodboards': 'moodboards',
    'art.filter.vintage': 'vintage',
    'art.kind.painting': 'painting',
    'art.kind.moodboard': 'moodboard',
    'art.kind.vintage': 'vintage',
    'shop.paintings': 'Paintings',
    'shop.vintage': 'Vintage objects',
    'shop.addToCart': 'Add to cart',
    'shop.sold': 'sold',
    'shop.all': 'All',
    'about.title': 'about',
    'about.subtitle': 'the story behind laura gregori',
    'contact.title': 'contact',
    'contact.subtitle': 'feel free to get in touch',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send',
    'footer.rights': 'All rights reserved',
  },
} as const;

export function t(lang: Lang, key: keyof (typeof translations)['fr']): string {
  return translations[lang][key] ?? translations[defaultLang][key] ?? key;
}

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in translations) return lang as Lang;
  return defaultLang;
}

export function getLocalizedPath(path: string, lang: Lang): string {
  // Strip any existing language prefix (e.g. /en/ → /) before applying the new one
  const nonDefaultLangs = Object.keys(languages).filter((l) => l !== defaultLang);
  const stripped = path.replace(
    new RegExp(`^\\/(${nonDefaultLangs.join('|')})(\\\/|$)`),
    '/'
  );
  if (lang === defaultLang) return stripped;
  return `/${lang}${stripped}`;
}
