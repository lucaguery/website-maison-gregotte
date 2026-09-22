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
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    'hero.title': 'laura gregori',
    'hero.subtitle': 'pastels à l\'huile, aquarelles & collages',
    'hero.stamp': 'paris',
    'hero.cta': 'voir l\'art',
    'art.title': 'l\'art',
    'art.subtitle': 'pastels à l\'huile, collages et aquarelles — un corpus vivant.',
    'art.filter.all': 'tout',
    'art.filter.pastel': 'pastels',
    'art.filter.watercolor': 'aquarelles',
    'art.filter.collage': 'collages',
    'art.kind.pastel': 'pastel à l\'huile',
    'art.kind.watercolor': 'aquarelle',
    'art.kind.collage': 'collage',
    'art.framed': 'encadrée',
    'shop.addToCart': 'Ajouter au panier',
    'shop.sold': 'vendu',
    'shop.all': 'Tout',
    'about.title': 'à propos',
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
    'hero.subtitle': 'oil pastels, watercolours & collages',
    'hero.stamp': 'paris',
    'hero.cta': 'enter the art',
    'art.title': 'the art',
    'art.subtitle': 'oil pastels, collages and watercolours — one living body of work.',
    'art.filter.all': 'all',
    'art.filter.pastel': 'pastels',
    'art.filter.watercolor': 'watercolours',
    'art.filter.collage': 'collages',
    'art.kind.pastel': 'oil pastel',
    'art.kind.watercolor': 'watercolour',
    'art.kind.collage': 'collage',
    'art.framed': 'framed',
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
