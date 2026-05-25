// ============================================================
// AURA ASSISTANT — Chatbot Module  v2
// File: chatbot.js
// Fixes: scrollable messages area + full light-mode visibility
// ============================================================

// ─── 1. KNOWLEDGE BASE ──────────────────────────────────────

const CHATBOT_KB = {
    office_hours: {
        chips: ["🕘 Office Hours", "🕐 Operational Hours"],
        keywords: ["office", "hour", "open", "close", "work", "schedule", "time", "operational", "working", "business hour"],
        responses: {
            "🕘 Office Hours": `Our <strong>Office Hours</strong> are <strong>9 AM – 6 PM</strong>. This is when our admin and management team is available for meetings, inquiries, and walk-ins. 📋`,
            "🕐 Operational Hours": `Our <strong>Operational Hours</strong> (studio & livestream operations) run from <strong>1 PM – 10 PM</strong>. Perfect for afternoon and evening shoots or live sessions! 🎬`
        },
        default: `We have two sets of hours:<br>• <strong>Office Hours:</strong> 9 AM – 6 PM<br>• <strong>Operational Hours:</strong> 1 PM – 10 PM<br><br>Feel free to visit or call during office hours for inquiries!`
    },

    location: {
        chips: ["📍 Location & Address"],
        keywords: ["location", "address", "where", "place", "find", "studio", "makati", "ayala", "visit", "directions", "map"],
        responses: {
            "📍 Location & Address": `We are located at:<br><br>📌 <strong>Unit 1403, 14th Floor</strong><br>Ayala Tower One, Ayala Ave.<br>Makati City<br><br>Easy to reach via MRT (Ayala Station) or by car. 🏙️`
        },
        default: `You can find us at <strong>Unit 1403, 14th Floor, Ayala Tower One, Ayala Ave., Makati City</strong>. 📍`
    },

    contact: {
        chips: ["📬 Contact Info"],
        keywords: ["contact", "email", "phone", "call", "reach", "message", "number", "get in touch", "inquire", "inquiry"],
        responses: {
            "📬 Contact Info": `You can reach us through:<br><br>📧 <strong>Email:</strong> business@theauracreatives.co<br>📞 <strong>Phone:</strong> 09219715546<br>🌐 <strong>Website:</strong> www.theauracreatives.co<br><br>We typically respond within 24 hours on business days! 💬`
        },
        default: `Reach us at 📧 <strong>business@theauracreatives.co</strong> or call us at 📞 <strong>09219715546</strong>.`
    },

    pixelreach: {
        chips: ["🏢 Pixel Reach Inc."],
        keywords: ["pixel", "reach", "pixel reach", "parent", "company", "affiliated", "network", "mcn", "partner"],
        responses: {
            "🏢 Pixel Reach Inc.": `<strong>Pixel Reach Inc.</strong> is our parent company and the Multi-Channel Network (MCN) behind The Aura Creatives. They support our talent management, brand partnerships, and content operations.<br><br>You can find full details about Pixel Reach in the footer section of our website. 🔗`
        },
        default: `<strong>Pixel Reach Inc.</strong> is our parent MCN company. Check the footer of our website for their full details!`
    },

    services: {
        chips: ["🎯 Our Services"],
        keywords: ["service", "offer", "provide", "do you", "livestream", "video", "studio", "artist", "management", "photo", "shoppable", "kol", "influencer", "production", "brand", "marketing", "content", "rental", "shoot"],
        responses: {
            "🎯 Our Services": `Here's what we offer at The Aura Creatives:<br><br>🎙️ <strong>KOL & Artist Livestreaming</strong> — Full studio setup, 5-hour sessions<br>🎬 <strong>Short-Form Video Production</strong> — TikTok, Reels & Shorts (15–45s)<br>📷 <strong>Studio Rental</strong> — Professional gear, lighting & backdrops<br>👑 <strong>Artist Management</strong> — Career strategy, brand deals & PR<br>🎞️ <strong>Marketing Video Production</strong> — Corporate, commercials & social<br>🛒 <strong>Shoppable Pictures</strong> — E-commerce product photography<br><br>Visit the <strong>Services</strong> tab for full details! 🚀`
        },
        default: `We offer <strong>Livestreaming, Short-Form Video, Studio Rental, Artist Management, Marketing Video Production,</strong> and <strong>Shoppable Photography</strong>. Head to our Services tab to learn more!`
    }
};

