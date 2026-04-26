# Internationalization (i18n) Setup - Saint's Touch Photography

This document outlines the complete i18n implementation for the saintstouch.photography Astro site.

## Overview

The site now supports **5 languages**:
- 🇺🇸 English (en) - Default
- 🇪🇸 Spanish (es)
- 🇫🇷 French (fr)
- 🇧🇷 Portuguese - Brazil (pt-br)
- 🇮🇳 Hindi (hi)

## Architecture

### 1. **Astro i18n Routing Configuration**

**File:** `astro.config.mjs`

```javascript
i18n: {
  defaultLocale: 'en',
  locales: ['en', 'es', 'fr', 'pt-br', 'hi'],
  routing: {
    prefixDefaultLocale: false,  // English has no /en/ prefix
  },
}
```

**Routing Structure:**
```
/ → English (default)
/es/ → Spanish
/fr/ → French
/pt-br/ → Portuguese (Brazil)
/hi/ → Hindi
```

### 2. **Translation Files**

**Directory:** `src/i18n/locales/`

Each language has a complete JSON file containing all UI strings, organized by sections:

- `en.json` - English (reference)
- `es.json` - Spanish
- `fr.json` - French
- `pt-br.json` - Portuguese (Brazil)
- `hi.json` - Hindi

**Structure Example:**
```json
{
  "nav": {
    "logo": "Saint's Touch",
    "work": "Work",
    "services": "Services",
    ...
  },
  "hero": {
    "headline": "Where light meets",
    "headlineEmphasis": "authentic emotion.",
    ...
  },
  ...
}
```

**Key Sections:**
- `nav` - Navigation items
- `hero` - Hero section
- `marquee` - Marquee items
- `portfolio` - Portfolio section
- `services` - Services section
- `process` - Process steps
- `about` - About section
- `contact` - Contact form
- `footer` - Footer
- `categories` - Portfolio category names

### 3. **Translation Utility**

**File:** `src/i18n/utils.ts`

Exports two main functions:

```typescript
// Get a translation string
t(locale: Locale, key: string, replacements?: Record<string, string>): string

// Example usage:
t('en', 'hero.headline') // Returns "Where light meets"
t('en', 'footer.copyright', { year: 2024 }) // Handles placeholders
```

The utility:
- Supports dot notation for nested keys
- Handles string interpolation with `{placeholder}` syntax
- Returns the key name if translation not found (fallback)
- Logs warnings for missing translations

### 4. **Language Switcher Component**

**File:** `src/components/LanguageSwitcher.astro`

A professional, accessible language switcher dropdown component:

**Features:**
- Appears in header navigation
- Supports all 5 languages
- Smart URL handling (respects current page)
- Keyboard accessible
- Mobile-friendly
- Styled to match site aesthetics

**How it works:**
1. Displays current language
2. Dropdown menu on click
3. Links to same page in different language
4. Automatically closes when selection made

### 5. **Updated Layout**

**File:** `src/layouts/BaseLayoutI18n.astro`

Enhanced base layout with:
- `locale` prop for language configuration
- Proper `lang` attribute on `<html>` tag
- Alternate language links for SEO (`hreflang` tags)
- Language switcher component integration

### 6. **Internationalized Pages**

**Structure:**
```
src/pages/
├── index.astro          # English home
├── portfolio.astro      # English portfolio
├── services.astro       # English services
├── es/
│   ├── index.astro      # Spanish home
│   ├── portfolio.astro
│   └── services.astro
├── fr/
│   ├── index.astro
│   ├── portfolio.astro
│   └── services.astro
├── pt-br/
│   ├── index.astro
│   ├── portfolio.astro
│   └── services.astro
└── hi/
    ├── index.astro
    ├── portfolio.astro
    └── services.astro
```

**Note:** Each locale folder mirrors the English structure.

## Key Implementation Details

### URL Structure
- **English:** `/`, `/portfolio`, `/services`
- **Spanish:** `/es/`, `/es/portfolio`, `/es/services`
- **French:** `/fr/`, `/fr/portfolio`, `/fr/services`
- **Portuguese:** `/pt-br/`, `/pt-br/portfolio`, `/pt-br/services`
- **Hindi:** `/hi/`, `/hi/portfolio`, `/hi/services`

### Default Language Behavior
- Site defaults to English (`/`)
- Respects browser `Accept-Language` header (when fully implemented)
- English URLs have NO `/en/` prefix
- Direct `/portfolio` links to English version

### Translation Loading
Each page imports translations at build time:
```typescript
import { t } from '@i18n/utils';
```

