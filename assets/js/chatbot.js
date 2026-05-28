// ============================================================
// AURA ASSISTANT — Chatbot Module  v4
// Fixes:
//  1. Chips → 2-column grid; toggle = arrow-only text label
//     Auto-collapse on chip click OR user send
//  2. TA logo light-mode brightness fix (dark logo → visible)
//  3. Default language = English; Filipino only when user writes Filipino
//  4. Services + all KB topics answered via smart routing before AI
// ============================================================

// ─── 1. KNOWLEDGE BASE ──────────────────────────────────────

const CHATBOT_KB = {
    office_hours: {
        chips: ["🕘 Office Hours", "🕐 Operational Hours"],
        keywords: ["office hour", "office hours", "operational hour", "operational hours", "open", "close", "working hour", "business hour", "schedule", "what time", "anong oras", "bukas", "sarado"],
        responses: {
            "🕘 Office Hours": `Our <strong>Office Hours</strong> are <strong>9 AM – 6 PM</strong>. This is when our admin and management team is available for meetings, inquiries, and walk-ins. 📋`,
            "🕐 Operational Hours": `Our <strong>Operational Hours</strong> (studio & livestream operations) run from <strong>1 PM – 10 PM</strong>. Perfect for afternoon and evening shoots or live sessions! 🎬`
        },
        default: `We have two sets of hours:<br>• <strong>Office Hours:</strong> 9 AM – 6 PM (admin & management)<br>• <strong>Operational Hours:</strong> 1 PM – 10 PM (studio & livestreaming)<br><br>Feel free to visit or contact us during office hours for inquiries! 📋`
    },
    location: {
        chips: ["📍 Location & Address"],
        keywords: ["location", "address", "where", "place", "find us", "makati", "ayala", "visit", "directions", "map", "saan", "nasaan"],
        responses: {
            "📍 Location & Address": `We are located at:<br><br>📌 <strong>Unit 1403, 14th Floor</strong><br>Ayala Tower One, Ayala Ave.<br>Makati City<br><br>Easily accessible via MRT (Ayala Station) or by car. 🏙️`
        },
        default: `You can find us at <strong>Unit 1403, 14th Floor, Ayala Tower One, Ayala Ave., Makati City</strong>. 📍<br>Easily accessible via MRT Ayala Station!`
    },
    contact: {
        chips: ["📬 Contact Info"],
        keywords: ["contact", "email", "phone", "call", "reach", "message", "number", "get in touch", "inquire", "inquiry", "makipag-ugnayan", "numero", "telepono"],
        responses: {
            "📬 Contact Info": `You can reach us through:<br><br>📧 <strong>Email:</strong> business@theauracreatives.co<br>📞 <strong>Phone:</strong> 09219715546<br>🌐 <strong>Website:</strong> www.theauracreatives.co<br><br>We typically respond within 24 hours on business days. 💬`
        },
        default: `Reach us at 📧 <strong>business@theauracreatives.co</strong> or call/text 📞 <strong>09219715546</strong>. We respond within 24 hours on business days!`
    },
    pixelreach: {
        chips: ["🏢 Pixel Reach Inc."],
        keywords: ["pixel reach", "pixel", "parent company", "parent", "affiliated", "network", "mcn", "multi-channel", "partner company"],
        responses: {
            "🏢 Pixel Reach Inc.": `<strong>Pixel Reach Inc.</strong> is our parent company and the Multi-Channel Network (MCN) behind The Aura Creatives. They support our talent management, brand partnerships, and content operations.<br><br>You can find full details about Pixel Reach in the footer section of our website. 🔗`
        },
        default: `<strong>Pixel Reach Inc.</strong> is our parent MCN company that supports our talent management, brand partnerships, and content operations. Check our website footer for their full details!`
    },
    services: {
        chips: ["🎯 Our Services"],
        keywords: [
            "service", "services", "what do you offer", "what you offer", "what do you do",
            "offer", "provide", "available", "packages", "package",
            "livestream", "livestreaming", "live stream",
            "short form", "short-form", "short video", "tiktok", "reels", "shorts",
            "studio rental", "studio", "rental",
            "artist management", "talent management", "management",
            "marketing video", "marketing", "commercial", "corporate video",
            "shoppable", "product photo", "product photography", "ecommerce",
            "kol", "influencer", "content creator",
            "serbisyo", "alok", "ano ang"
        ],
        responses: {
            "🎯 Our Services": `Here's what we offer at <strong>The Aura Creatives</strong>:<br><br>🎙️ <strong>KOL & Artist Livestreaming</strong> — Full studio setup, 5-hour sessions<br>🎬 <strong>Short-Form Video Production</strong> — TikTok, Reels & Shorts (15–45s)<br>📷 <strong>Studio Rental</strong> — Professional gear, lighting & backdrops<br>👑 <strong>Artist Management</strong> — Career strategy, brand deals & PR<br>🎞️ <strong>Marketing Video Production</strong> — Corporate, commercials & social<br>🛒 <strong>Shoppable Pictures</strong> — E-commerce product photography<br><br>Visit the <strong>Services</strong> tab for full details or reach us at 📧 business@theauracreatives.co! 🚀`
        },
        default: `We offer 6 core services at <strong>The Aura Creatives</strong>:<br><br>🎙️ <strong>KOL & Artist Livestreaming</strong><br>🎬 <strong>Short-Form Video Production</strong> (TikTok, Reels, Shorts)<br>📷 <strong>Studio Rental</strong><br>👑 <strong>Artist Management</strong><br>🎞️ <strong>Marketing Video Production</strong><br>🛒 <strong>Shoppable Pictures</strong><br><br>Want details on any specific service? Just ask! 😊`
    }
};