const FALLBACK_RESPONSES = [
    `I'm not sure I caught that! 😊 Try one of the quick options below, or reach us directly at <strong>business@theauracreatives.co</strong>.`,
    `Hmm, I didn't quite get that. Feel free to use the suggestion chips below or email us at <strong>business@theauracreatives.co</strong> for anything specific!`,
    `That's a great question! For detailed inquiries, drop us a line at 📧 <strong>business@theauracreatives.co</strong> or check our suggestion chips below. 👇`
];

const GREETING_KEYWORDS = ["hi", "hello", "hey", "hiya", "good morning", "good afternoon", "good evening", "sup", "howdy", "yo"];
const GREETING_RESPONSES = [
    `Hey there! 👋 Welcome to <strong>The Aura Creatives</strong>! I'm your Aura Assistant. How can I help you today?`,
    `Hello! 😊 Great to see you here at <strong>The Aura Creatives</strong>. What can I help you with?`,
    `Hi! Welcome aboard! ✨ I'm here to answer your questions about The Aura Creatives. What would you like to know?`
];

const THANKS_KEYWORDS = ["thank", "thanks", "thank you", "thx", "ty", "cheers", "appreciate", "salamat"];
const THANKS_RESPONSES = [
    `You're very welcome! 😊 Is there anything else I can help you with?`,
    `Happy to help! ✨ Feel free to ask if you have more questions.`,
    `Anytime! 🎉 Don't hesitate to reach out if you need anything else.`
];

// ─── 2. STATE ───────────────────────────────────────────────

let _chatInitialized = false;
let _fallbackIndex = 0;
let _suggestionsExpanded = true;

const ALL_SUGGESTION_CHIPS = [
    "🕘 Office Hours",
    "🕐 Operational Hours",
    "📍 Location & Address",
    "🏢 Pixel Reach Inc.",
    "📬 Contact Info",
    "🎯 Our Services"
];

// ─── 3. THEME HELPER ────────────────────────────────────────

function isLightMode() {
    return document.documentElement.classList.contains('light-theme');
}

// ─── 4. ENGINE ───────────────────────────────────────────────

