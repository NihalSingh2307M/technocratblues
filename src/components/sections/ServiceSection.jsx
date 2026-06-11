import { useRef } from 'react';
import { SERVICES } from '../../assets';
import useServiceAnimation from '../../hooks/useServiceAnimation';

/*
  Layout  : original alternating rows — animation is UNCHANGED.
  Card side: updated to dark-card style (number / icon / title+desc / arrow).
  Text side: identical to original.
  Colors  : light soothing pastel card backgrounds per accent slot.
*/

const ACCENT_COUNT = 4;
const svcVar = (i, key) => `var(--svc-${i % ACCENT_COUNT}-${key})`;

/* Icons matched 1-to-1 with the 4 services */
const ICONS = [
    /* 01 — Monitor / Web & Mobile */
    <svg key="monitor" viewBox="0 0 24 24" fill="none" width="28" height="28">
        <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M6 7h4M6 10h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>,
    /* 02 — Layers / Digital Product Engineering */
    <svg key="layers" viewBox="0 0 24 24" fill="none" width="28" height="28">
        <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    /* 03 — Chart arrow / Scalable Tech */
    <svg key="chart" viewBox="0 0 24 24" fill="none" width="28" height="28">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="16 7 22 7 22 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    /* 04 — Shield check / Reliable Delivery */
    <svg key="shield" viewBox="0 0 24 24" fill="none" width="28" height="28">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="9 12 11 14 15 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
];

export default function ServiceSection() {
    const sectionRef = useRef(null);
    const rowsRef    = useRef([]);

    /* ── ORIGINAL animation hook — zero changes ── */
    useServiceAnimation({ sectionRef, rowsRef });

    return (
        <section
            id="services"
            ref={sectionRef}
            className="relative overflow-hidden"
            style={{ padding: 'clamp(72px, 8vw, 112px) 0' }}
        >
            {/* ── Section header ── */}
            <div className="container-custom mb-[clamp(56px,7vw,88px)] flex flex-wrap items-end justify-between gap-6">
                <div>
                    <p className="flex items-center gap-2.5 mb-3.5 text-[11px] font-bold tracking-[0.16em] uppercase text-brand font-body">
                        <span className="inline-block w-6 h-px bg-brand rounded opacity-50" />
                        What We Do
                    </p>
                    <h2 className="font-display font-black leading-[1.06] tracking-tight text-[color:var(--color-ink)]">
                        <span className="block text-[clamp(2rem,4vw,3.6rem)]">Engineering clarity</span>
                        <span className="block text-[clamp(2rem,4vw,3.6rem)]">
                            into every{' '}
                            <span style={{ color: 'var(--svc-1-hex)' }}>solution.</span>
                        </span>
                    </h2>
                </div>
                <p className="max-w-xs pb-1.5 text-[clamp(0.84rem,1.2vw,0.94rem)] leading-[1.8] text-[color:var(--color-ink-subtle)] font-body">
                    From first sketch to production scale, we help teams build smarter,
                    move faster, and deliver with confidence.
                </p>
            </div>

            {/* ── Alternating rows — ORIGINAL structure ── */}
            {SERVICES.map(({ title, desc, tags }, i) => {
                const isEven  = i % 2 === 0;
                const cardOrder = isEven ? 'order-first' : 'order-last';
                const textOrder = isEven ? 'order-last'  : 'order-first';

                return (
                    <div
                        key={title}
                        ref={el => { rowsRef.current[i] = el; }}
                        className="svc-row"
                    >
                        {/* ── Card side — new dark-card content, light bg ── */}
                        <div
                            className={`svc-card-side ${cardOrder}`}
                            style={{ background: svcVar(i, 'card-bg') }}
                        >
                            {/* Subtle top-edge glow */}
                            <div
                                aria-hidden
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    background: isEven
                                        ? `radial-gradient(ellipse 70% 60% at 0% 40%, ${svcVar(i, 'card-glow')} 0%, transparent 65%)`
                                        : `radial-gradient(ellipse 70% 60% at 100% 40%, ${svcVar(i, 'card-glow')} 0%, transparent 65%)`,
                                }}
                            />

                            {/* Card inner: number → icon → title+desc */}
                            <div className="relative z-10 flex flex-col justify-between h-full w-full">

                                {/* Top: index number */}
                                <p
                                    className="text-[12px] font-bold tracking-[0.18em] uppercase font-body"
                                    style={{ color: svcVar(i, 'hex'), opacity: 0.5 }}
                                >
                                    0{i + 1}
                                </p>

                                {/* Center: icon box */}
                                <div className="flex items-center justify-center flex-1 py-6">
                                    <div
                                        className="svc-icon-box"
                                        style={{
                                            border: `1.5px solid ${svcVar(i, 'border')}`,
                                            color: svcVar(i, 'hex'),
                                            background: svcVar(i, 'tag'),
                                            boxShadow: `0 4px 20px ${svcVar(i, 'glow')}`,
                                        }}
                                    >
                                        {ICONS[i]}
                                    </div>
                                </div>

                                {/* Bottom: title + desc */}
                                <div>
                                    <h4
                                        className="font-display font-bold text-[clamp(0.95rem,1.4vw,1.15rem)] leading-[1.25] tracking-[-0.02em] mb-2"
                                        style={{ color: 'var(--color-ink)' }}
                                    >
                                        {title}
                                    </h4>
                                    <p
                                        className="font-body text-[clamp(0.78rem,1vw,0.875rem)] leading-[1.7]"
                                        style={{ color: 'var(--color-ink-subtle)' }}
                                    >
                                        {desc}
                                    </p>
                                </div>
                            </div>

                            {/* Arrow — bottom-right corner */}
                            <div
                                aria-hidden
                                className="absolute bottom-5 right-5 svc-card-arrow"
                                style={{ color: svcVar(i, 'hex') }}
                            >
                                ↗
                            </div>
                        </div>

                        {/* ── Text side — ORIGINAL unchanged ── */}
                        <div className={`svc-text-side ${textOrder}`}>
                            <p className="svc-eyebrow" style={{ color: svcVar(i, 'hex') }}>
                                <span className="svc-eyebrow-line" style={{ background: svcVar(i, 'hex') }} />
                                {title}
                            </p>
                            <h3 className="font-display font-extrabold text-[clamp(1.5rem,2.8vw,2.4rem)] leading-[1.1] tracking-[-0.025em] text-[color:var(--color-ink)] mb-4">
                                {title}
                            </h3>
                            <p className="font-body text-[clamp(0.88rem,1.2vw,1rem)] leading-[1.8] text-[color:var(--color-ink-subtle)] max-w-[480px] mb-6">
                                {desc}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {tags.map(tag => (
                                    <span
                                        key={tag}
                                        className="svc-tag"
                                        style={{
                                            background: svcVar(i, 'tag'),
                                            border: `1px solid ${svcVar(i, 'border')}`,
                                            color: svcVar(i, 'hex'),
                                        }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* Bottom border */}
            <div className="border-b border-[color:var(--color-border-light)]" />
        </section>
    );
}