const ALL_SUGGESTION_CHIPS = [
    "🕘 Office Hours",
    "🕐 Operational Hours",
    "📍 Location & Address",
    "🏢 Pixel Reach Inc.",
    "📬 Contact Info",
    "🎯 Our Services"
];

// ─── 2. STATE ───────────────────────────────────────────────

let _chatInitialized  = false;
let _suggestionsExpanded = false;   // collapsed by default after first interaction
let _suggestionsShownOnce = false;
let _conversationHistory = [];
let _isAIThinking = false;

// ─── 3. SYSTEM PROMPT — English-first, Filipino on demand ────

const AURA_SYSTEM_PROMPT = `You are Aura Assistant — the official AI chatbot of The Aura Creatives, a multimedia marketing and talent management agency based in Makati City, Philippines. You were built to help customers, potential clients, and interested individuals get quick, accurate, and friendly answers.

COMPANY FACTS — always use these:
- Company: The Aura Creatives (TA Creatives)
- Founded: April 2025
- Address: Unit 1403, 14th Floor, Ayala Tower One, Ayala Ave., Makati City
- Email: business@theauracreatives.co
- Phone: 09219715546
- Website: www.theauracreatives.co
- Office Hours: 9 AM – 6 PM (admin & management)
- Operational Hours: 1 PM – 10 PM (studio & livestream)
- Parent company / MCN: Pixel Reach Inc.
- Services:
    1. KOL & Artist Livestreaming — full studio setup, 5-hour sessions, co-host & admin support, OBS linking, background design
    2. Short-Form Video Production — 15–45s videos for TikTok, Reels & Shorts, trend analysis, scripting, KOL direction
    3. Studio Rental — professional lighting grid, audio equipment, customizable backdrops, makeup area, high-speed internet
    4. Artist Management — career strategy, brand partnership negotiation, PR & crisis management, content strategy
    5. Marketing Video Production — corporate, commercials, social media videos, event coverage, color grading, motion graphics
    6. Shoppable Pictures — high-quality e-commerce product photography, lifestyle & studio settings, post-production editing
- Talents/Artists: Igiboy (@igiboyflores31 TikTok 19K+, @igiboyflores IG 93.6K+), Sofi (@sofifermazi TikTok 144.6K+, IG 13.9K+), Miro (@miromacs TikTok 309.4K+, IG 181K+), Criselda (@chickennuggetsop TikTok 10.4M+, @alvarezcriselda FB 2.4M+), Bugoy
- Clients: BingoPlus, Canon, Anker, Insta360, Oppo, Infinix, Belo, Honor, Organic Skin, Anta, Str8 Fragrances, Akaso, Nubia, Puma, Yoto

LANGUAGE RULES — strictly follow these:
1. DEFAULT: Always respond in clear, natural ENGLISH.
2. FILIPINO / TAGALOG: If the user's message is written in Filipino or Tagalog, respond in Filipino/Taglish naturally.
3. TAGLISH: If the user mixes English and Filipino, mirror their style.
4. NEVER initiate Filipino in your first reply or when the user writes in English.

TONE & INTELLIGENCE:
- Be genuinely helpful, warm, and professional — not robotic.
- If asked about pricing: explain that exact quotes require contacting the team directly.
- If asked about a topic unrelated to The Aura Creatives, politely redirect.
- Be proactive: suggest related info when helpful.
- Use emojis naturally — not excessively.
- Always close business inquiries with a call-to-action (email, visit website, etc.)

FORMAT:
- Use <strong> for key terms, names, numbers.
- Use <br> for line breaks.
- Keep responses concise but complete — typically 3–6 sentences.
- For lists, use emoji bullets inline.`;

