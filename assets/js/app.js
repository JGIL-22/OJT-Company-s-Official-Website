// "use strict";

// --- GLOBAL SAFETY NET (QA FIX) ---
window.onerror = function (message, source, lineno, colno, error) {
    console.error('CRITICAL ERROR:', message);
    // Emergency: Force remove preloader so user isn't stuck
    const preloader = document.getElementById('preloader-text');
    const top = document.getElementById('curtain-top');
    const bottom = document.getElementById('curtain-bottom');
    if (preloader) preloader.style.display = 'none';
    if (top) top.style.transform = 'translateY(-100%)';
    if (bottom) bottom.style.transform = 'translateY(100%)';
    document.body.style.overflow = 'auto'; // Release scroll lock
};

// Firebase imports removed for local file:// compatibility
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// console.log("SCRIPT EXECUTED - Module mode");

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
    } else {
        console.warn("Firebase SDK not loaded (offline or blocked). App continuing without it.");
    }
} catch (error) {
    console.error("Firebase failed, but app continues:", error);
}

// ==========================================
// PART 1: DATA
// ==========================================
// Data is now loaded from assets/js/data.js
// (SERVICES, ARTISTS, CASE_STUDIES, COMPANY_INFO, ICONS, CHAT_QUICK_REPLIES, CLIENTS)


// ==========================================
// PART 2: APP LOGIC & GLOBAL DELEGATION
// ==========================================

// App State
let currentFilter = 'All';
let activeChatReplies = [];
let chatReplyPool = [];

