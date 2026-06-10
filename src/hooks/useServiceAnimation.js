import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/*
  DESKTOP & TABLET (≥ 768px)
  ─────────────────────────────────────────────────────────────
  The section is pinned. One big scrubbed timeline drives everything.
  Each "step" N:
    • Exit pair N-1  → scale down, blur, fade to ~0, drift back (z recedes)
    • Enter pair N   → slide in from its natural direction, full opacity

  Even pair  (0,2,4): heading on LEFT  → enters from left,  card enters from right
  Odd pair   (1,3,5): heading on RIGHT → enters from right, card enters from left

  MOBILE (< 768px)
  ─────────────────────────────────────────────────────────────
  Same pinned timeline but both columns are stacked, so we just
  fade-up the incoming pair and fade-scale-back the outgoing one.
*/

const SCROLL_PER_STEP = 750;   // px of scroll budget per card

export default function useServiceAnimation({
    sectionRef,
    stageRef,
    pairsRef,
    cardCount,
}) {
    useEffect(() => {
        const section = sectionRef.current;
        const stage   = stageRef?.current;
        if (!section || !stage) return;

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        let ctx;
        const raf = requestAnimationFrame(() => {
            ctx = gsap.context(() => {
                const pairs = pairsRef.current.filter(Boolean);
                if (!pairs.length) return;

                const isMobile = window.innerWidth < 768;

                /* ── Helpers ────────────────────────────────────────────── */

                // Each pair has two direct children: [headingBlock, cardBlock]
                function getParts(pair) {
                    const children = Array.from(pair.children);
                    // order in DOM is always heading (order:0/1) then card (order:1/0)
                    // but CSS order doesn't change DOM order, so children[0] = heading, children[1] = card
                    return { heading: children[0], card: children[1] };
                }

                function enterDir(i) {
                    // even pair: heading enters from left (-), card from right (+)
                    // odd  pair: heading enters from right (+), card from left (-)
                    return i % 2 === 0
                        ? { headingX: -60, cardX: 60 }
                        : { headingX:  60, cardX: -60 };
                }

                /* ── Reduced motion: show all statically ── */
                if (reducedMotion) {
                    pairs.forEach(p => {
                        gsap.set(p, { opacity: 1, pointerEvents: 'auto' });
                    });
                    return;
                }

                /* ── Initial state: all pairs hidden ── */
                pairs.forEach((pair, i) => {
                    const { heading, card } = getParts(pair);
                    const dir = enterDir(i);
                    gsap.set(pair, { opacity: 0, scale: 0.92, filter: 'blur(8px)', zIndex: i + 1, pointerEvents: 'none' });
                    if (!isMobile) {
                        gsap.set(heading, { x: dir.headingX, opacity: 0 });
                        gsap.set(card,    { x: dir.cardX,    opacity: 0, y: 12 });
                    }
                });

                /* ── Build single scrubbed timeline ── */
                const totalScroll = cardCount * SCROLL_PER_STEP;
                const SEG = 1;   // 1 timeline unit per step

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger      : stage,
                        start        : 'top top',
                        end          : `+=${totalScroll}`,
                        pin          : true,
                        pinSpacing   : true,
                        scrub        : 1.4,
                        anticipatePin: 1,
                    },
                });

                pairs.forEach((pair, i) => {
                    const { heading, card } = getParts(pair);
                    const dir   = enterDir(i);
                    const at    = i * SEG;          // when this step starts in the timeline

                    /* ── Exit previous pair ── */
                    if (i > 0) {
                        const prev = pairs[i - 1];
                        tl.to(prev, {
                            opacity  : 0,
                            scale    : 0.82,
                            filter   : 'blur(10px) saturate(0.2)',
                            y        : -28,
                            zIndex   : i,
                            ease     : 'power2.inOut',
                            duration : SEG * 0.44,
                            onComplete: () => { prev.style.pointerEvents = 'none'; },
                        }, at);

                        if (!isMobile) {
                            const { heading: prevH, card: prevC } = getParts(prev);
                            const prevDir = enterDir(i - 1);
                            tl.to(prevH, {
                                x       : prevDir.headingX * 0.4,
                                opacity : 0,
                                ease    : 'power2.in',
                                duration: SEG * 0.38,
                            }, at);
                            tl.to(prevC, {
                                x       : prevDir.cardX * 0.4,
                                opacity : 0,
                                ease    : 'power2.in',
                                duration: SEG * 0.38,
                            }, at + SEG * 0.04);
                        }
                    }

                    /* ── Enter current pair ── */
                    const enterAt = at + (i > 0 ? SEG * 0.3 : 0);

                    tl.to(pair, {
                        opacity      : 1,
                        scale        : 1,
                        filter       : 'blur(0px)',
                        y            : 0,
                        zIndex       : i + 10,
                        ease         : 'power3.out',
                        duration     : SEG * 0.65,
                        pointerEvents: 'auto',
                        onStart      : () => { pair.style.pointerEvents = 'auto'; },
                    }, enterAt);

                    if (!isMobile) {
                        // Heading slides in
                        tl.fromTo(heading,
                            { x: dir.headingX, opacity: 0 },
                            { x: 0, opacity: 1, ease: 'power3.out', duration: SEG * 0.6 },
                            enterAt
                        );
                        // Card slides in slightly after
                        tl.fromTo(card,
                            { x: dir.cardX, opacity: 0, y: 16 },
                            { x: 0, opacity: 1, y: 0, ease: 'power3.out', duration: SEG * 0.6 },
                            enterAt + SEG * 0.1
                        );
                    }

                    /* ── Update progress dots ── */
                    tl.call(() => {
                        // Activate dot i, deactivate others
                        const accents = [
                            '#4d78ff','#a855f7','#fb923c',
                            '#4ade80','#f87171','#818cf8',
                        ];
                        for (let d = 0; d < pairs.length; d++) {
                            const dot = document.getElementById(`svc-dot-${d}`);
                            if (!dot) continue;
                            if (d === i) {
                                dot.style.background = accents[i % accents.length];
                                dot.style.transform  = 'scale(1.45)';
                            } else {
                                dot.style.background = 'rgba(255,255,255,0.15)';
                                dot.style.transform  = 'scale(1)';
                            }
                        }
                    }, null, enterAt);
                });

            }, section);
        });

        return () => {
            cancelAnimationFrame(raf);
            ctx?.revert();
        };
    }, []);
}