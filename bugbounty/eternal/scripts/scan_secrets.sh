#!/bin/bash
# ============================================================
# Eternal Bug Bounty — Secrets Scanning Script
# Scans JS files and any local code repos for leaked secrets
# ============================================================

BASE="$HOME/.openclaw/workspace/bugbounty/eternal/recon"
FINDINGS="$HOME/.openclaw/workspace/bugbounty/eternal/findings"
LOG="$HOME/.openclaw/workspace/bugbounty/eternal/logs/secrets-$(date +%Y%m%d-%H%M%S).log"

echo "============================================" | tee -a "$LOG"
echo " Eternal — Secrets Scan — $(date)" | tee -a "$LOG"
echo "============================================" | tee -a "$LOG"

# --------------------------------------------------------
# STEP 1: Download and scan JS files
# --------------------------------------------------------
echo "" | tee -a "$LOG"
echo "[*] Downloading JS files for secret scanning..." | tee -a "$LOG"

JS_DIR="$BASE/js/downloaded"
mkdir -p "$JS_DIR"

if [[ -s "$BASE/js/js_urls.txt" ]]; then
  COUNT=0
  while IFS= read -r jsurl; do
    FNAME=$(echo "$jsurl" | md5sum | cut -d' ' -f1).js
    curl -s "$jsurl" --max-time 10 -o "$JS_DIR/$FNAME" 2>/dev/null
    ((COUNT++))
    if (( COUNT % 10 == 0 )); then
      echo "  Downloaded $COUNT JS files..." | tee -a "$LOG"
    fi
    if (( COUNT >= 200 )); then
      echo "  [!] Cap reached (200 files) — stopping download" | tee -a "$LOG"
      break
    fi
  done < "$BASE/js/js_urls.txt"
  echo "[✓] Downloaded $COUNT JS files" | tee -a "$LOG"
else
  echo "[!] No JS URLs found — run recon.sh first" | tee -a "$LOG"
fi

# --------------------------------------------------------
# STEP 2: gitleaks on downloaded JS
# --------------------------------------------------------
echo "" | tee -a "$LOG"
echo "[*] Running gitleaks on JS files..." | tee -a "$LOG"

if command -v gitleaks &>/dev/null; then
  gitleaks detect \
    --source="$JS_DIR" \
    --report-format=json \
    --report-path="$FINDINGS/high/gitleaks_js.json" \
    --no-git \
    2>/dev/null
  
  LEAKS=$(jq length "$FINDINGS/high/gitleaks_js.json" 2>/dev/null || echo 0)
  echo "[✓] gitleaks JS findings: $LEAKS" | tee -a "$LOG"
  
  if (( LEAKS > 0 )); then
    echo "" | tee -a "$LOG"
    echo "[!!!] LEAKS FOUND — review: $FINDINGS/high/gitleaks_js.json" | tee -a "$LOG"
    jq -r '.[] | "  SECRET: \(.RuleID) in \(.File) — \(.Secret[0:40])..."' \
      "$FINDINGS/high/gitleaks_js.json" 2>/dev/null | tee -a "$LOG"
  fi
else
  echo "[!] gitleaks not found" | tee -a "$LOG"
fi

# --------------------------------------------------------
# STEP 3: trufflehog on JS files
# --------------------------------------------------------
echo "" | tee -a "$LOG"
echo "[*] Running trufflehog on JS files..." | tee -a "$LOG"

if command -v trufflehog &>/dev/null && [[ -d "$JS_DIR" ]]; then
  trufflehog filesystem "$JS_DIR" \
    --json \
    --no-update \
    2>/dev/null > "$FINDINGS/high/trufflehog_js.json"
  
  THLEAKS=$(grep -c '"SourceMetadata"' "$FINDINGS/high/trufflehog_js.json" 2>/dev/null || echo 0)
  echo "[✓] trufflehog JS findings: $THLEAKS" | tee -a "$LOG"
  
  if (( THLEAKS > 0 )); then
    echo "[!!!] LEAKS FOUND — review: $FINDINGS/high/trufflehog_js.json" | tee -a "$LOG"
  fi
fi

# --------------------------------------------------------
# STEP 4: Manual regex patterns on JS (bonus catch)
# --------------------------------------------------------
echo "" | tee -a "$LOG"
echo "[*] Running regex patterns on JS files..." | tee -a "$LOG"

REGEX_OUT="$FINDINGS/medium/regex_secrets.txt"
> "$REGEX_OUT"

PATTERNS=(
  "AKIA[0-9A-Z]{16}"                          # AWS Access Key
  "[0-9a-zA-Z/+]{40}"                          # AWS Secret (rough)
  "(?i)api[_-]?key['\"]?\s*[:=]\s*['\"][^'\"]{10,}" # Generic API key
  "(?i)secret[_-]?key['\"]?\s*[:=]\s*['\"][^'\"]{10,}" # Generic secret
  "(?i)password['\"]?\s*[:=]\s*['\"][^'\"]{6,}" # Password
  "(?i)bearer\s+[a-zA-Z0-9\-._~+/]+=*"        # Bearer token
  "eyJ[a-zA-Z0-9]{10,}"                         # JWT token
)

for f in "$JS_DIR"/*.js; do
  [[ -f "$f" ]] || continue
  for pattern in "${PATTERNS[@]}"; do
    grep -oP "$pattern" "$f" 2>/dev/null | while read -r match; do
      echo "FILE: $f | MATCH: $match" >> "$REGEX_OUT"
    done
  done
done

REGEX_COUNT=$(wc -l < "$REGEX_OUT" 2>/dev/null || echo 0)
echo "[✓] Regex pattern matches: $REGEX_COUNT" | tee -a "$LOG"

# --------------------------------------------------------
# SUMMARY
# --------------------------------------------------------
echo "" | tee -a "$LOG"
echo "============================================" | tee -a "$LOG"
echo " SECRETS SCAN COMPLETE — $(date)" | tee -a "$LOG"
echo "============================================" | tee -a "$LOG"
echo "" | tee -a "$LOG"
echo "📄 Reports:" | tee -a "$LOG"
echo "  gitleaks:  $FINDINGS/high/gitleaks_js.json" | tee -a "$LOG"
echo "  trufflehog: $FINDINGS/high/trufflehog_js.json" | tee -a "$LOG"
echo "  regex hits: $FINDINGS/medium/regex_secrets.txt" | tee -a "$LOG"
echo "" | tee -a "$LOG"
echo "⚠️  Validate any found secrets manually before reporting!" | tee -a "$LOG"
echo "⚠️  Only verify access (auth then immediately deauth)" | tee -a "$LOG"
