import { useRef } from 'react';
import { SERVICES } from '../../assets';
import useServiceAnimation from '../../hooks/useServiceAnimation';

const ACCENTS = [
    { border: 'rgba(26,71,232,0.25)',  glow: 'rgba(26,71,232,0.09)',  hex: '#4d78ff',  line: 'rgba(26,71,232,0.45)'  },
    { border: 'rgba(147,51,234,0.25)', glow: 'rgba(147,51,234,0.09)', hex: '#a855f7',  line: 'rgba(147,51,234,0.45)' },
    { border: 'rgba(249,115,22,0.25)', glow: 'rgba(249,115,22,0.09)', hex: '#fb923c',  line: 'rgba(249,115,22,0.45)' },
    { border: 'rgba(22,163,74,0.25)',  glow: 'rgba(22,163,74,0.09)',  hex: '#4ade80',  line: 'rgba(22,163,74,0.45)'  },
    { border: 'rgba(239,68,68,0.25)',  glow: 'rgba(239,68,68,0.09)',  hex: '#f87171',  line: 'rgba(239,68,68,0.45)'  },
    { border: 'rgba(99,102,241,0.25)', glow: 'rgba(99,102,241,0.09)', hex: '#818cf8',  line: 'rgba(99,102,241,0.45)' },
];

