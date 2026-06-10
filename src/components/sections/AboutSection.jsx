import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ABOUT_BULLETS, ABOUT_VALUES, BRAND } from '../../assets';
gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
    const sectionRef = useRef(null);
    const leftRef    = useRef(null);
    const rightRef   = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(leftRef.current,
                { x: -50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
                  scrollTrigger: { trigger: leftRef.current, start: 'top 80%' } }
            );
            gsap.fromTo(rightRef.current,
                { x: 50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
                  scrollTrigger: { trigger: rightRef.current, start: 'top 80%' } }
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
                            We're a team of{' '}
                            <em style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-brand)' }}>builders</em>,<br />
                            not just consultants.
                        </h2>

                        <p className="section-subtitle mb-10">
                            {BRAND.tagline}. Building scalable digital experiences with innovation, reliability, and modern technology solutions.
                        </p>

                        {/* Bullet list */}
                        <div className="flex flex-col gap-3">
                            {ABOUT_BULLETS.map((item) => (
                                <div key={item} className="flex items-start gap-3">
                                    <div className="shrink-0 mt-0.75 w-5 h-5 rounded-full bg-brand flex-center">
                                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                            <path d="M2 5l2.5 2.5 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <p className="text-sm text-[#444] leading-relaxed">{item}</p>
                                </div>
                            ))}
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
            </div>
        </section>
    );
}