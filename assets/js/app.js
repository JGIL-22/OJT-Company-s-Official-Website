// ==========================================
// PART 1: DATA & ICONS
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
            { name: "TALENTS", link: "#talents?from=kol", images: [] },
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
    { id: "igiboy", name: "IGIBOY", role: "Artist | Content Creator", categories: ["Fashion", "Electronics", "Lifestyle"], followers: [{ platform: "TikTok", count: "19,000+", handle: "@igiboyflores31" }, { platform: "Instagram", count: "93,600+", handle: "@igiboyflores" }, { platform: "Facebook", count: "57,100+", handle: "@igiboyflores31" }], ratePerLive: "50,000", packageRate: "120,000 (3 Live)", image: "assets/images/IGIBOY.png", about: "Igiboy is a versatile artist and content creator known for his engaging lifestyle content.", gallery: ["https://picsum.photos/seed/igiboy1/400/500", "https://picsum.photos/seed/igiboy2/400/500"] },
    { id: "sofi", name: "SOFI", role: "Content Creator | KOL", categories: ["Beauty", "Fashion", "Electronics"], followers: [{ platform: "TikTok", count: "144,600", handle: "@sofifermazi" }, { platform: "Instagram", count: "13,900+", handle: "@sofifermazi" }], ratePerLive: "35,000", packageRate: "100,000 (3 Live)", image: "assets/images/SOFI.png", about: "Sofi brings a fresh perspective to beauty and fashion content.", gallery: ["https://picsum.photos/seed/sofi1/400/500", "https://picsum.photos/seed/sofi2/400/500"] },
    { id: "miro", name: "MIRO", role: "Model | KOL | Influencer", categories: ["Fashion", "Skincare", "Electronics"], followers: [{ platform: "TikTok", count: "309,400", handle: "@miromacs" }, { platform: "Instagram", count: "181,000", handle: "@miromacs" }], ratePerLive: "50,000", packageRate: "80,000 (2 Live)", image: "assets/images/MIRO.png", gallery: ["https://picsum.photos/seed/miro1/400/500", "https://picsum.photos/seed/miro2/400/500"] },
    { id: "jaja", name: "JAJA", role: "Artist | Content Creator", categories: ["Fashion", "Skincare", "Electronics"], followers: [{ platform: "TikTok", count: "3,100,000+", handle: "@vladiaxdisuanco" }, { platform: "Instagram", count: "227,000+", handle: "@vladiaxdisuanco" }], ratePerLive: "100,000", packageRate: "170,000 (2 Live)", image: "assets/images/JAJA.png", gallery: ["https://picsum.photos/seed/jaja1/400/500", "https://picsum.photos/seed/jaja2/400/500"] },
    { id: "criselda", name: "CRISELDA", role: "Influencer | KOL", categories: ["Fashion", "Fitness", "Lifestyle"], followers: [{ platform: "TikTok", count: "10,400,000+", handle: "@chickennuggetsop" }, { platform: "Facebook", count: "2,400,000+", handle: "@alvarezcriselda" }], ratePerLive: "200,000", packageRate: "350,000 (2 Live)", image: "assets/images/CRISELDA.png", gallery: ["https://picsum.photos/seed/cris1/400/500", "https://picsum.photos/seed/cris2/400/500"] },
    { id: "bugoi", name: "BUGOI", role: "Artist | Content Creator", categories: ["Electronics"], followers: [{ platform: "TikTok", count: "TBA", handle: "@bugoi_tba" }, { platform: "Instagram", count: "TBA", handle: "@bugoi_tba" }, { platform: "Facebook", count: "TBA", handle: "@bugoi_tba" }], ratePerLive: "50,000", packageRate: "120,000 (3 Live)", image: "assets/images/BUGOY.png", about: "Bugoi is a versatile artist and content creator known for his engaging lifestyle content.", gallery: ["https://picsum.photos/seed/bugoi1/400/500", "https://picsum.photos/seed/bugoi2/400/500"] }
];

