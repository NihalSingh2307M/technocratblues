import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ABOUT_VALUES, BRAND } from '../../assets';
gsap.registerPlugin(ScrollTrigger);

const WHAT_WE_OFFER = [
    {
        emoji: '📱',
        title: 'Application Development',
        desc: 'Modern Web & Mobile Application Development.',
    },
    {
        emoji: '⚙️',
        title: 'Product Engineering',
        desc: 'Digital Product Engineering & Architecture.',
    },
    {
        emoji: '📈',
        title: 'Scalable Tech',
        desc: 'Delivering scalable technology consulting services.',
    },
    {
        emoji: '🤝',
        title: 'Client-Centric',
        desc: 'Reliable Delivery with Client-Centric Approach.',
    },
];

export default function AboutSection() {
    const sectionRef = useRef(null);
    const leftRef = useRef(null);
    const rightRef = useRef(null);
    const cardsRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(leftRef.current,
                { x: -50, opacity: 0 },
                {
                    x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
                    scrollTrigger: { trigger: leftRef.current, start: 'top 80%' }
                }
            );
            gsap.fromTo(rightRef.current,
                { x: 50, opacity: 0 },
                {
                    x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
                    scrollTrigger: { trigger: rightRef.current, start: 'top 80%' }
                }
            );
            gsap.fromTo(
                cardsRef.current?.children ? Array.from(cardsRef.current.children) : [],
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.12,
                    scrollTrigger: { trigger: cardsRef.current, start: 'top 82%' }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="about" ref={sectionRef} className="section bg-surface">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">

                    {/* LEFT */}
                    <div ref={leftRef}>
                        <span className="section-eyebrow">
                            <span className="badge-dot" />
                            <span className="badge-label">About Us</span>
                        </span>

                        <h2
                            className="section-title mb-5"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            Built for what&apos;s next.
                            <br />
                            <em style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-brand)' }}>
                                Grounded in what works.
                            </em>
                        </h2>

                        <p className="section-subtitle mb-6">
                            Building scalable digital experiences with <strong>innovation</strong>,{' '}
                            <strong>reliability</strong>, and modern technology solutions.
                        </p>

                        {/* Two-column body copy matching reference */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                            <p className="text-sm text-[#444] leading-relaxed">
                                We are a technology consulting company focused on turning ideas
                                into robust digital solutions. Our work brings together software
                                engineering, product architecture, and pragmatic delivery.
                            </p>
                            <p className="text-sm text-[#444] leading-relaxed">
                                Driven by motivation and commitment, we work closely with every
                                client to create technology that delivers meaningful, lasting value.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div ref={rightRef} className="flex flex-col gap-5">

                        {/* Dark highlight card */}
                        <div className="bg-surface-card rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-glow rounded-full blur-2xl pointer-events-none"
                                style={{ backgroundColor: 'var(--color-brand-glow)' }} />

                            <div className="flex items-center gap-3 mb-6">
                                <div className="icon-box-brand rounded-xl">
                                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                                            stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <p className="font-black text-white text-base font-display">
                                    What we stand for
                                </p>
                            </div>

                            <div className="flex flex-col gap-4">
                                {ABOUT_VALUES.map(({ label, desc }) => (
                                    <div key={label} className="flex gap-3">
                                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                                        <div>
                                            <p className="text-white font-semibold text-sm">{label}</p>
                                            <p className="text-white/50 text-xs mt-0.5">{desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Address card */}
                        <div className="card-hover flex items-start gap-4 p-6">
                            <div className="icon-box">
                                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                                        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.8" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs text-[#aaa] uppercase tracking-wider mb-1">Our Office</p>
                                <p className="text-sm font-semibold text-[#111]">{BRAND.address.line1}</p>
                                <p className="text-xs text-[#888] mt-0.5">{BRAND.address.line2}</p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* ── What We Offer ── */}
                <div className="mt-20">
                    <div className="flex items-center gap-2.5 mb-2">
                        <span className="w-2 h-2 rounded-full bg-brand" />
                        <p className="text-xs font-semibold text-brand tracking-widest uppercase">What We Offer</p>
                    </div>
                    <h3
                        className="text-2xl sm:text-3xl font-black text-[#111] mb-10"
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        Our Core Capabilities
                    </h3>

                    <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {WHAT_WE_OFFER.map(({ emoji, title, desc }) => (
                            <div
                                key={title}
                                className="group rounded-3xl p-8 border border-[#e5e7ef] bg-white/70 backdrop-blur-sm
                                           hover:border-brand/30 hover:shadow-xl hover:-translate-y-1
                                           transition-all duration-300 cursor-default"
                                style={{ background: 'linear-gradient(135deg, rgba(240,243,255,0.85) 0%, rgba(255,255,255,0.95) 100%)' }}
                            >
                                {/* Icon box */}
                                <div className="w-14 h-14 rounded-2xl bg-white/80 shadow-md flex items-center justify-center text-2xl mb-6 border border-white/60">
                                    {emoji}
                                </div>
                                <h4
                                    className="text-xl font-black text-[#111] mb-3 group-hover:text-brand transition-colors"
                                    style={{ fontFamily: 'var(--font-display)' }}
                                >
                                    {title}
                                </h4>
                                <p className="text-sm text-[#666] leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}