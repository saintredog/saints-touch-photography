#!/bin/bash
H1_USER="YOUR_H1_USERNAME"
HEADER="X-HackerOne: $H1_USER"

echo "=== [1] Sentry DSN Liveness ==="
curl -si -H "$HEADER" "https://sentry.zomans.com/api/20/store/" -o /dev/null -w "HTTP %{http_code}\n"

echo ""
echo "=== [2] artifacts.zomans.com fingerprint ==="
curl -si -H "$HEADER" https://artifacts.zomans.com | grep -iE "server:|x-powered-by:|www-authenticate:|location:"

echo ""
echo "=== [3] S3 Bucket Check ==="
BUCKETS=(
  zomato-logs zomato-internal zomato-public zomato-analytics
  zomato-backup zomato-prod zomato-staging zomato-dev
  zomato-assets zomato-cdn zomato-media zomato-uploads
  zomato-config zomato-secrets zomato-data zomato-db
  blinkit blinkit-logs blinkit-assets blinkit-prod blinkit-backup
  runnr-logs runnr-assets runnr-prod
  eternal-logs eternal-backup eternal-config eternal-data
  hyperpure-logs hyperpure-backup
)
for b in "${BUCKETS[@]}"; do
  RESULT=$(aws s3 ls "s3://$b" --no-sign-request 2>&1)
  if echo "$RESULT" | grep -q "AccessDenied"; then
    echo "EXISTS (locked): $b"
  elif echo "$RESULT" | grep -q "NoSuchBucket"; then
    echo "not found: $b"
  else
    echo "ACCESSIBLE: $b"
    echo "$RESULT" | head -5
  fi
done

echo ""
echo "=== [4] api.runnr.in dashboard endpoint ==="
curl -si -H "$HEADER" "https://api.runnr.in/zgw/dashboard/v1/menu" | head -20

echo ""
echo "=== [5] ops.runnr.in/admin headers ==="
curl -si -H "$HEADER" "https://ops.runnr.in/admin" | grep -iE "set-cookie:|server:|location:|www-authenticate:"
