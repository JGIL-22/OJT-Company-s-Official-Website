// "use strict";
// Firebase imports removed for local file:// compatibility
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// console.log("SCRIPT EXECUTED - Non-module mode");

// ==========================================
// PART 0: FIREBASE CONFIGURATION (SAFE INIT)
// ==========================================
const firebaseConfig = {
    apiKey: "AIzaSyC97VjPaad6iirasxMvY0oaMTf8ffH3ed4",
    authDomain: "the-aura-759bc.firebaseapp.com",
    projectId: "the-aura-759bc",
    storageBucket: "the-aura-759bc.firebasestorage.app",
    messagingSenderId: "480041563762",
    appId: "1:480041563762:web:d87417546fbe18d3f5b4eb",
    measurementId: "G-87LFNMSSVW"
};

let app, analytics;

try {
    if (typeof firebase !== 'undefined') {
        app = firebase.initializeApp(firebaseConfig);
        analytics = firebase.analytics();
        console.log("Firebase initialized successfully.");
    } else {
        console.warn("Firebase SDK not loaded (offline or blocked). App continuing without it.");
    }
} catch (error) {
    console.error("Firebase failed, but app continues:", error);
}

// ==========================================
// PART 1: CONSOLIDATED DATA (Data & Icons)
// ==========================================

const ICONS = {
    Radio: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"/></svg>',
    Video: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>',
    Camera: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>',
    Users: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    ShoppingBag: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
    CheckCircle2: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>',
    ArrowRight: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
    ArrowUpRight: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>',
    Instagram: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>',
    Facebook: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
    TikTok: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>',
    Menu: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>',
    X: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
    ArrowLeft: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>',
    Mail: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
    Phone: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    MapPin: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    Bot: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z"/><path d="M12 22v-8"/><path d="M16 10a4 4 0 0 1 4 4v4"/><path d="M8 10a4 4 0 0 0-4 4v4"/></svg>',
    User: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>'
};

const COMPANY_INFO = {
    name: "THE AURA CREATIVES",
    description: "Founded in April 2025, The Aura is a dynamic multimedia marketing and talent management agency built for the digital age. We specialize in short-form video content and high-converting livestreaming.",
    contactEmail: "business@theauracreatives.co",
    contactPhone: "09219715546",
    website: "www.theauracreatives.co"
};

