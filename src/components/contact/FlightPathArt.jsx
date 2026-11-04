import { useId, useRef } from 'react';
import { useFlightPath } from '../../hooks/useFlightPath';
import {
    ART_VIEWBOX, ACCENT_COLOR, PLANE_FINAL_ANGLE, FLIGHT_ROUTE, FLIGHT_DURATION,
} from './contactArtConfig';

// 'slice' crops instead of squashing on narrow screens, so the art tracks the section's
// edges rather than the card. YMin pins the top edge: the section's height varies, and a centred
// crop would cut the loop off on wide screens.
export default function FlightPathArt() {
    const uid = useId().replace(/:/g, '');
    const svgRef = useRef(null);
    const trailRef = useRef(null);
    const trailMaskRef = useRef(null);
    const planeRef = useRef(null);

    useFlightPath(
        { triggerRef: svgRef, trailRef, trailMaskRef, planeRef },
        { finalAngle: PLANE_FINAL_ANGLE, duration: FLIGHT_DURATION }
    );

    return (
        <svg
            ref={svgRef}
            aria-hidden="true"
            viewBox={ART_VIEWBOX}
            preserveAspectRatio="xMidYMin slice"
            className="absolute inset-0 w-full h-full pointer-events-none opacity-60 lg:opacity-100"
        >
            <defs>
                <filter id={`${uid}-plane-shadow`} x="-40%" y="-40%" width="180%" height="200%">
                    <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#4f46e5" floodOpacity="0.35" />
                </filter>
                {/* Round, wide cap so the end of the trail isn't clipped */}
                <mask id={`${uid}-trail-reveal`} maskUnits="userSpaceOnUse" x="0" y="0" width="1254" height="706">
                    <path
                        ref={trailMaskRef}
                        d={FLIGHT_ROUTE}
                        pathLength="1"
                        fill="none" stroke="#fff" strokeWidth="12" strokeLinecap="round"
                        strokeDasharray="1 1" strokeDashoffset="1"
                    />
                </mask>
            </defs>

            <path
                ref={trailRef}
                d={FLIGHT_ROUTE}
                fill="none" stroke={ACCENT_COLOR} strokeWidth="1.6" strokeDasharray="6 6"
                mask={`url(#${uid}-trail-reveal)`}
            />

            <g ref={planeRef} style={{ opacity: 0 }}>
                <g transform="scale(1.6)" filter={`url(#${uid}-plane-shadow)`}>
                    <g strokeWidth="2.5" strokeLinejoin="round">
                        <path d="M17.7 0 L-18.3 -1.1 L-13.6 7 L-11.8 15.9 Z" fill="#938cf0" stroke="#938cf0" />
                        <path d="M17.7 0 L-11.7 -15 L-18.3 -1.1 Z" fill="#4f46e5" stroke="#4f46e5" />
                    </g>
                </g>
            </g>
        </svg>
    );
}