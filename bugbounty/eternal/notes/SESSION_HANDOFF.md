# Eternal Bug Bounty — Session Handoff
**Date:** 2026-03-17 | **Campaign ends:** ~7 days from now (1.5x cloud multiplier)
**Program:** HackerOne — Eternal (Zomato/Blinkit/Hyperpure/District)
**H1 Test header:** `X-Hackerone: <your_h1_username>` (add to all requests)

---

## ✅ Recon Completed
- **620 subdomains** enumerated across all targets
- Live hosts: `~/.openclaw/workspace/bugbounty/eternal/recon/alive/live_hosts.txt`
- Subdomains: `~/.openclaw/workspace/bugbounty/eternal/recon/subdomains/all.txt`

---

## 🔥 Findings So Far

### 1. Sentry DSN Exposed — SecretX Login Page (Tier 1)
- **URL:** `https://secretx.zomato.com/user/login`
- **DSN:** `https://7be111e718fe4717bb8984b7ba89a8b5@sentry.zomans.com/7`
- **Asset:** `*.zomato.com` (Tier 1)
- **Severity:** Low-Medium
- **Notes:** SecretX is Zomato's own internal secrets manager. DSN in public login page leaks internal Sentry host + project structure.

### 2. Sentry DSN Exposed — Main Zomato Login Page (Tier 1)
- **DSN:** `https://37075f740e4344f59ca5578e885c704f@sentry.zomans.com/20`
- **Asset:** `*.zomato.com` (Tier 1)
- **Source:** Found via GitHub — phishing repos copied the Zomato login page HTML including this DSN
- **Severity:** Low-Medium
- **Notes:** Same issue as above but for main Zomato app (project 20). Needs live verification on current login page.
- **TODO:** Verify DSN still present on live `https://www.zomato.com/login`

### 3. S3 Buckets — Confirmed Exist (403) — Not Publicly Readable
- Buckets confirmed to EXIST (403 = exists but blocked):
  `zomato`, `zomato-prod`, `zomato-dev`, `zomato-assets`, `zomato-images`,
  `zomato-data`, `zomato-logs`, `zomato-internal`, `zomato-public`,
  `zomato-analytics`, `blinkit`, `blinkit-data`, `blinkit-static`,
  `grofers`, `runnr-assets`, `eternal-prod`, `zomato-artifacts`
- **None are publicly readable** — all 403. Not a finding as-is.
- **TODO:** Try authenticated enumeration / check for public write (PutObject)

### 4. cert2/cert3.zomato.com — Public S3 (Not Sensitive)
- Both return 200 via Amazon S3/CloudFront
- Content: SSL pinning config JSON (`ssl_pinning: false`, cert SHA256 hashes)
- **Not a finding** — intentionally public

### 5. dashboard.runnr.in — Logistics Admin Dashboard (200)
- URL loads at 200 but API (`api.runnr.in/zgw/dashboard/v1/menu`) returns 401
- `ops.runnr.in/admin/login` — Rails admin, Google OAuth only
- **Not reportable without auth bypass**

### 6. external-signup.zomans.com — EEAM Portal
- "Eternal External Access Manager" — Ruby on Rails
- Public-facing signup/appeal form: `POST /access/appeal`
- Protected by Cloudflare Turnstile
- **TODO:** Test the appeal flow for logic issues/IDOR

### 7. artifacts.zomans.com — Internal Artifact Repo (401 Basic Auth)
- Consistent 401 on all attempts
- **Not accessible without creds**

---

## 🔍 Active Investigations / Next Steps

### PRIORITY 1 — GitHub Dorks (Still Running)
- `sentry.zomans.com` search: **many hits** — multiple Sentry DSNs from Zomato pages in GitHub
- Next dorks to run:
  ```
  https://github.com/search?q=sentry.zomans.com&type=code&s=indexed&o=desc
  https://github.com/search?q=grofers.com+secret&type=code
  https://github.com/search?q=hyperpure.com+api_key&type=code
  https://github.com/search?q=runnr.in+password&type=code
  https://github.com/search?q=zomato+AKIA+production&type=code
  https://github.com/search?q=blinkit+secret_key&type=code
  ```

### PRIORITY 2 — Verify DSN on Live Pages
```bash
curl -sk "https://www.zomato.com/login" | grep -o 'sentry[^"]*'
curl -sk "https://secretx.zomato.com/user/login" | grep -o 'sentry[^"]*'
```

### PRIORITY 3 — Accred.insider.in (Laravel PHP 7.2.34)
- URL: `https://accred.insider.in`
- Tech: Laravel, PHP 7.2.34 (end of life), jQuery 1.7.1
- Tier 2 asset (`*.insider.in`)
- **Try:** Laravel debug mode, CVE-2021-3129 (Laravel RCE via Ignition)

### PRIORITY 4 — book.zomato.com (ASP.NET)
- URL: `https://book.zomato.com`
- Tech: Microsoft ASP.NET, Bootstrap, Bootbox.js
- Tier 1 asset
- **Try:** ViewState deserialization, path traversal, exposed endpoints

### PRIORITY 5 — pod.hyperpure.com
- React SPA hosted on S3 — `devpod-v2.hyperpure.com` endpoint found in JS
- API endpoint base: `devpod-v2.hyperpure.com`
- **TODO:** Probe `devpod-v2.hyperpure.com` API endpoints

---

## 🗂️ File Locations
```
~/.openclaw/workspace/bugbounty/eternal/
├── recon/
│   ├── subdomains/all.txt          # 620 subdomains
│   ├── alive/live_hosts.txt        # All live hosts with tech stack
│   ├── alive/urls.txt              # Live URLs only
│   ├── cloud/s3_buckets.txt        # S3 scan results
│   └── js/pod-hyperpure/           # Downloaded JS bundles
├── scripts/
│   ├── recon.sh                    # Full recon automation
│   └── scan_secrets.sh             # JS secrets scanning
├── findings/
│   ├── high/
│   └── medium/
└── notes/
    ├── TRACKER.md                  # Findings tracker
    ├── github_dorks.txt            # All dork URLs
    └── SESSION_HANDOFF.md          # This file
```

---

## 💰 Bounty Estimates (with 1.5x campaign multiplier)
| Finding | Severity | Est. Bounty |
|---------|----------|-------------|
| Sentry DSN x2 exposed in prod pages | Low | $150-$225 each |
| Laravel RCE on accred.insider.in (if confirmed) | Critical | $6,000 |
| Any live S3 public read | High-Critical | $3,000-$6,000 |
| Leaked AWS key (verified active) | Critical | $6,000 |

---

## ⚠️ Rules Reminders
- Add `X-Hackerone: <username>` to all test requests
- Leaked creds: verify by auth + immediate deauth ONLY
- Report format prefix: `[Scattered Secrets Submission]` if credential-related
- Out of scope: DoS, rate limiting, Google Maps API keys, demo data
