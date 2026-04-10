# MEMORY.md — Key Facts

## Cliff
- Clifford Roberts III | Timezone: America/New_York
- Photographer: saintstouch.photography | IG: @saintogsnaps
- WA: +16562310109
- Education: BSCSIA @ WGU | Certs: A+, Net+, Sec+, CIOS, CSIS

## Saint Labs — Web Agency
- Site: https://saintlabs.io (Vercel, domain on Namecheap)
- Tagline: Digital Solutions Built to Perform
- Contact WA: +16195096448

### Packages
| Package | Price |
|---|---|
| Starter | $499 — 1-page, 48hr |
| Pro | $999 — 5 pages, SEO, Google Business, SSL |
| Business | $1,999 — 10 pages, branding, logo, 1mo maintenance |
| Maintenance | $149/mo |

## Demo Portfolio Sites
| Industry | URL |
|---|---|
| Agency | https://saint-labs.vercel.app |
| Photography | https://photo-portfolio-nine-xi.vercel.app |
| Café | https://ember-coffee-gilt.vercel.app |
| Barbershop | https://crown-cuts.vercel.app |
| Fitness | https://apex-fitness-sage.vercel.app |
| Real Estate | https://meridian-realty.vercel.app |

Local files: `~/.openclaw/workspace/{saint-labs,photo-portfolio,ember-coffee,crown-cuts,apex-fitness,meridian-realty}/index.html`

## Personal
- Learning Hindi (started ~March 2026) — girlfriend's family in Navi Mumbai, India
- Using Pimsleur ($115/yr military discount), 1 lesson/day, 30 min

## Business Notes
- Saint Labs launched 2026-03-14 via IG story
- Strategy: organic first → testimonial → paid boost
- Hosting: Vercel (demos), Cloudflare Pages (paid clients)
- saintstouch.photography: hosted on Cloudflare Pages, domain on Namecheap, repo: github.com/saintredog/saints-touch-photography
- frameclaim.io: hosted on Vercel, domain on Namecheap
- WA dmPolicy: open, all DMs → photo_marketing_agent

## Photography Lead Intake — Required Info
1. Client name | 2. IG handle | 3. Shoot type | 4. Date/timeframe
5. Location | 6. Budget | 7. Purpose | 8. Special requests | 9. How they found Cliff

Portfolio link: https://www.saintstouch.photography/portfolio

