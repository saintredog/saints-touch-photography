#!/usr/bin/env bash
TARGET="https://mcp-server.zomato.com"
H1_USER="your_actual_h1_username"
OUT="/Users/cliffordroberts/.openclaw/workspace/bugbounty/eternal/mcp_deep.txt"
echo "=== mcp-server.zomato.com deep probe — $(date) ===" | tee "$OUT"

echo "" && echo "=== /health full body ===" | tee -a "$OUT"
curl -si -m 10 -H "X-HackerOne: $H1_USER" "${TARGET}/health" | tee -a "$OUT"

echo "" && echo "=== FastAPI auto-docs probe ===" | tee -a "$OUT"
for PATH in /docs /redoc /openapi.json /api/openapi.json /v1/openapi.json /mcp/openapi.json; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" -m 10 -H "X-HackerOne: $H1_USER" "${TARGET}${PATH}")
  echo "$STATUS $PATH" | tee -a "$OUT"
done

echo "" && echo "=== /openapi.json body ===" | tee -a "$OUT"
curl -si -m 10 -H "X-HackerOne: $H1_USER" "${TARGET}/openapi.json" | tee -a "$OUT"

echo "" && echo "=== /docs body ===" | tee -a "$OUT"
curl -si -m 10 -H "X-HackerOne: $H1_USER" "${TARGET}/docs" | head -60 | tee -a "$OUT"

echo "" && echo "=== MCP protocol probe POST /mcp ===" | tee -a "$OUT"
curl -si -m 10 -H "X-HackerOne: $H1_USER" -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"initialize","params":{"protocolVersion":"2024-11-05","clientInfo":{"name":"test","version":"1.0"}},"id":1}' "${TARGET}/mcp" | tee -a "$OUT"

echo "" && echo "=== grofer_reports content probe ===" | tee -a "$OUT"
for P in / /health /api /api/v1 /api/v1/queries /api/v1/dashboards /api/v1/data_sources; do
  echo "" | tee -a "$OUT"
  echo "--- $P ---" | tee -a "$OUT"
  curl -si -m 10 -H "X-HackerOne: $H1_USER" -H "Accept: application/json" "https://reports.grofer.io${P}" | head -40 | tee -a "$OUT"
done

echo "" && echo "=== Done — $OUT ===" | tee -a "$OUT"
