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
        images: ["assets/images/services/livestreaming/main-1.jpg", "assets/images/services/livestreaming/main-2.jpg"],
        icon: "Radio",
        folders: [
            { name: "TALENTS", link: "#talents?from=kol", images: ["assets/images/services/livestreaming/talents/talent-1.jpg", "assets/images/services/livestreaming/talents/talent-2.jpg", "assets/images/services/livestreaming/talents/talent-3.jpg", "assets/images/services/livestreaming/talents/talent-4.jpg"] },
            { name: "LIVE", images: ["assets/images/services/livestreaming/live/stream-1.jpg", "assets/images/services/livestreaming/live/stream-2.jpg", "assets/images/services/livestreaming/live/stream-3.jpg", "assets/images/services/livestreaming/live/stream-4.jpg", "assets/images/services/livestreaming/live/stream-5.jpg", "assets/images/services/livestreaming/live/stream-6.jpg"] }
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
            { name: "TIKTOK ADS", images: ["assets/images/services/shortform/tiktok/ad-1.jpg", "assets/images/services/shortform/tiktok/ad-2.jpg", "assets/images/services/shortform/tiktok/ad-3.jpg", "assets/images/services/shortform/tiktok/ad-4.jpg"] },
            { name: "IG REELS", images: ["assets/images/services/shortform/reels/reel-1.jpg", "assets/images/services/shortform/reels/reel-2.jpg", "assets/images/services/shortform/reels/reel-3.jpg", "assets/images/services/shortform/reels/reel-4.jpg"] },
            { name: "UGC CONTENT", images: ["assets/images/services/shortform/ugc/ugc-1.jpg", "assets/images/services/shortform/ugc/ugc-2.jpg", "assets/images/services/shortform/ugc/ugc-3.jpg", "assets/images/services/shortform/ugc/ugc-4.jpg"] },
            { name: "EVENT HIGHLIGHTS", images: ["assets/images/services/shortform/events/event-1.jpg", "assets/images/services/shortform/events/event-2.jpg", "assets/images/services/shortform/events/event-3.jpg", "assets/images/services/shortform/events/event-4.jpg"] }
        ],
        icon: "Video"
    },
    { id: "studio-rental", title: "Studio Rental", description: "Professional space equipped for livestreams, photoshoots, and video production.", longDescription: "Step into a space designed for creators. Our studio is fully equipped with industry-standard lighting, audio, and video gear.", features: ["Professional Lighting Grid", "High-Fidelity Audio Equipment", "Customizable Sets & Backdrops", "High-Speed Internet for Streaming", "Dressing & Makeup Area", "On-Site Technical Assistance"], images: ["assets/images/services/studio/studio-1.jpg", "assets/images/services/studio/studio-2.jpg"], icon: "Camera" },
    { id: "artist-management", title: "Artist Management", description: "End-to-end support for influencers, creators, and celebrities to maximize their brand potential.", longDescription: "We empower talent. Our artist management division is dedicated to nurturing careers, negotiating high-value brand partnerships.", features: ["Career Strategy & Planning", "Brand Partnership Negotiation", "Public Relations & Crisis Management", "Content Strategy Consultation", "Exclusive Event Access", "Legal & Contract Support"], images: ["assets/images/services/management/mgmt-1.jpg", "assets/images/services/management/mgmt-2.jpg"], icon: "Users" },
    {
        id: "marketing-video-production",
        title: "Marketing Video Production",
        description: "Professional video production services for brands, from concept to final cut.",
        longDescription: "Transform your brand story into compelling visual narratives. Our full-service video production team handles everything from creative concepting and scriptwriting to filming and post-production, delivering cinematic quality content that drives results.",
        features: ["Creative Concept Development", "Professional Scriptwriting", "Multi-Camera Production", "Professional Lighting & Audio", "Advanced Color Grading", "Motion Graphics & VFX", "Licensed Music & Sound Design", "Multi-Format Export (Social, Web, Broadcast)"],
        images: [],
        folders: [
            { name: "CORPORATE VIDEOS", images: ["assets/images/services/marketing/corporate/corp-1.jpg", "assets/images/services/marketing/corporate/corp-2.jpg", "assets/images/services/marketing/corporate/corp-3.jpg", "assets/images/services/marketing/corporate/corp-4.jpg"] },
            { name: "COMMERCIALS", images: ["assets/images/services/marketing/commercial/comm-1.jpg", "assets/images/services/marketing/commercial/comm-2.jpg", "assets/images/services/marketing/commercial/comm-3.jpg", "assets/images/services/marketing/commercial/comm-4.jpg"] },
            { name: "SOCIAL MEDIA VIDEOS", images: ["assets/images/services/marketing/social/social-1.jpg", "assets/images/services/marketing/social/social-2.jpg", "assets/images/services/marketing/social/social-3.jpg", "assets/images/services/marketing/social/social-4.jpg"] },
            { name: "EVENT COVERAGE", images: ["assets/images/services/marketing/event/event-1.jpg", "assets/images/services/marketing/event/event-2.jpg", "assets/images/services/marketing/event/event-3.jpg", "assets/images/services/marketing/event/event-4.jpg"] }
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
            { name: "ELECTRONICS", images: ["assets/images/services/shoppable/electronics/elec-1.jpg", "assets/images/services/shoppable/electronics/elec-2.jpg", "assets/images/services/shoppable/electronics/elec-3.jpg", "assets/images/services/shoppable/electronics/elec-4.jpg"] },
            { name: "GOLD", images: ["assets/images/services/shoppable/gold/gold-1.jpg", "assets/images/services/shoppable/gold/gold-2.jpg", "assets/images/services/shoppable/gold/gold-3.jpg", "assets/images/services/shoppable/gold/gold-4.jpg", "assets/images/services/shoppable/gold/gold-5.jpg"] },
            { name: "LIFESTYLE", images: ["assets/images/services/shoppable/lifestyle/life-1.jpg", "assets/images/services/shoppable/lifestyle/life-2.jpg", "assets/images/services/shoppable/lifestyle/life-3.jpg", "assets/images/services/shoppable/lifestyle/life-4.jpg"] },
            { name: "FASHION", images: ["assets/images/services/shoppable/fashion/fashion-1.jpg", "assets/images/services/shoppable/fashion/fashion-2.jpg", "assets/images/services/shoppable/fashion/fashion-3.jpg", "assets/images/services/shoppable/fashion/fashion-4.jpg", "assets/images/services/shoppable/fashion/fashion-5.jpg"] },
            { name: "HEALTH", images: ["assets/images/services/shoppable/health/health-1.jpg", "assets/images/services/shoppable/health/health-2.jpg", "assets/images/services/shoppable/health/health-3.jpg", "assets/images/services/shoppable/health/health-4.jpg"] },
            { name: "MOM AND BABY", images: ["assets/images/services/shoppable/baby/baby-1.jpg", "assets/images/services/shoppable/baby/baby-2.jpg", "assets/images/services/shoppable/baby/baby-3.jpg", "assets/images/services/shoppable/baby/baby-4.jpg", "assets/images/services/shoppable/baby/baby-5.jpg", "assets/images/services/shoppable/baby/baby-6.jpg"] }
        ],
        icon: "ShoppingBag"
    }
];

