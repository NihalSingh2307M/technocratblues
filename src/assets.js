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
import logoImg from './assets/img/logo.jpeg';

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
  { value: '150+', label: 'Projects Shipped' },
  { value: '98%',  label: 'Client Satisfaction' },
  { value: '8+',   label: 'Years Experience' },
];

export const HERO_BADGES = ['React', 'Node.js', 'Cloud', 'AI/ML', 'DevOps'];

export const HERO_HEADLINE = {
  line1: 'Building Scalable',
  line2: 'Digital Products',
  line3: '& Experiences.',
  description:
    'We transform ideas into robust software solutions through modern engineering, architecture, and technology consulting.',
};

// ── Services ─────────────────────────────────────────────────────────────────
export const SERVICES = [
  {
    title: 'Product Engineering',
    desc: 'End-to-end development of scalable web and mobile applications using modern stacks and cloud-native architecture.',
    tags: ['React', 'Node.js', 'AWS'],
    color: 'bg-blue-50 text-[#1A47E8]',
  },
  {
    title: 'UI/UX Design Systems',
    desc: 'Crafting cohesive design languages, component libraries, and pixel-perfect interfaces that delight users.',
    tags: ['Figma', 'Storybook', 'Tailwind'],
    color: 'bg-purple-50 text-purple-600',
  },
  {
    title: 'Cloud Infrastructure',
    desc: 'Architecting resilient, auto-scaling cloud environments with CI/CD pipelines and infrastructure-as-code.',
    tags: ['AWS', 'Docker', 'Terraform'],
    color: 'bg-orange-50 text-orange-500',
  },
  {
    title: 'AI & ML Integration',
    desc: 'Embedding intelligent features into your product: recommendation engines, NLP pipelines, and predictive analytics.',
    tags: ['Python', 'TensorFlow', 'OpenAI'],
    color: 'bg-green-50 text-green-600',
  },
  {
    title: 'Security & Compliance',
    desc: 'Proactive security audits, penetration testing, and compliance frameworks for SOC 2, GDPR, and HIPAA.',
    tags: ['OWASP', 'SOC2', 'GDPR'],
    color: 'bg-red-50 text-red-500',
  },
  {
    title: 'Tech Consulting',
    desc: 'Strategic technology advisory: architecture reviews, team augmentation, and digital transformation roadmaps.',
    tags: ['Strategy', 'Audit', 'Roadmap'],
    color: 'bg-indigo-50 text-indigo-600',
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
// To configure:
//  1. Create a Google Form with 3 fields: Email, Query, Domain
//  2. Get the form POST URL (ends in /formResponse)
//  3. Get each field's entry ID from the pre-filled link
//  4. Replace the placeholder values below
export const CONTACT_FORM = {
  actionUrl: 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse',
  entries: {
    email:  'entry.YOUR_EMAIL_ENTRY_ID',
    query:  'entry.YOUR_QUERY_ENTRY_ID',
    domain: 'entry.YOUR_DOMAIN_ENTRY_ID',
  },
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
