// ── Brand ────────────────────────────────────────────────────────────────────
export const BRAND = {
  name: 'technocratblues',
  nameColored: { base: 'technocrat', accent: 'blues' },
  tagline: 'Engineering & Technology Consulting',
  company: 'Technocrat Blues Pvt Ltd',
  founder: { name: 'Swati Goel', title: 'Founder & CEO' },
  address: {
    line1: 'Baner, Pune, Maharashtra — 411045',
    line2: 'India',
    short: 'Baner, Pune, Maharashtra — 411045, India',
  },
  copyright: `Copyright © ${new Date().getFullYear()} Technocrat Blues Pvt Ltd — All Rights Reserved`,
};
//Logo 
import logoImg from './assets/img/logo.jpg';

export const LOGO = {
  src: logoImg,
  alt: 'Technocrat Blues',
};
// ── Colors ───────────────────────────────────────────────────────────────────
export const COLORS = {
  primary: '#1A47E8',
  primaryHover: '#1338c4',
  bg: '#FAFAF8',
  dark: '#111111',
};

// ── Navigation ───────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'Home',     to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'About',    to: '/about' },
  { label: 'Process',  to: '/process' },
  { label: 'Contact',  to: '/contact' },
];

// ── Hero ─────────────────────────────────────────────────────────────────────
export const HERO_STATS = [
  { value: 'Scalable',      label: 'by design' },
  { value: 'Reliable',      label: 'by default' },
  { value: 'Client-first',  label: 'at every step' },
];

export const HERO_BADGES = ['React', 'Node.js', 'Cloud', 'AI/ML', 'DevOps'];

export const HERO_HEADLINE = {
  line1: 'Technology that',
  line2: 'moves business',
  line3: 'forward.',
  description:
    'We turn ambitious ideas into dependable digital products, engineered to scale and built to endure.',
};

// ── Services ─────────────────────────────────────────────────────────────────
export const SERVICES = [
  {
    title: 'Web & Mobile Application Development',
    desc: 'Modern, intuitive applications built for real users and evolving business needs.',
  },
  {
    title: 'Digital Product Engineering & Architecture',
    desc: 'Thoughtful architecture and end-to-end engineering for products made to last.',
  },
  {
    title: 'Scalable Technology Solutions',
    desc: 'Flexible technology foundations that perform today and grow with tomorrow.',
  },
  {
    title: 'Reliable, Client-Centric Delivery',
    desc: 'Clear communication, disciplined execution, and outcomes centered on your goals.',
  },
];

// ── Process Steps ─────────────────────────────────────────────────────────────
export const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Discovery & Strategy',
    desc: 'We deep-dive into your business goals, user needs, and technical landscape. Out comes a crisp product brief and technical spec.',
    duration: '1–2 weeks',
  },
  {
    num: '02',
    title: 'Architecture & Design',
    desc: 'System architecture, data models, API contracts, and high-fidelity UI prototypes — all aligned before a line of code is written.',
    duration: '1–3 weeks',
  },
  {
    num: '03',
    title: 'Agile Development',
    desc: 'Two-week sprints with daily stand-ups, weekly demos, and continuous integration. You see progress constantly.',
    duration: '4–16 weeks',
  },
  {
    num: '04',
    title: 'QA & Security Review',
    desc: 'Unit, integration, and E2E testing. Performance profiling. Security audit. Zero-compromise quality gate before any release.',
    duration: '1–2 weeks',
  },
  {
    num: '05',
    title: 'Launch & Scale',
    desc: 'Phased rollout with observability dashboards, on-call support, and post-launch optimization sprints.',
    duration: 'Ongoing',
  },
];

// ── About ─────────────────────────────────────────────────────────────────────
export const ABOUT_BULLETS = [
  'Modern Web & Mobile Application Development',
  'Digital Product Engineering & Architecture',
  'Scalable Technology Solutions',
  'Reliable Delivery with Client-Centric Approach',
  'Delivering scalable technology consulting services',
  'Transforming ideas into robust digital solutions',
  'Focus on software engineering, product architecture',
  'Driven by motivation and commitment',
];

export const ABOUT_VALUES = [
  { label: 'Innovation',   desc: 'Modern stacks and forward-thinking architecture.' },
  { label: 'Reliability',  desc: 'Consistent delivery with zero compromise on quality.' },
  { label: 'Scalability',  desc: 'Systems that grow with your business, from day one.' },
];

// ── Contact / Google Form ─────────────────────────────────────────────────────

export const CONTACT_FORM = {
  scriptUrl: import.meta.env.VITE_CONTACT_SCRIPT_URL,
};

export const CONTACT_DOMAINS = [
  'Web Development',
  'Mobile Development',
  'Cloud & DevOps',
  'AI / ML Integration',
  'Product Architecture',
  'Tech Consulting',
  'Other',
];

// ── Social / External Links ───────────────────────────────────────────────────
export const SOCIAL_LINKS = {
  github:   'https://github.com/technocratblues',
  linkedin: 'https://linkedin.com/company/technocratblues',
  twitter:  'https://twitter.com/technocratblues',
  // imp note :--> Dont uncomment email 
  // email:    'mailto:hello@technocratblues.com',
};
// ── Capability Card Details ───────────────────────────────────────────────────
export const CAPABILITY_DETAILS = {
  'Application Development': {
    emoji: '📱',
    tagline: 'We built Inji Web — a browser-based digital identity wallet.',
    highlights: [
      'React frontend with OpenID4VCI credential issuance',
      'Secure credential storage and QR-based sharing',
      "Contributed to MOSIP's open-source Inji stack",
    ],
    color: { from: '#7078D0', to: '#6B91FF' },
    accentBg: 'rgba(112, 120, 208, 0.07)',
  },
  'Product Engineering': {
    emoji: '⚙️',
    tagline: 'Real standards, not shortcuts.',
    highlights: [
      'OpenID4VP & W3C Verifiable Credentials',
      'Mimoto backend + Docker-based local infra',
      'Feature branches, PRs, upstream-first workflow',
    ],
    color: { from: '#9B88F0', to: '#C4A8FF' },
    accentBg: 'rgba(155, 136, 240, 0.07)',
  },
  'Scalable Tech': {
    emoji: '📈',
    tagline: 'Open-source infrastructure from day one.',
    highlights: [
      'MOSIP ecosystem — used by national ID programs',
      'Dockerised services: PostgreSQL, MinIO, DataShare',
      'Built to handle government-scale identity workloads',
    ],
    color: { from: '#5B8DEF', to: '#38BDF8' },
    accentBg: 'rgba(91, 141, 239, 0.07)',
  },
  'Client-Centric': {
    emoji: '🤝',
    tagline: 'We work close to the problem.',
    highlights: [
      'Direct collaboration, no middlemen',
      'Transparent progress, code you can audit',
      'We are learning and building together',
    ],
    color: { from: '#F59E0B', to: '#FBBF24' },
    accentBg: 'rgba(245, 158, 11, 0.07)',
  },
};