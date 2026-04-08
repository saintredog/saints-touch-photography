#!/bin/bash
H1_USER="your_actual_h1_username"
HEADER="X-HackerOne: $H1_USER"
OUT="/Users/cliffordroberts/.openclaw/workspace/bugbounty/eternal/js_secrets.txt"
JSDIR="/tmp/eternal_js"
mkdir -p "$JSDIR"
echo "=== JS Secret Scan — $(date) ===" | tee "$OUT"

TARGETS=(
  "https://www.zomato.com"
  "https://m.zomato.com"
  "https://web.runnr.in"
  "https://ops.runnr.in"
  "https://driver.runnr.in"
  "https://www.blinkit.com"
  "https://bistro.blinkit.com"
)

SECRET_REGEX='(AKIA[0-9A-Z]{16}|AIza[0-9A-Za-z_-]{35}|["'"'"']aws[_-]?(secret|key|token)["'"'"'\s]*[:=]\s*["'"'"'][A-Za-z0-9/+=]{20,}|sentry\.io/[0-9]+|dsn.*@|api[_-]?key\s*[:=]\s*["'"'"'][A-Za-z0-9_-]{20,}|secret[_-]?key\s*[:=]\s*["'"'"'][A-Za-z0-9_-]{20,}|access[_-]?token\s*[:=]\s*["'"'"'][A-Za-z0-9_-]{20,}|private[_-]?key|-----BEGIN|github[_-]?token|Authorization:\s*Bearer\s+[A-Za-z0-9._-]{20,})'

for TARGET in "${TARGETS[@]}"; do
  echo "" | tee -a "$OUT"
  echo "--- Scanning $TARGET ---" | tee -a "$OUT"

  HTML=$(curl -skL -H "$HEADER" --max-time 10 "$TARGET")
  JS_URLS=$(echo "$HTML" | grep -oE 'src="[^"]+\.js[^"]*"' | sed 's/src="//;s/"//' | grep -v 'node_modules')

  echo "$HTML" | grep -oE "$SECRET_REGEX" | while read -r match; do
    echo "  [INLINE HIT] $match" | tee -a "$OUT"
  done

  for JS_URL in $JS_URLS; do
    if [[ $JS_URL == //* ]]; then
      JS_URL="https:$JS_URL"
    elif [[ $JS_URL == /* ]]; then
      BASE=$(echo "$TARGET" | grep -oE 'https?://[^/]+')
      JS_URL="${BASE}${JS_URL}"
    elif [[ $JS_URL != http* ]]; then
      JS_URL="${TARGET}/${JS_URL}"
    fi

    FILENAME=$(echo "$JS_URL" | md5 | cut -c1-8).js
    curl -skL -H "$HEADER" --max-time 15 "$JS_URL" -o "$JSDIR/$FILENAME" 2>/dev/null

    HITS=$(grep -oE "$SECRET_REGEX" "$JSDIR/$FILENAME" 2>/dev/null)
    if [ -n "$HITS" ]; then
      echo "  [JS HIT] $JS_URL" | tee -a "$OUT"
      echo "$HITS" | head -10 | tee -a "$OUT"
    fi
  done
done

echo ""
echo "=== Scan complete. Results: $OUT ==="
