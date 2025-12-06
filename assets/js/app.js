// --- APP STATE ---
let currentFilter = 'All';

// --- DOM ELEMENTS ---
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    // Lenis Smooth Scroll Initialization
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis();
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }

    initParticles();
    initMouseSpotlight();
    populateData();
    initRouter();
    initScrollEffects();
    initChatWidget();
    initScrollReveal();
});

// Scroll Reveal
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    // Observe all reveal elements
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);

        // Immediately activate if already in viewport
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add('active');
        }
    });
}

//--- ROUTING ---
function initRouter() {
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Handle initial load
}

function handleHashChange() {
    const fullHash = window.location.hash.substring(1) || 'home';
    const [route, query] = fullHash.split('?');
    const views = document.querySelectorAll('.page-view');

    // Reset UI State (Show Navbar/Footer by default)
    if (navbar) navbar.classList.remove('hidden');
    const footer = document.querySelector('footer');
    if (footer) footer.classList.remove('hidden');

    // Hide all views
    views.forEach(view => view.classList.remove('active'));
    window.scrollTo(0, 0);

    // Close mobile menu if open
    if (mobileMenu && !mobileMenu.classList.contains('translate-x-full')) {
        toggleMobileMenu();
    }

    // Route matching
    if (route === 'home') {
        const view = document.getElementById('view-home');
        if (view) view.classList.add('active');
    } else if (route === 'services') {
        renderServicesPage();
        const view = document.getElementById('view-services');
        if (view) view.classList.add('active');
    } else if (route.startsWith('services/')) {
        const id = route.split('/')[1];
        renderServiceDetail(id);
        const view = document.getElementById('view-service-detail');
        if (view) view.classList.add('active');
    } else if (route === 'talents') {
        renderTalentsPage();
        const view = document.getElementById('view-talents');
        if (view) view.classList.add('active');
    } else if (route.startsWith('talents/')) {
        const id = route.split('/')[1];
        renderTalentDetail(id);
        const view = document.getElementById('view-talent-detail');
        if (view) view.classList.add('active');
    } else if (route === 'case-studies') {
        renderCaseStudies();
        const view = document.getElementById('view-case-studies');
        if (view) view.classList.add('active');
    } else if (route === 'contact') {
        const view = document.getElementById('view-contact');
        if (view) view.classList.add('active');
    } else if (route.startsWith('gallery/')) {
        const folderName = decodeURIComponent(route.split('/')[1]);
        renderGalleryView(folderName);
        const view = document.getElementById('view-gallery');
        if (view) view.classList.add('active');
        if (navbar) navbar.classList.add('hidden'); // Hide navbar for immersive view
        if (footer) footer.classList.add('hidden');
    } else {
        const view = document.getElementById('view-home');
        if (view) view.classList.add('active'); // Default
    }

    // Update Nav Active State
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('text-white', 'border-b', 'border-white');
        link.classList.add('text-white/50');
        if (link.getAttribute('href') === '#' + fullHash) {
            link.classList.add('text-white', 'border-b', 'border-white');
            link.classList.remove('text-white/50');
        }
    });
}

window.navigateTo = function (pageId) {
    window.location.hash = pageId;
    console.log('Navigating to:', pageId);
};

// --- RENDERERS ---

