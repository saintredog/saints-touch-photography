#!/bin/bash
H1_USER="your_actual_h1_username"
HEADER="X-HackerOne: $H1_USER"
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
OUT="/Users/cliffordroberts/.openclaw/workspace/bugbounty/eternal/pivot_results.txt"
echo "=== Pivot Recon — $(date) ===" | tee "$OUT"

echo "" && echo "=== [1] Grofers Dashboard Cluster ===" | tee -a "$OUT"
GROFERS_TARGETS=(
  "redash-queries.grofers.com"
  "bidashboard.grofers.com"
  "merchandising.grofers.com"
  "obelix-dashboard.grofers.com"
  "obelix-react-ui.grofers.com"
  "searchdashboard.grofers.com"
  "logistics-queue.grofers.com"
  "logistics.grofers.com"
  "cms.grofers.com"
  "cmsapp.grofers.com"
  "internal.grofers.com"
  "vendorportal.grofers.com"
  "grafana.grofers.com"
  "data-catalog.grofer.io"
  "reports.grofer.io"
  "helpdesk.grofers.com"
)

for host in "${GROFERS_TARGETS[@]}"; do
  CODE=$(curl -skLA "$UA" -H "$HEADER" -o /dev/null -w "%{http_code}" --max-time 8 "https://$host/")
  TITLE=$(curl -skLA "$UA" -H "$HEADER" --max-time 8 "https://$host/" | grep -oP '(?<=<title>)[^<]+' | head -1)
  echo "$CODE  $host  [$TITLE]" | tee -a "$OUT"
done

echo "" && echo "--- Redash API check (unauthenticated queries) ---" | tee -a "$OUT"
curl -skLA "$UA" -H "$HEADER" "https://redash-queries.grofers.com/api/queries" | python3 -m json.tool 2>/dev/null | head -30 | tee -a "$OUT"

echo "" && echo "=== [2] EEAM — external-signup.zomans.com ===" | tee -a "$OUT"

echo "--- /access endpoint ---" | tee -a "$OUT"
curl -skLA "$UA" -H "$HEADER" "https://external-signup.zomans.com/access" | grep -iE '<title>|<h1>|<h2>|action=|csrf|form' | head -20 | tee -a "$OUT"

echo "" && echo "--- Headers ---" | tee -a "$OUT"
curl -siLA "$UA" -H "$HEADER" "https://external-signup.zomans.com/access" | grep -iE "set-cookie:|x-powered-by:|server:|x-csrf|x-frame|content-security|strict-transport" | tee -a "$OUT"

echo "" && echo "--- Rails path probe ---" | tee -a "$OUT"
for path in /users /users/sign_in /users/sign_up /admin /admin/users /api/v1/users /health /status /robots.txt /rails/info/properties; do
  CODE=$(curl -skLA "$UA" -H "$HEADER" -o /dev/null -w "%{http_code}" --max-time 6 "https://external-signup.zomans.com$path")
  echo "$CODE  $path" | tee -a "$OUT"
done

echo "" && echo "=== Done — $OUT ===" | tee -a "$OUT"
