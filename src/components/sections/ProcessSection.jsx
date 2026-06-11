import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROCESS_STEPS } from '../../assets';
gsap.registerPlugin(ScrollTrigger);

export default function ProcessSection() {
    const sectionRef = useRef(null);
    const headRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headRef.current,
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
                    scrollTrigger: { trigger: headRef.current, start: 'top 85%' }
                }
            );
            const steps = sectionRef.current?.querySelectorAll('.process-step');
            if (steps) {
                gsap.fromTo(steps,
                    { y: 40, opacity: 0 },
                    {
                        y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.12,
                        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
                    }
                );
            }
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="process" ref={sectionRef} className="section bg-surface-white">
            <div className="container-custom">

                {/* ── Header ── */}
                <div
                    ref={headRef}
                    className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 sm:mb-20 lg:mb-24"
                >
                    <div className="max-w-xl">
                        <span className="section-eyebrow">
                            <span className="badge-dot" />
                            <span className="badge-label">How We Work</span>
                        </span>
                        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-[color:var(--color-ink)] leading-tight">
                            A process built for<br />
                            <span className="text-brand">predictable outcomes</span>
                        </h2>
                    </div>
                    <p className="text-[color:var(--color-ink-subtle)] text-sm sm:text-base leading-relaxed max-w-xs sm:max-w-sm lg:max-w-xs">
                        Every engagement follows a battle-tested delivery framework adapted to your team's pace.
                    </p>
                </div>

                {/* ── Steps ── */}
                <div className="flex flex-col gap-4">
                    {PROCESS_STEPS.map(({ num, title, desc, duration }) => (
                        <div
                            key={num}
                            className="process-step group
                         grid grid-cols-[auto_1fr_auto] sm:grid-cols-[80px_1fr_auto] lg:grid-cols-[100px_1fr_auto]
                         gap-4 sm:gap-6 lg:gap-8 items-start
                         p-6 sm:p-8 lg:p-10
                         rounded-2xl border border-[color:var(--color-border-light)]
                         bg-surface
                         hover:bg-surface-white hover:border-[color:var(--color-border-blue)] hover:shadow-lg
                         transition-all duration-300 cursor-pointer"
                        >
                            {/* Step number */}
                            <div className="flex items-start pt-0.5">
                                <span className="font-display text-3xl sm:text-4xl font-black text-gray-100 group-hover:text-blue-100 transition-colors leading-none">
                                    {num}
                                </span>
                            </div>

                            {/* Content */}
                            <div>
                                <h3 className="font-display font-bold text-[color:var(--color-ink)] text-base sm:text-lg mb-2">
                                    {title}
                                </h3>
                                <p className="text-sm text-[color:var(--color-ink-faint)] leading-relaxed">{desc}</p>
                            </div>

                            {/* Duration badge */}
                            <div className="shrink-0 mt-0.5">
                                <span className="inline-block px-3 py-1.5 rounded-xl
                                 bg-surface-white border border-[color:var(--color-border-medium)]
                                 text-xs font-semibold text-[color:var(--color-ink-muted)] whitespace-nowrap">
                                    {duration}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}