function populateData() {
    // Footer
    const footerDesc = document.getElementById('footer-description');
    if (footerDesc && typeof COMPANY_INFO !== 'undefined') footerDesc.textContent = COMPANY_INFO.description;

    // Check if COMPANY_INFO exists before using it
    if (typeof COMPANY_INFO !== 'undefined') {
        const footerContactHTML = `
            <li>${COMPANY_INFO.contactEmail}</li>
            <li>${COMPANY_INFO.contactPhone}</li>
            <li>Manila, Philippines</li>
        `;
        const footerContact = document.getElementById('footer-contact');
        if (footerContact) footerContact.innerHTML = footerContactHTML;
    }

    // Client Ticker
    const tickerContainer = document.getElementById('client-ticker');
    if (tickerContainer && typeof CLIENTS !== 'undefined') {
        const clientList = [...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS];
        tickerContainer.innerHTML = clientList.map(client => `
            <span class="text-xl font-sans font-bold text-white/40 uppercase tracking-widest hover:text-white transition-colors cursor-default">${client}</span>
        `).join('');
    }

    // Home Services Grid
    const homeServicesGrid = document.getElementById('home-services-grid');
    if (homeServicesGrid && typeof SERVICES !== 'undefined') {
        homeServicesGrid.innerHTML = SERVICES.slice(0, 3).map(service => `
            <a href="#services/${service.id}" class="group bg-black p-12 hover:bg-neutral-900 transition-colors duration-500 block relative">
                <div class="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -rotate-45">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </div>
                <div class="w-12 h-12 border border-white/20 flex items-center justify-center mb-8 group-hover:border-white transition-colors text-white">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                </div>
                <h3 class="text-2xl font-serif mb-4 text-white">${service.title}</h3>
                <p class="text-white/50 mb-8 font-light leading-relaxed">${service.description}</p>
                <span class="text-white text-xs font-bold uppercase tracking-widest hover:text-zinc-400 transition-colors flex items-center gap-2">
                    Learn More ${ICONS.ArrowRight}
                </span>
            </a>
        `).join('');
    }

    // Contact Page Info
    const contactInfoDiv = document.getElementById('contact-info');
    if (contactInfoDiv && typeof COMPANY_INFO !== 'undefined') {
        contactInfoDiv.innerHTML = `
            <div class="flex items-center gap-8 p-8 border border-white/10 bg-white/[0.02]">
                <div class="w-12 h-12 flex items-center justify-center text-white border border-white/20">${ICONS.Mail}</div>
                <div>
                    <div class="text-xs uppercase text-white/40 tracking-[0.2em] font-bold mb-1">Email Us</div>
                    <div class="text-xl font-serif">${COMPANY_INFO.contactEmail}</div>
                </div>
            </div>
            <div class="flex items-center gap-8 p-8 border border-white/10 bg-white/[0.02]">
                <div class="w-12 h-12 flex items-center justify-center text-white border border-white/20">${ICONS.Phone}</div>
                <div>
                    <div class="text-xs uppercase text-white/40 tracking-[0.2em] font-bold mb-1">Call Us</div>
                    <div class="text-xl font-serif">${COMPANY_INFO.contactPhone}</div>
                </div>
            </div>
            <div class="flex items-center gap-8 p-8 border border-white/10 bg-white/[0.02]">
                <div class="w-12 h-12 flex items-center justify-center text-white border border-white/20">${ICONS.MapPin}</div>
                <div>
                    <div class="text-xs uppercase text-white/40 tracking-[0.2em] font-bold mb-1">Visit Us</div>
                    <div class="text-xl font-serif">Manila, Philippines</div>
                </div>
            </div>
            `;
    }

    // Mobile Menu Icon
    if (mobileMenuBtn) {
        mobileMenuBtn.innerHTML = ICONS.Menu;
        mobileMenuBtn.onclick = toggleMobileMenu;
    }
}

function toggleMobileMenu() {
    if (!mobileMenu || !mobileMenuBtn) return;
    const isOpen = !mobileMenu.classList.contains('translate-x-full');
    if (isOpen) {
        mobileMenu.classList.add('translate-x-full');
        mobileMenu.classList.remove('translate-x-0');
        mobileMenuBtn.innerHTML = ICONS.Menu;
    } else {
        mobileMenu.classList.remove('translate-x-full');
        mobileMenu.classList.add('translate-x-0');
        mobileMenuBtn.innerHTML = ICONS.X;
    }
}

function renderServicesPage() {
    const list = document.getElementById('services-list');
    if (!list) return;
    list.innerHTML = SERVICES.map(service => `
            <a href="#services/${service.id}" class="flex flex-col md:flex-row gap-12 items-start p-10 md:p-16 bg-black hover:bg-neutral-900 transition-all duration-500 group relative overflow-hidden text-white">
            <div class="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                ${ICONS.ArrowUpRight}
            </div>
            <div class="w-16 h-16 border border-white/20 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-black transition-all duration-500">
                ${ICONS[service.icon] || ICONS.Radio}
            </div>
            <div class="flex-grow">
                <h3 class="text-3xl font-serif mb-6 flex items-center gap-4">${service.title}</h3>
                <p class="text-white/60 text-lg leading-relaxed mb-8 font-light max-w-2xl">${service.description}</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                    ${service.features.slice(0, 4).map(feature => `
                        <div class="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white/40 group-hover:text-white/60 transition-colors">
                            ${ICONS.CheckCircle2} ${feature}
                        </div>
                    `).join('')}
                </div>
            </div>
            </a>
    `).join('');
}

