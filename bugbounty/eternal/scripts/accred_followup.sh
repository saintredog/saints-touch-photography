#!/usr/bin/env bash
H1="your_actual_h1_username"
TARGET="https://accred.insider.in"
OUT="/Users/cliffordroberts/.openclaw/workspace/bugbounty/eternal/accred_followup_results.txt"
echo "=== accred follow-up — $(date) ===" | tee "$OUT"

echo "" && echo "=== robots.txt ===" | tee -a "$OUT"
curl -s -m10 -H "X-HackerOne: $H1" "$TARGET/robots.txt" | tee -a "$OUT"

echo "" && echo "=== telescope redirect target ===" | tee -a "$OUT"
curl -sI -m10 -H "X-HackerOne: $H1" "$TARGET/telescope" | grep -i location | tee -a "$OUT"

echo "" && echo "=== horizon redirect target ===" | tee -a "$OUT"
curl -sI -m10 -H "X-HackerOne: $H1" "$TARGET/horizon" | grep -i location | tee -a "$OUT"

echo "" && echo "=== _debugbar redirect target ===" | tee -a "$OUT"
curl -sI -m10 -H "X-HackerOne: $H1" "$TARGET/_debugbar" | grep -i location | tee -a "$OUT"

echo "" && echo "=== telescope/requests follow redirect ===" | tee -a "$OUT"
curl -si -m10 -L -H "X-HackerOne: $H1" "$TARGET/telescope/requests" | head -30 | tee -a "$OUT"

echo "" && echo "=== HTTP direct (no TLS redirect) ===" | tee -a "$OUT"
curl -si -m10 -H "X-HackerOne: $H1" "http://accred.insider.in/login" | head -30 | tee -a "$OUT"

echo "" && echo "=== .env alternate methods ===" | tee -a "$OUT"
curl -so /dev/null -w "%{http_code}" -m10 -X POST -H "X-HackerOne: $H1" "$TARGET/.env" | tee -a "$OUT"
echo " POST /.env" | tee -a "$OUT"
curl -so /dev/null -w "%{http_code}" -m10 -H "X-HackerOne: $H1" -H "X-Original-URL: /.env" "$TARGET/" | tee -a "$OUT"
echo " X-Original-URL: /.env" | tee -a "$OUT"

echo "" && echo "=== Done — $OUT ===" | tee -a "$OUT"
