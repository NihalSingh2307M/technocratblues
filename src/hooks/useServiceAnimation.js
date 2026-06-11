import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/*
  BIDIRECTIONAL SCROLL-SCRUB:
  Each row's animation is tied directly to scroll position via scrub.
  Scroll down → card slides in from left/right, text from opposite side.
  Scroll back up → they slide back out. Always in sync with scroll.

  Even rows (0,2,4): card enters from LEFT, text enters from RIGHT
  Odd  rows (1,3,5): card enters from RIGHT, text enters from LEFT
*/

export default function useServiceAnimation({ sectionRef, rowsRef }) {
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        let ctx;
        const raf = requestAnimationFrame(() => {
            ctx = gsap.context(() => {
                const rows = rowsRef.current.filter(Boolean);
                if (!rows.length) return;

                if (reducedMotion) {
                    rows.forEach(row => {
                        gsap.set(Array.from(row.children), { opacity: 1, x: 0 });
                    });
                    return;
                }

                rows.forEach((row, i) => {
                    const isEven  = i % 2 === 0;
                    const [cardSide, textSide] = row.children;

                    // even: card from left (-100), text from right (+100)
                    // odd:  card from right (+100), text from left (-100)
                    const cardX = isEven ? -100 : 100;
                    const textX = isEven ?  100 : -100;

                    // Set initial (off-screen) state
                    gsap.set(cardSide, { opacity: 0, x: cardX });
                    gsap.set(textSide, { opacity: 0, x: textX });

                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger : row,
                            start   : 'top 90%',   // begin animating when row top hits 90% viewport
                            end     : 'top 30%',   // fully in when row top hits 30% viewport
                            scrub   : 1.2,          // ties animation directly to scroll position
                        },
                    });

                    // Card comes in first, text follows at a slight offset
                    tl.to(cardSide, {
                        opacity : 1,
                        x       : 0,
                        ease    : 'power2.out',
                        duration: 1,
                    }, 0);

                    tl.to(textSide, {
                        opacity : 1,
                        x       : 0,
                        ease    : 'power2.out',
                        duration: 1,
                    }, 0.15);
                });
            }, section);
        });

        return () => {
            cancelAnimationFrame(raf);
            ctx?.revert();
        };
    }, []);
}