const SERVICES = [
    {
        id: "kol-artist-livestreaming",
        title: "KOL & Artist Livestreaming",
        description: "Full studio setup, technical support, and livestream management to boost sales and engagement.",
        longDescription: "Maximize your brand's reach and sales potential with our premium livestreaming services. We combine professional broadcast technology with the influence of top KOLs and artists to create engaging, high-converting live events.",
        features: ["5 Hours Livestream Duration", "2 to 3 Teaser Videos", "Full Studio Setup (Camera, Mic, TV, Computer)", "Co-Host & Admin Support", "Dedicated Livestream Manager", "Background Design & Set Styling", "Professional OBS Linking"],
        images: ["https://picsum.photos/seed/stream1/800/600", "https://picsum.photos/seed/stream2/800/600"],
        icon: "Radio",
        folders: [
            { name: "TALENTS", link: "#talents?from=kol", images: ["https://picsum.photos/seed/talent1/400/500", "https://picsum.photos/seed/talent2/400/500", "https://picsum.photos/seed/talent3/400/500", "https://picsum.photos/seed/talent4/400/500"] },
            { name: "LIVE", images: ["https://picsum.photos/seed/live1/800/600", "https://picsum.photos/seed/live2/800/600", "https://picsum.photos/seed/live3/800/600", "https://picsum.photos/seed/live4/800/600", "https://picsum.photos/seed/live5/800/600", "https://picsum.photos/seed/live6/800/600"] }
        ]
    },
    {
        id: "short-form-video-production",
        title: "Short-Form Video Production",
        description: "High-quality 15-45s vertical videos optimized for TikTok and Reels with strategic storytelling.",
        longDescription: "Capture attention in seconds. Our team specializes in producing high-impact vertical videos tailored for TikTok, Reels, and Shorts. We manage the entire process from ideation to final edit.",
        features: ["15 to 45 Seconds Video Duration", "Direct KOL Communication", "KOL Content Production & Direction", "KOL Draft Tracker & Feedback Loop", "Trend Analysis & Adaptation", "Strategic Storytelling & Scripting"],
        images: [],
        folders: [
            { name: "TIKTOK ADS", images: ["https://picsum.photos/seed/tiktok1/400/700", "https://picsum.photos/seed/tiktok2/400/700", "https://picsum.photos/seed/tiktok3/400/700", "https://picsum.photos/seed/tiktok4/400/700"] },
            { name: "IG REELS", images: ["https://picsum.photos/seed/reels1/400/700", "https://picsum.photos/seed/reels2/400/700", "https://picsum.photos/seed/reels3/400/700", "https://picsum.photos/seed/reels4/400/700"] },
            { name: "UGC CONTENT", images: ["https://picsum.photos/seed/ugc1/400/700", "https://picsum.photos/seed/ugc2/400/700", "https://picsum.photos/seed/ugc3/400/700", "https://picsum.photos/seed/ugc4/400/700"] },
            { name: "EVENT HIGHLIGHTS", images: ["https://picsum.photos/seed/events1/400/700", "https://picsum.photos/seed/events2/400/700", "https://picsum.photos/seed/events3/400/700", "https://picsum.photos/seed/events4/400/700"] }
        ],
        icon: "Video"
    },
    { id: "studio-rental", title: "Studio Rental", description: "Professional space equipped for livestreams, photoshoots, and video production.", longDescription: "Step into a space designed for creators. Our studio is fully equipped with industry-standard lighting, audio, and video gear.", features: ["Professional Lighting Grid", "High-Fidelity Audio Equipment", "Customizable Sets & Backdrops", "High-Speed Internet for Streaming", "Dressing & Makeup Area", "On-Site Technical Assistance"], images: ["https://picsum.photos/seed/studio1/800/600", "https://picsum.photos/seed/studio2/800/600"], icon: "Camera" },
    { id: "artist-management", title: "Artist Management", description: "End-to-end support for influencers, creators, and celebrities to maximize their brand potential.", longDescription: "We empower talent. Our artist management division is dedicated to nurturing careers, negotiating high-value brand partnerships.", features: ["Career Strategy & Planning", "Brand Partnership Negotiation", "Public Relations & Crisis Management", "Content Strategy Consultation", "Exclusive Event Access", "Legal & Contract Support"], images: ["https://picsum.photos/seed/mgmt1/800/600", "https://picsum.photos/seed/mgmt2/800/600"], icon: "Users" },
    {
        id: "marketing-video-production",
        title: "Marketing Video Production",
        description: "Professional video production services for brands, from concept to final cut.",
        longDescription: "Transform your brand story into compelling visual narratives. Our full-service video production team handles everything from creative concepting and scriptwriting to filming and post-production, delivering cinematic quality content that drives results.",
        features: ["Creative Concept Development", "Professional Scriptwriting", "Multi-Camera Production", "Professional Lighting & Audio", "Advanced Color Grading", "Motion Graphics & VFX", "Licensed Music & Sound Design", "Multi-Format Export (Social, Web, Broadcast)"],
        images: [],
        folders: [
            { name: "CORPORATE VIDEOS", images: ["https://picsum.photos/seed/corp1/800/600", "https://picsum.photos/seed/corp2/800/600", "https://picsum.photos/seed/corp3/800/600", "https://picsum.photos/seed/corp4/800/600"] },
            { name: "COMMERCIALS", images: ["https://picsum.photos/seed/commercial1/800/600", "https://picsum.photos/seed/commercial2/800/600", "https://picsum.photos/seed/commercial3/800/600", "https://picsum.photos/seed/commercial4/800/600"] },
            { name: "SOCIAL MEDIA VIDEOS", images: ["https://picsum.photos/seed/social1/400/700", "https://picsum.photos/seed/social2/400/700", "https://picsum.photos/seed/social3/400/700", "https://picsum.photos/seed/social4/400/700"] },
            { name: "EVENT COVERAGE", images: ["https://picsum.photos/seed/event1/800/600", "https://picsum.photos/seed/event2/800/600", "https://picsum.photos/seed/event3/800/600", "https://picsum.photos/seed/event4/800/600"] }
        ],
        icon: "Video"
    },
    {
        id: "shoppable-pictures",
        title: "Shoppable Pictures",
        description: "High-quality product photography designed specifically for e-commerce conversion.",
        longDescription: "Visuals that sell. We create high-definition, commercially optimized product photography that highlights features and drives conversion.",
        features: ["High-Quality Product Images", "Lifestyle & Studio Settings", "Post-Production Editing & Retouching", "Full Suite of Creative & Technical Steps", "E-commerce Platform Optimization", "Production Execution"],
        images: [],
        folders: [
            {
                name: "BEAUTY",
                images: ["assets/images/p1.png", "assets/images/p2.png", "assets/images/p3.png", "assets/images/p4.png", "assets/images/p5.png", "assets/images/p6.png"]
            },
            { name: "ELECTRONICS", images: ["https://picsum.photos/seed/elec1/600/600", "https://picsum.photos/seed/elec2/600/600", "https://picsum.photos/seed/elec3/600/600", "https://picsum.photos/seed/elec4/600/600"] },
            { name: "GOLD", images: ["https://picsum.photos/seed/gold1/600/600", "https://picsum.photos/seed/gold2/600/600", "https://picsum.photos/seed/gold3/600/600", "https://picsum.photos/seed/gold4/600/600", "https://picsum.photos/seed/gold5/600/600"] },
            { name: "LIFESTYLE", images: ["https://picsum.photos/seed/lifestyle1/600/600", "https://picsum.photos/seed/lifestyle2/600/600", "https://picsum.photos/seed/lifestyle3/600/600", "https://picsum.photos/seed/lifestyle4/600/600"] },
            { name: "FASHION", images: ["https://picsum.photos/seed/fashion1/600/600", "https://picsum.photos/seed/fashion2/600/600", "https://picsum.photos/seed/fashion3/600/600", "https://picsum.photos/seed/fashion4/600/600", "https://picsum.photos/seed/fashion5/600/600"] },
            { name: "HEALTH", images: ["https://picsum.photos/seed/health1/600/600", "https://picsum.photos/seed/health2/600/600", "https://picsum.photos/seed/health3/600/600", "https://picsum.photos/seed/health4/600/600"] },
            { name: "MOM AND BABY", images: ["https://picsum.photos/seed/baby1/600/600", "https://picsum.photos/seed/baby2/600/600", "https://picsum.photos/seed/baby3/600/600", "https://picsum.photos/seed/baby4/600/600", "https://picsum.photos/seed/baby5/600/600", "https://picsum.photos/seed/baby6/600/600"] }
        ],
        icon: "ShoppingBag"
    }
];

