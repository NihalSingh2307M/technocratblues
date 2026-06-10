import { useEffect, useRef } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { LOGO } from '../../assets';

const LINKS = [
    { label: 'Home',     to: '/'        },
    { label: 'Services', to: '/services' },
    { label: 'About',    to: '/about'   },
    { label: 'Process',  to: '/process' },
    { label: 'Contact',  to: '/contact' },
];

export default function Navbar() {
    const navRef    = useRef(null);
    const pillRef   = useRef(null);
    const mobileRef = useRef(null);
    const bar1      = useRef(null);
    const bar2      = useRef(null);
    const bar3      = useRef(null);
    const isOpen    = useRef(false);
    const navigate  = useNavigate();
    const location  = useLocation();

    /* ── Entry animation ── */
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(navRef.current,
                { y: -100, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.1 }
            );
        });
        return () => ctx.revert();
    }, []);

    /* ── Hide / reveal on scroll ── */
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
                lastY   = y;
                ticking = false;
            });
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    /* ── Mobile menu ── */
    function openMenu() {
        isOpen.current = true;
        gsap.fromTo(mobileRef.current,
            { height: 0, opacity: 0 },
            { height: 'auto', opacity: 1, duration: 0.28, ease: 'power2.out' }
        );
        gsap.to(bar1.current, { rotation: 45,  y:  7, duration: 0.22, ease: 'power2.inOut' });
        gsap.to(bar2.current, { opacity:  0, scaleX: 0, duration: 0.14 });
        gsap.to(bar3.current, { rotation: -45, y: -7, duration: 0.22, ease: 'power2.inOut' });
    }

    function closeMenu() {
        isOpen.current = false;
        gsap.to(mobileRef.current, { height: 0, opacity: 0, duration: 0.22, ease: 'power2.in' });
        gsap.to(bar1.current, { rotation: 0, y: 0, duration: 0.22, ease: 'power2.inOut' });
        gsap.to(bar2.current, { opacity: 1, scaleX: 1, duration: 0.18 });
        gsap.to(bar3.current, { rotation: 0, y: 0, duration: 0.22, ease: 'power2.inOut' });
    }

    function handleNavClick(to) {
        navigate(to);
        setTimeout(() => closeMenu(), 10);
    }

    function handleCTA() {
        closeMenu();
        navigate('/contact');
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
                    padding   : '1.5px',
                    background: 'linear-gradient(135deg, rgba(26,71,232,0.5) 0%, rgba(160,180,255,0.22) 45%, rgba(255,255,255,0.12) 60%, rgba(26,71,232,0.38) 100%)',
                    borderRadius: '1rem',
                    boxShadow : 'var(--shadow-nav)',
                }}
            >
                <div className="rounded-[calc(1rem-1.5px)] glass px-4 sm:px-5">
                    <div className="flex items-center justify-between h-16">

                        {/* Logo */}
                        <NavLink to="/" onClick={closeMenu} className="flex items-center shrink-0">
                            <img src={LOGO.src} alt={LOGO.alt} className="h-9 w-auto object-contain rounded-2xl" />
                        </NavLink>

                        {/* Desktop nav */}
                        <nav className="hidden md:flex items-center gap-0.5">
                            {LINKS.map(({ label, to }) => (
                                <NavLink
                                    key={label}
                                    to={to}
                                    end={to === '/'}
                                    className={({ isActive }) =>
                                        `nav-link ${isActive ? 'text-brand nav-active' : 'text-[#444]'}`
                                    }
                                >
                                    {label}
                                </NavLink>
                            ))}
                        </nav>

                        {/* Desktop CTA */}
                        <button
                            onClick={handleCTA}
                            className="btn btn-primary hidden md:inline-flex"
                        >
                            Get in Touch
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>

                        {/* Hamburger */}
                        <button
                            className="md:hidden p-2 rounded-lg text-[#111] hover:bg-blue-50/60"
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
                            {LINKS.map(({ label, to }) => (
                                <button
                                    key={label}
                                    onClick={() => handleNavClick(to)}
                                    className={`w-full text-left px-3 py-3 rounded-lg text-sm font-medium transition-colors
                                        ${location.pathname === to
                                            ? 'text-brand bg-blue-50/80'
                                            : 'text-[#444] hover:text-brand hover:bg-blue-50/50'
                                        }`}
                                >
                                    {label}
                                </button>
                            ))}
                            <button
                                onClick={handleCTA}
                                className="btn btn-primary btn-full mt-2 justify-center"
                            >
                                Get in Touch
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