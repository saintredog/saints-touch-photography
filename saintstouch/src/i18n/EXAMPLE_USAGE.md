# i18n Translation Usage Guide

Quick reference for using translations in Astro components and pages.

## Basic Usage

### Import the translation function

```typescript
import { t } from '@i18n/utils';
import type { Locale } from '@i18n/utils';
```

### Get a translation string

```typescript
// Simple string
const heading = t('en', 'hero.headline');
// Result: "Where light meets"

// With replacement/interpolation
const copyright = t('en', 'footer.copyright', { year: 2024 });
// Result: "© 2024 Saint's Touch Photography. All rights reserved."
```

### In Astro templates

```astro
---
import { t } from '@i18n/utils';
import type { Locale } from '@i18n/utils';

const locale: Locale = 'en';
---

<h1>{t(locale, 'hero.headline')}</h1>
<p>{t(locale, 'hero.subtitle')}</p>
<button>{t(locale, 'hero.cta')}</button>
```

## Common Patterns

### Navigation

```astro
<nav>
  <a href="/">{t(locale, 'nav.work')}</a>
  <a href="/portfolio">{t(locale, 'nav.services')}</a>
  <a href="#about">{t(locale, 'nav.about')}</a>
  <a href="#contact">{t(locale, 'nav.contact')}</a>
</nav>
```

### Forms

```astro
<form>
  <label for="name">{t(locale, 'contact.form.name')}</label>
  <input id="name" name="name" required />

  <label for="email">{t(locale, 'contact.form.email')}</label>
  <input id="email" type="email" name="email" required />

  <label for="service">{t(locale, 'contact.form.service')}</label>
  <select id="service" name="service" required>
    <option value="">{t(locale, 'contact.form.selectService')}</option>
    <option value="portraits">{t(locale, 'contact.serviceOptions.portraits')}</option>
    <option value="maternity">{t(locale, 'contact.serviceOptions.maternity')}</option>
  </select>

  <button type="submit">{t(locale, 'contact.form.submit')}</button>
</form>
```

### Sections & Headings

```astro
<section id="about">
  <div class="section-label">{t(locale, 'about.label')}</div>
  <h2 class="section-title">
    {t(locale, 'about.title')}<em>{t(locale, 'about.titleEmphasis')}</em>
  </h2>
  <p>{t(locale, 'about.intro')}</p>
  <div>{t(locale, 'about.body')}</div>
  <a href="#contact" class="cta">{t(locale, 'about.cta')}</a>
</section>
```

### Lists/Arrays

```astro
---
// Get array of items
const processSteps = t(locale, 'process.steps') as any[];
const marqueeItems = t(locale, 'marquee.items') as string[];
---

<div class="process-steps">
  {processSteps.map((step, i) => (
    <div class="step">
      <h3>{step.title}</h3>
      <p>{step.description}</p>
    </div>
  ))}
</div>
```

### Conditional Rendering

```astro
{isFormSubmitted && (
  <p>{t(locale, 'contact.successMessage')}</p>
)}

{hasError && (
  <p class="error">{t(locale, 'contact.errorMessage')}</p>
)}
```

## Available Translations

### Navigation (`nav.*`)
```json
{
  "nav.logo": "Saint's Touch",
  "nav.work": "Work",
  "nav.services": "Services",
  "nav.about": "About",
  "nav.gallery": "Gallery Guide",
  "nav.contact": "Contact",
  "nav.instagram": "Instagram",
  "nav.whatsapp": "WhatsApp"
}
```

### Hero Section (`hero.*`)
```json
{
  "hero.eyebrow": "Virginia Beach · Worldwide",
  "hero.headline": "Where light meets",
  "hero.headlineEmphasis": "authentic emotion.",
  "hero.subtitle": "Cinematic Portraiture & Visual Storytelling",
  "hero.cta": "Book a Session"
}
```

### Portfolio (`portfolio.*`)
```json
{
  "portfolio.label": "Recent Work",
  "portfolio.title": "Featured ",
  "portfolio.titleEmphasis": "Portfolio",
  "portfolio.cta": "View Full Portfolio"
}
```

### Services (`services.*`)
```json
{
  "services.label": "Investment",
  "services.title": "Services & ",
  "services.titleEmphasis": "Pricing",
  "services.hint": "Select a service to explore pricing options",
  "services.viewAll": "View All Services"
}
```

### Process (`process.*`)
```json
{
  "process.label": "How It Works",
  "process.title": "The ",
  "process.titleEmphasis": "Process",
  "process.steps": [
    {
      "title": "Consultation",
      "description": "..."
    },
    // ... 3 more steps
  ]
}
```

### About (`about.*`)
```json
{
  "about.label": "About",
  "about.title": "Meet ",
  "about.titleEmphasis": "Cliff",
  "about.intro": "I'm Clifford Roberts III, ...",
  "about.body": "For the past several years, ...",
  "about.cta": "Work Together"
}
```

