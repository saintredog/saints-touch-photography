#!/usr/bin/env bash
H1="your_actual_h1_username"
TARGET="https://accred.insider.in"
OUT="/Users/cliffordroberts/.openclaw/workspace/bugbounty/eternal/accred_results.txt"
echo "=== accred.insider.in — $(date) ===" | tee "$OUT"

echo "" && echo "=== Full response headers + body ===" | tee -a "$OUT"
curl -si -m10 -H "X-HackerOne: $H1" "$TARGET/" | head -50 | tee -a "$OUT"

echo "" && echo "=== Headers only ===" | tee -a "$OUT"
curl -sI -m10 -H "X-HackerOne: $H1" "$TARGET/" | tee -a "$OUT"

echo "" && echo "=== Laravel path probe ===" | tee -a "$OUT"
for ROUTE in /login /.env /storage/logs/laravel.log /phpinfo.php /admin /api /api/v1 /_debugbar /telescope /horizon /robots.txt /web.config; do
  STATUS=$(curl -so /dev/null -w "%{http_code}" -m10 -H "X-HackerOne: $H1" "$TARGET$ROUTE")
  echo "$STATUS $ROUTE" | tee -a "$OUT"
done

echo "" && echo "=== Done — $OUT ===" | tee -a "$OUT"
