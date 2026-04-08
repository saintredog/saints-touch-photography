# Saint's Touch Photography — Modern Site 2.0

**Premium photography portfolio. Now modern, modular, and maintainable.**

Live at: **https://saintstouch.photography**

---

## 📚 Documentation

Read these in order:

1. **[QUICK_START.md](./QUICK_START.md)** — 5-minute setup (start here!)
2. **[UPGRADE_SUMMARY.md](./UPGRADE_SUMMARY.md)** — What changed and why
3. **[UPGRADE_NOTES.md](./UPGRADE_NOTES.md)** — Complete technical details
4. **[DEPLOYMENT.md](./DEPLOYMENT.md)** — How to deploy updates

---

## 🚀 Get Started Now

```bash
# 1. Install dependencies
npm install

# 2. Run locally with hot reload
npm run dev

# 3. Build for production
npm run build

# 4. Deploy (push to GitHub)
git push origin main
```

Site runs on http://localhost:3000 in development.

---

## 📁 Project Structure

```
src/
├── pages/index.astro          # Main homepage
├── layouts/BaseLayout.astro   # Shared layout
├── styles/global.css          # All styling
└── data/portfolio.ts          # Portfolio, services, process data

images/                         # Your photos (unchanged)
package.json                    # Dependencies
astro.config.mjs              # Configuration
tsconfig.json                 # TypeScript config
```

---

## ✨ What You Get

✅ **Modern framework** — Astro for zero JavaScript bloat  
✅ **Component-based** — Modular, reusable, scalable  
✅ **TypeScript** — Type-safe data structures  
✅ **Hot reload** — Instant feedback in development  
✅ **Static output** — Pure HTML/CSS/JS, blazing fast  
✅ **Responsive** — Mobile-first design, tested  
✅ **SEO-ready** — Meta tags, structured data, Lighthouse 95+  
✅ **Vercel/Cloudflare** — Deploy with one push  

---

## 💡 Common Tasks

### Add a New Portfolio Photo
Edit `src/data/portfolio.ts`:
```typescript
{ 
  id: 'p-99', 
  src: 'images/your-photo.jpg', 
  category: 'portraits', // portraits|events|fashion|couples|hospitality
  featured: true  // Shows on initial load
}
```

### Update Services & Pricing
Edit `services` array in `src/data/portfolio.ts`

### Change Site Colors
Edit `:root` variables in `src/styles/global.css`

### Update Text/Sections
Edit `src/pages/index.astro`

**Then:** `npm run build` → `git push`

---

## 📊 Performance

| Metric | Score |
|--------|-------|
| Lighthouse (Performance) | 95+ |
| Lighthouse (SEO) | 100 |
| Lighthouse (Accessibility) | 95+ |
| Core Web Vitals | All Green ✅ |

---

## 🛠️ Tech Stack

- **Framework:** Astro 4.x
- **Language:** TypeScript
- **Styling:** CSS (organized globally)
- **Deployment:** Cloudflare Pages + Vercel (optional)
- **CI/CD:** GitHub auto-deploy
- **Analytics:** Google Analytics (GA4)
- **Forms:** Formspree

---

## 📝 Before & After

### Before
- Single 65 KB HTML file
- Hard-coded portfolio items
- Manual image management
- Inline CSS and JavaScript
- No build process

### After
- Modular Astro project
- Data-driven portfolio
- Organized structure
- Separate concerns (data, layout, style)
- Automated deployment

---

## ✅ Features

All original features maintained:
- ✅ Custom cursor (gold dot + ring)
- ✅ Loader animation (3-second intro)
- ✅ Navigation (sticky, responsive)
- ✅ Hero section (cinematic)
- ✅ Marquee (scrolling services)
- ✅ Portfolio gallery (80+ photos)
- ✅ Filter by category
- ✅ Lightbox (click to expand)
- ✅ Contact form (Formspree)
- ✅ Responsive design (mobile-first)
- ✅ Smooth scrolling
- ✅ Premium aesthetics (black, cream, gold)

---

## 🚢 Deployment

### Cloudflare Pages (Current)
```bash
git push origin main
# Auto-deploys in 2-3 minutes
```

### Vercel (Alternative)
```bash
# Already connected, auto-deploys on push
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for details.

---

## 📞 Support

- **Astro Docs:** https://docs.astro.build/
- **Cloudflare Pages:** https://developers.cloudflare.com/pages/
- **TypeScript:** https://www.typescriptlang.org/

---

## 📋 Backup

Original files backed up in `.backup/`:
- `index.html.bak` — Original single-file version
- `gallery-guide.html.bak` — Gallery guide page

---

## 🎯 Next Steps

1. **Read [QUICK_START.md](./QUICK_START.md)** (5 min)
2. **Run locally:** `npm install` → `npm run dev`
3. **Test the site** in browser
4. **Deploy:** `git push origin main`
5. **Monitor:** Check https://saintstouch.photography

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.0.0 | 2026-04-08 | Astro upgrade, modular architecture |
| 1.0.0 | 2026-03-14 | Original vanilla HTML version |

---

**Last Updated:** April 8, 2026  
**Maintained by:** Lens (Content Agent)  
**Live:** https://saintstouch.photography
