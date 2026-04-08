#!/bin/bash
H1_USER="your_actual_h1_username"
HEADER="X-HackerOne: $H1_USER"
OUT="/Users/cliffordroberts/.openclaw/workspace/bugbounty/eternal/probe_results.txt"

TARGETS=(
  "atlantis.zomans.com"
  "airflow.zomans.com"
  "stag-airflow.zomans.com"
  "jupyterlab.zomans.com"
  "consul.zomans.com"
  "secretx.zomans.com"
  "crawler.secretx.zomans.com"
  "rancher.zomans.com"
  "redash.zomans.com"
  "kibana.zomans.com"
  "stg-kibana.zomans.com"
  "grafana.zomans.com"
  "grafana-int.zomans.com"
  "grafana-test.zomans.com"
  "jenkins.zomans.com"
  "android-jenkins.zomans.com"
  "prometheus.zomans.com"
  "phab.zomans.com"
  "amundsen.zomans.com"
  "hrms.zomans.com"
  "hr.zomans.com"
  "fi-admin.zomans.com"
  "mfin.zomans.com"
  "dbanalytics.zomans.com"
  "dkron.zomans.com"
  "artifacts.zomans.com"
  "sentry.zomans.com"
  "sentryinternal.zomans.com"
  "sentrytest.zomans.com"
  "observability.zomans.com"
)

echo "=== Auth Probe — $(date) ===" | tee "$OUT"

for host in "${TARGETS[@]}"; do
  RESULT=$(curl -sk -o /dev/null -w "%{http_code}" -H "$HEADER" --max-time 8 "https://$host/")

  case $RESULT in
    200)       FLAG="OPEN (200)" ;;
    301|302)   FLAG="REDIRECT ($RESULT)" ;;
    401)       FLAG="AUTH REQUIRED (401)" ;;
    403)       FLAG="FORBIDDEN (403)" ;;
    404)       FLAG="NOT FOUND (404)" ;;
    000)       FLAG="NO RESPONSE / DNS" ;;
    *)         FLAG="OTHER: $RESULT" ;;
  esac

  echo "$FLAG  —  $host" | tee -a "$OUT"
done

echo ""
echo "=== Checking Airflow /api/v1/connections ===" | tee -a "$OUT"
curl -sk -H "$HEADER" "https://airflow.zomans.com/api/v1/connections" | python3 -m json.tool 2>/dev/null | head -30 | tee -a "$OUT"

echo ""
echo "=== Checking Consul /v1/kv/?recurse ===" | tee -a "$OUT"
curl -sk -H "$HEADER" "https://consul.zomans.com/v1/kv/?recurse" | python3 -m json.tool 2>/dev/null | head -20 | tee -a "$OUT"

echo ""
echo "=== Checking Prometheus /api/v1/targets ===" | tee -a "$OUT"
curl -sk -H "$HEADER" "https://prometheus.zomans.com/api/v1/targets" | python3 -m json.tool 2>/dev/null | head -20 | tee -a "$OUT"

echo ""
echo "=== Done. Results saved to $OUT ==="
