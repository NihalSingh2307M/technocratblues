import { useId, useRef } from 'react';
import { useFlightPath } from '../../hooks/useFlightPath';
import {
    ART_VIEWBOX, ACCENT_COLOR, PLANE_FINAL_ANGLE, FLIGHT_ROUTE, FLIGHT_ROUTE_PIECES, FLIGHT_DURATION,
} from './contactArtConfig';

export default function FlightPathArt() {
    const uid = useId().replace(/:/g, '');
    const svgRef = useRef(null);
    const routeRef = useRef(null);
    const maskRefs = useRef([]);
    const planeRef = useRef(null);

    useFlightPath(
        { triggerRef: svgRef, routeRef, maskRefs, planeRef },
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
                {FLIGHT_ROUTE_PIECES.map((d, i) => (
                    <mask
                        key={i}
                        id={`${uid}-trail-reveal-${i}`}
                        maskUnits="userSpaceOnUse" x="-200" y="0" width="1654" height="706"
                    >
                        <path
                            ref={(el) => { maskRefs.current[i] = el; }}
                            d={d}
                            pathLength="1"
                            fill="none" stroke="#fff" strokeWidth="12" strokeLinecap="round"
                            strokeDasharray="1 2" strokeDashoffset="1"
                        />
                    </mask>
                ))}
            </defs>

            <path ref={routeRef} d={FLIGHT_ROUTE} fill="none" stroke="none" />

            {FLIGHT_ROUTE_PIECES.map((d, i) => (
                <path
                    key={i}
                    d={d}
                    fill="none" stroke={ACCENT_COLOR} strokeWidth="1.6" strokeDasharray="6 6"
                    mask={`url(#${uid}-trail-reveal-${i})`}
                />
            ))}

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