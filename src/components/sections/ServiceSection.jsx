import { useRef } from 'react';
import { SERVICES } from '../../assets';
import useServiceAnimation from '../../hooks/useServiceAnimation';

/*
  Layout: full-width alternating rows — each service takes the entire width.
  Even rows: [CARD left] [TEXT right]
  Odd  rows: [TEXT left] [CARD right]

  No dark background — inherits site background.
  Accent palette: periwinkle family (#7078D0 primary, #7888D0 secondary).
*/

const ACCENTS = [
    { border: 'rgba(112,120,208,0.22)', glow: 'rgba(112,120,208,0.08)', hex: '#7078D0', soft: 'rgba(112,120,208,0.06)', tag: 'rgba(112,120,208,0.12)' },
    { border: 'rgba(120,136,208,0.22)', glow: 'rgba(120,136,208,0.08)', hex: '#7888D0', soft: 'rgba(120,136,208,0.06)', tag: 'rgba(120,136,208,0.12)' },
    { border: 'rgba(140,110,210,0.22)', glow: 'rgba(140,110,210,0.08)', hex: '#9B6FD8', soft: 'rgba(140,110,210,0.06)', tag: 'rgba(140,110,210,0.12)' },
    { border: 'rgba(90,140,200,0.22)',  glow: 'rgba(90,140,200,0.08)',  hex: '#5A8CC8', soft: 'rgba(90,140,200,0.06)',  tag: 'rgba(90,140,200,0.12)'  },
    { border: 'rgba(160,120,200,0.22)', glow: 'rgba(160,120,200,0.08)', hex: '#A078C8', soft: 'rgba(160,120,200,0.06)', tag: 'rgba(160,120,200,0.12)' },
    { border: 'rgba(100,130,220,0.22)', glow: 'rgba(100,130,220,0.08)', hex: '#6482DC', soft: 'rgba(100,130,220,0.06)', tag: 'rgba(100,130,220,0.12)' },
];

