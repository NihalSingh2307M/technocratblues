const base = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
};

export function MailIcon({ className = 'w-5 h-5' }) {
    return (
        <svg {...base} className={className}>
            <rect x="3" y="5" width="18" height="14" rx="3" />
            <path d="M3.5 7l8.5 6 8.5-6" />
        </svg>
    );
}

export function ArrowRightIcon({ className = 'w-4 h-4' }) {
    return (
        <svg {...base} strokeWidth={2} className={className}>
            <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
    );
}

export function ArrowUpRightIcon({ className = 'w-4 h-4' }) {
    return (
        <svg {...base} strokeWidth={2} className={className}>
            <path d="M7 17L17 7M8 7h9v9" />
        </svg>
    );
}