const initApp = () => {
    // Emergency Failsafe: Force curtains open after 6 seconds if they haven't opened yet
    setTimeout(() => {
        const top = document.getElementById('curtain-top');
        const preloaderText = document.getElementById('preloader-text');

        if (top && top.style.transform !== 'translateY(-100%)') {

            // Manually trigger the fade out/slide logic here to rescue the user
            if (preloaderText) preloaderText.style.opacity = '0';
            if (preloaderText) preloaderText.style.display = 'none'; // Ensure it's gone

            top.style.transition = 'transform 1s ease-in-out'; // Fast transition for rescue
            top.style.transform = 'translateY(-100%)';

            const bottom = document.getElementById('curtain-bottom');
            if (bottom) {
                bottom.style.transition = 'transform 1s ease-in-out';
                bottom.style.transform = 'translateY(100%)';
            }

            document.body.style.overflow = ''; // Release scroll lock
        }
    }, 6000);

    populateData();
    initRouter();
    initLenis();
    initPreloader();
    initScrollEffects();
    initChatWidget();
    initScrollReveal();
    initCustomCursor(); // Custom Cursor Enabled
    initMagneticButtons(); // Physics Effect for Buttons
    initKineticText(); // Kinetic Typography Background

    // OPTIMIZATION: Disabled on mobile for performance
    if (window.innerWidth > 768) {
        initParticles(); // Original Simple Particles
        initParallax(); // Parallax Images
        init3DTilt(); // Premium 3D Tilt Effect
    }
    initThemeToggle(); // Day/Night Theme Switch
    initContactForm(); // Contact Form Chip Logic

    window.appReady = true; // Signal rescue script that app is loaded
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


// --- FUNCTIONS ---

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
        // Task 1: Fix the Spacing (Force grid classes)
        homeGrid.className = 'grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10';

        homeGrid.innerHTML = SERVICES.slice(0, 3).map(s => `
                <a href='#services/${s.id}' data-page='service-detail' class='tilt-card group relative overflow-hidden rounded-2xl bg-zinc-950/50 backdrop-blur-md border border-white/10 p-10 transition-all duration-1000 ease-out hover:shadow-[0_20px_40px_-15px_rgba(255,255,255,0.1)] hover:border-white/20 hover:bg-zinc-900' style='transform-style: preserve-3d; perspective: 1000px;'>
                    
                    <!-- Glare Layer -->
                    <div class='tilt-glare absolute inset-0 w-full h-full bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 pointer-events-none transition-opacity duration-300' style='transform: translateZ(1px)'></div>
                    
                    <!-- Background Gradient Glow (Hidden by default, appears on hover) -->
                    <div class='absolute -right-20 -top-20 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-700 pointer-events-none' style='transform: translateZ(0px)'></div>
                    
                    <!-- Icon -->
                    <div class='mb-8 text-white/50 group-hover:text-white group-hover:scale-110 transition-all duration-500 origin-left'>
                        ${ICONS[s.icon] || ICONS.Radio}
                    </div>
                    
                    <!-- Content -->
                    <h3 class='text-2xl font-serif text-white mb-4 relative z-10'>${s.title}</h3>
                    <p class='text-sm text-white/60 font-light leading-relaxed mb-8 relative z-10 group-hover:text-white/80 transition-colors'>${s.description}</p>
                    
                    <!-- Arrow Button with Pulse Animation on Hover -->
                    <div class='flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-white/40 group-hover:text-white transition-colors relative z-10'>
                        <span class='group-hover:animate-pulse'>Explore</span>
                        <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='group-hover:animate-pulse transition-transform duration-300 group-hover:translate-x-1'><path d='M5 12h14'/><path d='m12 5 7 7-7 7'/></svg>
                    </div>
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
    list.innerHTML = SERVICES.map((s, index) => `
            <a href="#services/${s.id}" style="animation-delay: ${index * 100}ms" data-page="service-detail" class="animate-fade-in-up group relative flex items-center gap-8 p-8 border border-white/10 bg-transparent transition-all duration-500 hover:border-white/40 hover:bg-white/[0.03] rounded-xl overflow-hidden">
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
    grid.innerHTML = filtered.map((a, index) => `
            <a href="#talents/${a.id}" style="animation-delay: ${index * 100}ms; transform-style: preserve-3d; perspective: 1000px" data-page="talent-detail" class="tilt-card group relative block rounded-3xl bg-zinc-950/50 border border-white/10 overflow-hidden transition-all duration-1000 ease-out hover:border-white/30 hover:bg-white/[0.03] hover:shadow-2xl animate-fade-in-up">
                <!-- Glare Layer (Crucial: First Child) -->
                <div class='tilt-glare absolute inset-0 w-full h-full bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 pointer-events-none transition-opacity duration-300 z-20'></div>

                <div class="aspect-[3/4] w-full overflow-hidden border-b border-white/5">
                    <div class="parallax-img w-full h-full"> <!-- Wrapper for Parallax -->
                        <img src="${a.image}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105" />
                    </div>
                </div>
                <div class="p-6">
                    <h3 class="font-serif text-2xl text-white mb-1">${a.name}</h3>
                    <p class="text-xs font-bold uppercase tracking-widest text-white/40 group-hover:text-white/70 transition-colors">${a.role}</p>
                </div>
            </a>
        `).join('');

    // Initialize 3D Tilt for Talent cards after DOM update
    // OPTIMIZATION: Disabled on mobile for performance
    if (window.innerWidth > 768) {
        setTimeout(() => init3DTilt(), 100);
    }
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
                    <div><img src="${a.image}" loading="lazy" decoding="async" class="w-full h-auto" /></div>
                    <div>
                        <h1 class="font-serif text-6xl text-white mb-4">${a.name}</h1>
                        <p class="text-sm font-bold uppercase tracking-widest text-white/50 mb-8">${a.role}</p>
                        <p class="text-white/70 text-lg leading-relaxed mb-12">${a.about || 'A leading creator in the industry.'}</p>
                        <div class="grid grid-cols-2 gap-8 border-y border-white/10 py-8 mb-12">
                            <div><div class="text-xs uppercase text-white/40 mb-2">Livestream Rate</div><div class="text-2xl font-serif">₱${a.ratePerLive}</div></div>
                            <div><div class="text-xs uppercase text-white/40 mb-2">Package Rate</div><div class="text-2xl font-serif">₱${a.packageRate}</div></div>
                        </div>
                        <h3 class="font-serif text-2xl mb-6">Gallery</h3>
                        <div class="grid grid-cols-2 gap-4">${a.gallery.map(img => `<img src="${img}" loading="lazy" decoding="async" class="w-full h-auto" />`).join('')}</div>
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
                            <img src="${img}" loading="lazy" decoding="async" class="w-full h-auto shadow-2xl" />
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
                        <div class="parallax-img w-full h-full"> <!-- Wrapper for Parallax -->
                            <img src="${s.image}" loading="lazy" decoding="async" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        </div>
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

    // 2.5s: Fade Out Preloader Text (Fade to Black)
    setTimeout(() => {
        preloaderText.style.transition = 'opacity 0.8s ease-out';
        preloaderText.style.opacity = '0';
    }, 2500);

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
    const progressBar = document.getElementById('scroll-progress');

    window.addEventListener('scroll', () => {
        // 1. Scroll Progress Bar
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (progressBar) progressBar.style.width = scrolled + '%';

        // 2. Navbar Logic
        if (!navbar) return;

        const isLight = document.documentElement.classList.contains('light-theme');

        if (window.scrollY > 50) {
            navbar.classList.add(isLight ? 'bg-white/90' : 'bg-black/90', 'backdrop-blur-md');
            navbar.classList.remove(isLight ? 'bg-black/90' : 'bg-white/90');
            if (logo) {
                logo.classList.remove('h-20', 'md:h-40');
                logo.classList.add('h-16');
            }
        } else {
            navbar.classList.remove('bg-white/90', 'bg-black/90', 'backdrop-blur-md');
            if (logo) {
                logo.classList.remove('h-16');
                logo.classList.add('h-20', 'md:h-40');
            }
        }
    });
}

function initMagneticButtons() {
    // Select primary action buttons: Navbar 'Let's Talk', Hero Buttons, Form Submit
    const buttons = document.querySelectorAll('#navbar a.reveal, .group, button[type="submit"]');

    buttons.forEach(btn => {
        // Add elastic snap-back transition
        btn.style.transition = 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)';

        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Magnetic Pull (Clamped to 10px)
            // Use 0.3 strength
            const moveX = Math.max(-10, Math.min(10, x * 0.3));
            const moveY = Math.max(-10, Math.min(10, y * 0.3));

            // Remove transition during move for instant response
            btn.style.transition = 'none';
            btn.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            // Restore elastic and snap back
            btn.style.transition = 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
            btn.style.transform = 'translate(0px, 0px)';
        });
    });
}

