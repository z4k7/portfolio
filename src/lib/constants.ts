export const PERSONAL = {
  name: "Sachin Kizhakkepurath",
  firstName: "Sachin",
  title: "Full-Stack Software Engineer",
  tagline: "Building scalable fintech systems, real-time platforms, and production-grade user experiences.",
  location: "Palakkad, Kerala",
  email: "sachinkp1997@gmail.com",
  github: "https://github.com/z4k7",
  linkedin: "https://www.linkedin.com/in/sachin-kizhakkepurath/",
  leetcode: "https://leetcode.com/u/z4k7/",
  available: true,
};

export const EXPERIENCE = [
  {
    company: "PAYWINT",
    role: "Angular Developer",
    period: "2025 – Present",
    location: "Manjeri, Kerala · Onsite",
    current: true,
    projects: [
      {
        name: "FiChecks",
        description: "B2B Payment Platform",
        highlights: [
          "Scaled to 330+ components & 25+ lazy-loaded modules with signals-first architecture",
          "Multi-modal payment engine — 6 channels (check, ACH, card, wallet, bulk) & 24 lifecycle states",
          "Real-time WebSocket updates via Pusher across all transaction workflows",
          "White-label embeddable SDK (iframe + JS snippet) with secure postMessage bridge",
          "Plaid integration for bank account linking & ACH origination",
          "JWT silent refresh, device fingerprinting & rate-limited auth for defense-in-depth",
          "AG Grid Enterprise tables with server-side row models, custom renderers & pagination",
        ],
      },
      {
        name: "GasDeck",
        description: "Gas Station Management System",
        highlights: [
          "Real-time fuel inventory dashboard with live tank levels & reorder alerts",
          "Shift-based transaction reconciliation reducing audit time by 30–40%",
          "Role-based access control with permission-gated routes & API enforcement",
          "Third-party POS & payment API integration with retry logic for unreliable networks",
          "OnPush change detection & lazy loading optimised for kiosk/tablet hardware",
        ],
      },
    ],
  },
  {
    company: "AQUACODES TECHNOLOGIES PVT LTD",
    role: "Full Stack Developer",
    period: "2024 – 2025",
    location: "Noida, Uttar Pradesh · Onsite",
    current: false,
    projects: [
      {
        name: "E-Commerce Platform",
        description: "Angular · Node.js · MySQL",
        highlights: [
          "Built full e-commerce platform with Angular frontend & Node.js backend",
          "Authentication, RBAC, and end-to-end order workflows",
          "MySQL database design covering products, orders & inventory",
          "Automated reporting with Puppeteer — reduced turnaround from hours to minutes",
        ],
      },
    ],
  },
  {
    company: "METRO ENTERPRISES PVT LTD",
    role: "Service Engineer",
    period: "2020 – 2023",
    location: "Mannarkkad, Kerala · Onsite",
    current: false,
    projects: [
      {
        name: "Industrial Equipment Maintenance",
        description: "Service & Calibration",
        highlights: [
          "Maintained & calibrated industrial weighing equipment across client sites",
          "Ensured regulatory compliance and minimised operational downtime",
          "Managed preventive maintenance schedules and field service reports",
        ],
      },
    ],
  },
];

export const SKILLS = {
  Frontend: ["Angular 21", "TypeScript", "RxJS", "Angular Signals", "HTML5", "SCSS", "Tailwind CSS"],
  Backend: ["NestJS", "Node.js", "Express.js", "FastAPI", "Python", "Prisma ORM", "SQLAlchemy", "Pydantic", "WebSockets", "Puppeteer"],
  Mobile: ["Flutter", "Dart", "Riverpod", "GoRouter"],
  Databases: ["PostgreSQL", "MongoDB", "MySQL"],
  Security: ["JWT", "RBAC", "Device Fingerprinting", "Rate Limiting", "Helmet"],
  "DevOps/Tooling": ["Git", "GitHub", "AWS", "Render", "Postman", "ESLint", "Prisma Studio"],
  Integrations: ["Plaid", "Stripe", "Razorpay", "Cloudinary", "MSG91", "AG Grid Enterprise", "Chart.js", "Socket.IO", "Pusher"],
};