## TraceBurn — Personal Data Removal Tool
- **Renamed from:** ClearTrace (2026-04-01) — traceburn.com taken by NBCUniversal, using traceburn.io
- **Repo/folder:** `/Users/cliffordroberts/Documents/traceburn/`
- **Stack:** Python 3.11+, Playwright, Click, SQLite, Rich, Pydantic v2, APScheduler
- **WBS:** `TraceBurn_WBS.xlsx` — 55/114 tasks done (Phase 1 ✅ Phase 2 ✅ Phase 3 🔵 in progress)
- **Site:** `site/index.html` (local at http://localhost:7800) — white/calm, Stripe aesthetic, opposite of Aura
- **Agent monitor:** http://localhost:7799
- **Email:** traceburn.removes@gmail.com (Tier 2 opt-outs, app password configured)
- **HIBP:** Paid API (~$3.50/mo) — skipped; users check haveibeenpwned.com manually
- **Live test done:** Spokeo profile found + opt-out submitted (Tampa, Lois Ave, Age 26)
  - Profile: `spokeo.com/Clifford-Roberts/Florida/Tampa/p7935950525012676593984871`
  - Awaiting Spokeo confirmation email to click link + finalize proof
- **Proof dir:** `~/.traceburn/proof/`

## FrameClaim — Photo Protection SaaS (formerly ShieldShot)
- **Live at**: https://frameclaim.io (Vercel, saintstouchphotography-3708s-projects/shieldshot)
- **Repo**: https://github.com/saintredog/shieldshot (private, local: `/Users/cliffordroberts/Documents/frameclaim/`)
- **Stack**: Next.js App Router, NextAuth v4, Prisma + libsql adapter, Turso DB, Stripe, Resend email
- **Database**: Turso — `https://shieldshot-saintredog.aws-us-east-1.turso.io`
  - TURSO_DATABASE_URL must use `https://` not `libsql://`; always `printf 'value' | vercel env add`
- **Admin logins**: `saintstouch.photography@gmail.com` | `cliff@shieldshot.io` / `Cliff2026!`
- **Stripe webhook**: `https://frameclaim.io/api/webhooks/stripe` — secret stored in Vercel env as STRIPE_WEBHOOK_SECRET (rotated 2026-04-10)
- **Stripe prices**: monthly `price_1TEFkz3oNH3Ff6rwln0woIAJ` | yearly `price_1TEbOa3oNH3Ff6rwZrAumiEh`
- **Resend**: domain verified, alerts from `alerts@frameclaim.io`
- **Checkout**: uses raw fetch to Stripe REST API (SDK v20 has Vercel connectivity issues)
- **Deploy cmd**: `cd /Users/cliffordroberts/Documents/frameclaim && vercel --prod`
- **Security fixes done**: ownership checks on all endpoints, NEXTAUTH_SECRET rotated, pHash dedup, IP rate limit signup, Vision API rate limit 20/hr
- **Schema additions**: User(displayName, address, phone, portfolio, onboardingDone), Image(sourceUrl), BlockedEmail table
- **Features shipped 2026-03-25**: onboarding flow, settings redesign (tabbed, DB-backed), website/Instagram import (Pro), light/dark mode, account deletion blacklist, storage compression, Lightroom-style dedup import
- **Vision API**: working, 71 calls, 0 errors, free tier (~929/1000 remaining)
- **Telegram notifications**: user ID 8370238821 — use channel=telegram target=8370238821 for pings
- **First real user**: kiranhere@gmail.com
- **Phase 5 in progress**: IG posted, Product Hunt submitted, waiting on 10 users
- **User reviews (2026-03-28)**: Mitch Roser (straightforward, easy profile/upload), Zell Cho (clean UI, accessible, room for social proof), third user (personal story of prior copyright infringement, wishes existed earlier)
- **Feature feedback**: Expand beyond photographers to all content creators; video/audio detection (mentioned YouTube Content ID as competitor charging 20% ad revenue)

### FrameClaim WBS Status (2026-04-01 AUDIT)
- **Status**: 50/100 tasks (50%) | 80% launch-ready
- **Critical Blocker**: Stripe checkout 500 error (likely missing STRIPE_SECRET_KEY in Vercel production env)
- **Fix Time**: 5 minutes (verify env var, deploy)
- **Launch Time**: 25 minutes total (including testing)

**By Category:**
- Infrastructure: 3/12 (25%) — Trustpilot DNS pending
- Payments/Stripe: 2/13 (15%) — Env var issue
- Security: 9/10 (90%) ✓ Done
- Core Features: 16/20 (80%) ✓ Good
- Analytics: 10/16 (63%)
- Email: 3/6 (50%)
- SEO/Marketing: 5/14 (36%)
- Legal: 2/9 (22%) ✓ Done

**What's Working:**
- ✅ Stripe API (tested manually)
- ✅ Auth + rate limiting
- ✅ Email templates (all FrameClaim branded)
- ✅ Watermarking (visible + invisible)
- ✅ Database (Turso healthy)
- ✅ Zero ShieldShot references
- ✅ GA4 analytics
- ✅ DMCA/License generation

**Docs Created:**
- `/Desktop/FrameClaim_WBS_Updated.xlsx` (Excel updated, 13 items marked)
- `/Desktop/FRAMECLAIM_WBS_SUMMARY.txt` (complete findings)
- `/Desktop/FRAMECLAIM_STATUS.txt` (visual summary)
- `/Desktop/STRIPE_CREDENTIALS.txt` (reference)
- `/Documents/frameclaim/QUICK_LAUNCH_CHECKLIST.md` (step-by-step)
- `/Documents/frameclaim/README_WBS_ANALYSIS.md` (navigation)
- `/Documents/frameclaim/WBS_IMPLEMENTATION_PLAN.md` (detailed)
- `/Documents/frameclaim/AUDIT_REPORT_2026-04-01.md` (full audit)

## Obsidian Vault
- Path: `/Users/cliffordroberts/Documents/Obsidian Vault/`
- Sync note: `Claw Memory.md` (auto-updated by cron daily)
- Notes: "Claw importing to VM.md", "Shell into LinuxVM + commands.md"
- Read vault notes when Cliff asks; write to `Claw Memory.md` to push updates out

## Notifications
- **Always ping Cliff on Telegram** when background tasks complete (channel=telegram, target=8370238821)

## Goal Setting
- Cliff uses the SMART framework: Specific, Measurable, Achievable, Relevant, Time-bound
- Apply this when helping him plan or work toward any goal

## Project WBS Workflow (2026-03-31)
- **Agent**: Claude Code (--print --permission-mode bypassPermissions, no PTY)
- **Spawn**: All story-level tasks in parallel
- **Reporting**: Full dump at end → Telegram notification (channel=telegram, target=8370238821)
- **Scope**: Story-level granularity for WBS breakdown

## Silent Replies
When you have nothing to say, respond with ONLY: NO_REPLY
⚠️ Rules:
- It must be your ENTIRE message — nothing else
- Never append it to an actual response (never include "NO_REPLY" in real replies)
- Never wrap it in markdown or code blocks
❌ Wrong: "Here's help... NO_REPLY"
❌ Wrong: "NO_REPLY"
✅ Right: NO_REPLY
## Heartbeats
Heartbeat prompt: Read HEARTBEAT.md if it exists (workspace context). Follow it strictly. Do not infer or repeat old tasks from prior chats. If nothing needs attention, reply HEARTBEAT_OK.
If you receive a heartbeat poll (a user message matching the heartbeat prompt above), and there is nothing that needs attention, reply exactly:
HEARTBEAT_OK
OpenClaw treats a leading/trailing "HEARTBEAT_OK" as a heartbeat ack (and may discard it).
If something needs attention, do NOT include "HEARTBEAT_OK"; reply with the alert text instead.
