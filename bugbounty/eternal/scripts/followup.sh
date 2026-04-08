#!/bin/bash
H1_USER="your_actual_h1_username"
HEADER="X-HackerOne: $H1_USER"
OUT="/Users/cliffordroberts/.openclaw/workspace/bugbounty/eternal/followup_results.txt"
echo "=== Follow-up — $(date) ===" | tee "$OUT"

echo ""
echo "=== [1] S3 curl-based check (no aws CLI needed) ===" | tee -a "$OUT"
for b in zomato-prod zomato-staging zomato-dev zomato-backup zomato-logs zomato-data \
         hyperpure-prod hyperpure-staging hyperpure-backup \
         grofers-prod grofers-staging grofers-backup \
         runnr-prod runnr-staging runnr-backup \
         zomato-images zomato-uploads zomato-exports zomato-reports \
         blinkit-prod blinkit-staging blinkit-data blinkit-uploads; do
  CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 6 "https://${b}.s3.amazonaws.com/")
  case $CODE in
    200) echo "PUBLIC LIST: $b" | tee -a "$OUT" ;;
    403) echo "EXISTS (locked 403): $b" | tee -a "$OUT" ;;
    404) echo "not found: $b" | tee -a "$OUT" ;;
    *)   echo "other ($CODE): $b" | tee -a "$OUT" ;;
  esac
done

echo ""
echo "=== [2] securitywebhook.zomans.com probe ===" | tee -a "$OUT"
echo "--- POST test ---" | tee -a "$OUT"
curl -si -H "$HEADER" -X POST -H "Content-Type: application/json" -d '{"test":"ping"}' "https://securitywebhook.zomans.com/" | head -20 | tee -a "$OUT"

echo ""
echo "--- Path exploration ---" | tee -a "$OUT"
for path in / /health /status /webhook /api /events /alerts; do
  CODE=$(curl -sk -o /dev/null -w "%{http_code}" -H "$HEADER" "https://securitywebhook.zomans.com$path")
  echo "$CODE  $path" | tee -a "$OUT"
done

echo ""
echo "=== [3] Redash commit check ===" | tee -a "$OUT"
cd /tmp && rm -rf zomato-redash
git clone https://github.com/Zomato/redash.git zomato-redash 2>&1 | tail -3 | tee -a "$OUT"
cd /tmp/zomato-redash && git show 090b570a | grep -iE "(password|secret|key|token|aws|AKIA|database_url|redis)" | head -30 | tee -a "$OUT"

echo ""
echo "=== Done. Results saved to $OUT ==="