export const PROJECTS = [
  {
    id: "tesseract",
    name: "TESSERACT",
    tagline: "Battery outlet management platform",
    description:
      "Enterprise-grade multi-outlet management system with real-time inventory, transactional billing, and analytics dashboards.",
    tech: ["Angular 21", "NestJS", "Flutter", "Prisma", "PostgreSQL", "Socket.IO"],
    highlights: [
      "Multi-outlet architecture",
      "Real-time inventory",
      "Transactional billing engine",
      "JWT auth + RBAC",
      "Analytics dashboard",
      "Barcode billing",
      "Warranty lifecycle system",
    ],
    repos: [
      { label: "Admin (Angular)", url: "https://github.com/z4k7/tesseract-admin" },
      { label: "Backend (NestJS)", url: "https://github.com/z4k7/tesseract-backend" },
      { label: "Mobile (Flutter)", url: "https://github.com/z4k7/tesseract-flutter" },
    ],
    live: null,
    featured: true,
    color: "#c9a84c",
  },
  {
    id: "sandesham",
    name: "SANDESHAM",
    tagline: "Real-time chat platform",
    description: "Scalable real-time messaging platform built on the MERN stack with Socket.IO for live communication.",
    tech: ["MongoDB", "Express", "React", "Node.js", "Socket.IO"],
    highlights: [
      "Real-time messaging",
      "Room-based chat",
      "Presence indicators",
      "Message persistence",
    ],
    repos: [
      { label: "Repository", url: "https://github.com/z4k7/sandesham" },
    ],
    live: null,
    featured: true,
    color: "#10b981",
  },
  {
    id: "barberq",
    name: "BARBERQ",
    tagline: "Queue booking platform",
    description: "Location-aware queue booking platform with integrated payments and live queue management.",
    tech: ["Angular", "Node.js", "Mapbox", "Stripe", "MongoDB"],
    highlights: [
      "Mapbox location search",
      "Live queue management",
      "Payment integrations",
      "Real-time updates",
    ],
    repos: [
      { label: "Client (React)", url: "https://github.com/z4k7/BarberQ-Client" },
      { label: "Server (Node.js)", url: "https://github.com/z4k7/BarberQ-Server" },
    ],
    live: null,
    featured: true,
    color: "#f59e0b",
  },
  {
    id: "odivayo",
    name: "ODIVAYO",
    tagline: "Hyperlocal neighborhood services platform",
    description:
      "Full-stack hyperlocal marketplace connecting skilled local tradespeople with nearby customers — solving the trust gap between undiscoverable service providers and residents who need them.",
    tech: ["Flutter", "FastAPI", "Python", "PostgreSQL", "Angular", "SQLAlchemy", "Cloudinary", "MSG91"],
    highlights: [
      "Dual user roles — same phone number as customer & provider",
      "Phone-first OTP auth via MSG91, no passwords",
      "Provider approval workflow — human-reviewed before going live",
      "Category-based discovery across 10+ service types",
      "5-star ratings & reviews system",
      "One-tap call & WhatsApp direct contact",
      "Async FastAPI + SQLAlchemy for non-blocking I/O",
      "Admin panel (Angular) with full CRUD & dashboard",
      "Cloudinary CDN for profile & portfolio images",
      "Dark / light mode with persistent preference",
    ],
    repos: [
      { label: "Mobile (Flutter)", url: "https://github.com/z4k7/odivayo-flutter" },
      { label: "Backend (FastAPI)", url: "https://github.com/z4k7/odivayo-backend" },
      { label: "Admin (Angular)", url: "https://github.com/z4k7/odivayo-admin" },
    ],
    live: null,
    featured: true,
    color: "#3b82f6",
  },
];

export const ACHIEVEMENTS = [
  { label: "Components Built", value: 330, suffix: "+" },
  { label: "REST APIs", value: 40, suffix: "+" },
  { label: "Lazy Modules", value: 25, suffix: "+" },
  { label: "Payment Channels", value: 3, suffix: "" },
  { label: "Real-Time Systems", value: 5, suffix: "+" },
  { label: "Enterprise Dashboards", value: 10, suffix: "+" },
];

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];
