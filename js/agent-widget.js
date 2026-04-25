/**
 * Lintel NY — AI Agent Widget
 * File: js/agent-widget.js
 * Add to every page: <script src="/js/agent-widget.js" defer></script>
 * Agent backend: /.netlify/functions/agent (same domain, no CORS)
 */

(function () {
  'use strict';

  const CFG = {
    endpoint:    '/.netlify/functions/agent',
    openDelay:   9000,
    greeting:    "Hi — I'm the Lintel NY renovation advisor. Planning a project in NYC or Long Island? Tell me what you're working on and I'll give you an honest cost range right now.",
    accentColor: '#E85D2F',
    darkColor:   '#171717',
    blueprintCol:'#1F3A5F',
  };

  let messages  = [];
  let isOpen    = false;
  let isTyping  = false;
  let leadData  = {};
  let hasOpened = false;
  let msgCount  = 0;

  // ── Inject styles ──────────────────────────────────────────────────
  const css = `
    #ln-btn {
      position:fixed;bottom:24px;right:24px;width:56px;height:56px;
      background:${CFG.accentColor};border-radius:50%;border:none;
      cursor:pointer;z-index:9998;display:flex;align-items:center;
      justify-content:center;box-shadow:0 4px 20px rgba(232,93,47,.45);
      transition:transform .2s,box-shadow .2s;
    }
    #ln-btn:hover{transform:scale(1.08);box-shadow:0 6px 28px rgba(232,93,47,.55);}
    #ln-btn svg{width:24px;height:24px;fill:#fff;}
    .ln-notif{
      position:absolute;top:-3px;right:-3px;width:16px;height:16px;
      background:#fff;border-radius:50%;display:flex;align-items:center;
      justify-content:center;font-size:9px;font-weight:700;color:${CFG.accentColor};
      animation:ln-pulse 2s infinite;
    }
    @keyframes ln-pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.18)}}
    #ln-win{
      position:fixed;bottom:92px;right:24px;width:360px;max-height:560px;
      background:#fff;border-radius:12px;
      box-shadow:0 16px 56px rgba(0,0,0,.2);
      display:none;flex-direction:column;z-index:9999;
      font-family:'DM Sans',-apple-system,sans-serif;overflow:hidden;
    }
    #ln-win.open{display:flex;}
    #ln-hdr{
      background:${CFG.darkColor};padding:14px 18px;
      display:flex;align-items:center;justify-content:space-between;flex-shrink:0;
    }
    .ln-hdr-left{display:flex;align-items:center;gap:10px;}
    .ln-av{
      width:34px;height:34px;background:${CFG.accentColor};border-radius:50%;
      display:flex;align-items:center;justify-content:center;
      font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:700;color:#fff;
    }
    .ln-name{font-size:13px;font-weight:600;color:#fff;line-height:1.2;}
    .ln-sub{font-size:10px;color:rgba(255,255,255,.4);margin-top:1px;}
    #ln-x{background:none;border:none;color:rgba(255,255,255,.35);cursor:pointer;font-size:18px;padding:4px;transition:color .2s;}
    #ln-x:hover{color:#fff;}
    #ln-msgs{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px;min-height:0;}
    #ln-msgs::-webkit-scrollbar{width:3px;}
    #ln-msgs::-webkit-scrollbar-thumb{background:${CFG.accentColor};border-radius:2px;}
    .ln-msg{display:flex;flex-direction:column;max-width:88%;}
    .ln-msg.agent{align-self:flex-start;}
    .ln-msg.user{align-self:flex-end;align-items:flex-end;}
    .ln-bbl{padding:9px 13px;border-radius:10px;font-size:13.5px;line-height:1.55;color:#171717;}
    .ln-msg.agent .ln-bbl{background:#F4F3EE;border-bottom-left-radius:3px;}
    .ln-msg.user .ln-bbl{background:${CFG.accentColor};color:#fff;border-bottom-right-radius:3px;}
    .ln-typing{display:flex;align-items:center;gap:4px;padding:10px 13px;background:#F4F3EE;border-radius:10px;border-bottom-left-radius:3px;}
    .ln-typing span{width:5px;height:5px;background:${CFG.accentColor};border-radius:50%;animation:ln-bounce 1.1s infinite;}
    .ln-typing span:nth-child(2){animation-delay:.2s;}
    .ln-typing span:nth-child(3){animation-delay:.4s;}
    @keyframes ln-bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-5px)}}
    #ln-capture{
      background:${CFG.blueprintCol};padding:14px 16px;
      display:none;flex-direction:column;gap:8px;flex-shrink:0;
    }
    #ln-capture.show{display:flex;}
    .ln-cap-title{font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.45);}
    .ln-cap-row{display:flex;gap:8px;}
    .ln-cap-row input{flex:1;}
    .ln-inp{
      background:rgba(255,255,255,.1);border:1.5px solid rgba(255,255,255,.15);
      border-radius:5px;color:#fff;font-family:'DM Sans',sans-serif;
      font-size:12.5px;padding:8px 11px;outline:none;
      transition:border-color .2s;width:100%;box-sizing:border-box;
    }
    .ln-inp::placeholder{color:rgba(255,255,255,.3);}
    .ln-inp:focus{border-color:${CFG.accentColor};}
    .ln-cap-btn{
      background:${CFG.accentColor};border:none;border-radius:5px;color:#fff;
      cursor:pointer;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:700;
      letter-spacing:.08em;padding:10px;text-transform:uppercase;
      transition:background .2s;margin-top:2px;
    }
    .ln-cap-btn:hover{background:#C94D22;}
    #ln-input-row{
      padding:10px 14px;border-top:1px solid #E5E7EB;
      display:flex;gap:8px;align-items:flex-end;flex-shrink:0;background:#fff;
    }
    #ln-inp{
      flex:1;border:1.5px solid #E5E7EB;border-radius:7px;
      font-family:'DM Sans',sans-serif;font-size:13.5px;
      line-height:1.5;outline:none;padding:9px 13px;resize:none;
      transition:border-color .2s;max-height:90px;
    }
    #ln-inp:focus{border-color:${CFG.accentColor};}
    #ln-send{
      background:${CFG.accentColor};border:none;border-radius:7px;color:#fff;
      cursor:pointer;flex-shrink:0;height:38px;width:38px;
      display:flex;align-items:center;justify-content:center;transition:background .2s;
    }
    #ln-send:hover{background:#C94D22;}
    #ln-send:disabled{background:#D5D3CD;cursor:not-allowed;}
    #ln-send svg{width:15px;height:15px;fill:#fff;}
    .ln-foot{
      text-align:center;font-size:10px;color:#9A9690;
      padding:5px 14px 9px;border-top:1px solid #F4F3EE;background:#fff;flex-shrink:0;
    }
    @media(max-width:420px){
      #ln-win{width:calc(100vw - 20px);right:10px;bottom:82px;max-height:68vh;}
    }
  `;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // ── Build HTML ─────────────────────────────────────────────────────
  const wrap = document.createElement('div');
  wrap.innerHTML = `
    <button id="ln-btn" aria-label="Chat with Lintel NY">
      <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>
      <div class="ln-notif">1</div>
    </button>
    <div id="ln-win" role="dialog" aria-label="Lintel NY Chat">
      <div id="ln-hdr">
        <div class="ln-hdr-left">
          <div class="ln-av">LN</div>
          <div>
            <div class="ln-name">Lintel NY Advisor</div>
            <div class="ln-sub">Licensed HIC · NYC + Long Island</div>
          </div>
        </div>
        <button id="ln-x" aria-label="Close">✕</button>
      </div>
      <div id="ln-msgs"></div>
      <div id="ln-capture">
        <div class="ln-cap-title">Send my free estimate range</div>
        <div class="ln-cap-row">
          <input class="ln-inp" id="ln-cname" type="text" placeholder="Your name">
          <input class="ln-inp" id="ln-cphone" type="tel" placeholder="Phone">
        </div>
        <input class="ln-inp" id="ln-cemail" type="email" placeholder="Email address">
        <button class="ln-cap-btn" id="ln-cap-submit">Send Estimate Request →</button>
      </div>
      <div id="ln-input-row">
        <textarea id="ln-inp" rows="1" placeholder="Ask about your renovation..."></textarea>
        <button id="ln-send">
          <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </div>
      <div class="ln-foot">Lintel NY · HIC #2109847-DCA · (212) 347-2111</div>
    </div>
  `;
  document.body.appendChild(wrap);

  // ── Refs ───────────────────────────────────────────────────────────
  const btn     = document.getElementById('ln-btn');
  const win     = document.getElementById('ln-win');
  const msgs    = document.getElementById('ln-msgs');
  const inp     = document.getElementById('ln-inp');
  const sendBtn = document.getElementById('ln-send');
  const capture = document.getElementById('ln-capture');
  const notif   = btn.querySelector('.ln-notif');

  // ── Helpers ────────────────────────────────────────────────────────
  function addMsg(role, text) {
    const d = document.createElement('div');
    d.className = `ln-msg ${role}`;
    const b = document.createElement('div');
    b.className = 'ln-bbl';
    b.textContent = text;
    d.appendChild(b);
    msgs.appendChild(d);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function showTyping() {
    const d = document.createElement('div');
    d.id = 'ln-typing';
    d.className = 'ln-msg agent';
    d.innerHTML = '<div class="ln-typing"><span></span><span></span><span></span></div>';
    msgs.appendChild(d);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function hideTyping() {
    const t = document.getElementById('ln-typing');
    if (t) t.remove();
  }

  // ── Open/Close ─────────────────────────────────────────────────────
  function openChat() {
    if (isOpen) return;
    win.classList.add('open');
    isOpen = true;
    notif.style.display = 'none';

    if (!hasOpened) {
      hasOpened = true;
      setTimeout(() => {
        showTyping();
        setTimeout(() => {
          hideTyping();
          messages.push({ role: 'assistant', content: CFG.greeting });
          addMsg('agent', CFG.greeting);
        }, 1100);
      }, 150);
    }
    inp.focus();
  }

  function closeChat() {
    win.classList.remove('open');
    isOpen = false;
  }

  btn.addEventListener('click', () => isOpen ? closeChat() : openChat());
  document.getElementById('ln-x').addEventListener('click', closeChat);

  // Auto-open once per session
  if (!sessionStorage.getItem('ln_opened')) {
    setTimeout(() => {
      sessionStorage.setItem('ln_opened', '1');
      openChat();
    }, CFG.openDelay);
  }

  // ── Send message ───────────────────────────────────────────────────
  async function send() {
    const text = inp.value.trim();
    if (!text || isTyping) return;
    inp.value = '';
    inp.style.height = 'auto';
    isTyping = true;
    sendBtn.disabled = true;
    msgCount++;

    messages.push({ role: 'user', content: text });
    addMsg('user', text);
    showTyping();

    // Extract lead data from conversation
    const full = messages.map(m => m.content).join(' ').toLowerCase();
    if (full.match(/[\w.-]+@[\w.-]+\.\w+/)) leadData.email = full.match(/[\w.-]+@[\w.-]+\.\w+/)[0];
    ['bathroom','kitchen','co-op','coop','brownstone','electrical','roofing','long island','nassau','suffolk'].forEach(p => {
      if (full.includes(p)) leadData.project = (leadData.project || '') + p + ' ';
    });

    try {
      const res = await fetch(CFG.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages, lead: leadData }),
      });
      const data = await res.json();
      hideTyping();
      const reply = data.reply || 'Sorry — something went wrong. Please call (212) 347-2111.';
      messages.push({ role: 'assistant', content: reply });
      addMsg('agent', reply);

      // Show capture form after 3 user messages
      if (msgCount >= 3 && !capture.classList.contains('show')) {
        capture.classList.add('show');
      }
    } catch (e) {
      hideTyping();
      addMsg('agent', 'Connection issue — please call (212) 347-2111 or email info@lintelny.com.');
    }

    isTyping = false;
    sendBtn.disabled = false;
    inp.focus();
  }

  sendBtn.addEventListener('click', send);
  inp.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }});
  inp.addEventListener('input', () => {
    inp.style.height = 'auto';
    inp.style.height = Math.min(inp.scrollHeight, 90) + 'px';
  });

  // ── Lead capture submit ────────────────────────────────────────────
  document.getElementById('ln-cap-submit').addEventListener('click', async () => {
    const name  = document.getElementById('ln-cname').value.trim();
    const phone = document.getElementById('ln-cphone').value.trim();
    const email = document.getElementById('ln-cemail').value.trim();

    if (!email && !phone) {
      alert('Please enter your email or phone number.');
      return;
    }

    leadData = { ...leadData, name, phone, email };

    await fetch(CFG.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, lead: leadData }),
    });

    capture.innerHTML = `
      <div style="text-align:center;padding:8px 0">
        <div style="font-size:20px;margin-bottom:6px">✓</div>
        <div style="color:#fff;font-weight:700;font-size:13px">We'll be in touch within one business day</div>
        <div style="color:rgba(255,255,255,.45);font-size:11px;margin-top:4px">Or call now: (212) 347-2111</div>
      </div>`;
    capture.style.background = '#16A34A';

    addMsg('agent', `Got it${name ? ', ' + name : ''}. I've sent your details to the Lintel NY team. You'll hear back within one business day. You can also call (212) 347-2111 directly.`);
  });

})();
