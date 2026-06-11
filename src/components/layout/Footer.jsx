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