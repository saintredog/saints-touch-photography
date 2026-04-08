#!/bin/bash
H1_USER="your_actual_h1_username"
HEADER="X-HackerOne: $H1_USER"
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
OUT="/Users/cliffordroberts/.openclaw/workspace/bugbounty/eternal/reports_probe_results.txt"
echo "=== Reports Probe — $(date) ===" | tee "$OUT"

echo "" && echo "=== reports.grofer.io ===" | tee -a "$OUT"
curl -skLA "$UA" -H "$HEADER" "https://reports.grofer.io/" | head -60 | tee -a "$OUT"

echo "" && echo "=== reports.grofer.io — path probe ===" | tee -a "$OUT"
for path in / /api /api/v1 /reports /queries /health /status /login /dashboard /admin; do
  CODE=$(curl -skLA "$UA" -H "$HEADER" -o /dev/null -w "%{http_code}" --max-time 6 "https://reports.grofer.io$path")
  echo "$CODE  $path" | tee -a "$OUT"
done

echo "" && echo "=== EEAM /status ===" | tee -a "$OUT"
curl -skLA "$UA" -H "$HEADER" "https://external-signup.zomans.com/status" | head -30 | tee -a "$OUT"

echo "" && echo "=== EEAM /robots.txt ===" | tee -a "$OUT"
curl -skLA "$UA" -H "$HEADER" "https://external-signup.zomans.com/robots.txt" | tee -a "$OUT"

echo "" && echo "=== EEAM /access/appeal ===" | tee -a "$OUT"
curl -skLA "$UA" -H "$HEADER" "https://external-signup.zomans.com/access/appeal" | grep -iE '<title>|<h1>|<h2>|form|action|input|error' | head -20 | tee -a "$OUT"

echo "" && echo "=== Done — $OUT ===" | tee -a "$OUT"