const ARTISTS = [
    { id: "igiboy", name: "IGIBOY", role: "Artist | Content Creator", categories: ["Fashion", "Electronics", "Lifestyle"], social: { instagram: "", tiktok: "" }, followers: [{ platform: "TikTok", count: "19,000+", handle: "@igiboyflores31" }, { platform: "Instagram", count: "93,600+", handle: "@igiboyflores" }, { platform: "Facebook", count: "57,100+", handle: "@igiboyflores31" }], image: "assets/images/Creators/igiboy.png", about: "Igiboy is a versatile artist and content creator known for his engaging lifestyle content.", gallery: ["assets/images/artists/igiboy/gallery-1.jpg", "assets/images/artists/igiboy/gallery-2.jpg"] },
    { id: "sofi", name: "SOFI", role: "Content Creator | KOL", categories: ["Beauty", "Fashion", "Electronics"], social: { instagram: "", tiktok: "" }, followers: [{ platform: "TikTok", count: "144,600", handle: "@sofifermazi" }, { platform: "Instagram", count: "13,900+", handle: "@sofifermazi" }], image: "assets/images/Creators/sofi.png", about: "Sofi brings a fresh perspective to beauty and fashion content.", gallery: ["assets/images/artists/sofi/gallery-1.jpg", "assets/images/artists/sofi/gallery-2.jpg"] },
    { id: "miro", name: "MIRO", role: "Model | KOL | Influencer", categories: ["Fashion", "Skincare", "Electronics"], social: { instagram: "", tiktok: "" }, followers: [{ platform: "TikTok", count: "309,400", handle: "@miromacs" }, { platform: "Instagram", count: "181,000", handle: "@miromacs" }], image: "assets/images/Creators/Miro.png", gallery: ["assets/images/artists/miro/gallery-1.jpg", "assets/images/artists/miro/gallery-2.jpg"] },
    { id: "criselda", name: "CRISELDA", role: "Influencer | KOL", categories: ["Fashion", "Fitness", "Lifestyle"], social: { instagram: "", tiktok: "" }, followers: [{ platform: "TikTok", count: "10,400,000+", handle: "@chickennuggetsop" }, { platform: "Facebook", count: "2,400,000+", handle: "@alvarezcriselda" }], image: "assets/images/Creators/criselda.png", gallery: ["assets/images/artists/criselda/gallery-1.jpg", "assets/images/artists/criselda/gallery-2.jpg"] },
    { id: "bugoi", name: "BUGOY", role: "Artist | Content Creator", categories: ["Electronics"], social: { instagram: "", tiktok: "" }, followers: [{ platform: "TikTok", count: "TBA", handle: "@bugoi_tba" }, { platform: "Instagram", count: "TBA", handle: "@bugoi_tba" }, { platform: "Facebook", count: "TBA", handle: "@bugoi_tba" }], image: "assets/images/Creators/bugoy.png", about: "Bugoy is a versatile artist and content creator known for his engaging lifestyle content.", gallery: ["assets/images/artists/bugoi/gallery-1.jpg", "assets/images/artists/bugoi/gallery-2.jpg"] }
];