const ARTISTS = [
    { id: "igiboy", name: "IGIBOY", role: "Artist | Content Creator", categories: ["Fashion", "Electronics", "Lifestyle"], followers: [{ platform: "TikTok", count: "19,000+", handle: "@igiboyflores31" }, { platform: "Instagram", count: "93,600+", handle: "@igiboyflores" }, { platform: "Facebook", count: "57,100+", handle: "@igiboyflores31" }], ratePerLive: "50,000", packageRate: "120,000 (3 Live)", image: "assets/images/igiboy.png", about: "Igiboy is a versatile artist and content creator known for his engaging lifestyle content.", gallery: ["https://picsum.photos/seed/igiboy1/400/500", "https://picsum.photos/seed/igiboy2/400/500"] },
    { id: "sofi", name: "SOFI", role: "Content Creator | KOL", categories: ["Beauty", "Fashion", "Electronics"], followers: [{ platform: "TikTok", count: "144,600", handle: "@sofifermazi" }, { platform: "Instagram", count: "13,900+", handle: "@sofifermazi" }], ratePerLive: "35,000", packageRate: "100,000 (3 Live)", image: "assets/images/sofi.png", about: "Sofi brings a fresh perspective to beauty and fashion content.", gallery: ["https://picsum.photos/seed/sofi1/400/500", "https://picsum.photos/seed/sofi2/400/500"] },
    { id: "miro", name: "MIRO", role: "Model | KOL | Influencer", categories: ["Fashion", "Skincare", "Electronics"], followers: [{ platform: "TikTok", count: "309,400", handle: "@miromacs" }, { platform: "Instagram", count: "181,000", handle: "@miromacs" }], ratePerLive: "50,000", packageRate: "80,000 (2 Live)", image: "assets/images/miro.png", gallery: ["https://picsum.photos/seed/miro1/400/500", "https://picsum.photos/seed/miro2/400/500"] },
    { id: "jaja", name: "JAJA", role: "Artist | Content Creator", categories: ["Fashion", "Skincare", "Electronics"], followers: [{ platform: "TikTok", count: "3,100,000+", handle: "@vladiaxdisuanco" }, { platform: "Instagram", count: "227,000+", handle: "@vladiaxdisuanco" }], ratePerLive: "100,000", packageRate: "170,000 (2 Live)", image: "assets/images/jaja.png", gallery: ["https://picsum.photos/seed/jaja1/400/500", "https://picsum.photos/seed/jaja2/400/500"] },
    { id: "criselda", name: "CRISELDA", role: "Influencer | KOL", categories: ["Fashion", "Fitness", "Lifestyle"], followers: [{ platform: "TikTok", count: "10,400,000+", handle: "@chickennuggetsop" }, { platform: "Facebook", count: "2,400,000+", handle: "@alvarezcriselda" }], ratePerLive: "200,000", packageRate: "350,000 (2 Live)", image: "assets/images/criselda.png", gallery: ["https://picsum.photos/seed/cris1/400/500", "https://picsum.photos/seed/cris2/400/500"] },
    { id: "bugoi", name: "BUGOI", role: "Artist | Content Creator", categories: ["Electronics"], followers: [{ platform: "TikTok", count: "TBA", handle: "@bugoi_tba" }, { platform: "Instagram", count: "TBA", handle: "@bugoi_tba" }, { platform: "Facebook", count: "TBA", handle: "@bugoi_tba" }], ratePerLive: "50,000", packageRate: "120,000 (3 Live)", image: "assets/images/bugoy.png", about: "Bugoi is a versatile artist and content creator known for his engaging lifestyle content.", gallery: ["https://picsum.photos/seed/bugoi1/400/500", "https://picsum.photos/seed/bugoi2/400/500"] }
];

