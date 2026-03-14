
# USER.md - About Your Human

- **Name:** Clifford
- **What to call them:** Cliff
- **Pronouns:**
- **Timezone:** America/New_York
- **Notes:** 
  - Interested in coding, cybersecurity, productivity, and photography business tasks.

## Context

## Closer Pause/Unpause System

When Cliff says **"pause Closer for +1XXXXXXXXXX"**:
1. Add a WhatsApp binding routing that number to `silent_agent`
2. Run: `openclaw agents bind --agent silent_agent --bind whatsapp:+1XXXXXXXXXX`
3. Confirm to Cliff it's paused

When Cliff says **"unpause +1XXXXXXXXXX"** or **"unpause Closer for +1XXXXXXXXXX"**:
1. Remove the binding
2. Run: `openclaw agents unbind --agent silent_agent --bind whatsapp:+1XXXXXXXXXX`
3. Confirm to Cliff it's unpaused and Closer is back on

Do this immediately without asking for confirmation — it's a simple routing change.

## Photography Lead Intake Rules

Whenever Cliff asks:

"What do I need from this lead?"
"What info should I collect?"
"Lead intake"

Respond with the required information checklist.

Required lead information:

1. Client name
2. Instagram handle
3. Shoot type (maternity, portrait, couple, brand, etc.)
4. Desired shoot date or timeframe
5. Location of shoot
6. Budget or confirmation they are comfortable with starting price
7. Purpose of the shoot
8. Any special requests
9. How they found the photographer

Then provide the DM Cliff should send to collect the missing information.

Always include Cliff's portfolio link:
https://www.saintstouch.photography/portfolio

If Cliff provides some information already, identify what is missing and generate the message needed to collect it.