// ─── 4. SMART ROUTING ENGINE ─────────────────────────────────

function isChipMatch(input) {
    const lower = input.toLowerCase().trim();
    for (const [, data] of Object.entries(CHATBOT_KB)) {
        for (const chip of data.chips) {
            if (lower === chip.toLowerCase() || input === chip) {
                return data.responses[chip];
            }
        }
    }
    return null;
}

function isKeywordMatch(input) {
    const lower = input.toLowerCase().trim();
    let bestCat = null, bestScore = 0;

    for (const [cat, data] of Object.entries(CHATBOT_KB)) {
        // Score: count how many keywords appear in the input
        let score = 0;
        for (const kw of data.keywords) {
            if (lower.includes(kw)) {
                // Longer keyword = more specific = higher weight
                score += kw.split(' ').length;
            }
        }
        if (score > bestScore) { bestScore = score; bestCat = cat; }
    }

    if (bestScore > 0 && bestCat) {
        return CHATBOT_KB[bestCat].default;
    }
    return null;
}

function isSimplePhrase(input) {
    const lower = input.toLowerCase().trim();
    const GREETINGS = ["hi", "hello", "hey", "hiya", "good morning", "good afternoon", "good evening", "sup", "howdy", "yo", "kumusta", "kamusta", "uy", "huy", "magandang umaga", "magandang hapon", "magandang gabi"];
    const THANKS    = ["thank you", "thanks", "thank", "thx", "ty", "cheers", "appreciate", "salamat", "maraming salamat", "tnx"];

    if (GREETINGS.some(k => lower === k || lower.startsWith(k + " ") || lower.endsWith(" " + k))) {
        const opts = [
            `Hey there! 👋 Welcome to <strong>The Aura Creatives</strong>! I'm Aura, your virtual assistant. How can I help you today?`,
            `Hello! 😊 Great to have you here at <strong>The Aura Creatives</strong>. What can I help you with?`,
            `Hi! Welcome! ✨ I'm Aura — ready to answer your questions about The Aura Creatives. What would you like to know?`
        ];
        return opts[Math.floor(Math.random() * opts.length)];
    }

    if (THANKS.some(k => lower.includes(k))) {
        const opts = [
            `You're very welcome! 😊 Is there anything else I can help you with?`,
            `Happy to help! ✨ Feel free to ask if you have more questions.`,
            `Anytime! 🎉 Don't hesitate to reach out if you need anything else.`
        ];
        return opts[Math.floor(Math.random() * opts.length)];
    }

    return null;
}

async function askClaudeAI(userMessage) {
    _conversationHistory.push({ role: "user", content: userMessage });
    if (_conversationHistory.length > 20) {
        _conversationHistory = _conversationHistory.slice(-20);
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 1000,
            system: AURA_SYSTEM_PROMPT,
            messages: _conversationHistory
        })
    });

    if (!response.ok) throw new Error(`API ${response.status}`);

    const data = await response.json();
    const raw = (data.content && data.content[0] && data.content[0].text)
        ? data.content[0].text
        : `Sorry, I couldn't process that right now. Please reach us directly at 📧 <strong>business@theauracreatives.co</strong> or call 📞 <strong>09219715546</strong>.`;

    _conversationHistory.push({ role: "assistant", content: raw });
    return formatAIResponse(raw);
}

function formatAIResponse(text) {
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
    text = text.replace(/\n/g, '<br>');
    text = text.replace(/<br>[-•]\s+/g, '<br>• ');
    return text;
}