const CASE_STUDIES = [
    { title: "Bingo Plus Music Festival", date: "October 2025", description: "A vibrant celebration of music where sound meets soul. We managed influencer relations and live coverage.", image: "https://picsum.photos/seed/festival/800/600", metrics: [{ label: "Total Reach", value: "9,058,615" }, { label: "Total Views", value: "5,578,439" }, { label: "Engagement", value: "45,635" }, { label: "Influencers", value: "30+" }] }
];

const CLIENTS = ["Oppo", "Infinix", "BELO", "Honor", "BingoPlus", "Canon", "Anker", "Insta360"];

// ==========================================
// PART 2: APP LOGIC & GLOBAL DELEGATION
// ==========================================

// App State
let currentFilter = 'All';

const initApp = () => {
    console.log("Initializing App State...");
    populateData();
    initRouter();
    initLenis();
    initPreloader();
    initScrollEffects();
    initChatWidget();
    initScrollReveal();

    initParticles();
    initCustomCursor();

    // Fix: Programmatically add playsinline to satisfy HTML linter while supporting iOS
    document.querySelectorAll('video').forEach(v => {
        v.setAttribute('playsinline', '');
        v.setAttribute('webkit-playsinline', '');
    });

    // --- GLOBAL EVENT DELEGATION FOR NAVIGATION ---
    document.addEventListener('click', function (e) {
        // 1. Mobile Menu Toggle
        if (e.target.closest('#mobile-menu-btn')) {
            toggleMobileMenu();
        }

        // 2. Chat Widget Toggle
        if (e.target.closest('#toggle-chat-btn') || e.target.closest('#close-chat-btn')) {
            toggleChat();
        }

        // 3. Chat Send
        if (e.target.closest('#send-btn')) {
            e.preventDefault();
            handleChatSend();
        }

        // 4. Filter Talents
        const filterBtn = e.target.closest('[data-filter]');
        if (filterBtn) {
            filterTalents(filterBtn.dataset.filter);
        }

        // 5. Handle 'Back' Buttons & Global Router (Standardized)
        if (e.target.closest('.js-back-btn') || e.target.closest('[data-route]')) {
            const el = e.target.closest('.js-back-btn') || e.target.closest('[data-route]');

            // Logic Rule: If it's an anchor with a hash ref, let the browser handle it.
            if (el.tagName === 'A' && el.getAttribute('href')?.startsWith('#')) {
                return; // Do nothing, allow default behavior
            }

            e.preventDefault();
            const route = el.dataset.route;
            if (route) {
                window.location.hash = route;
            }
        }
    });
};

// --- INITIALIZATION ---
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// --- FUNCTIONS ---

// Exposed Globals (for legacy safety, though delegation handles most)
// Exposed Globals
window.toggleMobileMenu = toggleMobileMenu;
window.toggleChat = toggleChat;

// --- SCROLL REVEAL ---
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
}

// --- ROUTER ---
function initRouter() {
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
}

function handleHashChange() {
    const fullHash = window.location.hash.substring(1) || 'home';
    const [route] = fullHash.split('?');
    const views = document.querySelectorAll('.page-view');
    const navbar = document.getElementById('navbar');
    const footer = document.querySelector('footer');

    if (navbar) navbar.classList.remove('hidden');
    if (footer) footer.classList.remove('hidden');

    views.forEach(view => {
        view.classList.remove('active');
    });
    window.scrollTo(0, 0);

    const mobileMenu = document.getElementById('mobile-menu');
    // Auto-close menu on route change
    if (mobileMenu && !mobileMenu.classList.contains('translate-x-full')) toggleMobileMenu();

    let activeViewId = 'view-home';
    if (route === 'services') { renderServicesPage(); activeViewId = 'view-services'; }
    else if (route.startsWith('services/')) { renderServiceDetail(route.split('/')[1]); activeViewId = 'view-service-detail'; }
    else if (route === 'talents') { renderTalentsPage(); activeViewId = 'view-talents'; }
    else if (route.startsWith('talents/')) { renderTalentDetail(route.split('/')[1]); activeViewId = 'view-talent-detail'; }
    else if (route === 'case-studies') { renderCaseStudies(); activeViewId = 'view-case-studies'; }
    else if (route === 'contact') { activeViewId = 'view-contact'; }
    else if (route.startsWith('gallery/')) {
        renderGalleryView(decodeURIComponent(route.split('/')[1]));
        activeViewId = 'view-gallery';
        if (navbar) navbar.classList.add('hidden');
        if (footer) footer.classList.add('hidden');
    }

    const view = document.getElementById(activeViewId);
    if (view) {
        view.classList.add('active');
    } else if (document.getElementById('view-home')) {
        document.getElementById('view-home').classList.add('active');
    }
}

