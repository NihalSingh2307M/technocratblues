import { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { CAPABILITY_DETAILS } from '../../assets';

// ─── Modal component ──────────────────────────────────────────────────────────
function CapabilityModal({ data, title, onClose }) {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);

  // Animate in
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.25, ease: 'power2.out' }
    ).fromTo(panelRef.current,
      { opacity: 0, y: 32, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'power3.out' },
      '-=0.1'
    );
  }, []);

  const handleClose = useCallback(() => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(panelRef.current, { opacity: 0, y: 20, scale: 0.97, duration: 0.25, ease: 'power2.in' })
      .to(overlayRef.current, { opacity: 0, duration: 0.2, ease: 'power2.in' }, '-=0.1');
  }, [onClose]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleClose]);

  const detail = CAPABILITY_DETAILS[title];
  const gradient = `linear-gradient(135deg, ${detail.color.from} 0%, ${detail.color.to} 100%)`;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
      style={{ background: 'rgba(10, 10, 20, 0.55)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (e.target === overlayRef.current) handleClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-lg rounded-3xl overflow-hidden"
        style={{
          background: '#ffffff',
          boxShadow: '0 32px 80px rgba(0,0,0,0.22), 0 8px 24px rgba(0,0,0,0.10)',
        }}
      >
        {/* Gradient header */}
        <div className="relative px-8 pt-8 pb-10 overflow-hidden" style={{ background: gradient }}>
          {/* Decorative blobs */}
          <div className="absolute -top-6 -right-6 w-40 h-40 rounded-full blur-3xl opacity-30 bg-white pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full blur-2xl opacity-20 bg-white pointer-events-none" />

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center
                       bg-white/20 hover:bg-white/35 transition-colors duration-150"
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Emoji icon */}
          <div className="w-14 h-14 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-3xl mb-5 shadow-lg">
            {data.emoji}
          </div>
          <h2 className="font-display text-2xl font-black text-white mb-1.5 leading-snug">{title}</h2>
          <p className="text-white/75 text-sm leading-relaxed">{detail.tagline}</p>
        </div>

        {/* Body */}
        <div className="px-8 py-7">
          {/* Feature list */}
          <ul className="flex flex-col gap-3">
            {detail.highlights.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="mt-1 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center"
                  style={{ background: detail.accentBg, border: `1.5px solid ${detail.color.from}44` }}
                >
                  <svg viewBox="0 0 12 12" className="w-2.5 h-2.5" fill="none">
                    <path d="M2 6l3 3 5-5" stroke={detail.color.from} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-sm text-[color:var(--color-ink-soft)] leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <button
            onClick={handleClose}
            className="mt-7 w-full rounded-xl py-3 text-sm font-bold tracking-wide text-white
                       transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            style={{ background: gradient }}
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Card component ───────────────────────────────────────────────────────────
export default function CapabilityCard({ emoji, title, desc, isOpen, onOpen, onClose }) {
  const cardRef = useRef(null);
  const frontRef = useRef(null);
  const rippleRef = useRef(null);

  const handleClick = useCallback((e) => {
    if (isOpen) return;

    // Ripple origin
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = rippleRef.current;
    if (ripple) {
      gsap.set(ripple, { left: x, top: y, scale: 0, opacity: 0.35 });
      gsap.to(ripple, { scale: 18, opacity: 0, duration: 0.7, ease: 'power2.out' });
    }

    // Card pop
    gsap.timeline()
      .to(cardRef.current, { scale: 0.96, duration: 0.12, ease: 'power2.in' })
      .to(cardRef.current, { scale: 1, duration: 0.35, ease: 'elastic.out(1, 0.5)' });

    onOpen();
  }, [isOpen, onOpen]);

  const detail = CAPABILITY_DETAILS[title];

  return (
    <>
      <div
        ref={cardRef}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(e); }}
        aria-label={`Learn more about ${title}`}
        className="group relative rounded-3xl p-8 overflow-hidden cursor-pointer select-none
                   border border-[color:var(--color-border-medium)]
                   hover:border-brand/30 hover:shadow-xl hover:-translate-y-1
                   transition-all duration-300 focus-visible:outline-none
                   focus-visible:ring-2 focus-visible:ring-brand/50"
        style={{
          background: 'linear-gradient(135deg, rgba(240,243,255,0.85) 0%, rgba(255,255,255,0.95) 100%)',
          willChange: 'transform',
        }}
      >
        {/* Ripple layer */}
        <span
          ref={rippleRef}
          className="pointer-events-none absolute w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: detail?.color.from ?? 'var(--color-brand)', opacity: 0 }}
          aria-hidden="true"
        />

        {/* Hover gradient wash */}
        <div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: detail?.accentBg ?? 'var(--color-brand-light)' }}
        />

        <div ref={frontRef} className="relative z-10">
          {/* Icon */}
          <div className="w-14 h-14 rounded-2xl bg-white/80 shadow-md flex items-center justify-center text-2xl mb-6 border border-white/60
                          group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
            {emoji}
          </div>

          <h4 className="font-display text-xl font-black text-[color:var(--color-ink)] mb-3
                          group-hover:text-brand transition-colors duration-200">
            {title}
          </h4>
          <p className="text-sm text-[color:var(--color-ink-subtle)] leading-relaxed mb-5">{desc}</p>

          {/* "Tap to explore" hint */}
          <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0
                          transition-all duration-300">
            <span className="text-xs font-semibold tracking-wide text-brand">Explore</span>
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-brand" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </div>
        </div>
      </div>

      {/* Modal — rendered at document level via portal-like pattern */}
      {isOpen && <CapabilityModal data={detail} title={title} onClose={onClose} />}
    </>
  );
}