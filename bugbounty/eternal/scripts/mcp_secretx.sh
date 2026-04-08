#!/bin/bash
H1_USER="your_actual_h1_username"
HEADER="X-HackerOne: $H1_USER"
UA="Mozilla/5.0 (Macintosh)"
OUT="/Users/cliffordroberts/.openclaw/workspace/bugbounty/eternal/mcp_secretx_results.txt"
echo "=== MCP + SecretX Probe — $(date) ===" | tee "$OUT"

echo "" && echo "=== mcp-server.zomato.com full headers ===" | tee -a "$OUT"
curl -si -H "$HEADER" -A "$UA" "https://mcp-server.zomato.com/mcp" | head -30 | tee -a "$OUT"

echo "" && echo "=== MCP path probe ===" | tee -a "$OUT"
for path in /mcp /mcp/v1 /mcp/tools /mcp/resources /sse /health /.well-known/mcp; do
  CODE=$(curl -sk -o /dev/null -w "%{http_code}" -H "$HEADER" -A "$UA" --max-time 6 "https://mcp-server.zomato.com$path")
  echo "$CODE  $path" | tee -a "$OUT"
done

echo "" && echo "=== secretx.zomans.com — full response ===" | tee -a "$OUT"
curl -skLA "$UA" -H "$HEADER" "https://secretx.zomans.com/" | head -60 | tee -a "$OUT"

echo "" && echo "=== secretx.zomans.com — headers ===" | tee -a "$OUT"
curl -siLA "$UA" -H "$HEADER" "https://secretx.zomans.com/" | grep -iE "set-cookie:|server:|x-powered-by:|location:|x-frame|content-security|strict-transport" | tee -a "$OUT"

echo "" && echo "=== secretx.zomans.com — path probe ===" | tee -a "$OUT"
for path in / /login /admin /api /api/v1 /health /status /secrets /keys /config /dashboard /robots.txt; do
  CODE=$(curl -skLA "$UA" -H "$HEADER" -o /dev/null -w "%{http_code}" --max-time 6 "https://secretx.zomans.com$path")
  echo "$CODE  $path" | tee -a "$OUT"
done

echo "" && echo "=== GitHub dorks notes ===" | tee -a "$OUT"
cat /Users/cliffordroberts/.openclaw/workspace/bugbounty/eternal/notes/github_dorks.txt 2>/dev/null || echo "File not found" | tee -a "$OUT"

echo "" && echo "=== Done — $OUT ===" | tee -a "$OUT"
