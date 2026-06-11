import { BRAND } from '../../assets';

export default function Footer() {
  return (
    <footer className="bg-surface-darker text-white">
      <div className="container-custom">

        {/* Brand strip */}
        <div className="py-10 sm:py-12 flex flex-col items-center sm:items-start gap-3 border-b border-white/10">
          <button
            onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <svg width="28" height="28" viewBox="0 0 30 30" fill="none">
              <rect width="30" height="30" rx="7" fill="var(--color-brand)" />
              <path d="M5 9h9M9.5 9v12" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M16 9h5.5a3 3 0 0 1 0 6H16V9z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d="M16 15h6a3.5 3.5 0 0 1 0 7H16V15z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            <span className="font-black text-white text-base tracking-tight font-display">
              {BRAND.nameColored.base}<span className="text-brand">{BRAND.nameColored.accent}</span>
            </span>
          </button>
          <p className="text-xs text-white/40 text-center sm:text-left">
            {BRAND.address.short}
          </p>
        </div>

        {/* Copyright bar */}
        <div className="py-5 flex items-center justify-center">
          <p className="text-xs text-white/30 text-center">
            {BRAND.copyright}
          </p>
        </div>

      </div>
    </footer>
  );
}