async function processUserInput(userText) {
    // Priority 1: Exact chip label
    const chip = isChipMatch(userText);
    if (chip) return chip;

    // Priority 2: Simple greetings / thanks
    const simple = isSimplePhrase(userText);
    if (simple) return simple;

    // Priority 3: Keyword match against KB (catches "what services", "how to contact", etc.)
    const kw = isKeywordMatch(userText);
    if (kw) return kw;

    // Priority 4: Claude AI for anything else
    return await askClaudeAI(userText);
}

// ─── 5. DOM HELPERS ─────────────────────────────────────────

function getChatEls() {
    return {
        msgs:   document.getElementById('chat-messages'),
        input:  document.getElementById('chat-input'),
        quick:  document.getElementById('quick-replies'),
        typing: document.getElementById('typing-indicator'),
        win:    document.getElementById('chat-window')
    };
}

function appendBubble(who, html) {
    const { msgs } = getChatEls();
    if (!msgs) return;
    const wrapper = document.createElement('div');

    if (who === 'user') {
        wrapper.className = 'aura-chat-row aura-chat-row--user';
        wrapper.innerHTML = `<div class="aura-bubble aura-bubble--user">${escapeHtml(html)}</div>`;
    } else {
        wrapper.className = 'aura-chat-row aura-chat-row--bot';
        wrapper.innerHTML = `
            <div class="aura-bot-avatar" aria-hidden="true">
                <img src="assets/images/new_logo.png" alt="TA" class="aura-ta-logo"
                     onerror="this.style.display='none';this.parentElement.innerHTML+='<svg width=\\'15\\' height=\\'15\\' viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'currentColor\\' stroke-width=\\'1.8\\' stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\'><rect x=\\'3\\' y=\\'11\\' width=\\'18\\' height=\\'10\\' rx=\\'2.5\\'/><path d=\\'M12 2a2.5 2.5 0 0 1 2.5 2.5V11h-5V4.5A2.5 2.5 0 0 1 12 2z\\'/><circle cx=\\'8.5\\' cy=\\'16\\' r=\\'1\\'/><circle cx=\\'12\\' cy=\\'16\\' r=\\'1\\'/><circle cx=\\'15.5\\' cy=\\'16\\' r=\\'1\\'/></svg>'" />
            </div>
            <div class="aura-bubble aura-bubble--bot">${html}</div>
        `;
    }

    msgs.appendChild(wrapper);
    msgs.scrollTo({ top: msgs.scrollHeight, behavior: 'smooth' });
}

