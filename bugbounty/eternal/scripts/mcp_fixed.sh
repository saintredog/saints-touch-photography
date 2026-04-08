#!/usr/bin/env bash
H1="your_actual_h1_username"
MCP="https://mcp-server.zomato.com"
GFR="https://reports.grofer.io"
OUT="/Users/cliffordroberts/.openclaw/workspace/bugbounty/eternal/mcp_fixed_results.txt"
echo "=== MCP Fixed Probe — $(date) ===" | tee "$OUT"

echo "" && echo "=== FastAPI docs probe ===" | tee -a "$OUT"
curl -so /dev/null -w "%{http_code} /docs\n"           -m10 -H "X-HackerOne: $H1" "$MCP/docs" | tee -a "$OUT"
curl -so /dev/null -w "%{http_code} /redoc\n"          -m10 -H "X-HackerOne: $H1" "$MCP/redoc" | tee -a "$OUT"
curl -so /dev/null -w "%{http_code} /openapi.json\n"   -m10 -H "X-HackerOne: $H1" "$MCP/openapi.json" | tee -a "$OUT"
curl -so /dev/null -w "%{http_code} /api/openapi.json\n" -m10 -H "X-HackerOne: $H1" "$MCP/api/openapi.json" | tee -a "$OUT"
curl -so /dev/null -w "%{http_code} /v1/openapi.json\n" -m10 -H "X-HackerOne: $H1" "$MCP/v1/openapi.json" | tee -a "$OUT"

echo "" && echo "=== /openapi.json body ===" | tee -a "$OUT"
curl -si -m10 -H "X-HackerOne: $H1" "$MCP/openapi.json" | tee -a "$OUT"

echo "" && echo "=== /docs body ===" | tee -a "$OUT"
curl -si -m10 -H "X-HackerOne: $H1" "$MCP/docs" | head -60 | tee -a "$OUT"

echo "" && echo "=== MCP POST /mcp ===" | tee -a "$OUT"
curl -si -m10 -H "X-HackerOne: $H1" -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"initialize","params":{"protocolVersion":"2024-11-05","clientInfo":{"name":"test","version":"1.0"}},"id":1}' "$MCP/mcp" | tee -a "$OUT"

echo "" && echo "=== reports.grofer.io content probe ===" | tee -a "$OUT"
for ROUTE in / /health /api /api/v1 /api/v1/queries /api/v1/dashboards /api/v1/data_sources; do
  echo "--- $ROUTE ---" | tee -a "$OUT"
  curl -si -m10 -H "X-HackerOne: $H1" -H "Accept: application/json" "$GFR$ROUTE" | head -40 | tee -a "$OUT"
  echo "" | tee -a "$OUT"
done

echo "" && echo "=== Done — $OUT ===" | tee -a "$OUT"
