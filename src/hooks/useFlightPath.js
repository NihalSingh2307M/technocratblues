import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { prefersReducedMotion } from './prefersReducedMotion';
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// `trailRef` is the visible dotted trail and doubles as the plane's flight path.
export function useFlightPath(
    { triggerRef, trailRef, trailMaskRef, planeRef },
    { finalAngle = 0, duration = 3.6, start = 'top 70%', ease = 'sine.inOut' } = {}
) {
    useEffect(() => {
        const reduce = prefersReducedMotion();

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: reduce ? undefined : { trigger: triggerRef.current, start },
            });

            // Plane and trail mask share path, duration and ease, so the dots are drawn right behind
            // the plane as it flies and the plane settles on top of the end of the trail.
            tl.to(planeRef.current, { opacity: 1, duration: 0.3 }, 0)
                .to(planeRef.current, {
                    motionPath: {
                        path: trailRef.current,
                        align: trailRef.current,
                        alignOrigin: [0.5, 0.5],
                        autoRotate: true,
                    },
                    duration,
                    ease,
                }, 0)
                .fromTo(trailMaskRef.current,
                    { attr: { 'stroke-dashoffset': 1 } },
                    { attr: { 'stroke-dashoffset': 0 }, duration, ease },
                    0
                )
                // '_short' takes the shortest turn to the exact parked heading (a few degrees at most).
                .to(planeRef.current, { rotation: `${finalAngle}_short`, duration: 0.4, ease: 'sine.out' }, duration);

            if (reduce) tl.progress(1);
        }, triggerRef);
        return () => ctx.revert();
    }, [triggerRef, trailRef, trailMaskRef, planeRef, finalAngle, duration, start, ease]);
}