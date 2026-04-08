#!/bin/bash
H1_USER="your_actual_h1_username"
HEADER="X-HackerOne: $H1_USER"
OUT="/Users/cliffordroberts/.openclaw/workspace/bugbounty/eternal/sentry_results.txt"
echo "=== Sentry DSN Verify — $(date) ===" | tee "$OUT"

echo ""
echo "=== [1] Sentry instance live check ===" | tee -a "$OUT"
curl -si -H "$HEADER" "https://sentry.zomans.com/" | head -10 | tee -a "$OUT"

echo ""
echo "=== [2] DSN project endpoint (400=live, 404=dead) ===" | tee -a "$OUT"
curl -si -H "$HEADER" "https://sentry.zomans.com/api/20/store/" | head -5 | tee -a "$OUT"

echo ""
echo "=== [3] Sentry API projects (unauthenticated) ===" | tee -a "$OUT"
curl -sk -H "$HEADER" "https://sentry.zomans.com/api/0/projects/" | python3 -m json.tool 2>/dev/null | head -20 | tee -a "$OUT"

echo ""
echo "=== Done. Results saved to $OUT ==="