function initParallax() {
    const images = document.getElementsByClassName('parallax-img');

    function animate() {
        for (let i = 0; i < images.length; i++) {
            const wrapper = images[i];
            const rect = wrapper.parentElement.getBoundingClientRect(); // Use container position

            // Check if visible in viewport
            if (rect.bottom > 0 && rect.top < window.innerHeight) {
                const center = rect.top + rect.height / 2;
                const winCenter = window.innerHeight / 2;
                const dist = center - winCenter;
                const y = dist * 0.1; // 10% speed relative to scroll

                // Scale 1.15 to ensure no gaps (User asked for ~1.25, 1.15 is clearer)
                // Use style.transform directly
                wrapper.style.transform = `scale(1.15) translateY(${y}px)`;
            }
        }
        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
}

function initKineticText() {
    const el = document.getElementById('kinetic-text');
    if (!el) return;

    let currentX = 0;
    let speed = 2; // Base speed
    let targetSpeed = 2;
    let scrollSpeed = 0;

    // React to scroll
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        const delta = Math.abs(window.scrollY - lastScrollY);
        scrollSpeed = delta; // Boost speed based on scroll speed
        lastScrollY = window.scrollY;
    });

    function animate() {
        // Decay scroll boost
        scrollSpeed *= 0.9;

        // Final speed = base + boost
        // Direction: Moving Left (-x)
        const finalSpeed = speed + (scrollSpeed * 0.5);

        currentX -= finalSpeed;

        // Infinite Scroll Reset
        // If moved more than 50% (approx width of one repeat), reset slightly to loop
        // Assuming text is very long. Better: Check width.
        // For simplicity with this repeating string: Reset when x < -1000? 
        // Let's use specific logic: if currentX < -el.offsetWidth / 3, reset.
        if (currentX < -el.offsetWidth / 3) {
            currentX = 0;
        }

        el.style.transform = `translateX(${currentX}px)`;
        requestAnimationFrame(animate);
    }
    animate();
}

function init3DTilt() {
    const cards = document.querySelectorAll('.tilt-card:not(.js-tilt-initialized)');

    cards.forEach(card => {
        card.classList.add('js-tilt-initialized');
        const glare = card.querySelector('.tilt-glare');

        // Apply Physics Smoothing
        card.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -15;
            const rotateY = ((x - centerX) / centerX) * 15;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

            if (glare) {
                glare.style.opacity = '1';
                const glareX = (x / rect.width) * 100;
                const glareY = (y / rect.height) * 100;
                glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.1), transparent)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            if (glare) {
                glare.style.opacity = '0';
            }
        });
    });
}

function initParticles() {
    // Original Lightweight Particle System
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    // Ensure visibility
    canvas.style.display = 'block';

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    const particleCount = 20; // Subtle count

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.1;
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
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
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
    } else {
        console.warn("Lenis library not found.");
    }
}

