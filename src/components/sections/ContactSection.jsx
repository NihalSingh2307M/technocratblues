import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CONTACT_FORM, CONTACT_DOMAINS, BRAND, } from '../../assets';
gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
    const sectionRef = useRef(null);
    const leftRef    = useRef(null);
    const rightRef   = useRef(null);

    const [form,   setForm]   = useState({ email: '', query: '', domain: '' });
    const [status, setStatus] = useState('idle'); // idle | submitting | success | error

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(leftRef.current,
                { x: -50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
                  scrollTrigger: { trigger: leftRef.current, start: 'top 80%' } }
            );
            gsap.fromTo(rightRef.current,
                { x: 50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
                  scrollTrigger: { trigger: rightRef.current, start: 'top 80%' } }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        const body = new FormData();
        body.append(CONTACT_FORM.entries.email,  form.email);
        body.append(CONTACT_FORM.entries.query,  form.query);
        body.append(CONTACT_FORM.entries.domain, form.domain);

        try {
            await fetch(CONTACT_FORM.actionUrl, { method: 'POST', body, mode: 'no-cors' });
            setStatus('success');
            setForm({ email: '', query: '', domain: '' });
        } catch {
            setStatus('error');
        }
    };

    return (
        <section id="contact" ref={sectionRef} className="section bg-surface-white">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">

                    {/* ── LEFT ── */}
                    <div ref={leftRef}>
                        <span className="section-eyebrow">
                            <span className="badge-dot" />
                            <span className="badge-label">Get In Touch</span>
                        </span>

                        <h2 className="section-title mb-5" style={{ fontFamily: 'var(--font-display)' }}>
                            Let's build something{' '}
                            <em style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-brand)' }}>remarkable</em> together.
                        </h2>

                        <p className="section-subtitle mb-12">
                            Have a project in mind? Drop your query and we'll get back to you shortly.
                        </p>

                        {/* Contact details */}
                        <div className="flex flex-col gap-5 mb-8">
                            {/* Email
                            <div className="flex items-center gap-4">
                                <div className="icon-box">
                                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                                              stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                        <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs text-[#aaa] uppercase tracking-wider mb-0.5">Email us</p>
                                    <p className="text-sm font-semibold text-[#111]">{SOCIAL_LINKS.email.replace('mailto:', '')}</p>
                                </div>
                            </div> */}

                            {/* Address */}
                            <div className="flex items-center gap-4">
                                <div className="icon-box">
                                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                                              stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                        <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.8" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs text-[#aaa] uppercase tracking-wider mb-0.5">Visit us</p>
                                    <p className="text-sm font-semibold text-[#111]">{BRAND.address.line1}</p>
                                    <p className="text-xs text-[#888] mt-0.5">{BRAND.address.line2}</p>
                                </div>
                            </div>
                        </div>

                        {/* Availability indicator */}
                        <div className="inline-flex items-center gap-2.5 px-4 py-3 rounded-xl bg-(--color-success-bg) border border-(--color-success-border)">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                            </span>
                            <span className="text-sm font-semibold text-(--color-success-text)">Available for new projects</span>
                        </div>
                    </div>

                    {/* ── RIGHT: Form ── */}
                    <div ref={rightRef} className="bg-surface rounded-3xl border border-(--color-border-light) p-7 sm:p-8 lg:p-10">

                        {status === 'success' ? (
                            <div className="flex flex-col items-center justify-center py-14 text-center gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-(--color-success-bg) flex-center">
                                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                                        <path d="M5 12l4 4 10-10" stroke="var(--color-success)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-black text-[#111] font-display">
                                    Query submitted!
                                </h3>
                                <p className="text-[#666] text-sm max-w-xs">
                                    Thanks for reaching out. We'll review your query and get back to you soon.
                                </p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="mt-2 text-sm font-semibold text-brand hover:underline"
                                >
                                    Submit another query
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                                <div className="mb-1">
                                    <h3 className="text-xl font-black text-[#111] font-display">
                                        Send us your query
                                    </h3>
                                    <p className="text-xs text-[#aaa] mt-1">Responses are captured in our team sheet — we'll reply within 24h.</p>
                                </div>

                                {/* Email */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="input-label">
                                        Email ID <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="you@company.com"
                                        value={form.email}
                                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                                        className="input"
                                    />
                                </div>

                                {/* Domain */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="input-label">
                                        Domain / Area of Interest <span className="text-red-400">*</span>
                                    </label>
                                    <select
                                        required
                                        value={form.domain}
                                        onChange={e => setForm(f => ({ ...f, domain: e.target.value }))}
                                        className="input cursor-pointer"
                                    >
                                        <option value="">Select a domain...</option>
                                        {CONTACT_DOMAINS.map(d => (
                                            <option key={d} value={d}>{d}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Query */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="input-label">
                                        Your Query <span className="text-red-400">*</span>
                                    </label>
                                    <textarea
                                        required
                                        rows={4}
                                        placeholder="Describe your project, requirement, or question..."
                                        value={form.query}
                                        onChange={e => setForm(f => ({ ...f, query: e.target.value }))}
                                        className="input resize-none"
                                    />
                                </div>

                                {status === 'error' && (
                                    <p className="text-xs text-(--color-error) bg-(--color-error-bg) border border-(--color-error-border) rounded-lg px-3 py-2">
                                        Something went wrong. Please try again or email us directly.
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    className="btn btn-primary btn-full mt-1"
                                >
                                    {status === 'submitting' ? 'Submitting...' : 'Submit Query →'}
                                </button>

                                <p className="text-center text-xs text-[#ccc]">
                                    Your details are stored securely in our team's Google Sheet.
                                </p>
                            </form>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
}