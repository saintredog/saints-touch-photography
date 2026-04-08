# Eternal Bug Bounty — Findings Tracker

**Program:** Eternal (Zomato/Blinkit/Hyperpure/District) on HackerOne  
**Active Campaign:** Cloud Infrastructure Security — **1.5x multiplier** (7 days remaining)  
**Platform:** HackerOne  
**Test Header:** `X-Hackerone: <your_h1_username>` (add to all requests)

---

## 🎯 Campaign Focus (Cloud — 1.5x)
- [ ] Subdomain takeovers
- [ ] Public S3 buckets
- [ ] Leaked AWS keys / API tokens in JS or GitHub
- [ ] Public AMIs / EBS / RDS snapshots
- [ ] SSRF → IMDS (169.254.169.254)
- [ ] Unauthorized writes (S3 PutObject, open SQS, etc.)

---

## 📊 Findings

| # | Asset | Type | Severity | Status | Bounty Est. | H1 Report # |
|---|-------|------|----------|--------|-------------|-------------|
| - | - | - | - | - | - | - |

---

## 📁 Recon Output
- Subdomains: `recon/subdomains/all.txt`
- Live hosts: `recon/alive/live_hosts.txt`
- Takeovers: `recon/alive/takeovers.txt`
- S3 hits: `recon/cloud/s3_buckets.txt`
- Nuclei: `recon/cloud/nuclei_cloud.txt`
- JS files: `recon/js/js_urls.txt`
- Secrets: `findings/high/gitleaks_js.json`

---

## 📝 Notes

### Bounty Tiers (with 1.5x campaign multiplier)
| Severity | CVSS | Normal | **Campaign 1.5x** |
|----------|------|--------|-------------------|
| Critical | 10.0 | $4,000 | **$6,000** |
| Critical | 9.5  | $3,000 | **$4,500** |
| High     | 8.x  | ~$2,000| **~$3,000** |
| Medium   | 5.x  | ~$650  | **~$975** |

### Rules Reminders
- Add header: `X-Hackerone: <username>` to all test requests
- Leaked creds: verify by auth + immediate deauth ONLY
- No automated stress testing
- Out of scope: Google Maps API keys, rate limiting, DoS

---

## 🔗 Resources
- Program: https://hackerone.com/eternal
- Contact: bugbounty@eternal.com
- Scope questions: submit a report + self-close after answer