### Contact (`contact.*`)
```json
{
  "contact.label": "Get In Touch",
  "contact.title": "Let's Create ",
  "contact.titleEmphasis": "Something",
  "contact.form.name": "Your Name",
  "contact.form.email": "Email Address",
  "contact.form.phone": "Phone (Optional)",
  "contact.form.service": "Service Interested In",
  "contact.form.message": "Tell Me About Your Vision",
  "contact.form.selectService": "Select a service",
  "contact.form.submit": "Send Inquiry",
  "contact.form.directText": "Prefer to reach out directly?",
  "contact.serviceOptions": {
    "portraits": "Portraits",
    "maternity": "Maternity",
    "fashion": "Fashion",
    "couples": "Couples & Engagements",
    "events": "Events",
    "commercial": "Commercial / Hospitality",
    "other": "Other"
  }
}
```

### Footer (`footer.*`)
```json
{
  "footer.copyright": "© {year} Saint's Touch Photography. All rights reserved.",
  "footer.links.instagram": "Instagram",
  "footer.links.whatsapp": "WhatsApp",
  "footer.links.contact": "Contact"
}
```

### Categories (`categories.*`)
```json
{
  "categories.portraits": "Portraits",
  "categories.events": "Events",
  "categories.fashion": "Fashion",
  "categories.couples": "Couples",
  "categories.hospitality": "Hospitality"
}
```

## Type Safety

The `Locale` type ensures you use valid locale codes:

```typescript
import type { Locale } from '@i18n/utils';

// ✅ Valid
const locale: Locale = 'en';
const locale: Locale = 'es';
const locale: Locale = 'fr';
const locale: Locale = 'pt-br';
const locale: Locale = 'hi';

// ❌ TypeScript error
const locale: Locale = 'de'; // German not supported
const locale: Locale = 'english'; // Use 'en'
```

## Adding New Translations

### 1. Add to English first (`en.json`)

```json
{
  "newSection": {
    "title": "New Title",
    "description": "New description"
  }
}
```

### 2. Add to all other language files

**es.json:**
```json
{
  "newSection": {
    "title": "Nuevo Título",
    "description": "Nueva descripción"
  }
}
```

**fr.json:**
```json
{
  "newSection": {
    "title": "Nouveau Titre",
    "description": "Nouvelle description"
  }
}
```

### 3. Use in your component

```astro
<h2>{t(locale, 'newSection.title')}</h2>
<p>{t(locale, 'newSection.description')}</p>
```

## Placeholder Replacement

For dynamic content in strings:

```json
{
  "greeting": "Hello, {name}!",
  "footer.copyright": "© {year} Saint's Touch Photography"
}
```

Usage:

```typescript
t('en', 'greeting', { name: 'Cliff' });
// Result: "Hello, Cliff!"

t('en', 'footer.copyright', { year: 2024 });
// Result: "© 2024 Saint's Touch Photography"
```

## Debugging Missing Translations

If a translation key is missing, the `t()` function will:
1. Return the key itself as a fallback
2. Log a warning to the console

```typescript
t('en', 'nonexistent.key');
// Returns: 'nonexistent.key'
// Logs: Translation missing: nonexistent.key for locale en
```

## Performance Tips

1. **Import once, use many times:**
```typescript
// ✅ Good
const label = t(locale, 'section.label');
const title = t(locale, 'section.title');
const description = t(locale, 'section.description');

// ❌ Avoid repeated imports
import { t as translate1 } from '@i18n/utils';
import { t as translate2 } from '@i18n/utils';
```

2. **Cache array translations:**
```typescript
// ✅ Good
const steps = t(locale, 'process.steps') as any[];
steps.forEach(step => {
  // Use step.title, step.description
});

// Avoid re-fetching in loop
```

3. **Use TypeScript for type safety:**
```typescript
const locale: Locale = 'en'; // Type-checked

// This is caught at build time, not runtime
const badLocale: Locale = 'invalid'; // ❌ Error
```

## Common Issues & Solutions

### Issue: Translation not appearing

**Solution:** Check that the key path is correct (case-sensitive):
```typescript
// ❌ Wrong
t(locale, 'Hero.Headline') // Wrong case
t(locale, 'hero-headline')  // Wrong separator (use dots)

// ✅ Correct
t(locale, 'hero.headline')
```

### Issue: Special characters not displaying

**Solution:** JSON files use UTF-8 encoding. Make sure your editor is set to UTF-8:
```json
{
  "hi": {
    "nav.about": "परिचय"  // Hindi text displays correctly
  }
}
```

### Issue: Locale parameter undefined

**Solution:** Define locale at top of component:
```astro
---
import type { Locale } from '@i18n/utils';

const locale: Locale = 'en'; // ✅ Define this
---

// Then use it
{t(locale, 'key')}
```

---

## Reference Links

- [Translation Files](./locales/)
- [Translation Utilities](./utils.ts)
- [Astro i18n Docs](https://docs.astro.build/en/guides/internationalization/)

---

**Last Updated:** April 2024
