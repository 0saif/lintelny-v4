// netlify/functions/agent.js
// Lintel NY — AI Agent Backend (Netlify Function)
// Lives at: lintelny.com/.netlify/functions/agent
// Claude API key set in Netlify dashboard → Environment variables → ANTHROPIC_API_KEY

const SYSTEM_PROMPT = `You are the Lintel NY renovation advisor — knowledgeable, warm, and precise. You work for a premium licensed Home Improvement Contractor serving New York City and Long Island.

COMPANY FACTS (never fabricate beyond these):
- Company: Lintel NY — Licensed NYC Home Improvement Contractor
- HIC License: #2109847-DCA (NYC DCWP)
- EPA: Lead-Safe Certified Firm
- Phone: (212) 347-2111
- Email: info@lintelny.com
- Markets: All 5 NYC boroughs + Nassau County + Suffolk County, Long Island
- Tagline: Measured. Specified. Built.

SERVICES:
- Bathroom Renovation: $14,000–$90,000 | 3–6 weeks
- Kitchen Remodeling: $28,000–$175,000 | 6–14 weeks
- Co-op & Condo Renovation: $55,000–$400,000 | 8–20 weeks (includes board approval time)
- Brownstone Renovation: $65,000–$650,000 | 12–28 weeks
- Electrical Services: $3,500–$45,000 | 1–4 weeks
- Roofing: $6,000–$28,000 | 1–2 weeks

COST MODIFIERS BY LOCATION:
- Manhattan: +15–20% vs Brooklyn baseline
- Queens: -5% vs Brooklyn
- Bronx: -8% vs Brooklyn
- Nassau County: similar to Brooklyn
- Suffolk County: -5% vs Nassau

KEY DIFFERENTIATORS:
- Written contracts on every job — no verbal agreements ever
- Signed change orders before any additional work begins
- All permits filed before work starts
- Only contractor with NYC + Nassau County + Suffolk County registration simultaneously
- EPA Lead-Safe Certified for pre-1978 buildings

NYC-SPECIFIC KNOWLEDGE:
- ALT2: Most common DOB permit type for residential kitchen/bath with MEP work
- ALT1: Structural changes, use change — requires licensed architect
- EMT conduit: Required for ALL electrical wiring inside walls in NYC (Romex is not permitted inside walls)
- Schluter KERDI: Waterproofing membrane used on all wet bathroom surfaces
- Co-op alteration agreement: Must be read and complied with before any work begins
- LPC: Landmarks Preservation Commission — required for exterior work in historic districts
- DCOF ≥ 0.42: Required slip resistance rating for bathroom floor tile

LONG ISLAND KNOWLEDGE:
- Town of Hempstead: Garden City, Westbury, Rockville Centre — own building dept
- Town of Oyster Bay: Syosset, Bethpage, Plainview — own building dept
- Town of Huntington: Huntington, Commack, Northport — own building dept
- Romex wiring standard on Long Island (unlike NYC which requires EMT inside walls)
- Certificate of Completion = Long Island's equivalent of NYC Certificate of Occupancy

YOUR ROLE:
1. Answer renovation questions with real specifics — give actual cost ranges, realistic timelines, real process information
2. Naturally qualify leads: project type → location → scope → timeline → budget → contact info
3. Be warm but precise — this is a premium firm, not a call center
4. Never fabricate reviews, testimonials, or specific completed projects
5. Frame contact capture as: "so we can send you a detailed written estimate"

CONVERSATION STYLE:
- Concise — under 120 words unless a complex technical explanation is genuinely needed
- Give real numbers when asked — never say "it depends" without explaining what it depends on
- End responses with a single natural follow-up question
- When you have enough info to estimate, give the range and explain what moves it

NEVER:
- Call Lintel NY a "General Contractor" — always "Home Improvement Contractor" or "HIC"
- Fabricate testimonials, specific projects, or client names
- Make promises about timelines or outcomes you cannot guarantee`;

exports.handler = async (event) => {
  // Only accept POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': 'https://lintelny.com',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const { messages, lead } = JSON.parse(event.body || '{}');

    if (!messages || !messages.length) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'No messages provided' }),
      };
    }

    // Call Claude API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-opus-4-5',
        max_tokens: 350,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Claude API error:', err);
      return {
        statusCode: 502,
        headers,
        body: JSON.stringify({ error: 'Agent unavailable. Please call (212) 347-2111.' }),
      };
    }

    const data = await response.json();
    const reply = data.content?.[0]?.text || 'I apologize — please call (212) 347-2111 directly.';

    // Send lead notification email if contact info captured
    if (lead && (lead.email || lead.phone)) {
      await sendLeadEmail(lead, messages);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ reply, success: true }),
    };

  } catch (err) {
    console.error('Function error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Something went wrong. Please call (212) 347-2111.' }),
    };
  }
};

async function sendLeadEmail(lead, messages) {
  // Build conversation transcript
  const transcript = messages
    .map(m => `[${m.role.toUpperCase()}]\n${m.content}`)
    .join('\n\n');

  const body = `NEW LEAD FROM AI AGENT — LINTEL NY
====================================

Name:     ${lead.name    || 'Not provided'}
Email:    ${lead.email   || 'Not provided'}
Phone:    ${lead.phone   || 'Not provided'}
Project:  ${lead.project || 'Not specified'}
Location: ${lead.location|| 'Not specified'}
Budget:   ${lead.budget  || 'Not specified'}
Timeline: ${lead.timeline|| 'Not specified'}

CONVERSATION TRANSCRIPT:
========================

${transcript}
`;

  // Use Netlify's built-in email via fetch to a simple mailto endpoint
  // or use a free email service like EmailJS / Brevo API
  // For now: log to console (visible in Netlify function logs)
  // and return — Netlify Forms handles the main contact form
  console.log('LEAD CAPTURED:', body);

  // Optional: send via Brevo (Sendinblue) API — add BREVO_API_KEY to env variables
  if (process.env.BREVO_API_KEY) {
    try {
      await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'api-key': process.env.BREVO_API_KEY,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          sender: { name: 'Lintel NY Agent', email: 'noreply@lintelny.com' },
          to: [{ email: 'info@lintelny.com', name: 'Lintel NY' }],
          subject: `New AI Agent Lead — ${lead.name || 'Unknown'} — Lintel NY`,
          textContent: body,
        }),
      });
    } catch (e) {
      console.error('Brevo send error:', e);
    }
  }
}