function escapeHtml(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function showTyping() {
    const { typing, msgs } = getChatEls();
    if (typing) {
        typing.classList.remove('hidden');
        if (msgs) msgs.scrollTo({ top: msgs.scrollHeight, behavior: 'smooth' });
    }
}

function hideTyping() {
    const { typing } = getChatEls();
    if (typing) typing.classList.add('hidden');
}

// ─── 6. SUGGESTION CHIPS — 2-col, clickable header, smooth expand, hover anim ──

function collapseSuggestions() {
    _suggestionsExpanded = false;
    const panel = document.getElementById('aura-suggestions-panel');
    const arrow = document.getElementById('aura-suggestions-arrow');
    if (panel) {
        panel.style.maxHeight = '0';
        panel.style.opacity   = '0';
    }
    if (arrow) arrow.textContent = '▶';
}

function expandSuggestions() {
    _suggestionsExpanded = true;
    const panel = document.getElementById('aura-suggestions-panel');
    const arrow = document.getElementById('aura-suggestions-arrow');
    if (panel) {
        panel.style.maxHeight = panel.scrollHeight + 'px';
        panel.style.opacity   = '1';
    }
    if (arrow) arrow.textContent = '▼';
    // Scroll messages up so chips don't overlap
    const { msgs } = getChatEls();
    if (msgs) setTimeout(() => msgs.scrollTo({ top: msgs.scrollHeight, behavior: 'smooth' }), 160);
}

function renderSuggestionChips() {
    const { quick } = getChatEls();
    if (!quick) return;

    const expanded = !_suggestionsShownOnce ? true : _suggestionsExpanded;
    if (!_suggestionsShownOnce) _suggestionsShownOnce = true;

    quick.innerHTML = `
        <div class="aura-suggestions-container">
            <!-- Entire header row is clickable to toggle -->
            <button type="button"
                    id="aura-suggestions-header"
                    class="aura-suggestions-header"
                    aria-expanded="${expanded}"
                    aria-label="Toggle suggested replies">
                <span class="aura-suggestions-label">Suggested replies</span>
                <span id="aura-suggestions-arrow" class="aura-arrow-icon">${expanded ? '▼' : '▶'}</span>
            </button>
            <div id="aura-suggestions-panel"
                 class="aura-suggestions-panel"
                 style="max-height:${expanded ? '200px' : '0'}; opacity:${expanded ? '1' : '0'}">
                ${ALL_SUGGESTION_CHIPS.map(chip => `
                    <button class="aura-chip" data-chip="${chip}" aria-label="${chip}">${chip}</button>
                `).join('')}
            </div>
        </div>
    `;

    // Whole header toggles panel
    document.getElementById('aura-suggestions-header').addEventListener('click', () => {
        if (_suggestionsExpanded) collapseSuggestions();
        else expandSuggestions();
    });

    // Chip click → fill input, collapse, send
    quick.querySelectorAll('.aura-chip').forEach(btn => {
        btn.addEventListener('click', () => {
            const { input } = getChatEls();
            if (input) {
                input.value = btn.dataset.chip;
                collapseSuggestions();
                handleChatbotSend();
            }
        });
    });

    // If expanding for first time, scroll messages up
    if (expanded) {
        const { msgs } = getChatEls();
        if (msgs) setTimeout(() => msgs.scrollTo({ top: msgs.scrollHeight, behavior: 'smooth' }), 80);
    }
}

// ─── 7. INJECT STYLES ────────────────────────────────────────

function injectChatbotStyles() {
    if (document.getElementById('aura-chatbot-styles')) return;

    const style = document.createElement('style');
    style.id = 'aura-chatbot-styles';
    style.textContent = `

/* ── Quick-replies area: smooth height so messages push up properly ── */
#quick-replies {
    transition: padding 0.22s ease;
    /* Remove conflicting Tailwind flex-wrap from inline class - override */
    display: block !important;
    flex-wrap: unset !important;
}
/* Ensure #chat-messages never overlaps the panel below — flex-1 handles it,
   but we add a min-height floor so short convos still look right */
#chat-messages {
    min-height: 80px;
}

/* ── Scrollable messages ── */
#chat-messages {
    overflow-y: auto !important;
    overscroll-behavior: contain;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    scrollbar-color: rgba(200,162,39,0.3) transparent;
}
#chat-messages::-webkit-scrollbar        { width: 4px; }
#chat-messages::-webkit-scrollbar-track  { background: transparent; }
#chat-messages::-webkit-scrollbar-thumb  { background: rgba(200,162,39,0.35); border-radius: 2px; }
#chat-messages::-webkit-scrollbar-thumb:hover { background: rgba(200,162,39,0.6); }
#chat-messages.hide-scrollbar { -ms-overflow-style: auto !important; scrollbar-width: thin !important; }
#chat-messages.hide-scrollbar::-webkit-scrollbar { display: block !important; width: 4px !important; }

/* ── Chat rows ── */
.aura-chat-row {
    display: flex; align-items: flex-end; gap: 10px;
    margin-top: 14px;
    animation: auraBubbleIn 0.28s cubic-bezier(0.25,1,0.5,1) both;
}
.aura-chat-row--user { justify-content: flex-end; }
.aura-chat-row--bot  { justify-content: flex-start; }
@keyframes auraBubbleIn {
    from { opacity: 0; transform: translateY(10px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
}

/* ── Bot avatar — TA Logo ── */
.aura-bot-avatar {
    width: 32px; height: 32px; border-radius: 50%;
    flex-shrink: 0; display: flex; align-items: center; justify-content: center;
    background: rgba(200,162,39,0.15);
    border: 1px solid rgba(200,162,39,0.30);
    overflow: hidden;
}
/* Dark mode: logo is light — keep as-is */
.aura-ta-logo {
    width: 100%; height: 100%;
    object-fit: contain; padding: 3px;
    filter: brightness(1.15) contrast(1.05);
    transition: filter 0.3s ease;
}
/* Light mode: logo may be dark/transparent — invert + adjust for warm gold bg */
html.light-theme .aura-bot-avatar {
    background: #c9a227;
    border-color: #a07d1a;
}
html.light-theme .aura-ta-logo {
    filter: brightness(0) invert(1);
}

/* ── Chat header logo ── */
.aura-chat-header-logo {
    width: 28px; height: 28px; object-fit: contain;
    filter: brightness(1.1) drop-shadow(0 0 5px rgba(200,162,39,0.35));
    transition: filter 0.3s ease;
}
html.light-theme .aura-chat-header-logo {
    /* On light background — darken to the gold tone */
    filter: brightness(0) saturate(100%) invert(55%) sepia(60%) saturate(600%) hue-rotate(5deg) brightness(0.85);
}

/* ── Bubbles ── */
.aura-bubble {
    max-width: 82%; padding: 12px 16px; border-radius: 18px;
    font-size: 0.8375rem; line-height: 1.6; word-break: break-word;
}
.aura-bubble--bot {
    border-radius: 18px 18px 18px 4px;
    background: rgba(200,162,39,0.10);
    border: 1px solid rgba(200,162,39,0.18);
    color: #f5f0e8;
}
.aura-bubble--bot strong { color: #e8c84a; }
.aura-bubble--user {
    border-radius: 18px 18px 4px 18px;
    background: linear-gradient(135deg, #8b6914, #c9a227);
    color: #030201; font-weight: 500;
}

/* ── Suggestions container ── */
.aura-suggestions-container {
    display: flex; flex-direction: column; gap: 0.35rem;
    width: 100%;
}

/* ── Header: entire row is a clickable button ── */
.aura-suggestions-header {
    display: flex; align-items: center; justify-content: space-between;
    width: 100%; padding: 5px 6px; border-radius: 8px;
    background: none; border: none; cursor: pointer;
    transition: background 0.18s ease;
}
.aura-suggestions-header:hover {
    background: rgba(200,162,39,0.08);
}
.aura-suggestions-header:hover .aura-suggestions-label {
    color: rgba(245,240,232,0.85);
}
.aura-suggestions-header:hover .aura-arrow-icon {
    color: #e8c84a;
}
.aura-suggestions-label {
    font-size: 0.68rem; font-weight: 600; letter-spacing: 0.05em;
    color: rgba(245,240,232,0.50);
    text-transform: uppercase;
    transition: color 0.18s ease;
    user-select: none;
}
.aura-arrow-icon {
    font-size: 0.62rem; line-height: 1;
    color: rgba(245,240,232,0.45);
    transition: color 0.18s ease, transform 0.22s ease;
    user-select: none;
}

/* ── Chips panel: smooth height transition (no display:none jump) ── */
.aura-suggestions-panel {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.35rem;
    width: 100%;
    overflow: hidden;
    transition: max-height 0.28s cubic-bezier(0.4,0,0.2,1),
                opacity    0.22s ease;
}

/* ── Chip shimmer keyframe ── */
@keyframes auraChipPulse {
    0%   { box-shadow: 0 0 0 0 rgba(200,162,39,0.0); }
    50%  { box-shadow: 0 0 0 3px rgba(200,162,39,0.18); }
    100% { box-shadow: 0 0 0 0 rgba(200,162,39,0.0); }
}
@keyframes auraChipShimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
}

/* ── Individual chip ── */
.aura-chip {
    display: flex; align-items: center; justify-content: flex-start;
    padding: 7px 11px; border-radius: 999px;
    font-size: 0.72rem; font-weight: 500; cursor: pointer;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    transition: background 0.2s ease, border-color 0.22s ease,
                color 0.18s ease, transform 0.15s ease,
                box-shadow 0.2s ease;
    background: rgba(200,162,39,0.07);
    border: 1px solid rgba(200,162,39,0.22);
    color: rgba(245,240,232,0.75);
    width: 100%;
    position: relative;
}
/* Continuous gentle pulse on every chip to draw attention */
.aura-chip {
    animation: auraChipPulse 2.8s ease-in-out infinite;
}
/* Stagger the pulse per chip position so they breathe independently */
.aura-chip:nth-child(1) { animation-delay: 0s; }
.aura-chip:nth-child(2) { animation-delay: 0.45s; }
.aura-chip:nth-child(3) { animation-delay: 0.9s; }
.aura-chip:nth-child(4) { animation-delay: 1.35s; }
.aura-chip:nth-child(5) { animation-delay: 1.8s; }
.aura-chip:nth-child(6) { animation-delay: 2.25s; }

/* On hover: shimmer sweep + lift + glow — stop the pulse */
.aura-chip:hover {
    animation: none;
    background: linear-gradient(
        105deg,
        rgba(200,162,39,0.10) 0%,
        rgba(200,162,39,0.30) 40%,
        rgba(232,200,74,0.22) 60%,
        rgba(200,162,39,0.10) 100%
    );
    background-size: 200% auto;
    border-color: rgba(200,162,39,0.65);
    color: #e8c84a;
    transform: translateY(-2px);
    box-shadow: 0 4px 14px rgba(200,162,39,0.22),
                0 0 0 1px rgba(200,162,39,0.30);
}

/* ═══ LIGHT MODE ═══ */
html.light-theme .aura-bubble--bot {
    background: rgba(255,251,244,0.95);
    border-color: rgba(139,105,20,0.20);
    color: #1a1408;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}
html.light-theme .aura-bubble--bot strong { color: #8b6914; }
html.light-theme .aura-bubble--user { background: linear-gradient(135deg,#8b6914,#c9a227); color: #fff8e8; }

html.light-theme .aura-suggestions-label { color: rgba(26,20,8,0.40); }
html.light-theme .aura-arrow-icon { color: rgba(26,20,8,0.35); }
html.light-theme .aura-suggestions-header:hover { background: rgba(139,105,20,0.07); }
html.light-theme .aura-suggestions-header:hover .aura-suggestions-label { color: rgba(26,20,8,0.80); }
html.light-theme .aura-suggestions-header:hover .aura-arrow-icon { color: #8b6914; }

@keyframes auraChipPulseLight {
    0%   { box-shadow: 0 0 0 0 rgba(139,105,20,0.0); }
    50%  { box-shadow: 0 0 0 3px rgba(139,105,20,0.15); }
    100% { box-shadow: 0 0 0 0 rgba(139,105,20,0.0); }
}
html.light-theme .aura-chip {
    background: rgba(255,251,244,0.85);
    border-color: rgba(139,105,20,0.25);
    color: rgba(26,20,8,0.75);
    animation: auraChipPulseLight 2.8s ease-in-out infinite;
}
html.light-theme .aura-chip:hover {
    animation: none;
    background: linear-gradient(
        105deg,
        rgba(200,162,39,0.08) 0%,
        rgba(200,162,39,0.22) 40%,
        rgba(200,162,39,0.14) 60%,
        rgba(200,162,39,0.08) 100%
    );
    border-color: #c9a227; color: #8b6914;
    box-shadow: 0 4px 12px rgba(139,105,20,0.18), 0 0 0 1px rgba(200,162,39,0.28);
}

html.light-theme #chat-window h3.text-white { color: #1a1408 !important; }
html.light-theme #chat-window .text-white\\/50 { color: rgba(26,20,8,0.52) !important; }
html.light-theme #typing-indicator .bg-white\\/50 { background-color: rgba(139,105,20,0.55) !important; }
html.light-theme #typing-indicator .bg-white\\/5 {
    background: rgba(255,251,244,0.9) !important;
    border-color: rgba(139,105,20,0.20) !important;
}
html.light-theme #chat-window .border-t.border-white\\/10 { border-color: rgba(139,105,20,0.15) !important; }
    `;

    document.head.appendChild(style);
}

// ─── 8. UPGRADE CHAT HEADER WITH TA LOGO ─────────────────────

function upgradeChatHeader() {
    const chatWindow = document.getElementById('chat-window');
    if (!chatWindow) return;

    const headerDiv = chatWindow.querySelector('.relative.z-10.flex.items-center.justify-between');
    if (!headerDiv) return;

    const iconArea = headerDiv.querySelector('.relative');
    if (!iconArea) return;

    iconArea.style.position = 'relative';
    iconArea.innerHTML = `
        <img src="assets/images/new_logo.png" alt="The Aura Creatives"
             class="aura-chat-header-logo"
             onerror="this.style.display='none'" />
        <span class="aura-status-dot"></span>
    `;

    // Inject status dot style
    const dotStyle = document.createElement('style');
    dotStyle.textContent = `
        .aura-status-dot {
            position: absolute; bottom: -1px; right: -1px;
            width: 8px; height: 8px; border-radius: 50%;
            background: #22c55e;
            border: 1.5px solid rgba(0,0,0,0.4);
        }
        html.light-theme .aura-status-dot { border-color: rgba(255,255,255,0.8); }
    `;
    document.head.appendChild(dotStyle);
}

// ─── 9. SCROLL FIX (Lenis) ───────────────────────────────────

function fixChatScroll() {
    const msgs = document.getElementById('chat-messages');
    if (!msgs) return;
    msgs.setAttribute('data-lenis-prevent', '');
    msgs.addEventListener('wheel', e => e.stopPropagation(), { passive: true });
    let touchStartY = 0;
    msgs.addEventListener('touchstart', e => { touchStartY = e.touches[0].clientY; }, { passive: true });
    msgs.addEventListener('touchmove', e => {
        const delta = touchStartY - e.touches[0].clientY;
        const atTop    = msgs.scrollTop === 0 && delta < 0;
        const atBottom = msgs.scrollTop + msgs.clientHeight >= msgs.scrollHeight && delta > 0;
        if (!atTop && !atBottom) e.stopPropagation();
    }, { passive: true });
}

// ─── 10. CORE SEND HANDLER ──────────────────────────────────

async function handleChatbotSend() {
    if (_isAIThinking) return;
    const { input } = getChatEls();
    if (!input || !input.value.trim()) return;

    const userText = input.value.trim();
    input.value = '';

    // Auto-collapse suggestions when user sends anything
    collapseSuggestions();

    appendBubble('user', userText);
    showTyping();
    _isAIThinking = true;
    input.disabled = true;
    const sendBtn = document.getElementById('send-btn');
    if (sendBtn) sendBtn.disabled = true;

    try {
        const response = await processUserInput(userText);
        hideTyping();
        appendBubble('bot', response);
    } catch (err) {
        hideTyping();
        console.error('[AuraAssistant] Error:', err);
        appendBubble('bot', `Sorry about that! 😅 There was a brief issue on my end. For immediate assistance, please reach us at 📧 <strong>business@theauracreatives.co</strong> or call 📞 <strong>09219715546</strong>. Thank you for your patience!`);
    } finally {
        _isAIThinking = false;
        input.disabled = false;
        if (sendBtn) sendBtn.disabled = false;
        renderSuggestionChips();
    }
}

// ─── 11. INIT ────────────────────────────────────────────────

function initChatbotWidget() {
    if (_chatInitialized) return;
    _chatInitialized = true;

    injectChatbotStyles();
    fixChatScroll();
    upgradeChatHeader();

    const { msgs, input } = getChatEls();

    if (msgs && msgs.children.length === 0) {
        setTimeout(() => {
            appendBubble('bot', `Hi there! 👋 Welcome to <strong>The Aura Creatives</strong>!<br>I'm <strong>Aura</strong>, your AI-powered assistant. Ask me anything about our services, team, location, or how we can help your brand — or pick a suggestion below! 🌟`);
            setTimeout(() => renderSuggestionChips(), 180);
        }, 420);
    } else {
        renderSuggestionChips();
    }

    // Keyboard send
    if (input) {
        const fresh = input.cloneNode(true);
        input.parentNode.replaceChild(fresh, input);
        fresh.addEventListener('keypress', e => {
            if (e.key === 'Enter' && !_isAIThinking) handleChatbotSend();
        });
    }

    window.handleChatSend = handleChatbotSend;

    const sendBtn = document.getElementById('send-btn');
    if (sendBtn) {
        sendBtn.addEventListener('click', e => {
            e.preventDefault();
            e.stopImmediatePropagation();
            handleChatbotSend();
        }, true);
    }

    console.log('[AuraAssistant] Chatbot v4 initialized ✓');
}

// ─── 12. BOOT ────────────────────────────────────────────────

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(initChatbotWidget, 320));
} else {
    setTimeout(initChatbotWidget, 320);
}

window.initChatbotWidget = initChatbotWidget;
window.handleChatbotSend = handleChatbotSend;
