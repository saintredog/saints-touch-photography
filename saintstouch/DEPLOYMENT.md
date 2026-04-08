# Deployment Guide

## Pre-Deployment Checklist

- [ ] Run `npm run build` locally and verify no errors
- [ ] Check `dist/` folder was created with `index.html`
- [ ] Test the build: `npm run preview`
- [ ] Verify all images load in the preview
- [ ] Check portfolio items appear correctly
- [ ] Test on mobile (resize browser or use device)
- [ ] Test contact form submission
- [ ] Verify meta tags and SEO info
- [ ] Confirm all links work (Instagram, WhatsApp, etc.)

---

## Current Setup

Your site is deployed on **Cloudflare Pages** with domain `saintstouch.photography`.

### What's Already Connected
- GitHub repository (auto-deploy on push)
- Build command: `npm run build`
- Publish directory: `dist/`
- Node version: v20.11.0 (set in `.nvmrc`)

---

## Deploy to Production

### Option 1: Push to GitHub (Recommended)
```bash
# 1. Make sure everything works locally
npm run dev
# Test the site, then stop (Ctrl+C)

# 2. Build for production
npm run build

# 3. Commit changes
git add .
git commit -m "Upgrade to Astro v2.0"

# 4. Push to GitHub
git push origin main

# ✅ Cloudflare auto-deploys within 2-3 minutes
# Check: https://dash.cloudflare.com/
```

### Option 2: Manual Deploy with Wrangler
```bash
# 1. Install Wrangler (if not already)
npm install -g wrangler

# 2. Build
npm run build

# 3. Deploy directly to Cloudflare Pages
wrangler pages deploy dist/

# ✅ Site updates immediately
```

---

## Post-Deployment Checks

After deploying, verify:

1. **Visit your site:** https://saintstouch.photography
2. **Check hero image loads** (should see your hero photo)
3. **Test gallery filtering** (click Portrait, Events, etc.)
4. **Try lightbox** (click any gallery image)
5. **Test contact form** (submit and check email)
6. **Mobile test** (use DevTools or real phone)
7. **Google Analytics** (check G-J83PE63QCK is firing)

---

## Rollback (If Needed)

If something breaks, revert to the previous version:

```bash
# Check Cloudflare Pages deployment history
# https://dash.cloudflare.com/ → Pages → saintstouch.photography → Deployments

# Click the previous successful deployment to rollback
# Site reverts in ~10 seconds
```

---

## Performance Monitoring

Monitor your site performance:

1. **Lighthouse Score** (should be 95+)
   - https://web.dev/measure/
   - https://pagespeed.web.dev/

2. **Google Analytics**
   - Property: G-J83PE63QCK
   - Verify tracking fires on page load

3. **Cloudflare Analytics**
   - https://dash.cloudflare.com/
   - Check real user metrics

---

## Common Issues & Fixes

### Images Not Loading
**Cause:** Missing `images/` folder on deployment  
**Fix:** Ensure `images/` folder is in root (not in `src/`)

### Form Not Submitting
**Cause:** Wrong Formspree ID  
**Fix:** Update form `action` in `src/pages/index.astro`

### Styles Look Wrong
**Cause:** CSS didn't minify properly  
**Fix:** Clear Cloudflare cache:
```bash
# In Cloudflare dashboard:
# Pages → saintstouch.photography → Settings → Purge Cache
```

### Old Version Shows Up
**Cause:** Browser cache  
**Fix:** Hard refresh (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)

---

## Future Updates

When you update content:

1. **Edit `src/data/portfolio.ts`** (add/remove/reorder photos)
2. **Or edit `src/pages/index.astro`** (change text, sections)
3. **Run `npm run build`**
4. **`git push`** → Auto-deploys ✅

---

## Need to Update Content Without Coding?

If you want to update gallery items without touching files, consider:

1. **CMS Integration** (Contentful, Strapi, etc.)
   - Provides admin UI for portfolio updates
   - More complex setup, but easier for non-devs

2. **JSON Data File**
   - Keep portfolio data in `src/data/portfolio.json` instead of `.ts`
   - Edit the JSON file directly (still need `npm run build`)

3. **Hire a Developer**
   - Give them this Astro project
   - They can build an admin dashboard for you

For now, the TypeScript approach is simplest and most maintainable.

---

## Support

- **Astro Docs:** https://docs.astro.build/
- **Cloudflare Pages:** https://developers.cloudflare.com/pages/
- **Formspree:** https://formspree.io/

---

**Ready?** Run `npm run build` and `git push main` to go live! 🚀