// --- CHAT WIDGET ---
function initChatWidget() {
    const msgs = document.getElementById('chat-messages');

    // Initialize Replies State if empty (Show only 1 at a time to save space)
    if (activeChatReplies.length === 0) {
        activeChatReplies = CHAT_QUICK_REPLIES.slice(0, 1);
        chatReplyPool = CHAT_QUICK_REPLIES.slice(1);
    }

    if (msgs && msgs.children.length === 0) {
        const div = document.createElement('div');
        div.className = "flex justify-start animate-fade-in-up";
        div.innerHTML = `<div class="bg-white/10 px-5 py-3 rounded-2xl text-sm text-white">Hi! How can I help you?</div>`;
        msgs.appendChild(div);
        renderQuickReplies();
    }

    const input = document.getElementById('chat-input');
    if (input) {
        input.onkeypress = (e) => {
            if (e.key === 'Enter') handleChatSend();
        };
    }

    // DELAYED TOOLTIP REVEAL (20s)
    setTimeout(() => {
        const tooltip = document.getElementById('chat-tooltip');
        if (tooltip) {
            tooltip.classList.remove('opacity-0');
            // Hide it again after 8 seconds (optional, but good UX to not be annoying forever)
            setTimeout(() => {
                // tooltip.classList.add('opacity-0'); 
            }, 8000);
        }
    }, 20000);
}