const ICONS = {
    'Product Engineering': (
        <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    'UI/UX Design Systems': (
        <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
            <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
            <path d="M6.5 14v7M3 17.5h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    ),
    'Cloud Infrastructure': (
        <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
            <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"
                stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    'AI & ML Integration': (
        <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
            <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"
                stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    ),
    'Security & Compliance': (
        <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    'Tech Consulting': (
        <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
};

export default function ServiceSection() {
    const sectionRef = useRef(null);
    const stageRef   = useRef(null);
    const pairsRef   = useRef([]);   // each pair wrapper (heading + card)

    useServiceAnimation({ sectionRef, stageRef, pairsRef, cardCount: SERVICES.length });

    return (
        <section
            id="services"
            ref={sectionRef}
            style={{
                background   : '#07070f',
                position     : 'relative',
            }}
        >
            {/* Ambient bg */}
            <div aria-hidden style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: [
                    'radial-gradient(ellipse 90% 55% at 50% 110%, rgba(26,71,232,0.16) 0%, transparent 55%)',
                    'radial-gradient(ellipse 45% 35% at 8%  20%,  rgba(99,102,241,0.05) 0%, transparent 50%)',
                    'radial-gradient(ellipse 38% 28% at 92% 15%,  rgba(147,51,234,0.05) 0%, transparent 50%)',
                ].join(', '),
            }} />

            {/* Inner flex column — this is what gets pinned by ScrollTrigger */}
            <div ref={stageRef} style={{
                display      : 'flex',
                flexDirection: 'column',
                minHeight    : '100vh',
                overflow     : 'hidden',
                position     : 'relative',
            }}>

            {/* ── Section header (always visible at top) ── */}
            <div style={{
                flexShrink   : 0,
                position     : 'relative', zIndex: 10,
                padding      : 'clamp(28px, 4vw, 44px) clamp(24px, 5vw, 64px) 0',
                display      : 'flex',
                alignItems   : 'flex-end',
                justifyContent: 'space-between',
                flexWrap     : 'wrap',
                gap          : 16,
            }}>
                {/* Left: eyebrow + big heading */}
                <div>
                    <p style={{
                        margin       : '0 0 14px',
                        fontSize     : 11,
                        fontWeight   : 700,
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        color        : 'rgba(160,180,255,0.65)',
                        fontFamily   : "'DM Sans', sans-serif",
                        display      : 'flex',
                        alignItems   : 'center',
                        gap          : 10,
                    }}>
                        <span style={{ display:'inline-block', width:24, height:1, background:'rgba(100,140,255,0.4)' }} />
                        Our Services
                    </p>
                    <h2 style={{
                        margin       : 0,
                        fontFamily   : "'Syne', sans-serif",
                        fontWeight   : 900,
                        lineHeight   : 1.06,
                        letterSpacing: '-0.03em',
                        color        : '#ececf4',
                    }}>
                        <span style={{ display:'block', fontSize:'clamp(1.9rem, 4vw, 3.8rem)', color: '#ececf4' }}>
                            What We
                        </span>
                        <span style={{
                            display      : 'block',
                            fontSize     : 'clamp(1.9rem, 4vw, 3.8rem)',
                            color        : '#ffffff',
                            opacity      : 0.92,
                        }}>
                            Build &amp; Deliver.
                        </span>
                    </h2>
                </div>

                {/* Right: sub-copy */}
                <p style={{
                    margin    : 0,
                    maxWidth  : 320,
                    fontSize  : 'clamp(0.8rem, 1.2vw, 0.92rem)',
                    lineHeight: 1.76,
                    color     : 'rgba(200,200,225,0.55)',
                    fontFamily: "'DM Sans', sans-serif",
                    paddingBottom: 6,
                }}>
                    From idea to production — engineering excellence across the full stack, on time and at scale.
                </p>
            </div>

            {/* ── Stage: all pairs stacked absolutely ── */}
            <div
                style={{ position:'relative', flex:1, overflow:'visible', zIndex:1 }}
            >
                {SERVICES.map(({ title, desc, tags }, i) => {
                    const a      = ACCENTS[i % ACCENTS.length];
                    const isEven = i % 2 === 0; // even → heading left, card right

                    return (
                        <div
                            key={title}
                            ref={el => { pairsRef.current[i] = el; }}
                            style={{
                                position      : 'absolute',
                                inset         : 0,
                                display       : 'flex',
                                alignItems    : 'center',
                                justifyContent: 'center',
                                gap           : 'clamp(24px, 4vw, 64px)',
                                padding       : '0 clamp(24px, 5vw, 64px)',
                                opacity       : 0,
                                pointerEvents : 'none',
                                willChange    : 'transform, opacity, filter',
                                /* mobile: stack vertically */
                                flexWrap      : 'wrap',
                            }}
                        >
                            {/* ── Heading block ── */}
                            <div style={{
                                flex     : '1 1 280px',
                                minWidth : 0,
                                order    : isEven ? 0 : 1,
                                textAlign: isEven ? 'left' : 'right',
                            }}>
                                {/* index line */}
                                <p style={{
                                    margin         : '0 0 12px',
                                    fontSize       : 11,
                                    fontWeight     : 600,
                                    letterSpacing  : '0.16em',
                                    textTransform  : 'uppercase',
                                    color          : a.hex,
                                    opacity        : 0.75,
                                    fontFamily     : "'DM Sans', sans-serif",
                                    display        : 'flex',
                                    alignItems     : 'center',
                                    gap            : 8,
                                    justifyContent : isEven ? 'flex-start' : 'flex-end',
                                }}>
                                    {!isEven && <span style={{ display:'inline-block', width:22, height:1, background: a.line }} />}
                                    0{i + 1}
                                    {isEven  && <span style={{ display:'inline-block', width:22, height:1, background: a.line }} />}
                                </p>

                                <h3 style={{
                                    margin       : '0 0 14px',
                                    fontFamily   : "'Syne', sans-serif",
                                    fontWeight   : 800,
                                    fontSize     : 'clamp(1.6rem, 3.2vw, 2.8rem)',
                                    lineHeight   : 1.08,
                                    letterSpacing: '-0.025em',
                                    color        : '#ececf4',
                                }}>
                                    {title}
                                </h3>

                                <p style={{
                                    margin     : '0 0 18px',
                                    fontSize   : 'clamp(0.84rem, 1.2vw, 0.94rem)',
                                    lineHeight : 1.78,
                                    color      : 'rgba(200,200,225,0.42)',
                                    fontFamily : "'DM Sans', sans-serif",
                                    maxWidth   : 360,
                                    marginLeft : isEven ? 0 : 'auto',
                                }}>
                                    {desc}
                                </p>

                                <div style={{
                                    display       : 'flex',
                                    flexWrap      : 'wrap',
                                    gap           : 6,
                                    justifyContent: isEven ? 'flex-start' : 'flex-end',
                                }}>
                                    {tags.map(tag => (
                                        <span key={tag} style={{
                                            padding      : '4px 10px',
                                            borderRadius : 4,
                                            fontSize     : 10,
                                            fontWeight   : 600,
                                            letterSpacing: '0.04em',
                                            background   : 'rgba(255,255,255,0.03)',
                                            border       : `1px solid ${a.border}`,
                                            color        : `${a.hex}99`,
                                            fontFamily   : "'DM Sans', sans-serif",
                                        }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* ── Card block ── */}
                            <div style={{
                                flex    : '0 0 auto',
                                width   : 'clamp(260px, 36vw, 400px)',
                                maxWidth: '100%',
                                order   : isEven ? 1 : 0,
                            }}>
                                <div style={{
                                    background          : 'rgba(255,255,255,0.028)',
                                    backdropFilter      : 'blur(28px)',
                                    WebkitBackdropFilter: 'blur(28px)',
                                    border              : `1px solid ${a.border}`,
                                    borderRadius        : 24,
                                    padding             : 'clamp(22px, 3vw, 36px)',
                                    position            : 'relative',
                                    overflow            : 'hidden',
                                    boxShadow           : [
                                        '0 28px 72px rgba(0,0,0,0.55)',
                                        '0 8px 24px rgba(0,0,0,0.3)',
                                        `0 0 80px ${a.glow}`,
                                    ].join(', '),
                                }}>
                                    {/* inner glow */}
                                    <div aria-hidden style={{
                                        position     : 'absolute', inset: 0, borderRadius: 24,
                                        background   : `radial-gradient(ellipse 72% 52% at ${isEven ? '0%' : '100%'} 0%, ${a.glow} 0%, transparent 65%)`,
                                        pointerEvents: 'none',
                                    }} />

                                    {/* icon */}
                                    <div style={{
                                        display        : 'inline-flex',
                                        alignItems     : 'center',
                                        justifyContent : 'center',
                                        width          : 48, height: 48,
                                        borderRadius   : 14,
                                        marginBottom   : 18,
                                        background     : 'rgba(255,255,255,0.04)',
                                        border         : `1px solid ${a.border}`,
                                        color          : a.hex,
                                        boxShadow      : `0 0 24px ${a.glow}`,
                                    }}>
                                        {ICONS[title]}
                                    </div>

                                    {/* ghost number watermark */}
                                    <div aria-hidden style={{
                                        position     : 'absolute',
                                        right        : 18, bottom: 10,
                                        fontSize     : 88,
                                        fontWeight   : 900,
                                        fontFamily   : "'Syne', sans-serif",
                                        color        : `${a.hex}09`,
                                        lineHeight   : 1,
                                        userSelect   : 'none',
                                        pointerEvents: 'none',
                                    }}>
                                        0{i + 1}
                                    </div>

                                    <p style={{
                                        margin    : 0,
                                        fontSize  : 'clamp(0.82rem, 1.15vw, 0.9rem)',
                                        lineHeight: 1.8,
                                        color     : 'rgba(200,200,225,0.42)',
                                        fontFamily: "'DM Sans', sans-serif",
                                        position  : 'relative', zIndex: 1,
                                    }}>
                                        {desc}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* ── Progress dots ── */}
            <div style={{
                flexShrink    : 0,
                display       : 'flex',
                justifyContent: 'center',
                gap           : 8,
                padding       : '10px 0 18px',
                position      : 'relative', zIndex: 10,
            }}>
                {SERVICES.map((_, i) => (
                    <div
                        key={i}
                        id={`svc-dot-${i}`}
                        style={{
                            width       : 6, height: 6,
                            borderRadius: '50%',
                            background  : i === 0 ? ACCENTS[0].hex : 'rgba(255,255,255,0.15)',
                            transition  : 'background 0.3s, transform 0.3s',
                            transform   : i === 0 ? 'scale(1.4)' : 'scale(1)',
                        }}
                    />
                ))}
            </div>
            </div>{/* end inner flex wrapper */}
        </section>
    );
}