function matchInput(input) {
    const lower = input.toLowerCase().trim();

    if (GREETING_KEYWORDS.some(k => lower === k || lower.startsWith(k + " ") || lower.endsWith(" " + k))) {
        return { response: GREETING_RESPONSES[Math.floor(Math.random() * GREETING_RESPONSES.length)] };
    }

    if (THANKS_KEYWORDS.some(k => lower.includes(k))) {
        return { response: THANKS_RESPONSES[Math.floor(Math.random() * THANKS_RESPONSES.length)] };
    }

    // Exact chip label match
    for (const [, data] of Object.entries(CHATBOT_KB)) {
        for (const chip of data.chips) {
            if (lower === chip.toLowerCase() || input === chip) {
                return { response: data.responses[chip] };
            }
        }
    }

    // Keyword scoring
    const scores = {};
    for (const [cat, data] of Object.entries(CHATBOT_KB)) {
        scores[cat] = data.keywords.filter(kw => lower.includes(kw)).length;
    }

    const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
    if (best && best[1] > 0) {
        return { response: CHATBOT_KB[best[0]].default };
    }

    const resp = FALLBACK_RESPONSES[_fallbackIndex % FALLBACK_RESPONSES.length];
    _fallbackIndex++;
    return { response: resp };
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

    const light = isLightMode();
    const wrapper = document.createElement('div');

    if (who === 'user') {
        wrapper.className = 'aura-chat-row aura-chat-row--user';
        wrapper.innerHTML = `
            <div class="aura-bubble aura-bubble--user">${escapeHtml(html)}</div>
        `;
    } else {
        wrapper.className = 'aura-chat-row aura-chat-row--bot';
        wrapper.innerHTML = `
            <div class="aura-bot-avatar" aria-hidden="true">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="11" width="18" height="10" rx="2.5"/>
                    <path d="M12 2a2.5 2.5 0 0 1 2.5 2.5V11h-5V4.5A2.5 2.5 0 0 1 12 2z"/>
                    <circle cx="8.5" cy="16" r="1"/><circle cx="12" cy="16" r="1"/><circle cx="15.5" cy="16" r="1"/>
                </svg>
            </div>
            <div class="aura-bubble aura-bubble--bot">${html}</div>
        `;
    }

    msgs.appendChild(wrapper);
    // smooth scroll to bottom
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

function toggleSuggestionPanel() {
    const panel = document.getElementById('aura-suggestions-panel');
    const toggle = document.getElementById('aura-toggle-suggestions');
    if (!panel || !toggle) return;
    
    _suggestionsExpanded = !_suggestionsExpanded;
    toggle.setAttribute('aria-expanded', String(_suggestionsExpanded));
    toggle.textContent = _suggestionsExpanded ? '▼ Suggested replies' : '▶ Suggested replies';
    panel.classList.toggle('hidden', !_suggestionsExpanded);
}

function renderSuggestionChips() {
    const { quick } = getChatEls();
    if (!quick) return;

    quick.innerHTML = `
        <div class="aura-suggestions-container">
            <button type="button" id="aura-toggle-suggestions" class="aura-toggle-suggestions" aria-expanded="${_suggestionsExpanded}" aria-label="Toggle suggested replies">${_suggestionsExpanded ? '▼' : '▶'} Suggested replies</button>
            <div id="aura-suggestions-panel" class="aura-suggestions-panel${_suggestionsExpanded ? '' : ' hidden'}">
                ${ALL_SUGGESTION_CHIPS.map(chip => `
                    <button class="aura-chip" data-chip="${chip}" aria-label="Quick reply: ${chip}">${chip}</button>
                `).join('')}
            </div>
        </div>
    `;

    quick.onclick = (e) => {
        const toggle = e.target.closest('#aura-toggle-suggestions');
        if (toggle) {
            toggleSuggestionPanel();
            return;
        }
        
        const btn = e.target.closest('.aura-chip');
        if (!btn) return;
        const { input } = getChatEls();
        if (input) {
            input.value = btn.dataset.chip;
            _suggestionsExpanded = false;
            handleChatbotSend();
        }
    };
}

// ─── 6. INJECT STYLES ────────────────────────────────────────

function injectChatbotStyles() {
    if (document.getElementById('aura-chatbot-styles')) return;

    const style = document.createElement('style');
    style.id = 'aura-chatbot-styles';
    style.textContent = `

/* ── Message area: always scrollable ── */
#chat-messages {
    overflow-y: auto !important;
    overscroll-behavior: contain;   /* stop scroll leaking to page */
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch; /* iOS momentum scroll */

    /* Show a subtle scrollbar inside chat only */
    scrollbar-width: thin;
    scrollbar-color: rgba(200,162,39,0.3) transparent;
}
#chat-messages::-webkit-scrollbar        { width: 4px; }
#chat-messages::-webkit-scrollbar-track  { background: transparent; }
#chat-messages::-webkit-scrollbar-thumb  { background: rgba(200,162,39,0.35); border-radius: 2px; }
#chat-messages::-webkit-scrollbar-thumb:hover { background: rgba(200,162,39,0.6); }

/* Remove the hide-scrollbar override that blocks scroll events */
#chat-messages.hide-scrollbar {
    -ms-overflow-style: auto !important;
    scrollbar-width: thin !important;
}
#chat-messages.hide-scrollbar::-webkit-scrollbar { display: block !important; width: 4px !important; }

/* ── Chat rows ── */
.aura-chat-row {
    display: flex;
    align-items: flex-end;
    gap: 10px;
    margin-top: 14px;
    animation: auraBubbleIn 0.28s cubic-bezier(0.25,1,0.5,1) both;
}
.aura-chat-row--user  { justify-content: flex-end; }
.aura-chat-row--bot   { justify-content: flex-start; }

@keyframes auraBubbleIn {
    from { opacity: 0; transform: translateY(10px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0)   scale(1);    }
}

/* ── Bot avatar ── */
.aura-bot-avatar {
    width: 32px; height: 32px;
    border-radius: 50%;
    flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;

    /* Dark mode default */
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.12);
    color: rgba(255,255,255,0.7);
}

/* ── Bubbles — DARK MODE ── */
.aura-bubble {
    max-width: 82%;
    padding: 12px 16px;
    border-radius: 18px;
    font-size: 0.8375rem;
    line-height: 1.6;
    word-break: break-word;
}

.aura-bubble--bot {
    border-radius: 18px 18px 18px 4px;

    /* Dark mode */
    background: rgba(200,162,39,0.10);
    border: 1px solid rgba(200,162,39,0.18);
    color: #f5f0e8;
}
.aura-bubble--bot strong { color: #e8c84a; }

.aura-bubble--user {
    border-radius: 18px 18px 4px 18px;

    /* Dark mode */
    background: linear-gradient(135deg, #8b6914, #c9a227);
    color: #030201;
    font-weight: 500;
}

/* ── Suggestion chips ── */
.aura-suggestions-container {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
}

.aura-toggle-suggestions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    padding: 8px 12px;
    border-radius: 999px;
    font-size: 0.7rem;
    font-weight: 600;
    cursor: pointer;
    text-align: left;
    border: 1px solid rgba(255,255,255,0.15);
    background: rgba(255,255,255,0.05);
    color: rgba(245,240,232,0.85);
    transition: background 0.22s ease, border-color 0.22s ease, color 0.22s ease;
}

.aura-toggle-suggestions:hover {
    background: rgba(255,255,255,0.12);
    border-color: rgba(255,255,255,0.25);
    color: #f5f0e8;
}

.aura-suggestions-panel {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 0.4rem;
}

.aura-suggestions-panel.hidden {
    display: none;
}

.aura-chip {
    display: inline-flex;
    align-items: center;
    padding: 6px 14px;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.22s ease, border-color 0.22s ease, color 0.22s ease, transform 0.18s ease;

    /* Dark mode */
    background: rgba(200,162,39,0.07);
    border: 1px solid rgba(200,162,39,0.22);
    color: rgba(245,240,232,0.72);
}
.aura-chip:hover {
    background: rgba(200,162,39,0.20);
    border-color: rgba(200,162,39,0.55);
    color: #e8c84a;
    transform: translateY(-1px);
}

/* ═══════════════════════════════════════
   LIGHT MODE OVERRIDES
   ═══════════════════════════════════════ */

html.light-theme .aura-bot-avatar {
    background: rgba(139,105,20,0.08);
    border-color: rgba(139,105,20,0.22);
    color: #8b6914;
}

html.light-theme .aura-bubble--bot {
    background: rgba(255,251,244,0.95);
    border-color: rgba(139,105,20,0.20);
    color: #1a1408;   /* dark warm text — always visible on cream */
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}
html.light-theme .aura-bubble--bot strong {
    color: #8b6914;   /* gold accent for bold */
}

html.light-theme .aura-bubble--user {
    /* keep gradient but tweak slightly for light context */
    background: linear-gradient(135deg, #8b6914, #c9a227);
    color: #fff8e8;
}

html.light-theme .aura-toggle-suggestions {
    border-color: rgba(139,105,20,0.18);
    background: rgba(255,251,244,0.9);
    color: rgba(26,20,8,0.75);
}

html.light-theme .aura-toggle-suggestions:hover {
    background: rgba(200,162,39,0.08);
    border-color: rgba(139,105,20,0.35);
    color: #1a1408;
}

html.light-theme .aura-chip {
    background: rgba(255,251,244,0.85);
    border-color: rgba(139,105,20,0.25);
    color: rgba(26,20,8,0.72);
}
html.light-theme .aura-chip:hover {
    background: rgba(200,162,39,0.12);
    border-color: #c9a227;
    color: #8b6914;
}

/* Light mode — chat header text */
html.light-theme #chat-window h3.text-white {
    color: #1a1408 !important;
}
html.light-theme #chat-window .text-white\\/50 {
    color: rgba(26,20,8,0.52) !important;
}
html.light-theme #chat-window .hover\\:text-white:hover {
    color: #1a1408 !important;
}

/* Light mode — typing indicator dots */
html.light-theme #typing-indicator .bg-white\\/50 {
    background-color: rgba(139,105,20,0.55) !important;
}
html.light-theme #typing-indicator .bg-white\\/5 {
    background: rgba(255,251,244,0.9) !important;
    border-color: rgba(139,105,20,0.20) !important;
}

/* Quick-reply bar bottom border in light */
html.light-theme #chat-window .border-t.border-white\\/10 {
    border-color: rgba(139,105,20,0.15) !important;
}
    `;

    document.head.appendChild(style);
}

// ─── 7. SCROLL FIX (Lenis) ───────────────────────────────────

function fixChatScroll() {
    const msgs = document.getElementById('chat-messages');
    if (!msgs) return;

    // Tell Lenis to leave this element alone
    msgs.setAttribute('data-lenis-prevent', '');

    // Also remove the class that hides the scrollbar entirely
    // (we re-style it via CSS above to show a thin gold one)
    // Keep the class for legacy compat but our CSS overrides it.

    // Prevent wheel events from bubbling to Lenis / the page
    msgs.addEventListener('wheel', (e) => {
        e.stopPropagation();
    }, { passive: true });

    // Touch scroll — prevent page scroll while finger is inside chat
    let touchStartY = 0;
    msgs.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    msgs.addEventListener('touchmove', (e) => {
        const delta = touchStartY - e.touches[0].clientY;
        const atTop    = msgs.scrollTop === 0 && delta < 0;
        const atBottom = msgs.scrollTop + msgs.clientHeight >= msgs.scrollHeight && delta > 0;
        if (!atTop && !atBottom) {
            e.stopPropagation();
        }
    }, { passive: true });
}

// ─── 8. CORE SEND HANDLER ───────────────────────────────────

function handleChatbotSend() {
    const { input } = getChatEls();
    if (!input || !input.value.trim()) return;

    const userText = input.value.trim();
    input.value = '';

    appendBubble('user', userText);
    showTyping();

    const delay = 300 + Math.random() * 500;
    setTimeout(() => {
        hideTyping();
        const { response } = matchInput(userText);
        appendBubble('bot', response);
        renderSuggestionChips();
    }, delay);
}

// ─── 9. INIT ────────────────────────────────────────────────

function initChatbotWidget() {
    if (_chatInitialized) return;
    _chatInitialized = true;

    injectChatbotStyles();
    fixChatScroll();

    const { msgs, input } = getChatEls();

    // Welcome message
    if (msgs && msgs.children.length === 0) {
        setTimeout(() => {
            appendBubble('bot', `Hi there! 👋 Welcome to <strong>The Aura Creatives</strong>!<br>I'm your Aura Assistant. How can I help you today?`);
            setTimeout(() => renderSuggestionChips(), 180);
        }, 420);
    } else {
        renderSuggestionChips();
    }

    // Keyboard send — clone input to remove any stale listeners
    if (input) {
        const fresh = input.cloneNode(true);
        input.parentNode.replaceChild(fresh, input);
        fresh.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleChatbotSend();
        });
    }

    // Override global handler used by app.js delegation
    window.handleChatSend = handleChatbotSend;

    // Also wire send button directly (capture phase beats app.js)
    const sendBtn = document.getElementById('send-btn');
    if (sendBtn) {
        sendBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopImmediatePropagation();
            handleChatbotSend();
        }, true);
    }

    console.log('[AuraAssistant] Chatbot v2 initialized ✓');
}

// ─── 10. BOOT ────────────────────────────────────────────────

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(initChatbotWidget, 320));
} else {
    setTimeout(initChatbotWidget, 320);
}

window.initChatbotWidget  = initChatbotWidget;
window.handleChatbotSend  = handleChatbotSend;