// --- DATA POPULATION ---
function populateData() {
    const footerDesc = document.getElementById('footer-description');
    if (footerDesc) footerDesc.textContent = COMPANY_INFO.description;

    const ticker = document.getElementById('client-ticker');
    if (ticker) {
        const list = [...CLIENTS, ...CLIENTS];
        ticker.innerHTML = list.map(c => `<span class="text-xl font-sans font-bold text-white/40 uppercase tracking-widest px-8 hover:text-white transition-colors duration-300 cursor-default">${c}</span>`).join('');
    }

    const homeGrid = document.getElementById('home-services-grid');
    if (homeGrid) {
        homeGrid.innerHTML = SERVICES.slice(0, 3).map(s => `
                <a href="#services/${s.id}" data-page="service-detail" class="group bg-black p-12 border border-transparent hover:border-white/50 hover:bg-white/5 transition-colors duration-300 block relative">
                    <div class="w-12 h-12 border border-white/20 flex items-center justify-center mb-8 group-hover:border-white transition-colors text-white">${ICONS[s.icon] || ICONS.Radio}</div>
                    <h3 class="text-2xl font-serif mb-4 text-white">${s.title}</h3>
                    <p class="text-white/50 mb-8 font-light">${s.description}</p>
                </a>
            `).join('');
    }

    const menuBtn = document.getElementById('mobile-menu-btn');
    if (menuBtn) menuBtn.innerHTML = ICONS.Menu;
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const btn = document.getElementById('mobile-menu-btn');
    if (!menu || !btn) return;
    const isOpen = !menu.classList.contains('translate-x-full');
    if (isOpen) {
        menu.classList.add('translate-x-full'); menu.classList.remove('translate-x-0');
        btn.innerHTML = ICONS.Menu;
        document.body.classList.remove('overflow-hidden');
    } else {
        menu.classList.remove('translate-x-full'); menu.classList.add('translate-x-0');
        btn.innerHTML = ICONS.X;
        document.body.classList.add('overflow-hidden');
    }
}

// --- RENDERERS ---
function renderServicesPage() {
    const list = document.getElementById('services-list');
    if (!list) return;
    list.innerHTML = SERVICES.map(s => `
            <a href="#services/${s.id}" data-page="service-detail" class="group relative flex items-center gap-8 p-8 border border-white/10 bg-transparent transition-all duration-500 hover:border-white/40 hover:bg-white/[0.03] rounded-xl overflow-hidden">
                <div class="w-16 h-16 shrink-0 rounded-full bg-white/5 flex items-center justify-center text-white/50 transition-all duration-500 group-hover:bg-white group-hover:text-black group-hover:scale-110">
                    ${ICONS[s.icon] || ICONS.Radio}
                </div>
                <div class="flex-1">
                    <h3 class="text-3xl font-serif text-white mb-2 group-hover:translate-x-2 transition-transform duration-500">${s.title}</h3>
                    <p class="text-white/60 font-light">${s.description}</p>
                </div>
                <div class="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500 text-white">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </div>
            </a>
        `).join('');
}

function renderServiceDetail(id) {
    const s = SERVICES.find(x => x.id === id);
    const c = document.getElementById('view-service-detail');
    if (!s || !c) return;

    const hero = (s.images && s.images[0]) ? s.images[0] : '';

    c.innerHTML = `
            <div class="relative h-[50vh] flex items-center border-b border-white/10 mb-20 overflow-hidden">
                <div class="absolute inset-0 z-0"><img src="${hero}" class="w-full h-full object-cover opacity-30 grayscale" /></div>
                <div class="container mx-auto px-6 relative z-10 pt-20">
                    <a href="#services" class="js-back-btn text-white/50 hover:text-white uppercase text-xs font-bold tracking-widest mb-8 block" data-route="services">← Back to Services</a>
                    <h1 class="font-serif text-5xl md:text-7xl text-white mb-6">${s.title}</h1>
                </div>
            </div>
            <div class="container mx-auto px-6 pb-20">
                <p class="text-white/70 text-lg leading-relaxed font-light mb-16 max-w-4xl">${s.longDescription}</p>
                <h3 class="font-serif text-3xl mb-8">Features</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">${s.features.map(f => `<div class="flex items-center gap-3 text-white/80">${ICONS.CheckCircle2} ${f}</div>`).join('')}</div>
                ${renderFolders(s.folders, s.images)}
                <div class="mt-20 pt-10 border-t border-white/10 text-center">
                    <a href="#contact" data-page="contact" class="inline-block px-10 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200">Inquire Now</a>
                </div>
            </div>
        `;
}

function renderFolders(folders, flatImages) {
    if (!folders || folders.length === 0) {
        if (!flatImages || flatImages.length === 0) return '';
        // Small folders usually just images
        return `<div class="grid grid-cols-1 md:grid-cols-2 gap-8">${flatImages.map(img => `<img src="${img}" class="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500" />`).join('')}</div>`;
    }
    return `<div class="grid grid-cols-1 gap-16">${folders.map(f => `
            <div>
                <a href="${f.link || '#gallery/' + f.name}" data-page="gallery" class="block group">
                    <h4 class="font-serif text-3xl text-white mb-6 group-hover:text-zinc-400 transition-colors">${f.name} <span class="text-sm align-middle opacity-50 ml-2">(${f.images.length})</span></h4>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        ${f.images.slice(0, 4).map(img => `<div class="aspect-[4/5] overflow-hidden"><img src="${img}" class="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" /></div>`).join('')}
                    </div>
                </a>
            </div>
        `).join('')}</div>`;
}

