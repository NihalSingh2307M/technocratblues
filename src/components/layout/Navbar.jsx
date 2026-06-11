import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const LINKS = [
    { label: 'Home',     href: '#home'     },
    { label: 'About',    href: '#about'    },
    { label: 'Clients',  href: '#clients'  },
];

function scrollTo(href) {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (!el) return;

    ScrollTrigger.refresh();

    const pinSpacer = el.closest('[data-scrolltrigger-pin-spacer]') ?? el.parentElement?.closest('[data-scrolltrigger-pin-spacer]');
    const target = pinSpacer ?? el;
    const top = target.getBoundingClientRect().top + window.scrollY;

    // Find the services pin spacer — if our destination is AT or BELOW it,
    // jump instantly so GSAP scrub doesn't race through all service cards.
    const serviceEl = document.getElementById('services');
    const servicePinSpacer = serviceEl
        ? (serviceEl.closest('[data-scrolltrigger-pin-spacer]') ?? serviceEl.parentElement?.closest('[data-scrolltrigger-pin-spacer]'))
        : null;
    const servicePinTop = servicePinSpacer
        ? servicePinSpacer.getBoundingClientRect().top + window.scrollY
        : null;

    const crossesPinnedSection = servicePinTop !== null && top >= servicePinTop;
    window.scrollTo({ top, behavior: crossesPinnedSection ? 'instant' : 'smooth' });
}

export default function Navbar() {
    const navRef    = useRef(null);
    const pillRef   = useRef(null);
    const mobileRef = useRef(null);
    const bar1      = useRef(null);
    const bar2      = useRef(null);
    const bar3      = useRef(null);
    const isOpen    = useRef(false);
    const [activeSection, setActiveSection] = useState('home');

    /* ── Entry animation ── */
    useEffect(() => {
        gsap.fromTo(navRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.1 }
        );
    }, []);

    /* ── Hide / reveal + shadow on scroll ── */
    useEffect(() => {
        let lastY   = window.scrollY;
        let hidden  = false;
        let ticking = false;

        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                const y     = window.scrollY;
                const delta = y - lastY;

                gsap.to(pillRef.current, {
                    boxShadow: y > 20 ? 'var(--shadow-nav-scrolled)' : 'var(--shadow-nav)',
                    duration: 0.3,
                });

                if (delta > 4 && y > 80 && !hidden) {
                    gsap.to(navRef.current, { y: -100, opacity: 0, duration: 0.38, ease: 'power2.inOut' });
                    hidden = true;
                }
                if (delta < -4 && hidden) {
                    gsap.to(navRef.current, { y: 0, opacity: 1, duration: 0.42, ease: 'power3.out' });
                    hidden = false;
                }

                /* Active link tracking via IntersectionObserver is done below;
                   this scroll handler only handles show/hide */
                lastY   = y;
                ticking = false;
            });
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    /* ── Active section tracking ── */
    useEffect(() => {
        const sections = LINKS.map(l => document.getElementById(l.href.replace('#', ''))).filter(Boolean);
        if (!sections.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
        );

        sections.forEach(s => observer.observe(s));
        return () => observer.disconnect();
    }, []);

    /* ── Mobile menu ── */
    function openMenu() {
        isOpen.current = true;
        gsap.fromTo(mobileRef.current,
            { height: 0, opacity: 0 },
            { height: 'auto', opacity: 1, duration: 0.28, ease: 'power2.out' }
        );
        gsap.to(bar1.current, { rotation: 45,  y:  7, duration: 0.22, ease: 'power2.inOut' });
        gsap.to(bar2.current, { opacity: 0, scaleX: 0, duration: 0.14 });
        gsap.to(bar3.current, { rotation: -45, y: -7, duration: 0.22, ease: 'power2.inOut' });
    }

    function closeMenu() {
        isOpen.current = false;
        gsap.to(mobileRef.current, { height: 0, opacity: 0, duration: 0.22, ease: 'power2.in' });
        gsap.to(bar1.current, { rotation: 0, y: 0, duration: 0.22, ease: 'power2.inOut' });
        gsap.to(bar2.current, { opacity: 1, scaleX: 1, duration: 0.18 });
        gsap.to(bar3.current, { rotation: 0, y: 0, duration: 0.22, ease: 'power2.inOut' });
    }

    function handleLinkClick(href) {
        closeMenu();
        setTimeout(() => scrollTo(href), 10);
    }

    return (
        <header
            ref={navRef}
            style={{ opacity: 0 }}
            className="navbar"
        >
            {/* Pill */}
            <div
                ref={pillRef}
                className="pointer-events-auto w-[calc(100%-2rem)] max-w-5xl"
                style={{
                    padding    : '1.5px',
                    background : 'linear-gradient(135deg, rgba(26,71,232,0.5) 0%, rgba(160,180,255,0.22) 45%, rgba(255,255,255,0.12) 60%, rgba(26,71,232,0.38) 100%)',
                    borderRadius: '1rem',
                    boxShadow  : 'var(--shadow-nav)',
                }}
            >
                <div className="rounded-[calc(1rem-1.5px)] glass px-4 sm:px-5">
                    <div className="flex items-center justify-between h-16 gap-4">

                        {/* LEFT — Let's talk CTA */}
                        <button
                            onClick={() => scrollTo('#contact')}
                            className="btn btn-primary hidden md:inline-flex"
                        >
                            Let's talk
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>

                        {/* RIGHT — Nav links */}
                        <nav className="hidden md:flex items-center gap-0.5 ml-auto">
                            {LINKS.map(({ label, href }) => {
                                const id = href.replace('#', '');
                                return (
                                    <button
                                        key={label}
                                        onClick={() => scrollTo(href)}
                                        className={`nav-link ${activeSection === id ? 'text-brand nav-active' : 'text-[#444]'}`}
                                    >
                                        {label}
                                    </button>
                                );
                            })}
                        </nav>

                        {/* Hamburger — mobile only */}
                        <button
                            className="md:hidden p-2 rounded-lg text-[#111] hover:bg-blue-50/60 ml-auto"
                            onClick={() => isOpen.current ? closeMenu() : openMenu()}
                            aria-label="Toggle menu"
                        >
                            <span className="flex flex-col gap-1.25 w-5">
                                <span ref={bar1} className="block h-0.5 w-5 rounded-full bg-current" style={{ transformOrigin: 'center' }} />
                                <span ref={bar2} className="block h-0.5 w-4 rounded-full bg-current" style={{ transformOrigin: 'center' }} />
                                <span ref={bar3} className="block h-0.5 w-5 rounded-full bg-current" style={{ transformOrigin: 'center' }} />
                            </span>
                        </button>
                    </div>

                    {/* Mobile menu */}
                    <div ref={mobileRef} className="md:hidden overflow-hidden" style={{ height: 0, opacity: 0 }}>
                        <div className="border-t border-brand/10 py-3 flex flex-col gap-1">
                            {LINKS.map(({ label, href }) => (
                                <button
                                    key={label}
                                    onClick={() => handleLinkClick(href)}
                                    className="w-full text-left px-3 py-3 rounded-lg text-sm font-medium text-[#444] hover:text-brand hover:bg-blue-50/50 transition-colors"
                                >
                                    {label}
                                </button>
                            ))}
                            <button
                                onClick={() => handleLinkClick('#contact')}
                                className="btn btn-primary btn-full mt-2 justify-center"
                            >
                                Let's talk
                                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}