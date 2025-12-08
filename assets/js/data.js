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