function renderTalentsPage() {
    const container = document.getElementById('talent-filters');
    if (container) {
        container.innerHTML = ['All', 'Fashion', 'Beauty', 'Electronics'].map(cat => `<button data-filter="${cat}" class="px-6 py-2 border ${currentFilter === cat ? 'bg-white text-black' : 'border-white/20 text-white/50'}">${cat}</button>`).join('');
    }
    renderTalentsGrid();
}

function filterTalents(cat) {
    if (currentFilter === cat) return; // Optimization: Avoid re-render if same category

    const grid = document.getElementById('talents-grid');
    if (!grid) {
        currentFilter = cat;
        renderTalentsPage();
        return;
    }

    // 1. Fade Out
    grid.style.transition = 'all 300ms ease-in-out';
    grid.classList.add('opacity-0', 'translate-y-4');

    // 2. Wait, Update, Fade In
    setTimeout(() => {
        currentFilter = cat;
        renderTalentsPage(); // Re-renders grid and buttons

        // Re-select grid in case it was blown away (though renderTalentsPage re-uses the container usually)
        // Actually renderTalentsPage calls renderTalentsGrid which updates innerHTML, preserving the container.
        // But renderTalentsPage ALSO updates the filter buttons.

        // We need to re-select because reference might be lost if container was replaced? 
        // renderTalentsPage updates 'talent-filters' and calls renderTalentsGrid. 
        // 'talents-grid' is usually static in HTML, but let's be safe.
        const newGrid = document.getElementById('talents-grid');
        if (newGrid) {
            // Force browser to accept the 'opacity-0' state before removing it for transition to work
            // (Standard reflow trigger)
            void newGrid.offsetWidth;

            newGrid.style.transition = 'all 300ms ease-in-out';
            newGrid.classList.remove('opacity-0', 'translate-y-4');
        }
    }, 300);
}

function renderTalentsGrid() {
    const grid = document.getElementById('talents-grid');
    if (!grid) return;
    const filtered = currentFilter === 'All' ? ARTISTS : ARTISTS.filter(a => a.categories.includes(currentFilter));
    grid.innerHTML = filtered.map(a => `
            <a href="#talents/${a.id}" data-page="talent-detail" class="group block border border-white/10 bg-neutral-900 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(255,255,255,0.1)]">
                <div class="aspect-[3/4] overflow-hidden"><img src="${a.image}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-transform duration-700 ease-out group-hover:scale-105" /></div>
                <div class="p-6">
                    <h3 class="font-serif text-2xl text-white mb-2">${a.name}</h3>
                    <p class="text-xs font-bold uppercase tracking-widest text-white/40">${a.role}</p>
                </div>
            </a>
        `).join('');
}

function renderTalentDetail(id) {
    const a = ARTISTS.find(x => x.id === id);
    const c = document.getElementById('view-talent-detail');
    if (!a || !c) return;
    c.innerHTML = `
            <div class="container mx-auto px-6 py-20">
                <a href="#talents" class="js-back-btn inline-flex items-center gap-3 text-xs md:text-sm font-bold tracking-widest uppercase text-white/60 hover:text-white transition-all duration-300 mb-10 px-4 py-3 md:px-6 md:py-4 hover:bg-white/10 rounded-full w-fit">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    BACK TO TALENTS
                </a>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div><img src="${a.image}" class="w-full h-auto" /></div>
                    <div>
                        <h1 class="font-serif text-6xl text-white mb-4">${a.name}</h1>
                        <p class="text-sm font-bold uppercase tracking-widest text-white/50 mb-8">${a.role}</p>
                        <p class="text-white/70 text-lg leading-relaxed mb-12">${a.about || 'A leading creator in the industry.'}</p>
                        <div class="grid grid-cols-2 gap-8 border-y border-white/10 py-8 mb-12">
                            <div><div class="text-xs uppercase text-white/40 mb-2">Livestream Rate</div><div class="text-2xl font-serif">₱${a.ratePerLive}</div></div>
                            <div><div class="text-xs uppercase text-white/40 mb-2">Package Rate</div><div class="text-2xl font-serif">₱${a.packageRate}</div></div>
                        </div>
                        <h3 class="font-serif text-2xl mb-6">Gallery</h3>
                        <div class="grid grid-cols-2 gap-4">${a.gallery.map(img => `<img src="${img}" class="w-full h-auto" />`).join('')}</div>
                    </div>
                </div>
            </div>
        `;
}

