/**
 * Lintel NY — Lead Capture System
 * File: js/lead-capture.js
 * Add to every page: <script src="/js/lead-capture.js" defer></script>
 *
 * Contains:
 * 1. Exit intent popup — triggers when cursor leaves viewport top
 * 2. Cost calculator email gate — intercepts result, requires email
 * 3. Mid-page lead magnet banners (injected on service pages)
 */

(function () {
  'use strict';

  // ── Netlify Forms submission helper ───────────────────────────────
  async function submitToNetlify(formName, data) {
    const body = new URLSearchParams({ 'form-name': formName, ...data });
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
    } catch (e) {
      console.warn('Form submission:', e);
    }
  }

  // ── CSS ───────────────────────────────────────────────────────────
  const css = `
    /* Exit intent overlay */
    #ln-exit-overlay {
      position:fixed;inset:0;background:rgba(23,23,23,.75);
      z-index:10000;display:none;align-items:center;justify-content:center;
      padding:20px;
    }
    #ln-exit-overlay.show { display:flex; }
    #ln-exit-box {
      background:#fff;border-radius:10px;overflow:hidden;
      max-width:480px;width:100%;position:relative;
    }
    #ln-exit-hdr {
      background:#171717;padding:24px 28px;border-bottom:3px solid #E85D2F;
    }
    .ln-ex-eyebrow {
      font-size:.7rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;
      color:#E85D2F;margin-bottom:6px;
    }
    .ln-ex-title {
      font-size:1.25rem;font-weight:700;color:#fff;
      font-family:'JetBrains Mono',monospace;line-height:1.25;
    }
    #ln-exit-body { padding:24px 28px; }
    .ln-ex-sub {
      font-size:.9375rem;color:#4B5563;line-height:1.65;margin-bottom:18px;
    }
    .ln-ex-input {
      width:100%;border:1.5px solid #D5D3CD;border-radius:5px;
      padding:11px 14px;font-family:'DM Sans',sans-serif;font-size:.9375rem;
      color:#171717;outline:none;box-sizing:border-box;margin-bottom:10px;
      transition:border-color .2s;
    }
    .ln-ex-input:focus { border-color:#E85D2F; }
    .ln-ex-btn {
      width:100%;background:#E85D2F;color:#fff;border:none;border-radius:5px;
      padding:13px;font-family:'DM Sans',sans-serif;font-size:.875rem;font-weight:700;
      letter-spacing:.08em;text-transform:uppercase;cursor:pointer;
      transition:background .2s;
    }
    .ln-ex-btn:hover { background:#C94D22; }
    .ln-ex-dismiss {
      text-align:center;margin-top:12px;font-size:.8125rem;color:#9A9690;
      cursor:pointer;text-decoration:underline;
    }
    #ln-exit-close {
      position:absolute;top:12px;right:14px;background:none;border:none;
      color:rgba(255,255,255,.4);font-size:18px;cursor:pointer;
      transition:color .2s;
    }
    #ln-exit-close:hover { color:#fff; }
    .ln-ex-success {
      text-align:center;padding:16px 0 4px;
    }
    .ln-ex-success h3 {
      font-size:1.1rem;font-weight:700;color:#171717;margin-bottom:6px;
    }
    .ln-ex-success p { font-size:.9rem;color:#6B7280; }

    /* Lead magnet banner (injected on service pages) */
    .ln-magnet {
      background:#1F3A5F;border-radius:8px;padding:24px 28px;
      display:flex;align-items:center;justify-content:space-between;
      gap:20px;margin:2rem 0;flex-wrap:wrap;
    }
    .ln-magnet-text h4 {
      font-family:'JetBrains Mono',monospace;font-size:1rem;font-weight:700;
      color:#fff;margin-bottom:4px;
    }
    .ln-magnet-text p { font-size:.875rem;color:rgba(255,255,255,.55);margin:0; }
    .ln-magnet-form { display:flex;gap:8px;flex-wrap:wrap;flex-shrink:0; }
    .ln-magnet-inp {
      border:1.5px solid rgba(255,255,255,.2);border-radius:5px;
      background:rgba(255,255,255,.08);color:#fff;
      font-family:'DM Sans',sans-serif;font-size:.875rem;
      padding:9px 13px;outline:none;transition:border-color .2s;
      width:200px;box-sizing:border-box;
    }
    .ln-magnet-inp::placeholder { color:rgba(255,255,255,.3); }
    .ln-magnet-inp:focus { border-color:#E85D2F; }
    .ln-magnet-btn {
      background:#E85D2F;border:none;border-radius:5px;color:#fff;
      font-family:'DM Sans',sans-serif;font-size:.8125rem;font-weight:700;
      letter-spacing:.08em;text-transform:uppercase;padding:9px 18px;
      cursor:pointer;transition:background .2s;white-space:nowrap;
    }
    .ln-magnet-btn:hover { background:#C94D22; }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ══════════════════════════════════════════════════════════════════
  // 1. EXIT INTENT POPUP
  // ══════════════════════════════════════════════════════════════════

  // Don't show if already seen this session, or if user came from contact page
  const exitKey = 'ln_exit_shown';
  const isContactPage = window.location.pathname.includes('/contact');

  if (!sessionStorage.getItem(exitKey) && !isContactPage) {

    // Build popup
    const overlay = document.createElement('div');
    overlay.id = 'ln-exit-overlay';
    overlay.innerHTML = `
      <div id="ln-exit-box">
        <button id="ln-exit-close" aria-label="Close">✕</button>
        <div id="ln-exit-hdr">
          <div class="ln-ex-eyebrow">Before you go</div>
          <div class="ln-ex-title">Get the 2026 NYC Renovation Cost Guide — Free</div>
        </div>
        <div id="ln-exit-body">
          <p class="ln-ex-sub">Room-by-room cost breakdowns, borough comparisons, what moves the price, and 10 questions to ask every contractor before you hire them.</p>
          <input class="ln-ex-input" type="email" id="ln-exit-email" placeholder="Your email address">
          <input class="ln-ex-input" type="text" id="ln-exit-name" placeholder="Your name (optional)">
          <button class="ln-ex-btn" id="ln-exit-submit">Send Me the Guide →</button>
          <p class="ln-ex-dismiss" id="ln-exit-dismiss">No thanks, I'll figure it out myself</p>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    // Trigger on mouse leaving top of viewport
    let triggered = false;
    document.addEventListener('mouseleave', (e) => {
      if (e.clientY < 5 && !triggered) {
        triggered = true;
        sessionStorage.setItem(exitKey, '1');
        overlay.classList.add('show');
      }
    });

    // Close
    document.getElementById('ln-exit-close').addEventListener('click', () => {
      overlay.classList.remove('show');
    });
    document.getElementById('ln-exit-dismiss').addEventListener('click', () => {
      overlay.classList.remove('show');
    });
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('show');
    });

    // Submit
    document.getElementById('ln-exit-submit').addEventListener('click', async () => {
      const email = document.getElementById('ln-exit-email').value.trim();
      const name  = document.getElementById('ln-exit-name').value.trim();

      if (!email || !email.includes('@')) {
        document.getElementById('ln-exit-email').focus();
        document.getElementById('ln-exit-email').style.borderColor = '#E85D2F';
        return;
      }

      await submitToNetlify('cost-guide-request', { email, name, source: 'exit-intent' });

      window.location.href = '/downloads/lintelny-nyc-cost-guide-2026.pdf';
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // 2. LEAD MAGNET BANNERS — injected on service pages
  // ══════════════════════════════════════════════════════════════════

  const MAGNETS = {
    '/services/bathroom-renovation-nyc': {
      title: 'NYC Bathroom Renovation Cost Guide 2026',
      sub: '12-page breakdown: scope, costs by borough, what moves the price, and red flags.',
      formName: 'bathroom-guide',
      placeholder: 'Email for the bathroom guide',
      pdf: '/downloads/lintelny-nyc-cost-guide-2026.pdf',
    },
    '/services/kitchen-remodeling-nyc': {
      title: 'NYC Kitchen Remodel Cost Guide 2026',
      sub: 'The five cost buckets, cabinetry tiers, permit requirements, and sequencing guide.',
      formName: 'kitchen-guide',
      placeholder: 'Email for the kitchen guide',
      pdf: '/downloads/lintelny-nyc-cost-guide-2026.pdf',
    },
    '/services/coop-condo-renovation-nyc': {
      title: 'NYC Co-op Alteration Checklist — 23 Items',
      sub: 'Everything you need for a complete first-submission alteration package.',
      formName: 'coop-checklist',
      placeholder: 'Email for the co-op checklist',
      pdf: '/downloads/lintelny-coop-checklist.pdf',
    },
    '/services/brownstone-renovation-brooklyn': {
      title: 'Brownstone Renovation Planning Guide',
      sub: 'Hidden conditions, permit types, LPC requirements, and realistic cost ranges.',
      formName: 'brownstone-guide',
      placeholder: 'Email for the brownstone guide',
      pdf: '/downloads/lintelny-nyc-cost-guide-2026.pdf',
    },
    '/locations/nassau-kitchen-remodeling': {
      title: 'Long Island vs NYC Renovation Guide',
      sub: 'Permit differences by town, cost comparisons, and why most NYC contractors won\'t come.',
      formName: 'longisland-guide',
      placeholder: 'Email for the Long Island guide',
      pdf: '/downloads/lintelny-longisland-vs-nyc-guide.pdf',
    },
    '/locations/suffolk-bathroom-remodeling': {
      title: 'Long Island vs NYC Renovation Guide',
      sub: 'Permit differences, cost comparisons, and how Long Island towns differ from DOB.',
      formName: 'longisland-guide',
      placeholder: 'Email for the Long Island guide',
      pdf: '/downloads/lintelny-longisland-vs-nyc-guide.pdf',
    },
    '/locations/long-island-renovation': {
      title: 'Long Island vs NYC Renovation Guide',
      sub: 'Permit differences by town, cost comparisons, and what to expect in Nassau and Suffolk.',
      formName: 'longisland-guide',
      placeholder: 'Email for the Long Island guide',
      pdf: '/downloads/lintelny-longisland-vs-nyc-guide.pdf',
    },
  };

  const path = window.location.pathname.replace(/\/$/, '');
  const magnet = MAGNETS[path];

  if (magnet) {
    const banner = document.createElement('div');
    banner.className = 'ln-magnet';
    banner.innerHTML = `
      <div class="ln-magnet-text">
        <h4>${magnet.title}</h4>
        <p>${magnet.sub}</p>
      </div>
      <div class="ln-magnet-form">
        <input class="ln-magnet-inp" type="email" placeholder="${magnet.placeholder}" id="ln-mag-email">
        <button class="ln-magnet-btn" id="ln-mag-btn">Send Free →</button>
      </div>
    `;

    // Inject before the last section (CTA) of the page
    // Find the last <section> or <div> that contains the CTA
    const sections = document.querySelectorAll('main > section, main > div, article > section, .content > section');
    const lastSection = sections[sections.length - 2] || sections[sections.length - 1];
    if (lastSection) {
      lastSection.parentNode.insertBefore(banner, lastSection);
    }

    document.getElementById('ln-mag-btn').addEventListener('click', async () => {
      const email = document.getElementById('ln-mag-email').value.trim();
      if (!email || !email.includes('@')) {
        document.getElementById('ln-mag-email').focus();
        return;
      }

      await submitToNetlify(magnet.formName, { email, source: path, guide: magnet.title });

      window.location.href = magnet.pdf;
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // 3. COST CALCULATOR EMAIL GATE
  // Intercepts the calculator result — requires email for full breakdown
  // ══════════════════════════════════════════════════════════════════

  const isCalcPage = path.includes('/cost-calculator');

  if (isCalcPage) {
    // Wait for page to load, then find the calculator result area
    window.addEventListener('load', () => {
      // Look for calculate/submit button on calculator page
      const calcBtn = document.querySelector('[data-calc-submit], .calc-submit, #calc-submit, button[type="submit"]');
      if (!calcBtn) return;

      let resultShown = false;

      calcBtn.addEventListener('click', (e) => {
        if (resultShown) return; // Already unlocked

        e.preventDefault();
        e.stopPropagation();

        // Show email gate modal
        const gate = document.createElement('div');
        gate.id = 'ln-exit-overlay';
        gate.style.display = 'flex';
        gate.innerHTML = `
          <div id="ln-exit-box">
            <div id="ln-exit-hdr">
              <div class="ln-ex-eyebrow">Almost there</div>
              <div class="ln-ex-title">Enter your email to see your estimate range</div>
            </div>
            <div id="ln-exit-body">
              <p class="ln-ex-sub">We'll send the detailed breakdown to your inbox — plus the full 2026 NYC Renovation Cost Guide at no charge.</p>
              <input class="ln-ex-input" type="email" id="ln-gate-email" placeholder="Your email address">
              <button class="ln-ex-btn" id="ln-gate-submit">Show My Estimate →</button>
              <p class="ln-ex-dismiss" id="ln-gate-skip">Skip — just show me the range</p>
            </div>
          </div>`;
        document.body.appendChild(gate);

        document.getElementById('ln-gate-submit').addEventListener('click', async () => {
          const email = document.getElementById('ln-gate-email').value.trim();
          if (!email || !email.includes('@')) return;

          await submitToNetlify('calculator-gate', { email, source: 'cost-calculator' });
          gate.remove();
          resultShown = true;
          calcBtn.click(); // Fire the real click
        });

        document.getElementById('ln-gate-skip').addEventListener('click', () => {
          gate.remove();
          resultShown = true;
          calcBtn.click();
        });
      }, true); // Capture phase
    });
  }

})();
