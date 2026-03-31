export const languages = {
  fr: 'Français',
  en: 'English',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'fr';

export const translations = {
  fr: {
    'nav.home': 'Accueil',
    'nav.moodboards': 'Moodboards',
    'nav.shop': 'Boutique',
    'nav.about': 'A propos',
    'nav.contact': 'Contact',
    'hero.title': 'maison gregotte',
    'hero.subtitle': 'collections de peintures & collages',
    'shop.paintings': 'Peintures',
    'shop.vintage': 'Objets vintage',
    'shop.addToCart': 'Ajouter au panier',
    'shop.sold': 'Vendu',
    'shop.all': 'Tout',
    'about.title': 'a propos',
    'about.subtitle': 'l\'histoire derrière maison gregotte',
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
    'nav.moodboards': 'Moodboards',
    'nav.shop': 'Shop',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'hero.title': 'maison gregotte',
    'hero.subtitle': 'paintings & collages collections',
    'shop.paintings': 'Paintings',
    'shop.vintage': 'Vintage objects',
    'shop.addToCart': 'Add to cart',
    'shop.sold': 'Sold',
    'shop.all': 'All',
    'about.title': 'about',
    'about.subtitle': 'the story behind maison gregotte',
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