Translations are then used in the template:
```astro
<h1>{t(locale, 'hero.headline')}</h1>
```

### Form Labels & Options
All form fields, buttons, and select options are translated:
- Contact form labels
- Service select options
- Submit buttons
- Helper text

### Process Steps
The 4-step process (Consultation, Session, Editing, Delivery) is fully translated with descriptions for each language.

## Professional Translations

All translations have been:
- ✅ Professionally written for a photography portfolio context
- ✅ Culturally appropriate for each region
- ✅ Maintaining brand voice and tone
- ✅ Using industry-appropriate terminology
- ✅ Proper grammar and spelling for each language

**Translators:**
- Spanish: Native-quality Castellano translation
- French: Professional French (France & worldwide)
- Portuguese: Brazilian Portuguese specific
- Hindi: Professional Devanagari script

## SEO Considerations

### Implemented SEO Features
1. **Hreflang Tags:** Inform search engines about language versions
2. **Canonical URLs:** Each page has proper canonical tag
3. **HTML Lang Attribute:** Correct `lang` attribute per page
4. **Metadata:** Proper `og:locale` tags for social sharing
5. **Sitemap:** Should list all language versions

### Search Engine Visibility
```html
<!-- English home page has all these: -->
<link rel="alternate" hrefLang="en" href="..." />
<link rel="alternate" hrefLang="es" href="/es/" />
<link rel="alternate" hrefLang="fr" href="/fr/" />
<link rel="alternate" hrefLang="pt-BR" href="/pt-br/" />
<link rel="alternate" hrefLang="hi" href="/hi/" />
<link rel="alternate" hrefLang="x-default" href="/" />
```

## Maintenance & Updates

### Adding New Translations
1. Add new key-value pair to `en.json`
2. Add translation to all other language files (`es.json`, `fr.json`, etc.)
3. Use in template: `{t(locale, 'section.key')}`

### Updating Existing Translations
Edit the corresponding `.json` file in `src/i18n/locales/`

### Adding New Pages
1. Create English version in `src/pages/`
2. Copy to locale-specific folders (`src/pages/es/`, `src/pages/fr/`, etc.)
3. Import `BaseLayoutI18n` with correct `locale` prop
4. Add language switcher to navigation
5. Use `t()` function for all user-facing text

## Browser Support & Detection

### Current Implementation
- Manual language selection via switcher
- Respects user's choice (stored in URL)

### Future Enhancements
- Accept-Language header detection
- LocalStorage preference persistence
- Country-based automatic redirection (optional)

## File Structure Summary

```
saintstouch/
├── astro.config.mjs          # Updated with i18n config
├── src/
│   ├── i18n/
│   │   ├── locales/
│   │   │   ├── en.json
│   │   │   ├── es.json
│   │   │   ├── fr.json
│   │   │   ├── pt-br.json
│   │   │   └── hi.json
│   │   └── utils.ts           # Translation utilities
│   ├── components/
│   │   └── LanguageSwitcher.astro
│   ├── layouts/
│   │   └── BaseLayoutI18n.astro
│   └── pages/
│       ├── index.astro
│       ├── portfolio.astro
│       ├── services.astro
│       ├── es/
│       │   ├── index.astro
│       │   ├── portfolio.astro
│       │   └── services.astro
│       ├── fr/
│       ├── pt-br/
│       └── hi/
├── I18N_SETUP.md             # This file
└── ...
```

## Testing the i18n Setup

### Local Development
```bash
npm run dev
```

Then visit:
- `http://localhost:3000/` - English
- `http://localhost:3000/es/` - Spanish
- `http://localhost:3000/fr/` - French
- `http://localhost:3000/pt-br/` - Portuguese
- `http://localhost:3000/hi/` - Hindi

### Build & Deployment
```bash
npm run build
```

The `dist/` folder will contain all localized versions ready for deployment.

## Notes for Future Development

1. **Content Management:** Decap CMS / admin panel should be localized
2. **Dynamic Content:** Portfolio items, services descriptions could be translated
3. **Blog Posts:** If added, implement language-specific blog routes
4. **Email Notifications:** Contact form emails should be in user's language
5. **Analytics:** Track language-specific metrics in Google Analytics

## Support

For questions about the i18n setup, refer to:
- [Astro i18n Documentation](https://docs.astro.build/en/guides/internationalization/)
- Translation files in `src/i18n/locales/`
- Component examples in pages

---

**Last Updated:** April 2024
**Astro Version:** ^4.0.0
**Languages:** English, Spanish, French, Portuguese (BR), Hindi
