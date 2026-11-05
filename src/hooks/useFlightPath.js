import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { prefersReducedMotion } from './prefersReducedMotion';
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export function useFlightPath(
    { triggerRef, routeRef, maskRefs, planeRef },
    { finalAngle = 0, duration = 3.6, start = 'top 70%', ease = 'sine.inOut' } = {}
) {
    useEffect(() => {
        const reduce = prefersReducedMotion();

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: reduce ? undefined : { trigger: triggerRef.current, start },
            });

            const masks = maskRefs.current.filter(Boolean);
            const lengths = masks.map((m) => m.getTotalLength());
            const total = lengths.reduce((sum, l) => sum + l, 0);
            const starts = lengths.map((_, i) => lengths.slice(0, i).reduce((sum, l) => sum + l, 0));
            const reveal = (progress) => {
                const flown = progress * total;
                masks.forEach((m, i) => {
                    const done = Math.min(Math.max((flown - starts[i]) / lengths[i], 0), 1);
                    m.setAttribute('stroke-dashoffset', String(1 - done));
                });
            };
            reveal(0);

            const progress = { value: 0 };
            tl.to(planeRef.current, { opacity: 1, duration: 0.3 }, 0)
                .to(planeRef.current, {
                    motionPath: {
                        path: routeRef.current,
                        align: routeRef.current,
                        alignOrigin: [0.5, 0.5],
                        autoRotate: true,
                    },
                    duration,
                    ease,
                }, 0)
                .to(progress, { value: 1, duration, ease, onUpdate: () => reveal(progress.value) }, 0)
                .to(planeRef.current, { rotation: `${finalAngle}_short`, duration: 0.4, ease: 'sine.out' }, duration);

            if (reduce) tl.progress(1);
        }, triggerRef);
        return () => ctx.revert();
    }, [triggerRef, routeRef, maskRefs, planeRef, finalAngle, duration, start, ease]);
}