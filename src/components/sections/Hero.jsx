import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { HERO_BADGES, HERO_HEADLINE, BRAND } from '../../assets';

const ROTATING_WORDS = [
  'Experiences',
  'Platforms',
  'Solutions',
  'Products',
  'Systems',
  'Ventures',
];

export default function Hero() {
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const paraRef  = useRef(null);
  const rightRef = useRef(null);
  const tagRef   = useRef(null);
  const wordRef  = useRef(null);
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      gsap.to(wordRef.current, {
        yPercent: -120, opacity: 0, duration: 0.4, ease: 'power3.in',
        onComplete: () => {
          setWordIdx(i => (i + 1) % ROTATING_WORDS.length);
          gsap.fromTo(wordRef.current,
            { yPercent: 120, opacity: 0 },
            { yPercent: 0,   opacity: 1, duration: 0.5, ease: 'expo.out' }
          );
        },
      });
    }, 2400);
    return () => clearInterval(id);
  }, []);

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
                {BRAND.tagline}
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
                  &amp;{' '}
                  <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
                    <span ref={wordRef} style={{ display: 'inline-block' }}>
                      {ROTATING_WORDS[wordIdx]}
                    </span>
                  </span>
                  .
                </h1>
              </div>
            </div>

            {/* Description */}
            <div ref={paraRef} style={{ opacity: 0 }} className="mb-4">
              <p
                className="text-[#555] text-base sm:text-lg leading-relaxed max-w-120"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {HERO_HEADLINE.description}
              </p>
              {/* <p className="mt-3 text-sm text-[#888]">
                {BRAND.founder.name},{' '}
                <em style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 600, color: '#555' }}>
                  {BRAND.founder.title}
                </em>
              </p> */}
            </div>

          </div>

          {/* ── RIGHT ── */}
          <div
            ref={rightRef}
            style={{ opacity: 0 }}
            className="flex items-center justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-115" style={{ padding: '44px 44px 52px 20px' }}>

              {/* Main card */}
              <div className="hero-float bg-surface-white rounded-3xl shadow-2xl border border-(--color-border-light)] p-10 sm:p-12">
                <div className="flex-center w-28 h-28 mx-auto mb-7 bg-brand rounded-3xl shadow-xl">
                  <svg viewBox="0 0 90 90" fill="none" className="w-16 h-16">
                    <path d="M8 22h26M21 22v46" stroke="white" strokeWidth="6" strokeLinecap="round" />
                    <path d="M42 22h18a11 11 0 0 1 0 22H42V22z" stroke="white" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <path d="M42 44h19a12 12 0 0 1 0 24H42V44z" stroke="white" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                </div>

                <p
                  className="text-center font-black text-[#111] text-2xl tracking-tight mb-1.5 font-display"
                >
                  {BRAND.nameColored.base}<span className="text-brand">{BRAND.nameColored.accent}</span>
                </p>
                <p className="text-center text-[11px] tracking-[0.22em] uppercase text-[#aaa] mb-7">
                  {BRAND.tagline}
                </p>

                <div className="flex flex-wrap justify-center gap-2.5">
                  {HERO_BADGES.map((badge) => (
                    <span
                      key={badge}
                      className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-brand border border-e-blue-100"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Floating code card */}
              <div className="absolute top-0 right-0 bg-surface-dark rounded-2xl shadow-xl px-4 py-3">
                <p className="text-xs font-mono text-brand whitespace-nowrap">npm run deploy</p>
                <p className="text-[10px] font-mono text-green-400 mt-1">✓ Build successful</p>
              </div>

              {/* Dot grid */}
              <div className="absolute -z-10 -bottom-8 -right-8 grid grid-cols-8 gap-2 opacity-[0.12]">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-brand" />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}