function renderServiceDetail(id) {
    const service = SERVICES.find(s => s.id === id);
    if (!service) { window.navigateTo('services'); return; }

    const heroImage = service.images.length > 0 ? service.images[0] : (service.folders && service.folders.length > 0 ? service.folders[0].images[0] : '');

    const container = document.getElementById('view-service-detail');
    if (!container) return;
    container.innerHTML = `
        <div class="relative h-[50vh] flex items-center border-b border-white/10 mb-20 overflow-hidden">
            <div class="absolute inset-0 z-0">
                <img src="${heroImage}" alt="${service.title} Hero Image" class="w-full h-full object-cover opacity-30 grayscale" />
                <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            </div>
            <div class="container mx-auto px-6 relative z-10 pt-20">
                <a href="#services" class="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 uppercase text-xs font-bold tracking-widest">
                    ${ICONS.ArrowLeft} Back to Services
                </a>
                <div class="animate-fade-in-up">
                    <h1 class="font-serif text-5xl md:text-7xl text-white mb-6 leading-tight">${service.title}</h1>
                    <p class="text-xl text-white/60 font-light max-w-2xl">${service.description}</p>
                </div>
            </div>
        </div>

        <div class="container mx-auto px-6 pb-20">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div class="lg:col-span-7">
                    <div class="mb-16">
                        <h3 class="font-serif text-3xl mb-6">Overview</h3>
                        <p class="text-white/70 text-lg leading-relaxed font-light mb-8">${service.longDescription}</p>
                        <div class="border border-white/10 p-8 bg-white/[0.02]">
                            <h4 class="font-sans text-sm font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Inclusions & Features</h4>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                ${service.features.map(f => `<div class="flex items-start gap-3"><span class="text-white shrink-0 mt-0.5">${ICONS.CheckCircle2}</span><span class="text-white/80 text-sm">${f}</span></div>`).join('')}
                            </div>
                        </div>
                    </div>
                        <div class="mb-16">
                        <h3 class="font-serif text-3xl mb-8 text-center">Gallery</h3>
                        ${service.folders ? renderFolders(service.folders) : `
                        <div class="columns-1 md:columns-2 gap-4 space-y-4">
                            ${service.images.map(img => `<div class="break-inside-avoid relative group overflow-hidden border border-white/10"><img src="${img}" class="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110" /></div>`).join('')}
                        </div>
                        `}
                    </div>
                </div>
                    <div class="lg:col-span-5 relative">
                    <div class="sticky top-40 border border-white/10 p-8 bg-black/50 backdrop-blur-md">
                        <h3 class="font-serif text-3xl mb-4">Ready to Start?</h3>
                        <p class="text-white/50 mb-8 text-sm">Let's discuss how our ${service.title} services can help achieve your brand goals.</p>
                        <a href="#contact" class="group relative px-8 py-4 bg-white text-black text-sm font-bold tracking-widest uppercase overflow-hidden transition-all hover:bg-gray-200 w-full flex justify-center"><span class="relative z-10 flex items-center gap-3">Inquire Now ${ICONS.ArrowRight}</span></a>
                        <div class="mt-8 pt-8 border-t border-white/10 space-y-4">
                            <div class="flex justify-between text-sm"><span class="text-white/40 uppercase font-bold text-xs tracking-widest">Availability</span><span class="text-green-400">Open for Booking</span></div>
                            <div class="flex justify-between text-sm"><span class="text-white/40 uppercase font-bold text-xs tracking-widest">Location</span><span>Metro Manila & Nearby</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderFolders(folders) {
    if (!folders || !Array.isArray(folders)) return '';

    return `
        <div class="grid grid-cols-1 gap-y-24">
            ${folders.map(folder => {
        let previewImages = folder.images.slice(0, 4);

        // Fix for 'TALENTS' folder being empty
        if (folder.name === 'TALENTS' && previewImages.length === 0) {
            if (typeof ARTISTS !== 'undefined') {
                previewImages = ARTISTS.slice(0, 4).map(a => a.image);
            }
        }

        return `
                    <a href="${folder.link || '#gallery/' + folder.name}" class="group block flex flex-col items-center text-center">
                        <div class="h-96 w-full relative mb-8">
                            ${previewImages.length > 0 ? `
                            <div class="flex justify-center items-center h-96 relative">
                                ${previewImages.map((img, idx) => `
                                    <div class="w-48 h-64 absolute shadow-2xl transition-all duration-500 ease-out origin-bottom ${idx > 0 ? '-ml-12 group-hover:ml-4' : ''} hover:-translate-y-4 hover:scale-110 hover:z-50" style="z-index: ${idx}; transform: rotate(${(idx - 1.5) * 3}deg) translateY(${Math.abs(idx - 1.5) * 3}px); left: calc(50% - 96px + ${idx * -48}px);">
                                        <div class="absolute inset-0 border border-white/20 bg-neutral-800 overflow-hidden rounded-lg">
                                            <img src="${img}" alt="${folder.name} Preview ${idx + 1}" class="w-full h-full object-cover" />
                                            <div class="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500"></div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                            ` : `
                            <div class="flex flex-col items-center text-white/20">
                                <span class="text-4xl mb-2">📂</span>
                                <span class="text-xs font-bold uppercase tracking-widest">Empty</span>
                            </div>
                            `}
                        </div>
                        <div class="flex flex-col items-center gap-2">
                            <h4 class="font-serif text-3xl text-white group-hover:text-white/80 transition-colors">${folder.name}</h4>
                            <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 group-hover:text-white/60 transition-colors mb-2">
                                ${folder.name === 'TALENTS' ? (typeof ARTISTS !== 'undefined' ? ARTISTS.length + ' TALENTS' : 'VIEW ROSTER') : folder.images.length + ' IMAGES'}
                            </p>
                            <div class="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 group-hover:bg-white group-hover:text-black transition-all">
                                ${ICONS.ArrowRight}
                            </div>
                        </div>
                    </a>
                `;
    }).join('')}
        </div>
    `;
}

function renderTalentsPage() {
    // Check for Back Button
    const container = document.querySelector('#view-talents .container');
    const existingBtn = document.getElementById('talents-back-btn');
    const isFromKOL = window.location.hash.includes('?from=kol');

    if (isFromKOL) {
        if (!existingBtn && container) {
            const btn = document.createElement('div');
            btn.id = 'talents-back-btn';
            btn.className = 'mb-8 animate-fade-in-up';
            btn.innerHTML = `<a href="#services/kol-artist-livestreaming" class="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors uppercase text-xs font-bold tracking-widest">${ICONS.ArrowLeft} Back to KOL Services</a>`;
            container.insertBefore(btn, container.firstChild);
        }
    } else {
        if (existingBtn) existingBtn.remove();
    }

    const categories = ['All', 'Fashion', 'Beauty', 'Electronics', 'Lifestyle'];
    // Render Filters
    const filtersContainer = document.getElementById('talent-filters');
    if (filtersContainer) {
        filtersContainer.innerHTML = categories.map(cat => `
            <button onclick="filterTalents('${cat}')" class="px-6 py-2 border text-xs font-bold uppercase tracking-widest transition-all ${currentFilter === cat ? 'bg-white text-black border-white' : 'bg-transparent text-white/50 border-white/10 hover:border-white/50 hover:text-white'}">${cat}</button>
        `).join('');
    }

    renderTalentsGrid();
}

function filterTalents(category) {
    currentFilter = category;
    renderTalentsPage(); // Re-render to update active state
}

function renderTalentsGrid() {
    const grid = document.getElementById('talents-grid');
    if (!grid) return;

    // Safety check for ARTISTS
    if (typeof ARTISTS === 'undefined') {
        console.error('ARTISTS data is missing');
        return;
    }

    const filtered = currentFilter === 'All' ? ARTISTS : ARTISTS.filter(a => a.categories.includes(currentFilter));

    grid.innerHTML = filtered.map(artist => `
        <a href="#talents/${artist.id}" class="group relative aspect-[3/4] overflow-hidden border border-white/10 block bg-neutral-900">
            <img src="${artist.image}" alt="${artist.name} - ${artist.role}" class="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0" />
            <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 group-hover:opacity-60 transition-opacity"></div>
            <div class="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div class="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 mb-2 group-hover:text-white transition-colors border-l-2 border-transparent group-hover:border-white pl-0 group-hover:pl-2 duration-300">${artist.role}</div>
                <h3 class="text-3xl font-serif text-white mb-2 italic">${artist.name}</h3>
                <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    ${artist.categories.slice(0, 2).map(c => `<span class="text-[9px] border border-white/20 px-2 py-1 uppercase tracking-wider text-white/80 hover:bg-white hover:text-black transition-colors">${c}</span>`).join('')}
                </div>
            </div>
        </a>
    `).join('');
}

function renderTalentDetail(id) {
    const artist = ARTISTS.find(a => a.id === id);
    if (!artist) { window.navigateTo('talents'); return; }

    const container = document.getElementById('view-talent-detail');
    if (!container) return;

    container.innerHTML = `
        <div class="container mx-auto px-6 pt-10">
            <div class="mb-10">
                <button data-route="talents" class="z-[9999] pointer-events-auto relative cursor-pointer inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-white/60 hover:text-white transition-colors mb-8">
                    ← BACK TO TALENTS
                </button>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <!-- Image -->
                <div class="lg:col-span-5">
                    <div class="aspect-[3/4] border border-white/10 relative overflow-hidden">
                        <img src="${artist.image}" alt="${artist.name}" class="w-full h-full object-cover" />
                        <div class="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black to-transparent">
                            <h1 class="font-serif text-6xl text-white italic">${artist.name}</h1>
                            <p class="text-white/60 uppercase tracking-widest text-xs font-bold mt-2">${artist.role}</p>
                        </div>
                    </div>
                </div>
                <!-- Info -->
                <div class="lg:col-span-7 pt-10">
                    <div class="mb-12">
                        <h3 class="font-serif text-3xl mb-6 text-white">About</h3>
                        <p class="text-white/60 text-lg leading-relaxed font-light mb-8">${artist.about || "A rising star in the digital space, widely recognized for creating engaging content that resonates with diverse audiences."}</p>
                        <div class="flex flex-wrap gap-3">
                            ${artist.categories.map(c => `<span class="px-4 py-2 border border-white/20 text-xs font-bold uppercase tracking-widest text-white/80">${c}</span>`).join('')}
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 border-y border-white/10 py-10">
                        <div>
                             <h3 class="font-serif text-2xl mb-6 text-white">Social Reach</h3>
                             <div class="space-y-6">
                                ${artist.followers.map(social => `
                                    <div class="flex items-center gap-4">
                                        <div class="w-10 h-10 border border-white/10 flex items-center justify-center text-white/50">
                                            ${ICONS[social.platform] || ICONS.Users}
                                        </div>
                                        <div>
                                            <div class="text-2xl font-serif text-white leading-none">${social.count}</div>
                                            <div class="text-[10px] font-bold uppercase tracking-widest text-white/30">${social.platform}</div>
                                            <div class="text-xs text-white/50">${social.handle}</div>
                                        </div>
                                    </div>
                                `).join('')}
                             </div>
                        </div>
                         <div>
                            <h3 class="font-serif text-3xl mb-8 text-white">Engagement Rates</h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="border border-white/10 p-8 bg-black hover:bg-neutral-900 transition-colors"><span class="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Livestream Rate</span><div class="text-4xl font-serif text-white mb-2">₱${artist.ratePerLive}</div><span class="text-white/30 text-sm">Per 1 hour session</span></div>
                                <div class="border border-white/10 p-8 bg-white text-black"><span class="block text-xs font-bold uppercase tracking-widest text-black/40 mb-2">Package Deal</span><div class="text-4xl font-serif text-black mb-2">₱${artist.packageRate}</div><span class="text-black/50 text-sm">Multiple sessions / Campaign bundle</span></div>
                            </div>
                        </div>
                         <div>
                            <h3 class="font-serif text-3xl mb-8 text-white flex items-center gap-4">Latest Content <div class="h-px flex-grow bg-white/10"></div></h3>
                            <div class="grid grid-cols-2 gap-4">
                                ${artist.gallery.map((img, idx) => `
                                    <div class="relative group overflow-hidden border border-white/10 ${idx % 3 === 0 ? 'col-span-2 aspect-video' : 'col-span-1 aspect-[4/5]'}">
                                        <img src="${img}" alt="${artist.name} Content ${idx + 1}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                        <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderGalleryView(folderName) {
    let parentService = null;
    let folder = null;

    for (const service of SERVICES) {
        if (service.folders) {
            const f = service.folders.find(fd => fd.name === folderName);
            if (f) {
                folder = f;
                parentService = service;
                break;
            }
        }
    }

    const container = document.getElementById('view-gallery');
    if (!container) return;

    if (!folder) {
        container.innerHTML = `<div class="p-20 text-center text-white">Folder not found.</div>`;
        return;
    }

    container.innerHTML = `
        <div class="container mx-auto px-6 py-20">
            <!-- Header -->
            <div class="mb-12 animate-fade-in-up">
                <a href="#services/${parentService.id}" class="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 uppercase text-xs font-bold tracking-widest">
                    ${ICONS.ArrowLeft} Back
                </a>
                <span class="text-white/50 text-xs font-bold tracking-widest uppercase mb-4 block">${parentService.title}</span>
                <h1 class="font-serif text-5xl md:text-7xl text-white mb-6">${folderName} Gallery</h1>
                 <div class="h-[1px] w-24 bg-gradient-to-r from-white to-transparent mb-8"></div>
                <p class="text-white/60">High-resolution preview.</p>
            </div>

            <!-- Grid -->
            ${folder.images.length > 0 ? `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                ${folder.images.map(img => `
                    <div class="relative group overflow-hidden border border-white/10 animate-fade-in-up">
                         <img src="${img}" alt="${folderName} Image" class="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                `).join('')}
            </div>
            ` : `
            <div class="py-20 text-center border border-white/10 bg-white/5 rounded-lg animate-fade-in-up">
                <span class="block text-4xl mb-4">🚧</span>
                <h3 class="font-serif text-2xl text-white mb-2">Content Coming Soon</h3>
                <p class="text-white/50">We are currently curating the best ${folderName.toLowerCase()} products for you.</p>
            </div>
            `}
        </div>
    `;
}

function renderCaseStudies() {
    const list = document.getElementById('case-studies-list');
    if (!list) return;
    list.innerHTML = CASE_STUDIES.map((study, idx) => `
        <div class="relative group">
            <span class="absolute -top-24 -left-12 text-[200px] font-serif font-bold text-white/[0.02] pointer-events-none select-none z-0">${String(idx + 1).padStart(2, '0')}</span>
            <div class="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                <div class="order-2 lg:order-1 pt-8">
                    <div class="inline-block px-4 py-2 border border-white text-white text-xs font-bold uppercase tracking-widest mb-8">${study.date}</div>
                    <h3 class="text-4xl md:text-5xl font-serif mb-8 leading-tight">${study.title}</h3>
                    <p class="text-white/60 text-lg font-light leading-relaxed mb-12 border-l border-white/20 pl-8">${study.description}</p>
                    <div class="grid grid-cols-2 gap-px bg-white/10 border border-white/10">
                        ${study.metrics.map(m => `
                            <div class="text-center py-10 bg-black hover:bg-neutral-900 transition-colors">
                                <div class="text-3xl md:text-4xl font-serif text-white mb-2">${m.value}</div>
                                <div class="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">${m.label}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="order-1 lg:order-2">
                    <div class="w-full aspect-video border border-white/10 p-2 relative">
                        <div class="w-full h-full bg-neutral-800 overflow-hidden relative">
                            <img src="${study.image}" alt="${study.title}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                            <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}


// --- INTERACTIONS & EFFECTS ---
function initScrollEffects() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50 && navbar) {
            navbar.classList.add('py-4', 'bg-black/80', 'backdrop-blur-xl', 'border-b', 'border-white/5');
            navbar.classList.remove('py-8', 'bg-transparent');
        } else {
            navbar.classList.add('py-8', 'bg-transparent');
            navbar.classList.remove('py-4', 'bg-black/80', 'backdrop-blur-xl', 'border-b', 'border-white/5');
        }
    });
}

// Particle Effect (Canvas)
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;
    let mouseX = 0;
    let mouseY = 0;

    function handleResize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            const dx = this.x - mouseX;
            const dy = this.y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
                this.x += dx * 0.05;
                this.y += dy * 0.05;
            }
            // Wrap around
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }
        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        handleResize();
        particles = [];
        for (let i = 0; i < 100; i++) {
            particles.push(new Particle());
        }
        animate();
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const particle of particles) {
            particle.update();
            particle.draw();
        }
        animationFrameId = requestAnimationFrame(animate);
    }

    init();
}