const CLIENTS = [
    { name: "BingoPlus", logo: "assets/images/Bingoplus_logo.jpg" },
    { name: "Canon", logo: "assets/images/Canon_logo.png" },
    { name: "Anker", logo: "assets/images/Anker_Logo.jpg" },
    { name: "Insta360", logo: "assets/images/Insta360_logo.jpg" },
    { name: "Oppo", logo: "assets/images/oppo_logo.jpg" },
    { name: "Infinix", logo: "assets/images/Infinix_logo.jpg" },
    { name: "Belo", logo: "assets/images/Belo_logo.jpg" },
    { name: "Honor", logo: "assets/images/Honor_logo.jpg" },
    { name: "Organic Skin", logo: "assets/images/OrganicSkin_logo.png" },
    { name: "Anta", logo: "assets/images/Anta_logo.png" },
    { name: "Str8 Fragrances", logo: "assets/images/Str8_logo.png" },
    { name: "Akaso", logo: "assets/images/akaso_logo.jpg" },
    { name: "Nubia", logo: "assets/images/nubia_logo.jpg" },
    { name: "Puma", logo: "assets/images/puma_logo.png" },
    { name: "Yoto", logo: "assets/images/yoto_logo.jpg" }
];

// Legacy quick replies (kept for reference; active chips are managed by chatbot.js)
const CHAT_QUICK_REPLIES = [
    "🕘 Office Hours",
    "🕐 Operational Hours",
    "📍 Location & Address",
    "🏢 Pixel Reach Inc.",
    "📬 Contact Info",
    "🎯 Our Services"
];