const ICONS = {
    'Product Engineering': (
        <svg viewBox="0 0 24 24" fill="none" width="26" height="26">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    'UI/UX Design Systems': (
        <svg viewBox="0 0 24 24" fill="none" width="26" height="26">
            <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
            <path d="M6.5 14v7M3 17.5h7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
    ),
    'Cloud Infrastructure': (
        <svg viewBox="0 0 24 24" fill="none" width="26" height="26">
            <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"
                stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    'AI & ML Integration': (
        <svg viewBox="0 0 24 24" fill="none" width="26" height="26">
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
            <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"
                stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
    ),
    'Security & Compliance': (
        <svg viewBox="0 0 24 24" fill="none" width="26" height="26">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    'Tech Consulting': (
        <svg viewBox="0 0 24 24" fill="none" width="26" height="26">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
};

export default function ServiceSection() {
    const sectionRef = useRef(null);
    const rowsRef    = useRef([]);

    useServiceAnimation({ sectionRef, rowsRef });

    return (
        <section
            id="services"
            ref={sectionRef}
            style={{
                background: 'transparent',
                position  : 'relative',
                padding   : 'clamp(72px, 8vw, 112px) 0',
                overflow  : 'hidden',
            }}
        >
            {/* ── Section header ── */}
            <div style={{
                padding      : '0 clamp(24px, 6vw, 96px)',
                marginBottom : 'clamp(56px, 7vw, 88px)',
                display      : 'flex',
                alignItems   : 'flex-end',
                justifyContent: 'space-between',
                flexWrap     : 'wrap',
                gap          : 24,
            }}>
                <div>
                    <p style={{
                        margin       : '0 0 14px',
                        fontSize     : 11,
                        fontWeight   : 700,
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        color        : '#7078D0',
                        fontFamily   : "'DM Sans', sans-serif",
                        display      : 'flex',
                        alignItems   : 'center',
                        gap          : 10,
                    }}>
                        <span style={{ display:'inline-block', width:24, height:1.5, background:'#7078D0', borderRadius:2, opacity:0.5 }} />
                        What We Do
                    </p>
                    <h2 style={{
                        margin       : 0,
                        fontFamily   : "'Syne', sans-serif",
                        fontWeight   : 900,
                        lineHeight   : 1.06,
                        letterSpacing: '-0.03em',
                        color        : 'var(--color-ink)',
                    }}>
                        <span style={{ display:'block', fontSize:'clamp(2rem, 4vw, 3.6rem)' }}>
                            Engineering clarity
                        </span>
                        <span style={{ display:'block', fontSize:'clamp(2rem, 4vw, 3.6rem)' }}>
                            into every{' '}
                            <span style={{ color: '#7888D0' }}>solution.</span>
                        </span>
                    </h2>
                </div>

                <p style={{
                    margin    : 0,
                    maxWidth  : 320,
                    fontSize  : 'clamp(0.84rem, 1.2vw, 0.94rem)',
                    lineHeight: 1.8,
                    color     : 'var(--color-ink-subtle)',
                    fontFamily: "'DM Sans', sans-serif",
                    paddingBottom: 6,
                }}>
                    From first sketch to production scale, we help teams build smarter,
                    move faster, and deliver with confidence.
                </p>
            </div>

            {/* ── Alternating rows ── */}
            {SERVICES.map(({ title, desc, tags }, i) => {
                const a      = ACCENTS[i % ACCENTS.length];
                const isEven = i % 2 === 0;
                // even: card LEFT, text RIGHT | odd: card RIGHT, text LEFT
                const cardOrder = isEven ? 0 : 1;
                const textOrder = isEven ? 1 : 0;

                return (
                    <div
                        key={title}
                        ref={el => { rowsRef.current[i] = el; }}
                        style={{
                            display      : 'flex',
                            alignItems   : 'center',
                            gap          : 0,
                            minHeight    : 'clamp(280px, 28vw, 400px)',
                            borderTop    : `1px solid var(--color-border-light)`,
                            overflow     : 'hidden',
                        }}
                    >
                        {/* ── Card side ── */}
                        <div style={{
                            order     : cardOrder,
                            flex      : '0 0 45%',
                            alignSelf : 'stretch',
                            position  : 'relative',
                            background: a.soft,
                            display   : 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding   : 'clamp(32px, 4vw, 56px)',
                            overflow  : 'hidden',
                        }}>
                            {/* subtle corner glow */}
                            <div aria-hidden style={{
                                position     : 'absolute',
                                inset        : 0,
                                background   : isEven
                                    ? `radial-gradient(ellipse 70% 60% at 0% 50%, ${a.glow} 0%, transparent 65%)`
                                    : `radial-gradient(ellipse 70% 60% at 100% 50%, ${a.glow} 0%, transparent 65%)`,
                                pointerEvents: 'none',
                            }} />

                            {/* ghost number */}
                            <div aria-hidden style={{
                                position     : 'absolute',
                                right        : isEven ? 20 : 'auto',
                                left         : isEven ? 'auto' : 20,
                                bottom       : 12,
                                fontSize     : 'clamp(80px, 10vw, 140px)',
                                fontWeight   : 900,
                                fontFamily   : "'Syne', sans-serif",
                                color        : `${a.hex}0d`,
                                lineHeight   : 1,
                                userSelect   : 'none',
                                pointerEvents: 'none',
                            }}>
                                0{i + 1}
                            </div>

                            {/* icon + number label */}
                            <div style={{ position:'relative', zIndex:1, textAlign:'center' }}>
                                <div style={{
                                    display       : 'inline-flex',
                                    alignItems    : 'center',
                                    justifyContent: 'center',
                                    width         : 72,
                                    height        : 72,
                                    borderRadius  : 20,
                                    background    : 'var(--color-surface-white)',
                                    border        : `1px solid ${a.border}`,
                                    color         : a.hex,
                                    boxShadow     : `0 4px 24px ${a.glow}, 0 1px 4px rgba(0,0,0,0.06)`,
                                    marginBottom  : 16,
                                }}>
                                    {ICONS[title]}
                                </div>
                                <p style={{
                                    margin       : 0,
                                    fontSize     : 11,
                                    fontWeight   : 700,
                                    letterSpacing: '0.18em',
                                    textTransform: 'uppercase',
                                    color        : a.hex,
                                    opacity      : 0.6,
                                    fontFamily   : "'DM Sans', sans-serif",
                                }}>
                                    0{i + 1} / 0{SERVICES.length}
                                </p>
                            </div>
                        </div>

                        {/* ── Text side ── */}
                        <div style={{
                            order     : textOrder,
                            flex      : '1 1 55%',
                            padding   : 'clamp(36px, 5vw, 72px) clamp(28px, 5vw, 72px)',
                            display   : 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            gap       : 0,
                        }}>
                            {/* index */}
                            <p style={{
                                margin       : '0 0 10px',
                                fontSize     : 10,
                                fontWeight   : 700,
                                letterSpacing: '0.14em',
                                textTransform: 'uppercase',
                                color        : a.hex,
                                fontFamily   : "'DM Sans', sans-serif",
                                display      : 'flex',
                                alignItems   : 'center',
                                gap          : 8,
                            }}>
                                <span style={{ display:'inline-block', width:20, height:1.5, background:a.hex, opacity:0.4, borderRadius:2 }} />
                                {title}
                            </p>

                            <h3 style={{
                                margin       : '0 0 16px',
                                fontFamily   : "'Syne', sans-serif",
                                fontWeight   : 800,
                                fontSize     : 'clamp(1.5rem, 2.8vw, 2.4rem)',
                                lineHeight   : 1.1,
                                letterSpacing: '-0.025em',
                                color        : 'var(--color-ink)',
                            }}>
                                {title}
                            </h3>

                            <p style={{
                                margin    : '0 0 24px',
                                fontSize  : 'clamp(0.88rem, 1.2vw, 1rem)',
                                lineHeight: 1.8,
                                color     : 'var(--color-ink-subtle)',
                                fontFamily: "'DM Sans', sans-serif",
                                maxWidth  : 480,
                            }}>
                                {desc}
                            </p>

                            {/* Tags */}
                            <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                                {tags.map(tag => (
                                    <span key={tag} style={{
                                        padding      : '5px 14px',
                                        borderRadius : 6,
                                        fontSize     : 11,
                                        fontWeight   : 600,
                                        letterSpacing: '0.04em',
                                        background   : a.tag,
                                        border       : `1px solid ${a.border}`,
                                        color        : a.hex,
                                        fontFamily   : "'DM Sans', sans-serif",
                                    }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* bottom border */}
            <div style={{
                borderBottom: '1px solid var(--color-border-light)',
            }} />
        </section>
    );
}