function renderGalleryView(folderName) {
    let folder = null;
    SERVICES.forEach(s => {
        if (s.folders) {
            const f = s.folders.find(x => x.name === folderName);
            if (f) folder = f;
        }
    });

    const c = document.getElementById('view-gallery');
    if (!c) return;

    if (!folder) { c.innerHTML = '<div class="p-20 text-center text-white">Gallery not found.</div>'; return; }

    // FIXED: VERTICAL STACK LAYOUT
    c.innerHTML = `
            <div class="container mx-auto px-6 py-20">
                <a href="#services" class="inline-flex items-center gap-3 text-xs md:text-sm font-bold tracking-widest uppercase text-white/60 hover:text-white transition-all duration-300 mb-10 px-4 py-3 md:px-6 md:py-4 hover:bg-white/10 rounded-full w-fit">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    BACK TO SERVICES
                </a>
                <div class="text-center mb-20">
                    <h1 class="font-serif text-6xl md:text-8xl text-white mb-6">${folder.name}</h1>
                </div>
                
                <div class="flex flex-col items-center gap-24">
                    ${folder.images.map(img => `
                        <div class="w-full max-w-4xl">
                            <img src="${img}" class="w-full h-auto shadow-2xl" />
                        </div>
                    `).join('')}
                </div>
                
                <div class="text-center mt-20">
                    <p class="text-white/50 text-sm">End of Gallery</p>
                </div>
            </div>
        `;
}

function renderCaseStudies() {
    const l = document.getElementById('case-studies-list');
    if (!l) return;

    // Apply Vertical Stack Container Classes (Fit to Screen)
    l.className = "flex flex-col gap-20 max-w-5xl mx-auto w-full";

    l.innerHTML = CASE_STUDIES.map((s, index) => `
            <div class="w-full">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
                    <!-- Image Side -->
                    <div class="h-[500px] w-full overflow-hidden rounded-2xl relative group">
                        <img src="${s.image}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                    </div>

                    <!-- Content Side -->
                    <div class="bg-white/5 backdrop-blur-md p-10 rounded-2xl border border-white/10 flex flex-col justify-center h-[500px]"> <!-- Matched height -->
                        <span class="text-xs font-bold uppercase tracking-widest text-white/40 mb-6">${s.date || '2025'}</span>
                        <h3 class="font-serif text-4xl md:text-6xl text-white mb-8 leading-tight">${s.title}</h3>
                        <p class="text-white/60 text-lg font-light mb-12 max-w-xl">${s.description}</p>
                        
                        <!-- Metrics Grid -->
                        <div class="grid grid-cols-2 gap-y-8 gap-x-4">
                            ${s.metrics.map(m => `
                                <div>
                                    <div class="text-3xl md:text-4xl font-bold text-white mb-2" style="text-shadow: 0 0 20px rgba(255,255,255,0.3);">${m.value}</div>
                                    <div class="text-[10px] uppercase tracking-widest text-white/50">${m.label}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
}

// --- PRELOADER ---
function initPreloader() {
    console.log("Initializing Cinematic Preloader (The Swap)...");

    const top = document.getElementById('curtain-top');
    const bottom = document.getElementById('curtain-bottom');
    const preloaderText = document.getElementById('preloader-text');
    const heroH1 = document.querySelector('#view-home h1'); // Select main Hero H1

    if (!top || !bottom || !preloaderText) {
        console.warn("Preloader elements not found.");
        return;
    }

    // 1. Initial State
    // Hide Hero H1 immediately so it doesn't double-up
    if (heroH1) {
        heroH1.style.opacity = '0';
        heroH1.style.transition = 'opacity 1s ease-in-out';
    }

    top.style.transform = 'translateY(0)';
    bottom.style.transform = 'translateY(0)';
    preloaderText.style.opacity = '0';
    document.body.style.overflow = 'hidden';

    // 2. Timeline
    // 0.1s: Fade In Preloader Text
    setTimeout(() => {
        preloaderText.style.transition = 'opacity 2s ease-in-out';
        preloaderText.style.opacity = '1';
    }, 100);

    // 3.0s: Fade Out Preloader Text (Fade to Black)
    setTimeout(() => {
        preloaderText.style.transition = 'opacity 0.8s ease-out';
        preloaderText.style.opacity = '0';
    }, 3000);

    // 3.5s: Open Curtains & Reveal Hero
    setTimeout(() => {
        // Curtains Open (4.5s Slow-Mo)
        const curtainTransition = 'transform 4.5s cubic-bezier(0.22, 1, 0.36, 1)';
        top.style.transition = curtainTransition;
        bottom.style.transition = curtainTransition;
        top.style.transform = 'translateY(-100%)';
        bottom.style.transform = 'translateY(100%)';

        // Fade IN Hero H1 (Waiting behind curtains)
        if (heroH1) {
            heroH1.style.opacity = '1';
        }

        // Cleanup
        setTimeout(() => {
            document.body.style.overflow = '';
            preloaderText.style.display = 'none';
        }, 4500);

    }, 3000);
}

// --- EFFECTS ---
function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    const logo = document.getElementById('main-logo');

    window.addEventListener('scroll', () => {
        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.classList.add('bg-black/90', 'backdrop-blur-md');
            if (logo) {
                logo.classList.remove('h-20', 'md:h-40');
                logo.classList.add('h-16');
            }
        } else {
            navbar.classList.remove('bg-black/90', 'backdrop-blur-md');
            if (logo) {
                logo.classList.remove('h-16');
                logo.classList.add('h-20', 'md:h-40');
            }
        }
    });
}

