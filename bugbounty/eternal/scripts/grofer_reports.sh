#!/usr/bin/env bash
TARGET="https://reports.grofer.io"
H1_USER="your_actual_h1_username"
OUT="/Users/cliffordroberts/.openclaw/workspace/bugbounty/eternal/grofer_reports_results.txt"
echo "=== reports.grofer.io Content Probe — $(date) ===" | tee "$OUT"

for PATH in / /health /api /api/v1 /api/v1/queries /api/v1/dashboards /api/v1/data_sources; do
  echo "" | tee -a "$OUT"
  echo "--- $PATH ---" | tee -a "$OUT"
  curl -si -m 10 -H "X-HackerOne: $H1_USER" -H "Accept: application/json" "${TARGET}${PATH}" | head -40 | tee -a "$OUT"
done

echo "" && echo "=== Done — $OUT ===" | tee -a "$OUT"
