/* ==========================================
   PORTFOLIO CONFIGURATION
   ==========================================
   Edit THIS FILE to personalize your entire
   portfolio. Every section of the website
   reads from this config.

   ★ INSTRUCTIONS:
   1. Replace values below with your own info.
   2. Drop your profile photo into /assets/
   3. Drop your CV PDF into /assets/
   4. Add project screenshots to /assets/
   5. Refresh the browser — done!
   ========================================== */

const CONFIG = {

  /* ─────────────────────────────────────────
     PERSONAL INFO
     ───────────────────────────────────────── */
  personal: {
    firstName: "Trevor",
    lastName: "Kimathi",
    logoFirstLetter: "T",       // Shown in the navbar logo
    logoRest: "Kim",              // Shown after the accent letter
    tagline: "Developer & Videographer",
    heroHeadline: [
      "Crafting Digital",
      "Solutions & Visual",
    ],
    heroAccentWord: "Stories.",  // The gradient-highlighted word
    heroDescription: "I'm Trevor Kimathi, an IT specialist and creative professional who bridges technical precision with compelling visual storytelling.",
    profileImage: "assets/Me (2).jpg",
    cvFile: "",                 // e.g. "assets/Trevor_Kimathi_CV.pdf" — leave "" to hide download
  },

  /* ─────────────────────────────────────────
     SOCIAL LINKS
     Add, remove, or reorder. Use any Font
     Awesome icon class for the icon field.
     ───────────────────────────────────────── */
  socials: [
    { platform: "GitHub",   url: "https://github.com/2COR515",   icon: "fab fa-github"      },
    { platform: "Email",    url: "mailto:nitrevor01@gmail.com",   icon: "fas fa-envelope"    },
    { platform: "LinkedIn", url: "#",                             icon: "fab fa-linkedin-in" },
    { platform: "Twitter",  url: "#",                             icon: "fab fa-twitter"     },
  ],

  /* ─────────────────────────────────────────
     ABOUT SECTION
     ───────────────────────────────────────── */
  about: {
    leadText: 'I\'m passionate about solving real-world business problems through <strong>web development</strong> and bringing ideas to life through <strong>high-quality video production</strong>.',
    paragraphs: [
      "Currently completing my BSc in Information Technology at Dedan Kimathi University of Technology (graduating May 2026), I combine technical knowledge with creative skills to deliver digital solutions that make an impact.",
      "From building responsive web applications to editing professional-grade video content, I bring a unique blend of left-brain logic and right-brain creativity to every project.",
    ],
    stats: [
      { number: 4, suffix: "+", label: "Projects" },
      { number: 4,  suffix: "+", label: "Clients"  },
      { number: 3,  suffix: "+", label: "Years Exp." },
    ],
  },

  /* ─────────────────────────────────────────
     EDUCATION
     ───────────────────────────────────────── */
  education: {
    degree: "BSc in Information Technology",
    institution: "Dedan Kimathi University of Technology",
    graduationDate: "Expected Graduation: May 2026",
  },

  /* ─────────────────────────────────────────
     EXPERIENCE TIMELINE
     Add/remove entries as needed. They render
     in the order listed here.
     ───────────────────────────────────────── */
  experience: [
    {
      date: "March 2026 – Present",
      role: "Intern (CSR)",
      company: "ONQ Kenya",
    },
    {
      date: "Feb 2026 – Present",
      role: "Social Media Manager",
      company: "CareerLift",
    },
    {
      date: "April – June 2025",
      role: "ICDL Instructor",
      company: "Bradegate International College",
    },
    {
      date: "Feb – April 2025",
      role: "Virtual Assistant",
      company: "MentoredLeader",
    },
    {
      date: "Aug 2022 – Present",
      role: "Media Personnel & Youth Leader",
      company: "Harvest Family Ministries",
    },
    {
      date: "Jan – March 2019",
      role: "Salesperson",
      company: "Safaricom",
    },
  ],

  /* ─────────────────────────────────────────
     SERVICES
     Set featured: true on ONE card for the
     highlighted gradient style.
     ───────────────────────────────────────── */
  services: [
    {
      icon: "fas fa-code",
      title: "Web Development",
      description: "Custom business sites, portfolios, and e-commerce solutions built with modern technologies and best practices.",
      features: ["Responsive Design", "E-commerce Solutions", "Custom Web Apps"],
      featured: false,
    },
    {
      icon: "fas fa-video",
      title: "Video Production",
      description: "Professional shooting, editing, social media reels, and corporate videos that tell your brand's story.",
      features: ["Professional Editing", "Social Media Reels", "Corporate Videos"],
      featured: true,
    },
    {
      icon: "fas fa-bullhorn",
      title: "Social Media Management",
      description: "Content strategy, creation, and brand growth across all major platforms.",
      features: ["Content Strategy", "Brand Growth", "Analytics & Reporting"],
      featured: false,
    },
    {
      icon: "fas fa-lightbulb",
      title: "Consulting",
      description: "Expert advice on building and improving your digital presence across web, video, and social media.",
      features: ["Digital Strategy", "Tech Advisory", "Brand Positioning"],
      featured: false,
    },
  ],

  /* ─────────────────────────────────────────
     ORAH — MY BUSINESS
     ───────────────────────────────────────── */
  orah: {
    enabled: true,
    name: "Orah Digital",
    tagline: "Creative & Digital Solutions Agency",
    description: "Orah is a creative agency I founded to help businesses and brands grow through compelling digital experiences. We combine technology, design, and storytelling to deliver solutions that make an impact.",
    vision: "To become a leading creative and digital solutions company in East Africa empowering brands with world-class web development, video production, and digital marketing.",
    logo: "assets/ORAH logo.png",
    website: "",           // e.g. "https://orah.co.ke" — leave "" to hide link
    offerings: [
      {
        icon: "fas fa-globe",
        title: "Web Design & Development",
        description: "Custom websites and web applications that convert visitors into customers.",
      },
      {
        icon: "fas fa-video",
        title: "Video Production",
        description: "Professional video content — ads, brand stories, events, and social media reels.",
      },
      {
        icon: "fas fa-bullhorn",
        title: "Digital Marketing",
        description: "Social media management, SEO, and paid campaigns that grow your audience.",
      },
      {
        icon: "fas fa-paint-brush",
        title: "Brand Identity",
        description: "Logo design, brand strategy, and visual identity systems for new and growing businesses.",
      },
    ],
    cta: {
      text: "Work with Orah",
      url: "#contact",     // links to the contact section by default
    },
  },

  /* ─────────────────────────────────────────
     PORTFOLIO / PROJECTS
     - category: must match one of the filter
       keys in portfolioFilters below
     - image: path to screenshot, or "" for
       gradient placeholder
     - icon: Font Awesome icon for placeholder
     - links: array of { url, icon } objects
     ───────────────────────────────────────── */
  portfolioFilters: [
    { key: "all",      label: "All"         },
    { key: "dev",      label: "Development" },
    { key: "creative", label: "Creative"    },
  ],

  projects: [
    {
      title: "Finance Tracker App",
      description: "a personal finance management system with multi-type savings tracking, advanced analytics, and report generation; and OrahFinance Mobile—a React Native app extending personal finance management to iOS/Android with cross-platform synchronization.",
      category: "dev",
      image: "",                        // e.g. "assets/finance-tracker.jpg"
      icon: "fas fa-chart-line",        // Placeholder icon when no image
      tags: ["React", "JavaScript", "CSS3"],
      links: [
        { url: "#", icon: "fas fa-external-link-alt" },
        { url: "https://github.com/2COR515", icon: "fab fa-github" },
      ],
    },
    {
      title: "Orah School",
      description: "A comprehensive full-stack educational management platform built with JavaScript, featuring multi-role dashboards (student, instructor, admin), real-time attendance tracking, AI-powered chatbot integration, lesson management with video support, analytics dashboards, messaging systems, and theme customization.",
      category: "dev",
      image: "assets/orah school2.png",
      icon: "fas fa-laptop-code",
      tags: ["React", "Node.js", "Full-Stack"],
      links: [
        { url: "#", icon: "fas fa-external-link-alt" },
        { url: "https://2cor515.github.io/orah_school/index.html", icon: "fab fa-github" },
      ],
    },
    {
      title: "CareerLift Content",
      description: "Social media carousels, reels, and branded content created for CareerLift's digital platforms.",
      category: "creative",
      image: "",
      icon: "fas fa-photo-video",
      tags: ["Premiere Pro", "Design", "Social Media"],
      links: [
        { url: "#", icon: "fas fa-play" },
      ],
    },
    {
      title: "Video Showreel",
      description: "A curated showreel of professional video editing work — corporate content, events, and creative shorts.",
      category: "creative",
      image: "",
      icon: "fas fa-film",
      tags: ["Premiere Pro", "CapCut", "Video"],
      links: [
        { url: "#", icon: "fas fa-play" },
      ],
    },
  ],

  /* ─────────────────────────────────────────
     SKILLS
     ───────────────────────────────────────── */
  skillCategories: [
    {
      title: "Coding",
      icon: "fas fa-terminal",
      type: "bar",                      // "bar" = progress bars
      skills: [
        { name: "React",      level: 85 },
        { name: "JavaScript", level: 90 },
        { name: "HTML5",      level: 95 },
        { name: "CSS3",       level: 90 },
      ],
    },
    {
      title: "Tools",
      icon: "fas fa-tools",
      type: "bar",
      skills: [
        { name: "Adobe Premiere Pro", level: 88 },
        { name: "CapCut",             level: 92 },
        { name: "GitHub",             level: 80 },
      ],
    },
    {
      title: "Soft Skills",
      icon: "fas fa-users",
      type: "tags",                     // "tags" = rounded chips
      skills: [
        "Project Management",
        "Client Communication",
        "Team Leadership",
        "Problem Solving",
        "Creative Thinking",
        "Time Management",
        "Adaptability",
      ],
    },
  ],

  /* ─────────────────────────────────────────
     CONTACT
     ───────────────────────────────────────── */
  contact: {
    heading: "Have a project in mind? I'd love to hear about it. Let's create something amazing together.",
    methods: [
      {
        label: "Email",
        value: "nitrevor01@gmail.com",
        url: "mailto:nitrevor01@gmail.com",
        icon: "fas fa-envelope",
      },
      {
        label: "GitHub",
        value: "2COR515",
        url: "https://github.com/2COR515",
        icon: "fab fa-github",
      },
    ],
    // Services shown in the contact form dropdown
    formServices: [
      "Web Development",
      "Video Production",
      "Social Media Management",
      "Consulting",
    ],
  },

  /* ─────────────────────────────────────────
     FOOTER
     ───────────────────────────────────────── */
  footer: {
    description: "Developer & Videographer crafting digital solutions and visual stories.",
    copyright: "© 2026 Trevor Kimathi. All Rights Reserved.",
  },

  /* ─────────────────────────────────────────
     THEME / COLORS
     Change these to completely re-skin the
     site without touching CSS.
     ───────────────────────────────────────── */
  theme: {
    accentColor: "#4f46e5",         // Primary accent (buttons, links)
    accentLight: "#6366f1",         // Lighter accent variant
    gradientStart: "#4f46e5",       // Gradient start
    gradientEnd: "#7c3aed",         // Gradient end
    bgColor: "#fafafa",             // Page background
    surfaceColor: "#ffffff",        // Card backgrounds
    textColor: "#1a1a1a",           // Primary text
    textSecondary: "#6b6b6b",       // Secondary text
    darkBg: "#111111",              // Dark section bg (Skills)
    // Badge colors (floating icons in hero)
    badgeColors: [
      { start: "#3b82f6", end: "#2563eb" },   // Dev badge
      { start: "#8b5cf6", end: "#7c3aed" },   // Video badge
      { start: "#ec4899", end: "#db2777" },   // Design badge
    ],
  },
};