function renderQuickReplies() {
    const quick = document.getElementById('quick-replies');
    if (!quick) return;

    quick.innerHTML = activeChatReplies.map(r => `
        <button class="quick-reply-btn whitespace-nowrap px-4 py-2 rounded-full border border-white/20 bg-white/5 text-xs text-white/70 hover:bg-white hover:text-black transition-all">
            ${r}
        </button>
    `).join('');

    // Remove old listener if any and add new delegation
    quick.onclick = (e) => {
        const btn = e.target.closest('.quick-reply-btn');
        if (btn) {
            const text = btn.textContent.trim();
            const input = document.getElementById('chat-input');
            if (input) {
                input.value = text;
                handleChatSend();

                // DYNAMIC SWAP LOGIC
                // 1. Find index of clicked item
                const index = activeChatReplies.indexOf(text);
                if (index !== -1) {
                    // 2. Remove from active
                    activeChatReplies.splice(index, 1);
                    // 3. Cycle clicked item back to pool
                    chatReplyPool.push(text);
                    // 4. Pull new one from pool
                    if (chatReplyPool.length > 0) {
                        const next = chatReplyPool.shift();
                        activeChatReplies.splice(index, 0, next);
                    }
                    // 5. Re-render
                    renderQuickReplies();
                }
            }
        }
    };
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

        const scale = cursor.classList.contains('hovered') ? 2.5 : 1;
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%) scale(${scale})`;

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

// 3D V2 removed (Replaced by Sanity Check version)

// --- THEME TOGGLE (Day/Night Switch) ---
function initThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    const html = document.documentElement;

    if (!toggle || !sunIcon || !moonIcon) {
        console.warn('Theme toggle elements not found');
        return;
    }

    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Apply initial theme
    if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
        enableLightMode(true);
    } else {
        enableDarkMode(true);
    }

    // Toggle click handler
    toggle.addEventListener('click', () => {
        if (html.classList.contains('light-theme')) {
            enableDarkMode();
            localStorage.setItem('theme', 'dark');
        } else {
            enableLightMode();
            localStorage.setItem('theme', 'light');
        }
    });

    function enableLightMode(isInitial = false) {
        html.classList.add('light-theme');
        // Animate icons: hide sun, show moon
        sunIcon.style.opacity = '0';
        sunIcon.style.transform = 'rotate(180deg) scale(0.5)';
        moonIcon.style.opacity = '1';
        moonIcon.style.transform = 'rotate(0deg) scale(1)';

        // Update dynamic elements for light theme
        updateDynamicElements('light', isInitial);
    }

    function enableDarkMode(isInitial = false) {
        html.classList.remove('light-theme');
        // Animate icons: show sun, hide moon
        sunIcon.style.opacity = '1';
        sunIcon.style.transform = 'rotate(0deg) scale(1)';
        moonIcon.style.opacity = '0';
        moonIcon.style.transform = 'rotate(-180deg) scale(0.5)';

        // Update dynamic elements for dark theme
        updateDynamicElements('dark', isInitial);
    }

    function updateDynamicElements(theme, isInitial = false) {
        const isLight = theme === 'light';

        // Update logo images - CRITICAL for theme switch
        const logos = [
            document.getElementById('main-logo'),
            document.getElementById('footer-logo'),
            document.getElementById('preloader-logo')
        ];

        // Dark mode uses logo.png (white), Light mode uses day_logo.png (black)
        const darkLogoSrc = 'assets/images/logo.png';
        const preloaderDarkLogoSrc = 'assets/images/new_logo.png';
        const lightLogoSrc = 'assets/images/day_logo.png';
        const currentThemeLogoSrc = isLight ? lightLogoSrc : darkLogoSrc;

        logos.forEach(logo => {
            if (logo) {
                const currentDarkSrc = logo.id === 'preloader-logo' ? preloaderDarkLogoSrc : darkLogoSrc;
                const logoSrc = isLight ? lightLogoSrc : currentDarkSrc;

                if (isInitial) {
                    logo.src = logoSrc;
                } else {
                    // Smooth transition for logo swap
                    logo.style.transition = 'opacity 0.3s ease-in-out';
                    logo.style.opacity = '0';
                    setTimeout(() => {
                        logo.src = logoSrc;
                        logo.style.opacity = '1';
                    }, 300);
                }
            }
        });

        // Update Favicon and SEO Meta Images
        const favicon = document.querySelector('link[rel="icon"]');
        const ogImage = document.querySelector('meta[property="og:image"]');
        const twitterImage = document.querySelector('meta[name="twitter:image"]');

        if (favicon) favicon.href = currentThemeLogoSrc;
        if (ogImage) ogImage.setAttribute('content', window.location.origin + '/' + currentThemeLogoSrc);
        if (twitterImage) twitterImage.setAttribute('content', window.location.origin + '/' + currentThemeLogoSrc);

        // Update navbar background on scroll
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                if (isLight) {
                    navbar.classList.add('bg-white/90', 'backdrop-blur-md');
                    navbar.classList.remove('bg-black/90');
                } else {
                    navbar.classList.add('bg-black/90', 'backdrop-blur-md');
                    navbar.classList.remove('bg-white/90');
                }
            } else {
                // At top, should be transparent
                navbar.classList.remove('bg-white/90', 'bg-black/90', 'backdrop-blur-md');
            }
        }

        // Update curtains for preloader
        const curtainTop = document.getElementById('curtain-top');
        const curtainBottom = document.getElementById('curtain-bottom');
        const preloaderH1 = document.querySelector('#preloader-text h1');
        const preloaderSpan = document.querySelector('#preloader-text span');

        if (curtainTop) curtainTop.style.backgroundColor = isLight ? '#f8f8f8' : '#000';
        if (curtainBottom) curtainBottom.style.backgroundColor = isLight ? '#f8f8f8' : '#000';

        if (preloaderH1) preloaderH1.style.color = isLight ? '#1a1a1a' : '#ffffff';
        if (preloaderSpan) {
            preloaderSpan.style.color = isLight ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)';
        }

        // Update background blobs
        const blobElements = document.querySelectorAll('.animate-blob');
        blobElements.forEach(blob => {
            blob.style.backgroundColor = isLight ? 'rgba(100, 100, 255, 0.08)' : 'rgba(255, 255, 255, 0.05)';
        });

        // Update kinetic text color
        const kineticText = document.getElementById('kinetic-text');
        if (kineticText) {
            kineticText.style.color = isLight ? '#1a1a1a' : '#ffffff';
        }

        // Update scroll progress bar
        const progressBar = document.getElementById('scroll-progress');
        if (progressBar) {
            progressBar.style.backgroundColor = isLight ? '#1a1a1a' : '#ffffff';
        }
    }
}

// --- CONTACT FORM LOGIC ---
function initContactForm() {
    const chips = document.querySelectorAll('.category-chip');
    const hiddenInput = document.getElementById('contact-category');

    if (!hiddenInput) return;

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            // 1. Reset all chips
            chips.forEach(c => {
                c.classList.remove('bg-white', 'text-black', 'border-white');
                c.classList.add('border-white/20', 'text-white/50');
            });

            // 2. Activate clicked chip
            chip.classList.remove('border-white/20', 'text-white/50');
            chip.classList.add('bg-white', 'text-black', 'border-white');

            // 3. Update Hidden Input
            hiddenInput.value = chip.dataset.value;
        });
    });
}

// --- UTILS ---
function copyToClipboard(element, text, label) {
    if (!navigator.clipboard) {
        // Fallback
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showCopyFeedback(element);
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }
        document.body.removeChild(textArea);
        return;
    }

    navigator.clipboard.writeText(text).then(function () {
        showCopyFeedback(element);
    }, function (err) {
        console.error('Async: Could not copy text: ', err);
    });
}

function showCopyFeedback(element) {
    const feedback = element.querySelector('.copy-feedback');
    if (feedback) {
        feedback.classList.remove('opacity-0');
        setTimeout(() => {
            feedback.classList.add('opacity-0');
        }, 2000);
    }
}