const CASE_STUDIES = [
    { title: "Bingo Plus Music Festival", date: "October 2025", description: "A vibrant celebration of music where sound meets soul. We managed influencer relations and live coverage.", image: "https://picsum.photos/seed/festival/800/600", metrics: [{ label: "Total Reach", value: "9,058,615" }, { label: "Total Views", value: "5,578,439" }, { label: "Engagement", value: "45,635" }, { label: "Influencers", value: "30+" }] }
];

const CLIENTS = ["Oppo", "Infinix", "BELO", "Honor", "BingoPlus", "Canon", "Anker", "Insta360"];

// ==========================================
// PART 2: APP LOGIC
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // --- APP STATE ---
    let currentFilter = 'All';

    initParticles();
    initMouseSpotlight();
    populateData();
    initRouter();
    initScrollEffects();
    initChatWidget();
    initScrollReveal();

    // --- GLOBAL DELEGATION ---
    document.addEventListener('click', (e) => {
        // 1. Mobile Menu Toggle
        if (e.target.closest('#mobile-menu-btn')) {
            toggleMobileMenu();
        }

        // 2. Chat Widget Toggle
        if (e.target.closest('#toggle-chat-btn') || e.target.closest('#close-chat-btn')) {
            toggleChat();
        }

        // 3. Filter Talents (Data Attribute)
        const filterBtn = e.target.closest('[data-filter]');
        if (filterBtn) {
            filterTalents(filterBtn.dataset.filter);
        }

        // 4. Global Link/Route Handling (Navigation)
        const link = e.target.closest('[data-route]');
        if (link) {
            e.preventDefault();
            const route = link.dataset.route;
            window.location.hash = route;
        }
    });

    // --- FUNCTIONS START HERE ---
    // --- FUNCTION SCOPE VARIABLES ---
    let toggleChat = () => { };
    let filterTalents = (cat) => { };

    // --- SCROLL REVEAL ---
    function initScrollReveal() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('active');
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.reveal').forEach(el => {
            observer.observe(el);
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) el.classList.add('active');
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

        if (navbar) navbar.classList.remove('hidden');
        const footer = document.querySelector('footer');
        if (footer) footer.classList.remove('hidden');

        views.forEach(view => view.classList.remove('active'));
        window.scrollTo(0, 0);

        const mobileMenu = document.getElementById('mobile-menu');
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

        const view = document.getElementById(activeViewId) || document.getElementById('view-home');
        if (view) view.classList.add('active');

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('text-white', 'border-b', 'border-white');
            link.classList.add('text-white/50');
            if (link.getAttribute('href') === '#' + fullHash) {
                link.classList.remove('text-white/50');
                link.classList.add('text-white', 'border-b', 'border-white');
            }
        });
    }

    // --- DATA POPULATION ---
    function populateData() {
        const footerDesc = document.getElementById('footer-description');
        if (footerDesc) footerDesc.textContent = COMPANY_INFO.description;

        const footerContact = document.getElementById('footer-contact');
        if (footerContact) {
            footerContact.innerHTML = `<li>${COMPANY_INFO.contactEmail}</li><li>${COMPANY_INFO.contactPhone}</li><li>Manila, Philippines</li>`;
        }

        const ticker = document.getElementById('client-ticker');
        if (ticker) {
            const list = [...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS];
            ticker.innerHTML = list.map(c => `<span class="text-xl font-sans font-bold text-white/40 uppercase tracking-widest hover:text-white transition-colors cursor-default">${c}</span>`).join('');
        }

        const homeGrid = document.getElementById('home-services-grid');
        if (homeGrid) {
            homeGrid.innerHTML = SERVICES.slice(0, 3).map(s => `
                <a href="#services/${s.id}" class="group bg-black p-12 hover:bg-neutral-900 transition-colors duration-500 block relative">
                    <div class="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -rotate-45">${ICONS.ArrowRight}</div>
                    <div class="w-12 h-12 border border-white/20 flex items-center justify-center mb-8 group-hover:border-white transition-colors text-white">${ICONS[s.icon] || ICONS.Radio}</div>
                    <h3 class="text-2xl font-serif mb-4 text-white">${s.title}</h3>
                    <p class="text-white/50 mb-8 font-light leading-relaxed">${s.description}</p>
                    <span class="text-white text-xs font-bold uppercase tracking-widest hover:text-zinc-400 transition-colors flex items-center gap-2">Learn More ${ICONS.ArrowRight}</span>
                </a>
            `).join('');
        }

        const contactInfo = document.getElementById('contact-info');
        if (contactInfo) {
            contactInfo.innerHTML = `
                <div class="flex items-center gap-8 p-8 border border-white/10 bg-white/[0.02]"><div class="w-12 h-12 flex items-center justify-center text-white border border-white/20">${ICONS.Mail}</div><div><div class="text-xs uppercase text-white/40 tracking-[0.2em] font-bold mb-1">Email Us</div><div class="text-xl font-serif">${COMPANY_INFO.contactEmail}</div></div></div>
                <div class="flex items-center gap-8 p-8 border border-white/10 bg-white/[0.02]"><div class="w-12 h-12 flex items-center justify-center text-white border border-white/20">${ICONS.Phone}</div><div><div class="text-xs uppercase text-white/40 tracking-[0.2em] font-bold mb-1">Call Us</div><div class="text-xl font-serif">${COMPANY_INFO.contactPhone}</div></div></div>
                <div class="flex items-center gap-8 p-8 border border-white/10 bg-white/[0.02]"><div class="w-12 h-12 flex items-center justify-center text-white border border-white/20">${ICONS.MapPin}</div><div><div class="text-xs uppercase text-white/40 tracking-[0.2em] font-bold mb-1">Visit Us</div><div class="text-xl font-serif">Manila, Philippines</div></div></div>
            `;
        }

        // Mobile Menu Icon injection only (Event handled by delegation)
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
        } else {
            menu.classList.remove('translate-x-full'); menu.classList.add('translate-x-0');
            btn.innerHTML = ICONS.X;
        }
    }

    // --- RENDERERS ---
    function renderServicesPage() {
        const list = document.getElementById('services-list');
        if (list) {
            list.innerHTML = SERVICES.map(s => `
                <a href="#services/${s.id}" class="flex flex-col md:flex-row gap-12 items-start p-10 md:p-16 bg-black hover:bg-neutral-900 transition-all duration-500 group relative overflow-hidden text-white">
                    <div class="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">${ICONS.ArrowUpRight}</div>
                    <div class="w-16 h-16 border border-white/20 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-black transition-all duration-500">${ICONS[s.icon] || ICONS.Radio}</div>
                    <div class="flex-grow">
                        <h3 class="text-3xl font-serif mb-6 flex items-center gap-4">${s.title}</h3>
                        <p class="text-white/60 text-lg leading-relaxed mb-8 font-light max-w-2xl">${s.description}</p>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">${s.features.slice(0, 4).map(f => `<div class="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white/40 group-hover:text-white/60 transition-colors">${ICONS.CheckCircle2} ${f}</div>`).join('')}</div>
                    </div>
                </a>
            `).join('');
        }
    }

    function renderServiceDetail(id) {
        const s = SERVICES.find(x => x.id === id);
        const c = document.getElementById('view-service-detail');
        if (!s || !c) { if (!s) window.location.hash = 'services'; return; }
        const hero = s.images[0] || (s.folders?.[0]?.images?.[0]) || '';

        c.innerHTML = `
            <div class="relative h-[50vh] flex items-center border-b border-white/10 mb-20 overflow-hidden">
                <div class="absolute inset-0 z-0"><img src="${hero}" class="w-full h-full object-cover opacity-30 grayscale" /><div class="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div></div>
                <div class="container mx-auto px-6 relative z-10 pt-20"><a href="#services" class="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 uppercase text-xs font-bold tracking-widest">${ICONS.ArrowLeft} Back to Services</a><div class="animate-fade-in-up"><h1 class="font-serif text-5xl md:text-7xl text-white mb-6 leading-tight">${s.title}</h1><p class="text-xl text-white/60 font-light max-w-2xl">${s.description}</p></div></div>
            </div>
            <div class="container mx-auto px-6 pb-20"><div class="grid grid-cols-1 lg:grid-cols-12 gap-16"><div class="lg:col-span-7"><div class="mb-16"><h3 class="font-serif text-3xl mb-6">Overview</h3><p class="text-white/70 text-lg leading-relaxed font-light mb-8">${s.longDescription}</p><div class="border border-white/10 p-8 bg-white/[0.02]"><h4 class="font-sans text-sm font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Inclusions & Features</h4><div class="grid grid-cols-1 md:grid-cols-2 gap-4">${s.features.map(f => `<div class="flex items-start gap-3"><span class="text-white shrink-0 mt-0.5">${ICONS.CheckCircle2}</span><span class="text-white/80 text-sm">${f}</span></div>`).join('')}</div></div></div><div class="mb-16"><h3 class="font-serif text-3xl mb-8 text-center">Gallery</h3>${renderFolders(s.folders || [], s.images)}</div></div><div class="lg:col-span-5 relative"><div class="sticky top-40 border border-white/10 p-8 bg-black/50 backdrop-blur-md"><h3 class="font-serif text-3xl mb-4">Ready to Start?</h3><p class="text-white/50 mb-8 text-sm">Let's discuss how our ${s.title} services can help achieve your brand goals.</p><a href="#contact" class="group relative px-8 py-4 bg-white text-black text-sm font-bold tracking-widest uppercase overflow-hidden transition-all hover:bg-gray-200 w-full flex justify-center"><span class="relative z-10 flex items-center gap-3">Inquire Now ${ICONS.ArrowRight}</span></a><div class="mt-8 pt-8 border-t border-white/10 space-y-4"><div class="flex justify-between text-sm"><span class="text-white/40 uppercase font-bold text-xs tracking-widest">Availability</span><span class="text-green-400">Open for Booking</span></div><div class="flex justify-between text-sm"><span class="text-white/40 uppercase font-bold text-xs tracking-widest">Location</span><span>Metro Manila & Nearby</span></div></div></div></div></div></div>
        `;
    }

    function renderFolders(folders, flatImages) {
        if (!folders || folders.length === 0) {
            return flatImages ? `<div class="columns-1 md:columns-2 gap-4 space-y-4">${flatImages.map(img => `<div class="break-inside-avoid relative group overflow-hidden border border-white/10"><img src="${img}" class="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110" /></div>`).join('')}</div>` : '';
        }
        return `<div class="grid grid-cols-1 gap-y-24">${folders.map(f => {
            let previews = f.images.slice(0, 4);
            if (f.name === 'TALENTS' && previews.length === 0) previews = ARTISTS.slice(0, 4).map(a => a.image);
            return `<a href="${f.link || '#gallery/' + f.name}" class="group block flex flex-col items-center text-center">
                <div class="h-96 w-full relative mb-8">${previews.length > 0 ? `<div class="flex justify-center items-center h-96 relative">${previews.map((img, idx) => `<div class="w-48 h-64 absolute shadow-2xl transition-all duration-500 ease-out origin-bottom ${idx > 0 ? '-ml-12 group-hover:ml-4' : ''} hover:-translate-y-4 hover:scale-110 hover:z-50" style="z-index: ${idx}; transform: rotate(${(idx - 1.5) * 3}deg) translateY(${Math.abs(idx - 1.5) * 3}px); left: calc(50% - 96px + ${idx * -48}px);"><div class="absolute inset-0 border border-white/20 bg-neutral-800 overflow-hidden rounded-lg"><img src="${img}" class="w-full h-full object-cover" /><div class="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500"></div></div></div>`).join('')}</div>` : `<div class="flex flex-col items-center text-white/20"><span class="text-4xl mb-2">📂</span><span class="text-xs font-bold uppercase tracking-widest">Empty</span></div>`}</div>
                <div class="flex flex-col items-center gap-2"><h4 class="font-serif text-3xl text-white group-hover:text-white/80 transition-colors">${f.name}</h4><p class="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 group-hover:text-white/60 transition-colors mb-2">${f.name === 'TALENTS' ? 'VIEW ROSTER' : f.images.length + ' IMAGES'}</p><div class="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 group-hover:bg-white group-hover:text-black transition-all">${ICONS.ArrowRight}</div></div></a>`;
        }).join('')}</div>`;
    }

    function renderTalentsPage() {
        const categories = ['All', 'Fashion', 'Beauty', 'Electronics', 'Lifestyle'];
        const container = document.getElementById('talent-filters');
        if (container) {
            container.innerHTML = categories.map(cat => `<button data-filter="${cat}" class="px-6 py-2 border text-xs font-bold uppercase tracking-widest transition-all ${currentFilter === cat ? 'bg-white text-black border-white' : 'bg-transparent text-white/50 border-white/10 hover:border-white/50 hover:text-white'}">${cat}</button>`).join('');
        }

        // Back Button Logic
        const pageContainer = document.querySelector('#view-talents .container');
        const existingBtn = document.getElementById('talents-back-btn');
        if (window.location.hash.includes('?from=kol')) {
            if (!existingBtn && pageContainer) {
                const btn = document.createElement('div');
                btn.id = 'talents-back-btn';
                btn.className = 'mb-8 animate-fade-in-up';
                btn.innerHTML = `<a href="#services/kol-artist-livestreaming" class="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors uppercase text-xs font-bold tracking-widest">${ICONS.ArrowLeft} Back to KOL Services</a>`;
                pageContainer.insertBefore(btn, pageContainer.firstChild);
            }
        } else if (existingBtn) existingBtn.remove();

        renderTalentsGrid();
    }

    filterTalents = (category) => {
        currentFilter = category;
        renderTalentsPage();
    };

    function renderTalentsGrid() {
        const grid = document.getElementById('talents-grid');
        if (!grid) return;
        const filtered = currentFilter === 'All' ? ARTISTS : ARTISTS.filter(a => a.categories.includes(currentFilter));
        grid.innerHTML = filtered.map(a => `
            <a href="#talents/${a.id}" class="group relative aspect-[3/4] overflow-hidden border border-white/10 block bg-neutral-900"><img src="${a.image}" class="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0" /><div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 group-hover:opacity-60 transition-opacity"></div><div class="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"><div class="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 mb-2 group-hover:text-white transition-colors border-l-2 border-transparent group-hover:border-white pl-0 group-hover:pl-2 duration-300">${a.role}</div><h3 class="text-3xl font-serif text-white mb-2 italic">${a.name}</h3><div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">${a.categories.slice(0, 2).map(c => `<span class="text-[9px] border border-white/20 px-2 py-1 uppercase tracking-wider text-white/80 hover:bg-white hover:text-black transition-colors">${c}</span>`).join('')}</div></div></a>
        `).join('');
    }

    function renderTalentDetail(id) {
        const a = ARTISTS.find(x => x.id === id);
        const c = document.getElementById('view-talent-detail');
        if (!a || !c) { if (!a) window.location.hash = 'talents'; return; }
        c.innerHTML = `
            <div class="container mx-auto px-6 pt-10"><div class="mb-10"><button data-route="talents" class="z-[9999] pointer-events-auto relative cursor-pointer inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-white/60 hover:text-white transition-colors mb-8">← BACK TO TALENTS</button></div><div class="grid grid-cols-1 lg:grid-cols-12 gap-16"><div class="lg:col-span-5"><div class="aspect-[3/4] border border-white/10 relative overflow-hidden"><img src="${a.image}" class="w-full h-full object-cover" /><div class="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black to-transparent"><h1 class="font-serif text-6xl text-white italic">${a.name}</h1><p class="text-white/60 uppercase tracking-widest text-xs font-bold mt-2">${a.role}</p></div></div></div><div class="lg:col-span-7 pt-10"><div class="mb-12"><h3 class="font-serif text-3xl mb-6 text-white">About</h3><p class="text-white/60 text-lg leading-relaxed font-light mb-8">${a.about || "A rising star in the digital space."}</p><div class="flex flex-wrap gap-3">${a.categories.map(c => `<span class="px-4 py-2 border border-white/20 text-xs font-bold uppercase tracking-widest text-white/80">${c}</span>`).join('')}</div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 border-y border-white/10 py-10"><div><h3 class="font-serif text-2xl mb-6 text-white">Social Reach</h3><div class="space-y-6">${a.followers.map(s => `<div class="flex items-center gap-4"><div class="w-10 h-10 border border-white/10 flex items-center justify-center text-white/50">${ICONS[s.platform] || ICONS.Users}</div><div><div class="text-2xl font-serif text-white leading-none">${s.count}</div><div class="text-[10px] font-bold uppercase tracking-widest text-white/30">${s.platform}</div><div class="text-xs text-white/50">${s.handle}</div></div></div>`).join('')}</div></div><div><h3 class="font-serif text-3xl mb-8 text-white">Engagement Rates</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="border border-white/10 p-8 bg-black hover:bg-neutral-900 transition-colors"><span class="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Livestream Rate</span><div class="text-4xl font-serif text-white mb-2">₱${a.ratePerLive}</div></div><div class="border border-white/10 p-8 bg-white text-black"><span class="block text-xs font-bold uppercase tracking-widest text-black/40 mb-2">Package Deal</span><div class="text-4xl font-serif text-black mb-2">₱${a.packageRate}</div></div></div></div><div><h3 class="font-serif text-3xl mb-8 text-white flex items-center gap-4">Latest Content <div class="h-px flex-grow bg-white/10"></div></h3><div class="grid grid-cols-2 gap-4">${a.gallery.map((img, i) => `<div class="relative group overflow-hidden border border-white/10 ${i % 3 === 0 ? 'col-span-2 aspect-video' : 'col-span-1 aspect-[4/5]'}"><img src="${img}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>`).join('')}</div></div></div></div></div></div>
        `;
    }

    function renderGalleryView(folderName) {
        let parent = SERVICES.find(s => s.folders?.find(f => f.name === folderName));
        let folder = parent?.folders.find(f => f.name === folderName);
        const c = document.getElementById('view-gallery');
        if (!c) return;
        if (!folder) { c.innerHTML = '<div class="p-20 text-center text-white">Folder not found.</div>'; return; }

        c.innerHTML = `
            <div class="container mx-auto px-6 py-20"><div class="mb-12 animate-fade-in-up"><a href="#services/${parent.id}" class="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 uppercase text-xs font-bold tracking-widest">${ICONS.ArrowLeft} Back</a><span class="text-white/50 text-xs font-bold tracking-widest uppercase mb-4 block">${parent.title}</span><h1 class="font-serif text-5xl md:text-7xl text-white mb-6">${folder.name} Gallery</h1><div class="h-[1px] w-24 bg-gradient-to-r from-white to-transparent mb-8"></div></div>${folder.images.length > 0 ? `<div class="grid grid-cols-1 md:grid-cols-2 gap-8">${folder.images.map(img => `<div class="relative group overflow-hidden border border-white/10 animate-fade-in-up"><img src="${img}" class="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" /></div>`).join('')}</div>` : `<div class="py-20 text-center border border-white/10 bg-white/5 rounded-lg animate-fade-in-up"><span class="block text-4xl mb-4">🚧</span><h3 class="font-serif text-2xl text-white mb-2">Content Coming Soon</h3></div>`}</div>
        `;
    }

    function renderCaseStudies() {
        const l = document.getElementById('case-studies-list');
        if (l) l.innerHTML = CASE_STUDIES.map((s, i) => `<div class="relative group"><span class="absolute -top-24 -left-12 text-[200px] font-serif font-bold text-white/[0.02] pointer-events-none select-none z-0">${String(i + 1).padStart(2, '0')}</span><div class="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"><div class="order-2 lg:order-1 pt-8"><div class="inline-block px-4 py-2 border border-white text-white text-xs font-bold uppercase tracking-widest mb-8">${s.date}</div><h3 class="text-4xl md:text-5xl font-serif mb-8 leading-tight">${s.title}</h3><p class="text-white/60 text-lg font-light leading-relaxed mb-12 border-l border-white/20 pl-8">${s.description}</p><div class="grid grid-cols-2 gap-px bg-white/10 border border-white/10">${s.metrics.map(m => `<div class="text-center py-10 bg-black hover:bg-neutral-900 transition-colors"><div class="text-3xl md:text-4xl font-serif text-white mb-2">${m.value}</div><div class="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">${m.label}</div></div>`).join('')}</div></div><div class="order-1 lg:order-2"><div class="w-full aspect-video border border-white/10 p-2 relative"><div class="w-full h-full bg-neutral-800 overflow-hidden relative"><img src="${s.image}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" /><div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div></div></div></div></div></div>`).join('');
    }

    // --- EFFECTS & INTERACTIONS ---
    function initScrollEffects() {
        window.addEventListener('scroll', () => {
            if (!navbar) return;
            if (window.scrollY > 50) { navbar.classList.add('py-4', 'bg-black/80', 'backdrop-blur-xl', 'border-b', 'border-white/5'); navbar.classList.remove('py-8', 'bg-transparent'); }
            else { navbar.classList.add('py-8', 'bg-transparent'); navbar.classList.remove('py-4', 'bg-black/80', 'backdrop-blur-xl', 'border-b', 'border-white/5'); }
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
        let particles = [], mouseX = 0, mouseY = 0;

        const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

        class P {
            constructor() { this.reset(); }
            reset() { this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height; this.size = Math.random() * 2 + 0.5; this.vx = Math.random() * 0.5 - 0.25; this.vy = Math.random() * 0.5 - 0.25; this.alpha = Math.random() * 0.5 + 0.1; }
            update() {
                this.x += this.vx; this.y += this.vy;
                const dx = this.x - mouseX, dy = this.y - mouseY, d = Math.sqrt(dx * dx + dy * dy);
                if (d < 100) { this.x += dx * 0.05; this.y += dy * 0.05; }
                if (this.x < 0) this.x = canvas.width; if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height; if (this.y > canvas.height) this.y = 0;
            }
            draw() { ctx.fillStyle = `rgba(255,255,255,${this.alpha})`; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); }
        }

        resize();
        for (let i = 0; i < 100; i++) particles.push(new P());
        const animate = () => { ctx.clearRect(0, 0, canvas.width, canvas.height); particles.forEach(p => { p.update(); p.draw(); }); requestAnimationFrame(animate); };
        animate();
    }

    // --- CHAT WIDGET ---
    function initChatWidget() {
        const win = document.getElementById('chat-window');
        const msgs = document.getElementById('chat-messages');
        const input = document.getElementById('chat-input');
        const sendBtn = document.getElementById('send-btn');
        const typing = document.getElementById('typing-indicator');
        const quick = document.getElementById('quick-replies');
        const iconOpen = document.getElementById('chat-icon-open');
        const iconClose = document.getElementById('chat-icon-close');
        const tooltip = document.getElementById('chat-tooltip');

        if (!win) return;

        // Assign to global-scoped variable for delegation
        toggleChat = () => {
            if (win.classList.contains('hidden')) {
                win.classList.remove('hidden');
                if (tooltip) tooltip.classList.add('opacity-0');
                if (iconOpen) iconOpen.classList.add('hidden');
                if (iconClose) iconClose.classList.remove('hidden');
                if (input) setTimeout(() => input.focus(), 100);
                setTimeout(() => msgs.scrollTop = msgs.scrollHeight, 50);
            } else {
                win.classList.add('hidden');
                if (tooltip) tooltip.classList.remove('opacity-0');
                if (iconOpen) iconOpen.classList.remove('hidden');
                if (iconClose) iconClose.classList.add('hidden');
            }
        };

        // Chat Logic
        const addMsg = (text, sender) => {
            const div = document.createElement('div');
            div.className = `flex ${sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`;
            div.innerHTML = sender === 'user' ? `<div class="bg-white text-black px-5 py-3 rounded-2xl rounded-br-none text-sm font-medium max-w-[85%] shadow-lg">${text}</div>` : `<div class="flex items-start gap-3 max-w-[90%]"><div class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/20 text-white text-[10px]">AI</div><div class="bg-white/10 border border-white/10 px-5 py-3 rounded-2xl rounded-bl-none text-sm text-white/90 leading-relaxed shadow-sm">${text}</div></div>`;
            msgs.appendChild(div);
            msgs.scrollTop = msgs.scrollHeight;
        };

        const reply = (text) => {
            if (typing) typing.classList.remove('hidden'); msgs.scrollTop = msgs.scrollHeight;
            setTimeout(() => {
                if (typing) typing.classList.add('hidden');
                let resp = "That's a great question! Our team would love to discuss this in detail. Please leave your email below or check our Services page.";
                const lower = text.toLowerCase();
                if (lower.match(/(who are you|about|agency)/)) resp = 'Founded in April 2025, The Aura Creatives is a dynamic multimedia marketing and talent management agency.';
                else if (lower.match(/(services|offer|do|livestream)/)) resp = 'We offer 6 core services: KOL/Artist Livestreaming, Short-Form Video Production, Studio Rental, Artist Management, Marketing Video Production, and Product Shoppable Pictures.';
                else if (lower.match(/(talent|roster|influencers|jaja|igiboy|sofi)/)) resp = 'We manage top-tier talents including Jaja, Sofi, and Igiboy. We cover Beauty, Fashion, Electronics, and Lifestyle categories.';
                else if (lower.match(/(brands|clients|work with)/)) resp = 'We have worked with top brands like Belo Essentials, OPPO, Infinix, Canon, Honor, Anker, Insta360, and BingoPlus.';
                else if (lower.match(/(contact|email|phone|rate)/)) resp = 'Let\'s connect! You can reach us at business@theauracreatives.co or call 09219715546.';

                addMsg(resp, 'bot');
            }, 1500);
        };

        const send = () => {
            const txt = input.value.trim();
            if (!txt) return;
            addMsg(txt, 'user');
            input.value = '';
            reply(txt);
        };

        if (sendBtn) sendBtn.onclick = send;
        if (input) input.onkeypress = (e) => { if (e.key === 'Enter') send(); };

        // Init
        if (msgs.children.length === 0) {
            addMsg("Hi there! Welcome to The Aura Creatives. I'm your virtual assistant. How can I help you elevate your brand today?", 'bot');
            if (quick) {
                quick.innerHTML = ["What are your rates?", "Do you have influencers?", "How do livestreams work?", "Where is your studio?"].map(r => `<button class="whitespace-nowrap px-4 py-2 rounded-full border border-white/20 bg-white/5 text-xs text-white/70 hover:bg-white hover:text-black transition-all">${r}</button>`).join('');
                Array.from(quick.children).forEach(b => b.onclick = (e) => { input.value = e.target.textContent; send(); });
            }
        }
    }
});
