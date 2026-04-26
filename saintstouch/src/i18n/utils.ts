import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import ptBr from './locales/pt-br.json';
import hi from './locales/hi.json';

export type Locale = 'en' | 'es' | 'fr' | 'pt-br' | 'hi';

const translations: Record<Locale, typeof en> = {
  en,
  es,
  fr,
  'pt-br': ptBr,
  hi,
};

export function getTranslation(locale: Locale, key: string): any {
  const keys = key.split('.');
  let value = translations[locale];
  
  for (const k of keys) {
    if (typeof value === 'object' && value !== null) {
      value = value[k as keyof typeof value];
    } else {
      return null;
    }
  }
  
  return value;
}

export function t(locale: Locale, key: string, replacements?: Record<string, string | number>): any {
  let value = getTranslation(locale, key);
  
  if (value === null || value === undefined) {
    console.warn(`Translation missing: ${key} for locale ${locale}`);
    return key;
  }
  
  // Return arrays and objects as-is
  if (Array.isArray(value) || (typeof value === 'object' && value !== null)) {
    return value;
  }
  
  if (typeof value === 'string' && replacements) {
    return Object.entries(replacements).reduce((str, [k, v]) => {
      return str.replace(`{${k}}`, String(v));
    }, value);
  }
  
  return typeof value === 'string' ? value : key;
}
