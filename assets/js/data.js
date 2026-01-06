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

const CHAT_QUICK_REPLIES = [
    "What are your rates?",
    "Do you have influencers?",
    "How do livestreams work?",
    "Where is your studio?",
    "Can I join your team?",
    "Do you handle branding?",
    "What are your office hours?",
    "Do you offer video editing?",
    "How to book a talent?",
    "What services do you provide?",
    "Do you work internationally?",
    "Can I see your portfolio?"
];