function initMouseSpotlight() {
    const s = document.getElementById('mouse-spotlight');
    if (s) window.addEventListener('mousemove', (e) => s.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(255,255,255,0.06), transparent 80%)`);
}

function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    const particleCount = 50;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        draw() {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        requestAnimationFrame(animate);
    }

    init();
    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });
}

// --- LENIS SMOOTH SCROLL ---
function initLenis() {
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Connect Lenis to ScrollTrigger if you use GSAP, otherwise just global exposure if needed
        window.lenis = lenis;
        console.log("Lenis initialized");
    } else {
        console.warn("Lenis library not found.");
    }
}

// --- CHAT WIDGET ---
function initChatWidget() {
    const msgs = document.getElementById('chat-messages');
    if (msgs && msgs.children.length === 0) {
        const div = document.createElement('div');
        div.className = "flex justify-start animate-fade-in-up";
        div.innerHTML = `<div class="bg-white/10 px-5 py-3 rounded-2xl text-sm text-white">Hi! How can I help you?</div>`;
        msgs.appendChild(div);

        const quick = document.getElementById('quick-replies');
        if (quick) {
            quick.innerHTML = ["What are your rates?", "Do you have influencers?", "How do livestreams work?", "Where is your studio?"].map(r => `<button class="quick-reply-btn whitespace-nowrap px-4 py-2 rounded-full border border-white/20 bg-white/5 text-xs text-white/70 hover:bg-white hover:text-black transition-all">${r}</button>`).join('');

            // Add Event Delegation for Quick Replies
            quick.addEventListener('click', (e) => {
                const btn = e.target.closest('.quick-reply-btn');
                if (btn) {
                    const input = document.getElementById('chat-input');
                    if (input) {
                        input.value = btn.textContent;
                        handleChatSend();
                    }
                }
            });
        }
    }

    const input = document.getElementById('chat-input');
    if (input) {
        input.onkeypress = (e) => {
            if (e.key === 'Enter') handleChatSend();
        };
    }
}

function toggleChat(e) {
    if (e) e.stopPropagation(); // Prevent bubbling if called via inline onclick
    const win = document.getElementById('chat-window');
    const input = document.getElementById('chat-input');
    const openIcon = document.getElementById('chat-icon-open');
    const closeIcon = document.getElementById('chat-icon-close');

    if (!win) return;

    if (win.classList.contains('hidden')) {
        win.classList.remove('hidden');
        if (input) input.focus();
        if (openIcon) openIcon.classList.add('hidden');
        if (closeIcon) closeIcon.classList.remove('hidden');
    } else {
        win.classList.add('hidden');
        if (openIcon) openIcon.classList.remove('hidden');
        if (closeIcon) closeIcon.classList.add('hidden');
    }
}

function handleChatSend() {
    const input = document.getElementById('chat-input');
    const msgs = document.getElementById('chat-messages');
    if (!input || !msgs || !input.value.trim()) return;

    const txt = input.value.trim();
    const uDiv = document.createElement('div');
    uDiv.className = "flex justify-end mt-4";
    uDiv.innerHTML = `<div class="bg-white text-black px-5 py-3 rounded-2xl text-sm">${txt}</div>`;
    msgs.appendChild(uDiv);
    input.value = '';
    msgs.scrollTop = msgs.scrollHeight;

    setTimeout(() => {
        const bDiv = document.createElement('div');
        bDiv.className = "flex justify-start mt-4";
        bDiv.innerHTML = `<div class="bg-white/10 px-5 py-3 rounded-2xl text-sm text-white">Thanks for your message! Our team will contact you shortly.</div>`;
        msgs.appendChild(bDiv);
        msgs.scrollTop = msgs.scrollHeight;
    }, 1000);
}

// --- CUSTOM CURSOR ---
function initCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    if (!cursor) return;

    // Logic: Smooth Follow
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Ensure cursor is visible when moving
        if (cursor.style.opacity === '0') cursor.style.opacity = '1';
    });

    function animateCursor() {
        const speed = 0.15; // Smoothness factor
        cursorX += (mouseX - cursorX) * speed;
        cursorY += (mouseY - cursorY) * speed;

        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Logic: Hover Effects (Global Delegation)
    document.addEventListener('mouseover', (e) => {
        const target = e.target;
        if (target.matches('a, button, .hover-trigger') || target.closest('a, button, .hover-trigger')) {
            cursor.classList.add('hovered');
        } else {
            cursor.classList.remove('hovered');
        }
    });

    // Hide real cursor again properly in case CSS didn't catch it
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        document.body.style.cursor = 'none';
    }
}
