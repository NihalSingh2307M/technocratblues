import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HERO_HEADLINE, HERO_STATS, LOGO } from '../../assets';
gsap.registerPlugin(ScrollTrigger);

function scrollToSection(id) {
    ScrollTrigger.refresh();
    const el = document.getElementById(id);
    if (!el) return;
    const pinSpacer = el.closest('[data-scrolltrigger-pin-spacer]') ?? el.parentElement?.closest('[data-scrolltrigger-pin-spacer]');
    const target = pinSpacer ?? el;
    const top = target.getBoundingClientRect().top + window.scrollY;
    const isPinned = !!pinSpacer;
    window.scrollTo({ top, behavior: isPinned ? 'instant' : 'smooth' });
}

export default function Hero() {
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const paraRef  = useRef(null);
  const rightRef = useRef(null);
  const tagRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.3 });
      tl.fromTo(tagRef.current,   { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 });
      tl.fromTo(line1Ref.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.2');
      tl.fromTo(line2Ref.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.5');
      tl.fromTo(line3Ref.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.5');
      tl.fromTo(paraRef.current,  { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.3');
      tl.fromTo(rightRef.current, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, ease: 'power2.out' }, 0.5);

      gsap.to('.hero-float',   { y: -10, duration: 3,   ease: 'sine.inOut', repeat: -1, yoyo: true });
      gsap.to('.hero-float-2', { y: -7,  duration: 2.4, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 0.6 });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-surface overflow-hidden"
      style={{ paddingTop: '80px' }}
    >
      {/* BG blobs */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-0 right-0 w-1/2 h-2/3 bg-linear-to-bl from-blue-50/80 to-transparent" />
        <div
          className="absolute bottom-0 left-0 w-2/5 h-1/2 opacity-50"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(26,71,232,0.08) 1px, transparent 1px)',
            backgroundSize: '26px 26px',
          }}
        />
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-blue-100/25 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-indigo-100/20 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full container-custom py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-12 xl:gap-16 items-center">

          {/* ── LEFT ── */}
          <div className="flex flex-col">

            {/* Tag */}
            <div
              ref={tagRef}
              style={{ opacity: 0 }}
              className="inline-flex items-center gap-2.5 w-fit px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
              <span className="text-xs font-semibold text-brand tracking-wide">
                Digital Product Engineering
              </span>
            </div>

            {/* Headline */}
            <div className="mb-8">
              <div className="overflow-hidden">
                <h1
                  ref={line1Ref}
                  style={{ opacity: 0, fontFamily: 'var(--font-display)' }}
                  className="font-semibold text-[#111] leading-[1.115]
                             text-[2.4rem] sm:text-[3rem] md:text-[3.6rem] lg:text-[3.2rem] xl:text-[4rem] 2xl:text-[4.8rem]"
                >
                  {HERO_HEADLINE.line1}
                </h1>
              </div>
              <div className="overflow-hidden">
                <h1
                  ref={line2Ref}
                  style={{ opacity: 0, fontFamily: 'var(--font-display)' }}
                  className="font-semibold text-[#111] leading-[1.15]
                             text-[2.4rem] sm:text-[3rem] md:text-[3.6rem] lg:text-[3.2rem] xl:text-[4rem] 2xl:text-[4.8rem]"
                >
                  {HERO_HEADLINE.line2}
                </h1>
              </div>
              <div className="overflow-hidden">
                <h1
                  ref={line3Ref}
                  style={{
                    opacity: 0,
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    color: 'var(--color-brand)',
                  }}
                  className="font-semibold leading-[1.15]
                             text-[2.4rem] sm:text-[3rem] md:text-[3.6rem] lg:text-[3.2rem] xl:text-[4rem] 2xl:text-[4.8rem]"
                >
                  {HERO_HEADLINE.line3}
                </h1>
              </div>
            </div>

            {/* Description */}
            <div ref={paraRef} style={{ opacity: 0 }} className="mb-8">
              <p
                className="text-[#555] text-base sm:text-lg leading-relaxed max-w-120"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {HERO_HEADLINE.description}
              </p>

              {/* CTA row */}
              <div className="flex flex-wrap items-center gap-4 mt-8">
                <button
                  onClick={() => scrollToSection('services')}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#444] hover:text-brand transition-colors"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Explore our expertise
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 2v10M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>

          </div>

          {/* ── RIGHT ── */}
          <div
            ref={rightRef}
            style={{ opacity: 0 }}
            className="flex items-center justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-sm">
              <div className="hero-float bg-surface-white rounded-3xl shadow-2xl border border-[#f3f4f6] p-6 sm:p-8 flex items-center justify-center aspect-square">
                <img
                  src={LOGO.src}
                  alt={LOGO.alt}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Floating code card */}
              <div className="absolute -top-5 right-4 bg-surface-card rounded-2xl shadow-xl px-4 py-3 z-10">
                <p className="text-xs font-mono text-brand whitespace-nowrap">npm run deploy</p>
                <p className="text-[10px] font-mono text-green-400 mt-1">✓ Build successful</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Stats strip ── */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-[#e8eaf0]/60">
        <div className="container-custom py-4 flex items-center gap-8 sm:gap-12">
          {HERO_STATS.map(({ value, label }) => (
            <div key={value} className="flex flex-col">
              <span
                className="text-sm font-black text-[#111]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {value}
              </span>
              <span className="text-xs text-[#888]">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}