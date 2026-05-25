// "use strict";

// --- GLOBAL SAFETY NET (QA FIX) ---
window.onerror = function (message, source, lineno, colno, error) {
    console.error('CRITICAL ERROR:', message);
    // Emergency: Force remove preloader so user isn't stuck
    const preloader = document.getElementById('preloader');
    const top = document.getElementById('curtain-top');
    const bottom = document.getElementById('curtain-bottom');
    if (preloader) preloader.style.display = 'none';
    if (top) top.style.transform = 'translateY(-100%)';
    if (bottom) bottom.style.transform = 'translateY(100%)';
    document.body.style.overflow = 'auto'; // Release scroll lock
};

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

// ==========================================
// PART 2: APP LOGIC & GLOBAL DELEGATION
// ==========================================

// App State
let currentFilter = 'All';
let activeChatReplies = [];
let chatReplyPool = [];

const initApp = () => {
    populateData();
    initRouter();
    initLenis();
    initPreloader();
    initScrollEffects();
    initImageReveal(); // Premium Image Lazy Loading
    initChatWidget();
    initScrollReveal();
    initCustomCursor(); // Custom Cursor Enabled
    initMagneticButtons(); // Physics Effect for Buttons
    initKineticText(); // Kinetic Typography Background
    initTelegramRipples(); // NEW: Fluid click ripples
    initEventAlbum();
    initHeroVideo();

    // OPTIMIZATION: Disabled on mobile for performance
    if (window.innerWidth > 768) {
        initParticles(); // Cloth wave (light) / Bubble particles (dark)
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

// Exposed Globals
window.toggleMobileMenu = toggleMobileMenu;
window.toggleChat = toggleChat;


// --- FUNCTIONS ---

let _revealObserver;

function getRevealObserver() {
    if (!_revealObserver) {
        _revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    _revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -6%' });
    }
    return _revealObserver;
}

function observeReveals(root = document) {
    const scope = root instanceof Element ? root : document;
    scope.querySelectorAll('.reveal:not(.active)').forEach(el => {
        getRevealObserver().observe(el);
    });
}

function initScrollReveal() {
    observeReveals(document);
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

    const routeSegment = route.split('/')[0];

    if (navbar) navbar.classList.remove('hidden');
    if (footer) footer.classList.remove('hidden');

    views.forEach(view => {
        view.classList.remove('active');
    });
    scrollToTop(true);

    const mobileMenu = document.getElementById('mobile-menu');
    // Auto-close menu on route change
    if (mobileMenu && !mobileMenu.classList.contains('translate-x-full')) toggleMobileMenu();

    let activeViewId = 'view-home';
    if (route === 'services') { renderServicesPage(); activeViewId = 'view-services'; }
    else if (route.startsWith('services/')) { renderServiceDetail(route.split('/')[1]); activeViewId = 'view-service-detail'; }
    else if (route === 'talents') { renderTalentsPage(); activeViewId = 'view-talents'; }
    else if (route.startsWith('talents/')) { renderTalentDetail(route.split('/')[1]); activeViewId = 'view-talent-detail'; }
    else if (route === 'case-studies') { activeViewId = 'view-case-studies'; }
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

    // Keep desktop + mobile navigation in sync
    const activeRoute = ['home', 'services', 'talents', 'case-studies', 'contact'].includes(routeSegment)
        ? routeSegment
        : (routeSegment === 'services' ? 'services' : (routeSegment === 'talents' ? 'talents' : 'home'));
    document.querySelectorAll('.nav-link, .mobile-link').forEach(link => {
        const href = link.getAttribute('href') || '';
        const targetRoute = href.startsWith('#') ? href.substring(1) : href;
        if (targetRoute === activeRoute) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // UPDATED: Re-trigger scroll reveal observer for dynamically injected content
    setTimeout(() => initScrollReveal(), 100);
}

// --- DATA POPULATION ---
function populateData() {
    const footerDesc = document.getElementById('footer-description');
    if (footerDesc) footerDesc.textContent = COMPANY_INFO.description;

    const ticker = document.getElementById('client-ticker');
    if (ticker) {
        const list = [...CLIENTS, ...CLIENTS];
        ticker.innerHTML = list.map(c => {
            const initials = (c.name.match(/\b\w/g) || []).slice(0, 2).join('').toUpperCase();
            const logoMarkup = c.logo
                ? `<img src="${c.logo}" alt="${c.name} logo" class="client-brand-logo-img" />`
                : `<span class="client-logo-placeholder placeholder">${initials}</span>`;

            return `
                <span class="client-brand inline-flex flex-col items-center gap-3 px-8 text-center cursor-default transition-all duration-300">
                    <span class="client-brand-name text-sm font-semibold text-white/70 uppercase tracking-[0.4em] transition-colors duration-300 hover:text-white">${c.name}</span>
                    <span class="client-brand-logo flex items-center justify-center w-14 h-14 rounded-full border border-white/10 bg-white/5 shadow-[0_15px_30px_rgba(0,0,0,0.18)] overflow-hidden">
                        ${logoMarkup}
                    </span>
                </span>
            `;
        }).join('');
    }

    const homeGrid = document.getElementById('home-services-grid');
    if (homeGrid) {
        // Staggered reveal for the 3 core service cards
        homeGrid.className = 'grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10 reveal-stagger';

        homeGrid.innerHTML = SERVICES.slice(0, 3).map(s => `
                <a href='#services/${s.id}' data-page='service-detail' class='tilt-card reveal group relative overflow-hidden rounded-2xl bg-zinc-950/50 backdrop-blur-md border border-white/10 p-10 transition-all duration-1000 ease-out hover:shadow-[0_20px_40px_-15px_rgba(255,255,255,0.1)] hover:border-white/20 hover:bg-zinc-900' style='transform-style: preserve-3d; perspective: 1000px;'>
                    <div class='tilt-glare absolute inset-0 w-full h-full bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 pointer-events-none transition-opacity duration-300' style='transform: translateZ(1px)'></div>
                    <div class='absolute -right-20 -top-20 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-700 pointer-events-none' style='transform: translateZ(0px)'></div>
                    <div class='mb-8 text-white/50 group-hover:text-white group-hover:scale-110 transition-all duration-500 origin-left'>
                        ${ICONS[s.icon] || ICONS.Radio}
                    </div>
                    <h3 class='text-2xl font-serif text-white mb-4 relative z-10'>${s.title}</h3>
                    <p class='text-sm text-white/60 font-light leading-relaxed mb-8 relative z-10 group-hover:text-white/80 transition-colors'>${s.description}</p>
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

    // ---- WHY WORK WITH US section ----
    const servicesView = document.getElementById('view-services');
    if (servicesView && !document.getElementById('why-work-section')) {
        const leftNodes  = [
            { label: 'Access to Talents',   delay: 80  },
            { label: 'Streamlined Process', delay: 200 },
            { label: 'Campaign Strategy',   delay: 320 },
        ];
        const rightNodes = [
            { label: 'Cost Efficient',      delay: 140 },
            { label: 'Platform Expert',     delay: 260 },
            { label: 'Creative Direction',  delay: 380 },
        ];
        const makeNode = (n, side, i) => `
            <div class="wwu-node-wrap" style="--delay:${n.delay}ms;--i:${i}">
                <div class="wwu-node wwu-node--${side}" style="--delay:${n.delay}ms;--i:${i}">
                    <span class="wwu-node__text">${n.label}</span>
                </div>
            </div>`;

        const section = document.createElement('section');
        section.id = 'why-work-section';
        section.className = 'wwu-section';
        section.innerHTML = `
            <div class="wwu-inner">
                <div class="wwu-header reveal">
                    <span class="wwu-eyebrow">What Sets Us Apart</span>
                    <h2 class="wwu-title">Why Work With Us</h2>
                    <p class="wwu-sub">Working with an MCN agency gives brands and creators access to expert content strategy,
                    top-performing talent, and end-to-end support that drives real results
                    in short video and livestreaming campaigns.</p>
                </div>
                <div class="wwu-diagram" id="wwu-diagram">
                    <div class="wwu-diagram__ambient" aria-hidden="true"></div>

                    <!-- Left nodes -->
                    <div class="wwu-col wwu-col--left">
                        ${leftNodes.map((n, i) => makeNode(n, 'left', i)).join('')}
                    </div>

                    <!-- Centre: trunk line + hub -->
                    <div class="wwu-centre">
                        <div class="wwu-trunk"></div>
                        <div class="wwu-hub" id="wwu-hub">
                            <div class="wwu-hub-ring wwu-hub-ring--outer"></div>
                            <div class="wwu-hub-ring wwu-hub-ring--inner"></div>
                            <div class="wwu-hub-logo">
                                <img class="theme-logo" src="assets/images/TAC.png" alt="The Aura Creatives" />
                                <span>THE AURA<br><small>CREATIVES</small></span>
                            </div>
                        </div>
                    </div>

                    <!-- Right nodes -->
                    <div class="wwu-col wwu-col--right">
                        ${rightNodes.map((n, i) => makeNode(n, 'right', i + 3)).join('')}
                    </div>

                </div>
            </div>`;

        servicesView.appendChild(section);
    }

    const wwuSection = document.getElementById('why-work-section');
    if (wwuSection) {
        requestAnimationFrame(() => {
            observeReveals(wwuSection);
            initWhyWorkDiagram(wwuSection);
        });
    }
}

function initWhyWorkDiagram(section) {
    const diagram = section?.querySelector('#wwu-diagram');
    if (!diagram || diagram.dataset.wwuInit) return;
    diagram.dataset.wwuInit = '1';

    const header = section.querySelector('.wwu-header');
    const nodes = section.querySelectorAll('.wwu-node');

    const play = () => {
        if (section.classList.contains('wwu-animate')) return;
        section.classList.add('wwu-animate');
        header?.classList.add('wwu-header--active');
        nodes.forEach((node, i) => {
            node.style.setProperty('--i', String(i));
        });
    };

    const obs = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                play();
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -5%' });

    obs.observe(diagram);

    requestAnimationFrame(() => {
        const rect = diagram.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92 && rect.bottom > 40) play();
    });
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
    renderTalentsGrid();
}

function filterTalents(cat) {
    if (currentFilter === cat) return;

    const grid = document.getElementById('talents-grid');
    if (!grid) {
        currentFilter = cat;
        renderTalentsPage();
        return;
    }

    const gridHeight = grid.getBoundingClientRect().height;
    grid.style.minHeight = `${gridHeight}px`;

    grid.style.transition = 'all 300ms ease-in-out';
    grid.classList.add('opacity-0', 'translate-y-4');

    setTimeout(() => {
        currentFilter = cat;
        renderTalentsPage();

        const newGrid = document.getElementById('talents-grid');
        if (newGrid) {
            void newGrid.offsetWidth;
            newGrid.style.transition = 'all 300ms ease-in-out';
            newGrid.classList.remove('opacity-0', 'translate-y-4');

            setTimeout(() => {
                newGrid.style.minHeight = '';
            }, 300);
        }
    }, 300);
}

function getArtistSocial(artist) {
    const social = artist.social || {};
    const ig = artist.followers?.find((f) => f.platform === 'Instagram');
    const tt = artist.followers?.find((f) => f.platform === 'TikTok');
    const fromHandle = (handle, platform) => {
        if (!handle || handle === 'TBA') return '';
        const user = handle.replace('@', '').trim();
        if (platform === 'instagram') return `https://www.instagram.com/${user}/`;
        if (platform === 'tiktok') return `https://www.tiktok.com/@${user}`;
        return '';
    };
    return {
        instagram: (social.instagram || '').trim() || fromHandle(ig?.handle, 'instagram'),
        tiktok: (social.tiktok || '').trim() || fromHandle(tt?.handle, 'tiktok'),
    };
}

function renderTalentSocialLinks(artist, variant = 'card') {
    const { instagram, tiktok } = getArtistSocial(artist);
    const btnClass = variant === 'detail' ? 'talent-social-btn talent-social-btn--detail' : 'talent-social-btn';
    const items = [];
    if (instagram) {
        items.push(`<a href="${instagram}" target="_blank" rel="noopener noreferrer" class="${btnClass}" aria-label="${artist.name} on Instagram">${ICONS.Instagram}<span>Instagram</span></a>`);
    }
    if (tiktok) {
        items.push(`<a href="${tiktok}" target="_blank" rel="noopener noreferrer" class="${btnClass}" aria-label="${artist.name} on TikTok">${ICONS.TikTok}<span>TikTok</span></a>`);
    }
    if (!items.length) return '';
    return `<div class="talent-social-row">${items.join('')}</div>`;
}

function renderTalentsGrid() {
    const grid = document.getElementById('talents-grid');
    if (!grid) return;
    const filtered = currentFilter === 'All' ? ARTISTS : ARTISTS.filter(a => a.categories.includes(currentFilter));
    grid.innerHTML = filtered.map((a, index) => `
            <article style="animation-delay: ${index * 100}ms; transform-style: preserve-3d; perspective: 1000px" class="talent-roster-card tilt-card group relative block h-full rounded-2xl md:rounded-3xl bg-zinc-950/40 border border-white/10 overflow-hidden transition-all duration-700 ease-out hover:border-white/25 hover:shadow-2xl animate-fade-in-up">
                <div class='tilt-glare absolute inset-0 w-full h-full bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 pointer-events-none transition-opacity duration-300 z-20'></div>
                <a href="#talents/${a.id}" data-page="talent-detail" class="talent-card-link">
                <div class="aspect-[3/4] w-full overflow-hidden relative shrink-0">
                    <div class="parallax-img w-full h-full">
                        <img src="${a.image}" alt="" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105" />
                    </div>
                    <div class="talent-card-meta absolute inset-x-0 bottom-0 z-10 p-5 md:p-6 pt-16 bg-gradient-to-t from-black via-black/85 to-transparent">
                        <h3 class="font-serif text-2xl md:text-3xl text-white mb-1 leading-tight">${a.name}</h3>
                        <p class="talent-card-role text-[10px] md:text-xs font-bold uppercase tracking-[0.18em]">${a.role}</p>
                    </div>
                </div>
                </a>
                <div class="px-5 py-3 md:px-6 border-t border-white/[0.06] flex flex-wrap content-start gap-2">
                    ${a.categories.map(cat => `<span class="talent-chip">${cat}</span>`).join('')}
                </div>
                <div class="talent-card-social">${renderTalentSocialLinks(a, 'card')}</div>
            </article>
        `).join('');

    if (window.innerWidth > 768) {
        setTimeout(() => init3DTilt(), 100);
    }
}

function renderTalentDetail(id) {
    const a = ARTISTS.find(x => x.id === id);
    const c = document.getElementById('view-talent-detail');
    if (!a || !c) return;
    const social = getArtistSocial(a);
    const platformUrl = (platform) => {
        if (platform === 'Instagram') return social.instagram;
        if (platform === 'TikTok') return social.tiktok;
        return '';
    };
    const socialBlocks = (a.followers || []).map((f) => {
        const url = platformUrl(f.platform);
        const blockInner = '<div class="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-3">' + f.platform + '</' + 'div><div class="font-serif text-2xl md:text-3xl text-white mb-1">' + f.count + '</' + 'div><div class="text-sm text-white/45">' + f.handle + '</' + 'div>';
        if (url) {
            return '<a href="' + url + '" target="_blank" rel="noopener noreferrer" class="talent-social-block-link border border-white/10 rounded-2xl p-5 md:p-6 bg-white/[0.02] hover:border-white/20 transition-colors block">' + blockInner + '</a>';
        }
        return '<' + 'div class="talent-social-block-link is-disabled border border-white/10 rounded-2xl p-5 md:p-6 bg-white/[0.02]">' + blockInner + '</' + 'div>';
    }).join('');
    c.innerHTML = `
            <div class="container mx-auto px-6 py-20">
                <a href="#talents" class="js-back-btn inline-flex items-center gap-3 text-xs md:text-sm font-bold tracking-widest uppercase text-white/60 hover:text-white transition-all duration-300 mb-10 px-4 py-3 md:px-6 md:py-4 hover:bg-white/10 rounded-full w-fit">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    BACK TO TALENTS
                </a>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    <div class="rounded-2xl overflow-hidden border border-white/10"><img src="${a.image}" loading="lazy" decoding="async" alt="" class="w-full h-auto" /></div>
                    <div>
                        <h1 class="font-serif text-5xl md:text-6xl text-white mb-3">${a.name}</h1>
                        <p class="text-sm font-bold uppercase tracking-widest text-white/50 mb-6">${a.role}</p>
                        <div class="flex flex-wrap gap-2 mb-10">${a.categories.map(cat => `<span class="talent-chip talent-chip--detail">${cat}</span>`).join('')}</div>
                        <p class="text-white/70 text-lg leading-relaxed mb-8">${a.about || 'A leading creator in the industry.'}</p>
                        <div class="talent-detail-social-actions">${renderTalentSocialLinks(a, 'detail')}</div>
                        <h3 class="font-serif text-xl md:text-2xl mb-5 text-white/90">Social reach</h3>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">${socialBlocks}</div>
                        <h3 class="font-serif text-xl md:text-2xl mb-6">Gallery</h3>
                        <div class="grid grid-cols-2 gap-4">${a.gallery.map(img => `<img src="${img}" loading="lazy" decoding="async" alt="" class="w-full h-auto rounded-lg border border-white/5" />`).join('')}</div>
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


// --- DUAL INTRO PRELOADER (Pixel Reach → The Aura) ---
function initPreloader() {
    const top = document.getElementById('curtain-top');
    const bottom = document.getElementById('curtain-bottom');
    const preloader = document.getElementById('preloader');
    const introPixel = document.getElementById('intro-pixel');
    const introAura = document.getElementById('intro-aura');
    const heroH1 = document.querySelector('#view-home h1');

    if (heroH1) heroH1.style.opacity = '0';

    scrollToTop(true);
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        if (preloader) preloader.classList.add('is-visible');
    }, 80);

    setTimeout(() => {
        if (introPixel) {
            introPixel.classList.add('is-leaving');
            introPixel.classList.remove('is-active');
            introPixel.setAttribute('aria-hidden', 'true');
        }
        if (introAura) {
            introAura.classList.add('is-active');
            introAura.removeAttribute('aria-hidden');
        }
    }, 2400);

    setTimeout(() => {
        if (preloader) preloader.classList.add('is-exiting');
    }, 4600);

    setTimeout(() => {
        if (top) top.style.transform = 'translateY(-100%)';
        if (bottom) bottom.style.transform = 'translateY(100%)';

        if (heroH1) {
            heroH1.style.transition = 'opacity 1.5s ease-in-out';
            heroH1.style.opacity = '1';
        }

        setTimeout(() => {
            document.body.style.overflow = '';
            if (preloader) preloader.style.display = 'none';
        }, 1500);
    }, 5200);
}

// --- SCROLL RUNTIME (unified listeners + RAF ticker) ---
const ScrollRuntime = (() => {
    let scrollY = 0;
    let scrollDelta = 0;
    let lastY = 0;
    let motionPaused = false;
    const scrollListeners = new Set();
    const tickListeners = new Set();
    let tickRaf = null;

    function emitScroll(y) {
        scrollY = y;
        scrollDelta = y - lastY;
        lastY = y;
        scrollListeners.forEach((fn) => fn(scrollY, scrollDelta));
    }

    function onScroll(fn) {
        scrollListeners.add(fn);
        fn(scrollY, 0);
        return () => scrollListeners.delete(fn);
    }

    function onTick(fn) {
        tickListeners.add(fn);
        ensureTickLoop();
        return () => {
            tickListeners.delete(fn);
            if (tickListeners.size === 0 && tickRaf) {
                cancelAnimationFrame(tickRaf);
                tickRaf = null;
            }
        };
    }

    function ensureTickLoop() {
        if (tickRaf) return;
        const frame = () => {
            if (!motionPaused) {
                tickListeners.forEach((fn) => fn());
            }
            tickRaf = requestAnimationFrame(frame);
        };
        tickRaf = requestAnimationFrame(frame);
    }

    function bindNative() {
        let scheduled = false;
        window.addEventListener(
            'scroll',
            () => {
                if (scheduled) return;
                scheduled = true;
                requestAnimationFrame(() => {
                    scheduled = false;
                    emitScroll(window.scrollY || document.documentElement.scrollTop);
                });
            },
            { passive: true }
        );
        emitScroll(window.scrollY || document.documentElement.scrollTop);
    }

    function initMotionPolicy() {
        const setPaused = () => {
            motionPaused =
                document.hidden ||
                window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        };
        setPaused();
        document.addEventListener('visibilitychange', setPaused);
        window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', setPaused);
    }

    function markScrolling() {
        document.body.classList.add('is-scrolling');
        clearTimeout(markScrolling._timer);
        markScrolling._timer = setTimeout(() => {
            document.body.classList.remove('is-scrolling');
        }, 140);
    }

    return {
        onScroll,
        onTick,
        bindNative,
        initMotionPolicy,
        emitScroll,
        markScrolling,
        get scrollY() {
            return scrollY;
        },
        get scrollDelta() {
            return scrollDelta;
        },
        get motionPaused() {
            return motionPaused;
        },
    };
})();

function scrollToTop(immediate = false) {
    if (window.lenis) {
        window.lenis.scrollTo(0, { immediate });
        return;
    }
    window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' });
}

// --- EFFECTS ---
function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    const logo = document.getElementById('main-logo');
    const progressBar = document.getElementById('scroll-progress');
    let navScrolled = null;

    ScrollRuntime.onScroll((y) => {
        ScrollRuntime.markScrolling();

        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = height > 0 ? (y / height) * 100 : 0;
        if (progressBar) progressBar.style.width = scrolled + '%';

        if (!navbar) return;

        const isScrolled = y > 50;
        if (navScrolled === isScrolled) return;
        navScrolled = isScrolled;

        if (isScrolled) {
            navbar.classList.add('navbar-glass--scrolled');
        } else {
            navbar.classList.remove('navbar-glass--scrolled');
        }
    });
}

function initMagneticButtons() {
    // Magnetic hover interactions are now opt-in only to avoid unwanted button drift.
    const buttons = document.querySelectorAll('button.magnetic, a.magnetic');

    buttons.forEach(btn => {
        btn.style.transition = 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)';

        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const moveX = Math.max(-10, Math.min(10, x * 0.3));
            const moveY = Math.max(-10, Math.min(10, y * 0.3));

            btn.style.transition = 'none';
            btn.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transition = 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
            btn.style.transform = 'translate(0px, 0px)';
        });
    });
}

function initParallax() {
    const images = Array.from(document.getElementsByClassName('parallax-img'));
    if (!images.length) return;

    const winCenter = () => window.innerHeight / 2;

    const update = () => {
        const center = winCenter();
        for (const wrapper of images) {
            const parent = wrapper.parentElement;
            if (!parent) continue;
            const rect = parent.getBoundingClientRect();
            if (rect.bottom <= 0 || rect.top >= window.innerHeight) continue;
            const y = (rect.top + rect.height / 2 - center) * 0.08;
            wrapper.style.transform = `translate3d(0, ${y}px, 0) scale(1.1)`;
        }
    };

    ScrollRuntime.onScroll(update);
    ScrollRuntime.onTick(update);
}

function initKineticText() {
    const el = document.getElementById('kinetic-text');
    if (!el) return;

    if (window.matchMedia('(pointer: coarse)').matches) {
        el.classList.add('animate-marquee');
        return;
    }

    el.classList.remove('animate-marquee');

    let currentX = 0;
    const baseSpeed = 1.6;
    let scrollBoost = 0;

    ScrollRuntime.onScroll((_y, delta) => {
        scrollBoost = Math.min(12, Math.abs(delta) * 0.65);
    });

    ScrollRuntime.onTick(() => {
        scrollBoost *= 0.88;
        currentX -= baseSpeed + scrollBoost;
        const loopWidth = el.offsetWidth / 3;
        if (loopWidth > 0 && currentX < -loopWidth) currentX = 0;
        el.style.transform = `translate3d(${currentX}px, 0, 0)`;
    });
}

function init3DTilt() {
    const cards = document.querySelectorAll('.tilt-card:not(.js-tilt-initialized)');

    cards.forEach(card => {
        card.classList.add('js-tilt-initialized');
        const glare = card.querySelector('.tilt-glare');

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
    // --- DARK MODE: Bubble particles on main canvas ---
    const canvas = document.getElementById('particle-canvas');
    const clothCanvas = document.getElementById('cloth-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    const particleCount = 28;
    let isScrolling = false;
    let scrollIdleTimer;

    ScrollRuntime.onScroll(() => {
        isScrolling = true;
        clearTimeout(scrollIdleTimer);
        scrollIdleTimer = setTimeout(() => { isScrolling = false; }, 180);
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height + canvas.height;
            this.size = Math.random() * 7 + 3;
            this.speedY = -(Math.random() * 1 + 0.5);
            this.angle = Math.random() * Math.PI * 2;
            this.angleSpeed = Math.random() * 0.02 + 0.01;
            this.opacity = Math.random() * 0.3 + 0.3;
        }
        update() {
            this.y += this.speedY;
            this.x += Math.sin(this.angle) * 0.6;
            this.angle += this.angleSpeed;
            if (this.y < -50) { this.y = canvas.height + 50; this.x = Math.random() * canvas.width; }
        }
        draw() {
            ctx.globalAlpha = this.opacity;
            ctx.strokeStyle = `rgba(110, 110, 110, ${this.opacity * 0.9})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.stroke();
            ctx.fillStyle = `rgba(130, 130, 130, ${this.opacity * 0.18})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 0.9, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    function initBubbles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) particles.push(new Particle());
    }

    // --- LIGHT MODE: Cloth Wave Effect ---
    let clothTime = 0;
    let clothCtx = null;
    if (clothCanvas) {
        clothCanvas.width = window.innerWidth;
        clothCanvas.height = window.innerHeight;
        clothCtx = clothCanvas.getContext('2d', { alpha: true });
    }

    // Cloth wave rendering: layered sinusoidal fabric with fashion-inspired gold/cream palette
    function drawClothWave(timestamp) {
        if (!clothCtx || !clothCanvas) return;
        clothCtx.clearRect(0, 0, clothCanvas.width, clothCanvas.height);
        const W = clothCanvas.width;
        const H = clothCanvas.height;
        const t = clothTime;

        // Draw multiple overlapping fabric layers
        const layers = [
            { amp: 38, freq: 0.0028, speed: 0.00022, yBase: 0.18, alpha: 0.18, hue: 'rgba(100,100,100,', width: 1.8 },
            { amp: 28, freq: 0.0035, speed: 0.00031, yBase: 0.32, alpha: 0.15, hue: 'rgba(80,80,80,',   width: 1.5 },
            { amp: 50, freq: 0.0020, speed: 0.00018, yBase: 0.48, alpha: 0.20, hue: 'rgba(120,120,120,', width: 2.0 },
            { amp: 32, freq: 0.0042, speed: 0.00027, yBase: 0.62, alpha: 0.16, hue: 'rgba(90,90,90,',   width: 1.4 },
            { amp: 44, freq: 0.0025, speed: 0.00015, yBase: 0.75, alpha: 0.18, hue: 'rgba(110,110,110,', width: 1.8 },
            { amp: 22, freq: 0.0050, speed: 0.00035, yBase: 0.88, alpha: 0.14, hue: 'rgba(95,95,95,',   width: 1.3 },
        ];

        // Also draw vertical warp threads for fabric texture
        const warpLayers = [
            { amp: 20, freq: 0.0030, speed: 0.00020, xBase: 0.15, alpha: 0.10, hue: 'rgba(100,100,100,', width: 1.1 },
            { amp: 16, freq: 0.0038, speed: 0.00025, xBase: 0.35, alpha: 0.09, hue: 'rgba(115,115,115,', width: 1.0 },
            { amp: 24, freq: 0.0022, speed: 0.00017, xBase: 0.55, alpha: 0.11, hue: 'rgba(85,85,85,',   width: 1.1 },
            { amp: 18, freq: 0.0045, speed: 0.00030, xBase: 0.75, alpha: 0.09, hue: 'rgba(105,105,105,', width: 0.9 },
            { amp: 14, freq: 0.0055, speed: 0.00040, xBase: 0.90, alpha: 0.08, hue: 'rgba(95,95,95,',   width: 0.9 },
        ];

        // Draw horizontal weft (fill) threads
        layers.forEach((layer, li) => {
            const yCenter = layer.yBase * H;
            const phaseShift = li * 0.7;

            // Draw multiple parallel threads close together for fabric density
            for (let thread = -6; thread <= 6; thread++) {
                const yOff = thread * 7;
                clothCtx.beginPath();
                clothCtx.lineWidth = layer.width;
                const alpha = layer.alpha * (1 - Math.abs(thread) / 8);
                clothCtx.strokeStyle = layer.hue + alpha + ')';

                for (let x = 0; x <= W; x += 3) {
                    // Multi-frequency wave for fabric drape realism
                    const y = yCenter + yOff
                        + Math.sin(x * layer.freq + t * layer.speed * 1000 + phaseShift) * layer.amp
                        + Math.sin(x * layer.freq * 1.7 + t * layer.speed * 700 + phaseShift * 1.3) * (layer.amp * 0.4)
                        + Math.sin(x * layer.freq * 0.5 + t * layer.speed * 400 + phaseShift * 0.6) * (layer.amp * 0.6);

                    if (x === 0) clothCtx.moveTo(x, y);
                    else clothCtx.lineTo(x, y);
                }
                clothCtx.stroke();
            }
        });

        // Draw vertical warp threads
        warpLayers.forEach((layer, li) => {
            const xCenter = layer.xBase * W;
            const phaseShift = li * 1.1;

            for (let thread = -4; thread <= 4; thread++) {
                const xOff = thread * 9;
                clothCtx.beginPath();
                clothCtx.lineWidth = layer.width;
                const alpha = layer.alpha * (1 - Math.abs(thread) / 6);
                clothCtx.strokeStyle = layer.hue + alpha + ')';

                for (let y = 0; y <= H; y += 4) {
                    const x = xCenter + xOff
                        + Math.sin(y * layer.freq + t * layer.speed * 900 + phaseShift) * layer.amp
                        + Math.sin(y * layer.freq * 1.5 + t * layer.speed * 600 + phaseShift * 1.2) * (layer.amp * 0.35);

                    if (y === 0) clothCtx.moveTo(x, y);
                    else clothCtx.lineTo(x, y);
                }
                clothCtx.stroke();
            }
        });

        // Subtle flowing highlight: a silky sheen diagonal sweep
        const sheenGrad = clothCtx.createLinearGradient(
            W * 0.1 + Math.sin(t * 0.0003) * W * 0.15,
            0,
            W * 0.6 + Math.cos(t * 0.00025) * W * 0.2,
            H
        );
        sheenGrad.addColorStop(0, 'rgba(200,200,200,0)');
        sheenGrad.addColorStop(0.4, 'rgba(160,160,160,0.06)');
        sheenGrad.addColorStop(0.6, 'rgba(220,220,220,0.08)');
        sheenGrad.addColorStop(1, 'rgba(200,200,200,0)');
        clothCtx.fillStyle = sheenGrad;
        clothCtx.fillRect(0, 0, W, H);
    }

    // Determine current mode and show the right canvas
    function syncCanvasToTheme() {
        const isLight = document.documentElement.classList.contains('light-theme');
        if (isLight) {
            canvas.style.opacity = '0';
            if (clothCanvas) clothCanvas.style.opacity = '1';
        } else {
            canvas.style.opacity = '1';
            if (clothCanvas) clothCanvas.style.opacity = '0';
        }
    }

    // Tick function handles both modes
    ScrollRuntime.onTick((timestamp) => {
        if (ScrollRuntime.motionPaused || document.hidden) return;
        clothTime = timestamp || 0;

        const isLight = document.documentElement.classList.contains('light-theme');
        if (isLight) {
            if (clothCtx) drawClothWave(timestamp);
        } else {
            if (isScrolling) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) { particles[i].update(); particles[i].draw(); }
        }
    });

    initBubbles();
    syncCanvasToTheme();

    // Re-sync on theme change
    const themeObserver = new MutationObserver(syncCanvasToTheme);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        if (clothCanvas) { clothCanvas.width = window.innerWidth; clothCanvas.height = window.innerHeight; }
        initBubbles();
    }, { passive: true });
}

// --- LENIS SMOOTH SCROLL ---
function initLenis() {
    ScrollRuntime.initMotionPolicy();
    document.documentElement.classList.remove('scroll-smooth');

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

    if (prefersReduced || coarsePointer || typeof Lenis === 'undefined') {
        if (typeof Lenis === 'undefined') console.warn('Lenis library not found — using native scroll.');
        ScrollRuntime.bindNative();
        return;
    }

    const lenis = new Lenis({
        duration: 0.85,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1.2,
        smoothTouch: false,
        touchMultiplier: 1.4,
    });

    lenis.on('scroll', ({ scroll }) => {
        ScrollRuntime.emitScroll(scroll);
        ScrollRuntime.markScrolling();
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    window.lenis = lenis;
    ScrollRuntime.emitScroll(lenis.scroll);
}

// --
function initChatWidget() {
    const msgs = document.getElementById('chat-messages');

    if (activeChatReplies.length === 0) {
        activeChatReplies = CHAT_QUICK_REPLIES.slice(0, 1);
        chatReplyPool = CHAT_QUICK_REPLIES.slice(1);
    }

    if (msgs && msgs.children.length === 0) {
        const div = document.createElement('div');
        div.className = "flex justify-start animate-fade-in-up";
        div.innerHTML = `<div class="bg-white/10 px-5 py-3 rounded-2xl text-sm text-white">Hi! Welcome to the Pixel Reach - The Aura Creatives! How can I help you today?</div>`;
        msgs.appendChild(div);
        renderQuickReplies();
    }

    const input = document.getElementById('chat-input');
    if (input) {
        input.onkeypress = (e) => {
            if (e.key === 'Enter') handleChatSend();
        };
    }

    setTimeout(() => {
        const tooltip = document.getElementById('chat-tooltip');
        if (tooltip) {
            tooltip.innerHTML = `Welcome, chat with us!<div class="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rotate-45"></div>`;
            tooltip.classList.remove('opacity-0');
            tooltip.classList.add('chat-tooltip-active');
            tooltip.classList.remove('chat-tooltip-hidden');
            setTimeout(() => {
                tooltip.classList.remove('chat-tooltip-active');
                tooltip.classList.add('chat-tooltip-hidden');
            }, 7000);
            setTimeout(() => {
                tooltip.classList.add('opacity-0');
            }, 7600);
        }
    }, 7000);
}

function renderQuickReplies() {
    const quick = document.getElementById('quick-replies');
    if (!quick) return;

    quick.innerHTML = activeChatReplies.map(r => `
        <button class="quick-reply-btn whitespace-nowrap px-4 py-2 rounded-full border border-white/20 bg-white/5 text-xs text-white/70 hover:bg-white hover:text-black transition-all">
            ${r}
        </button>
    `).join('');

    quick.onclick = (e) => {
        const btn = e.target.closest('.quick-reply-btn');
        if (btn) {
            const text = btn.textContent.trim();
            const input = document.getElementById('chat-input');
            if (input) {
                input.value = text;
                handleChatSend();

                const index = activeChatReplies.indexOf(text);
                if (index !== -1) {
                    activeChatReplies.splice(index, 1);
                    chatReplyPool.push(text);
                    if (chatReplyPool.length > 0) {
                        const next = chatReplyPool.shift();
                        activeChatReplies.splice(index, 0, next);
                    }
                    renderQuickReplies();
                }
            }
        }
    };
}

function toggleChat(e) {
    if (e) e.stopPropagation(); 
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

// --- HERO VIDEO: play with sound in view, pause when scrolled away ---
function initHeroVideo() {
    const video = document.getElementById('hero-reel-video');
    const wrap = document.getElementById('hero-video-wrap');
    const btn = document.getElementById('hero-video-sound');
    if (!video) return;

    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.volume = 0.85;
    video.muted = true;

    let userMuted = false;
    let inView = false;
    const labelEl = btn?.querySelector('.hero-video-sound__label');

    function setSoundUi(on) {
        if (!btn) return;
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
        btn.setAttribute('aria-label', on ? 'Mute hero video' : 'Unmute hero video');
        if (labelEl) labelEl.textContent = on ? 'Mute' : 'Sound on';
        wrap?.classList.toggle('hero-video-wrap--sound', on);
    }

    async function playInView() {
        if (!inView) return;
        try {
            await video.play();
            if (!userMuted) {
                video.muted = false;
                setSoundUi(true);
            }
        } catch (err) {
            console.warn('Hero video play blocked:', err);
        }
    }

    function pauseOutOfView() {
        video.pause();
        video.muted = true;
        setSoundUi(false);
    }

    setSoundUi(false);

    const visibilityObs = new IntersectionObserver((entries) => {
        entries.forEach(async (entry) => {
            inView = entry.isIntersecting && entry.intersectionRatio >= 0.35;
            if (inView) {
                await playInView();
            } else {
                pauseOutOfView();
            }
        });
    }, { threshold: [0, 0.35, 0.55] });

    visibilityObs.observe(wrap || video);

    requestAnimationFrame(() => {
        const el = wrap || video;
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9 && rect.bottom > rect.height * 0.35) {
            inView = true;
            playInView();
        }
    });

    if (btn) {
        btn.addEventListener('click', async () => {
            if (video.muted || userMuted) {
                userMuted = false;
                video.muted = false;
                try {
                    await video.play();
                    setSoundUi(true);
                } catch (err) {
                    console.warn('Hero video sound blocked:', err);
                    video.muted = true;
                    userMuted = true;
                    setSoundUi(false);
                }
            } else {
                userMuted = true;
                video.muted = true;
                setSoundUi(false);
            }
        });
    }

    video.addEventListener('ended', () => {
        if (inView) video.play().catch(() => {});
    });
}

// --- EVENT PHOTO ALBUM LIGHTBOX ---
function initEventAlbum() {
    const lightbox = document.getElementById('event-lightbox');
    if (!lightbox) return;

    const imgEl = document.getElementById('event-lightbox-img');
    const captionEl = document.getElementById('event-lightbox-caption');
    const counterEl = document.getElementById('event-lightbox-counter');
    let images = [];
    let currentIndex = 0;
    let eventTitle = 'Event';

    document.querySelectorAll('[data-event-album]').forEach((album) => {
        const albumTitle = album.getAttribute('data-event-title') || eventTitle;
        let albumImages = [];

        try {
            const parsed = JSON.parse(album.getAttribute('data-event-images') || '[]');
            if (Array.isArray(parsed) && parsed.length) albumImages = parsed;
        } catch (_) { /* ignore invalid JSON */ }

        album.querySelectorAll('.event-album-card').forEach((card) => {
            card.addEventListener('click', () => {
                const idx = parseInt(card.getAttribute('data-index'), 10) || 0;
                openLightbox(idx, albumTitle, albumImages);
            });
        });
    });

    function showImage(index) {
        if (!images.length || !imgEl) return;
        currentIndex = (index + images.length) % images.length;
        imgEl.classList.add('is-changing');
        window.setTimeout(() => {
            imgEl.src = images[currentIndex];
            imgEl.alt = `${eventTitle} photo ${currentIndex + 1}`;
            imgEl.classList.remove('is-changing');
        }, 180);
        if (captionEl) captionEl.textContent = eventTitle;
        if (counterEl) counterEl.textContent = `${currentIndex + 1} / ${images.length}`;
    }

    function openLightbox(index, title, albumImages = []) {
        if (!Array.isArray(albumImages) || !albumImages.length) return;
        images = albumImages;
        eventTitle = title || eventTitle;
        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        if (window.lenis) window.lenis.stop();
        showImage(index);
    }

    function closeLightbox() {
        lightbox.classList.remove('is-open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (window.lenis) window.lenis.start();
    }

    function step(delta) {
        showImage(currentIndex + delta);
    }

    lightbox.querySelectorAll('[data-lightbox-close]').forEach((el) => {
        el.addEventListener('click', closeLightbox);
    });

    lightbox.querySelector('[data-lightbox-prev]')?.addEventListener('click', () => step(-1));
    lightbox.querySelector('[data-lightbox-next]')?.addEventListener('click', () => step(1));

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('is-open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') step(1);
        if (e.key === 'ArrowLeft') step(-1);
    });
}

// --- CUSTOM CURSOR ---
function initCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    if (!cursor) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
        if (cursor.style.opacity === '0') cursor.style.opacity = '1';
    }, { passive: true });

    document.addEventListener('mouseover', (e) => {
        const target = e.target;
        if (!target || typeof target.closest !== 'function') return;

        const interactive = target.closest('a, button, .hover-trigger, .tilt-card, .event-album-card');
        const nonInteractiveLogo = target.closest('.no-cursor-react, #main-logo, #footer-logo, #preloader-logo, #preloader-logo-pixel');

        if (interactive && !nonInteractiveLogo) {
            cursor.classList.add('hovered');
        } else {
            cursor.classList.remove('hovered');
        }
    });

    document.body.style.cursor = 'none';
}

// --- THEME TOGGLE (Day/Night Switch) ---
function initThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    if (!toggle) {
        console.warn('Theme toggle elements not found');
        return;
    }

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
        enableLightMode(true);
    } else {
        enableDarkMode(true);
    }

    toggle.addEventListener('click', () => {
        toggle.classList.add('is-switching');
        setTimeout(() => toggle.classList.remove('is-switching'), 520);

        if (html.classList.contains('light-theme')) {
            enableDarkMode();
            localStorage.setItem('theme', 'dark');
        } else {
            enableLightMode();
            localStorage.setItem('theme', 'light');
        }
    });

    function playThemeTransition() {
        html.classList.add('theme-transitioning');
        setTimeout(() => html.classList.remove('theme-transitioning'), 520);
    }

    function setToggleUi(theme) {
        const isLight = theme === 'light';
        toggle.dataset.theme = theme;
        toggle.setAttribute('aria-pressed', isLight ? 'true' : 'false');
        toggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
    }

    function enableLightMode(isInitial = false) {
        html.classList.add('light-theme');
        setToggleUi('light');
        if (!isInitial) playThemeTransition();
        updateDynamicElements('light', isInitial);
    }

    function enableDarkMode(isInitial = false) {
        html.classList.remove('light-theme');
        setToggleUi('dark');
        if (!isInitial) playThemeTransition();
        updateDynamicElements('dark', isInitial);
    }

    function updateDynamicElements(theme, isInitial = false) {
        const isLight = theme === 'light';

        const logos = [
            document.getElementById('main-logo'),
            document.getElementById('footer-logo'),
            document.getElementById('preloader-logo'),
            document.getElementById('preloader-logo-pixel')
        ];

        const logoFilter = isLight ? 'invert(1) brightness(0.92) contrast(1.05)' : 'none';
        const themeFavicon = isLight ? 'assets/images/logo.png' : 'assets/images/TheAuraNewLogo.png';

        logos.forEach(logo => {
            if (!logo) return;

            if (isInitial) {
                logo.style.filter = logoFilter;
            } else {
                logo.style.transition = 'filter 0.3s ease, opacity 0.3s ease';
                logo.style.opacity = '0';
                setTimeout(() => {
                    logo.style.filter = logoFilter;
                    logo.style.opacity = '1';
                }, 200);
            }
        });

        const favicon = document.querySelector('link[rel="icon"]');
        const ogImage = document.querySelector('meta[property="og:image"]');
        const twitterImage = document.querySelector('meta[name="twitter:image"]');

        if (favicon) favicon.href = themeFavicon;
        if (ogImage) ogImage.setAttribute('content', window.location.origin + '/' + themeFavicon);
        if (twitterImage) twitterImage.setAttribute('content', window.location.origin + '/' + themeFavicon);

        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (ScrollRuntime.scrollY > 50) {
                navbar.classList.add('navbar-glass--scrolled');
            } else {
                navbar.classList.remove('navbar-glass--scrolled');
            }
        }

        const curtainTop = document.getElementById('curtain-top');
        const curtainBottom = document.getElementById('curtain-bottom');
        const preloaderTitles = document.querySelectorAll('#preloader .intro-title');
        const preloaderTaglines = document.querySelectorAll('#preloader .intro-tagline');

        if (curtainTop) curtainTop.style.backgroundColor = isLight ? '#f8f8f8' : '#000';
        if (curtainBottom) curtainBottom.style.backgroundColor = isLight ? '#f8f8f8' : '#000';

        preloaderTitles.forEach((el) => {
            el.style.color = isLight ? '#1a1a1a' : '#ffffff';
        });
        preloaderTaglines.forEach((el) => {
            el.style.color = isLight ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)';
        });

        const blobElements = document.querySelectorAll('.animate-blob');
        blobElements.forEach(blob => {
            blob.style.backgroundColor = '';
        });

        const kineticText = document.getElementById('kinetic-text');
        if (kineticText) {
            kineticText.style.color = isLight ? '#1a1a1a' : '#ffffff';
        }

        const progressBar = document.getElementById('scroll-progress');
        if (progressBar) {
            progressBar.style.backgroundColor = '';
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
            chips.forEach(c => {
                c.classList.remove('bg-white', 'text-black', 'border-white');
                c.classList.add('border-white/20', 'text-white/50');
            });

            chip.classList.remove('border-white/20', 'text-white/50');
            chip.classList.add('bg-white', 'text-black', 'border-white');

            hiddenInput.value = chip.dataset.value;
        });
    });
}

// --- PREMIUM IMAGE REVEAL (Lazy Loading Unblur) ---
function initImageReveal() {
    const images = document.querySelectorAll('img:not(#preloader-logo):not(#preloader-logo-pixel):not(#main-logo):not(#footer-logo):not(.event-photo)');
    
    images.forEach(img => {
        img.classList.add('img-lazy');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                if (img.complete && img.naturalHeight !== 0) {
                    img.classList.add('loaded');
                } else {
                    img.addEventListener('load', () => {
                        img.classList.add('loaded');
                    });
                    img.addEventListener('error', () => {
                        img.classList.add('loaded'); 
                    });
                }
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });

    images.forEach(img => observer.observe(img));
}

// --- UTILS ---
function copyToClipboard(element, text, label) {
    if (!navigator.clipboard) {
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

// --- SIDEBAR LOGIC ---
// --- TELEGRAM RIPPLES ---
function initTelegramRipples() {
    // Listen for mousedown for instant response
    document.addEventListener('mousedown', function(e) {
        // FIXED: Removed 'a.nav-link' from the selector to prevent text clipping
        const target = e.target.closest('button:not(.talent-filter-btn), a.reveal, .tilt-card');
        if (!target) return;
        
        // Ensure parent can contain the absolute ripple
        if (window.getComputedStyle(target).position === 'static') {
            target.style.position = 'relative';
        }
        target.style.overflow = 'hidden';

        const rect = target.getBoundingClientRect();
        const ripple = document.createElement('span');
        const diameter = Math.max(rect.width, rect.height);
        const radius = diameter / 2;

        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${e.clientX - rect.left - radius}px`;
        ripple.style.top = `${e.clientY - rect.top - radius}px`;
        ripple.className = 'telegram-ripple';

        target.appendChild(ripple);

        // Remove after animation finishes
        setTimeout(() => ripple.remove(), 600);
    });
}