function initMouseSpotlight() {
    const spotlight = document.getElementById('mouse-spotlight');
    if (!spotlight) return;
    window.addEventListener('mousemove', (e) => {
        spotlight.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(255,255,255,0.06), transparent 80%)`;
    });
}

function initChatWidget() {
    const btn = document.getElementById('toggle-chat-btn');
    const window = document.getElementById('chat-window');
    const closeBtn = document.getElementById('close-chat-btn');
    const iconOpen = document.getElementById('chat-icon-open');
    const iconClose = document.getElementById('chat-icon-close');
    const tooltip = document.getElementById('chat-tooltip');

    // Safety check in case chat widget elements are missing
    if (!btn || !window || !closeBtn || !iconOpen || !iconClose) return;

    // --- MESSAGES LOGIC ---
    const messagesContainer = document.getElementById('chat-messages');
    const input = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const typingIndicator = document.getElementById('typing-indicator');
    const quickRepliesContainer = document.getElementById('quick-replies');

    let history = [];
    const INITIAL_MESSAGE = "Hi there! Welcome to The Aura Creatives. I'm your virtual assistant. How can I help you elevate your brand today?";
    const QUICK_REPLIES = [
        "What are your rates?",
        "Do you have influencers?",
        "How do livestreams work?",
        "Where is your studio?"
    ];

    // Auto-scroll logic variables
    let userHasScrolledUp = false;

    if (messagesContainer) {
        // Detect manual scroll
        messagesContainer.addEventListener('scroll', () => {
            // Tolerance of 5px to account for fractional pixels
            const isAtBottom = messagesContainer.scrollHeight - messagesContainer.scrollTop - messagesContainer.clientHeight < 5;

            if (isAtBottom) {
                userHasScrolledUp = false;
            } else {
                userHasScrolledUp = true;
            }
        });
    }

    function scrollToBottom() {
        if (!messagesContainer) return;
        // Only auto-scroll if user hasn't scrolled up manually
        if (!userHasScrolledUp) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    // Force scroll to bottom (used when opening chat or sending a message)
    function forceScrollToBottom() {
        if (!messagesContainer) return;
        userHasScrolledUp = false;
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function addMessage(text, sender) {
        if (!messagesContainer) return;
        const msgDiv = document.createElement('div');
        msgDiv.className = `flex ${sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`;

        const content = sender === 'user'
            ? `<div class="bg-white text-black px-5 py-3 rounded-2xl rounded-br-none text-sm font-medium max-w-[85%] shadow-lg">${text}</div>`
            : `<div class="flex items-start gap-3 max-w-[90%]">
                <div class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/20 text-white text-[10px]">AI</div>
                <div class="bg-white/10 border border-white/10 px-5 py-3 rounded-2xl rounded-bl-none text-sm text-white/90 leading-relaxed shadow-sm">${text}</div>
               </div>`;

        msgDiv.innerHTML = content;
        messagesContainer.appendChild(msgDiv);
        scrollToBottom();
    }

    function showTyping() {
        if (typingIndicator) {
            typingIndicator.classList.remove('hidden');
            scrollToBottom();
        }
    }

    function hideTyping() {
        if (typingIndicator) typingIndicator.classList.add('hidden');
    }

    function handleSend() {
        if (!input) return;
        const text = input.value.trim();
        if (!text) return;

        addMessage(text, 'user');
        input.value = '';
        forceScrollToBottom(); // Always scroll to bottom on send

        showTyping();

        // Simulate AI Response
        setTimeout(() => {
            hideTyping();

            const response = generateResponse(text);
            addMessage(response, 'bot');
            forceScrollToBottom(); // Scroll to bottom on response
        }, 1500);
    }

    function generateResponse(text) {
        const lowerText = text.toLowerCase();

        // 1. Agency Info
        if (lowerText.match(/(who are you|about|agency)/)) {
            return 'Founded in April 2025, The Aura Creatives is a dynamic multimedia marketing and talent management agency. We specialize in short-form video content and high-converting livestreaming, turning attention into action.';
        }
        // 2. Services
        if (lowerText.match(/(services|offer|do|livestream)/)) {
            return 'We offer 6 core services: KOL/Artist Livestreaming, Short-Form Video Production, Studio Rental, Marketing Video Production, Product Shoppable Pictures, and Artist/Band Production.';
        }
        // 3. Talents/Influencers
        if (lowerText.match(/(talent|roster|influencers|jaja|igiboy|sofi)/)) {
            return 'We manage top-tier talents including Jaja (Mega Influencer, 3.1M+ followers), Sofi (143k+ followers), and Igiboy (94k+ followers). We cover Beauty, Fashion, Electronics, and Lifestyle categories.';
        }
        // 4. Brands/Partners
        if (lowerText.match(/(brands|clients|work with)/)) {
            return 'We have worked with top brands like Belo Essentials, OPPO, Infinix, Canon, Honor, Anker, Insta360, and BingoPlus.';
        }
        // 5. Contact/Booking
        if (lowerText.match(/(contact|email|phone|rate)/)) {
            return 'Let's connect! You can reach us at business @theauracreatives.co or call 09219715546. You can also fill out the form in the Contact section.';
        }
        // 6. Why Us
        if (lowerText.match(/(why|benefit)/)) {
            return 'Working with us gives you access to top talents, cost-efficient strategies, and end-to-end creative direction. We are platform experts who create stories that sell.';
        }

        // Default
        return "That's a great question! Our team would love to discuss this in detail. Please leave your email below or check our Services page.";
    }

    // Initialization of Chat
    if (messagesContainer && messagesContainer.children.length === 0) {
        addMessage(INITIAL_MESSAGE, 'bot');
        if (quickRepliesContainer) {
            quickRepliesContainer.innerHTML = QUICK_REPLIES.map(r => `
                <button class="whitespace-nowrap px-4 py-2 rounded-full border border-white/20 bg-white/5 text-xs text-white/70 hover:bg-white hover:text-black transition-all">${r}</button>
            `).join('');

            // Add click handlers for quick replies
            Array.from(quickRepliesContainer.children).forEach(btn => {
                btn.addEventListener('click', (e) => {
                    if (input) {
                        input.value = e.target.textContent;
                        handleSend();
                    }
                });
            });
        }
    }


    // --- TOGGLE LOGIC ---
    function toggleChat() {
        const isClosed = window.classList.contains('hidden');
        if (isClosed) {
            window.classList.remove('hidden');
            if (tooltip) tooltip.classList.add('opacity-0');
            iconOpen.classList.add('hidden');
            iconClose.classList.remove('hidden');
            // Auto focus input
            if (input) setTimeout(() => input.focus(), 100);

            // Force scroll to bottom when opening to ensure latest messages are seen
            setTimeout(forceScrollToBottom, 50);
        } else {
            window.classList.add('hidden');
            if (tooltip) tooltip.classList.remove('opacity-0');
            iconOpen.classList.remove('hidden');
            iconClose.classList.add('hidden');
        }
    }

    btn.onclick = toggleChat;
    closeBtn.onclick = toggleChat;
    if (sendBtn) sendBtn.onclick = handleSend;
    if (input) {
        input.onkeypress = (e) => {
            if (e.key === 'Enter') handleSend();
        };
    }
}

// --- GLOBAL ROUTER ---
document.addEventListener('click', (e) => {
    // 1. Find the closest element with a [data-route] attribute
    const target = e.target.closest('[data-route]');

    if (target) {
        e.preventDefault();
        const pageId = target.getAttribute('data-route');

        // 2. Execute Navigation
        if (window.navigateTo) {
            window.navigateTo(pageId);
        } else {
            console.error('Critical: window.navigateTo is missing');
            // Fallback manual switch
            document.querySelectorAll('.page-view').forEach(el => el.classList.remove('active'));
            const dest = document.getElementById('view-' + pageId);
            if (dest) dest.classList.add('active');
        }
    }
});
