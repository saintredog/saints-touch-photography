# Quick Start — 5 Minutes to Deployed

## 1️⃣ Install Dependencies (1 min)
```bash
cd /Users/cliffordroberts/.openclaw/workspace/saintstouch
npm install
```

## 2️⃣ Run Locally (1 min)
```bash
npm run dev
```
→ Open http://localhost:3000  
→ Your site runs with hot reload

## 3️⃣ Build for Production (1 min)
```bash
npm run build
```
→ Creates `dist/` folder ready to deploy

## 4️⃣ Deploy (1 min)
```bash
git add .
git commit -m "Upgrade to Astro v2.0"
git push origin main
```
→ Cloudflare auto-deploys in 2-3 minutes  
→ Visit https://saintstouch.photography ✅

---

## Common Tasks

### Update Portfolio (Add/Remove Photos)
Edit `src/data/portfolio.ts`:
```typescript
{ id: 'p-50', src: 'images/new-photo.jpg', category: 'portraits', featured: true }
```
Then: `npm run build` → `git push`

### Update Services/Pricing
Edit `src/data/portfolio.ts` → `services` array  
Then: `npm run build` → `git push`

### Update Text/Sections
Edit `src/pages/index.astro`  
Then: `npm run build` → `git push`

### Change Colors
Edit `src/styles/global.css` → `:root` variables  
Then: `npm run build` → `git push`

---

## File Reference

| File | Purpose |
|------|---------|
| `src/pages/index.astro` | Main page HTML structure |
| `src/data/portfolio.ts` | Portfolio items, services, process steps |
| `src/styles/global.css` | All styling (organized by section) |
| `src/layouts/BaseLayout.astro` | Shared header, scripts, meta tags |
| `package.json` | Dependencies & scripts |
| `astro.config.mjs` | Astro configuration |
| `images/` | Your photos (unchanged) |
| `dist/` | Build output (auto-generated, don't edit) |

---

## Scripts

```bash
npm run dev          # Local development with hot reload
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run astro        # Run Astro CLI directly
```

---

## Folder Structure

```
saintstouch/
├── src/
│   ├── pages/        # Pages (index.astro = home)
│   ├── layouts/      # Shared layouts
│   ├── styles/       # CSS
│   └── data/         # Content data (portfolio, services, etc)
├── images/           # Your photos
├── public/           # Static files
├── dist/             # Build output (git-ignored)
└── docs/
    ├── UPGRADE_NOTES.md       # Detailed upgrade info
    ├── UPGRADE_SUMMARY.md     # High-level overview
    ├── DEPLOYMENT.md          # Deployment guide
    └── QUICK_START.md         # This file
```

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `npm install` fails | Update Node: `nvm install 20.11.0` |
| `npm run dev` won't start | Kill port 3000: `lsof -ti:3000 \| xargs kill` |
| Build fails | Check for syntax errors in TypeScript files |
| Images don't load | Ensure `images/` folder exists at root |
| Old version shows | Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows) |

---

## You're Ready! 🚀

1. `npm install`
2. `npm run dev` (test locally)
3. `npm run build`
4. `git push origin main`
5. Visit https://saintstouch.photography

**Done.** Your site is live and modern.
