'use client';

import { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';
import { motionEnabled, revealGroups, useAnime } from '@/lib/motion';
import { SectionHeading } from './SectionHeading';
import { Planet } from './space/Planet';

interface ContactProps {
  formData: {
    name: string;
    email: string;
    message: string;
  };
  formStatus: 'idle' | 'loading' | 'success' | 'error';
  formError: string;
  onSubmit: (e: React.FormEvent) => void;
  onFormDataChange: (data: { name: string; email: string; message: string }) => void;
}

const SOCIALS = [
  { href: 'https://www.linkedin.com/in/aparna-j-a13647297/', label: 'LinkedIn', aria: 'Visit LinkedIn profile' },
  { href: 'https://github.com/Aparna0224', label: 'GitHub', aria: 'Visit GitHub profile' },
];

export function Contact({ formData, formStatus, formError, onSubmit, onFormDataChange }: ContactProps) {
  const [emailCopied, setEmailCopied] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const rocketRef = useRef<HTMLSpanElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useAnime(ref, revealGroups);

  // Rocket lifts off while sending.
  useEffect(() => {
    const rocket = rocketRef.current;
    if (!rocket || !motionEnabled()) return;
    if (formStatus === 'loading') {
      const anim = animate(rocket, { x: [0, 3, -3, 0], y: [0, -3, 0], duration: 400, loop: true, ease: 'inOutSine' });
      return () => {
        anim.revert();
      };
    }
  }, [formStatus]);

  // Status message drifts in.
  useEffect(() => {
    if (!statusRef.current || !motionEnabled()) return;
    animate(statusRef.current, { opacity: [0, 1], y: [12, 0], duration: 700, ease: 'outExpo' });
  }, [formStatus]);

  const handleEmailCopy = () => {
    const email = 'aparna@example.com';
    navigator.clipboard.writeText(email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const isLoading = formStatus === 'loading';

  return (
    <section ref={ref} id="contact" className="relative flex min-h-screen items-center px-6 py-28">
      <Planet
        className="bottom-24 left-[5%] hidden h-16 w-16 lg:block"
        tone="from-cyan-200 via-sky-600 to-indigo-950"
        ring={false}
      />

      <div className="mx-auto w-full max-w-4xl">
        <SectionHeading
          index="03"
          label="Contact"
          description="Interested in collaborating or have a project in mind? I'd love to hear from you."
        >
          Let&apos;s build something <span className="text-gradient">stellar</span>
        </SectionHeading>

        <div data-reveal-group>
          <div data-reveal className="glass rounded-3xl p-8 md:p-12">
            <form onSubmit={onSubmit} className="space-y-8">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-xs uppercase tracking-widest text-slate-400">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => onFormDataChange({ ...formData, name: e.target.value })}
                    className="field"
                    placeholder="Your name"
                    aria-label="Your name"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-xs uppercase tracking-widest text-slate-400">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => onFormDataChange({ ...formData, email: e.target.value })}
                    className="field"
                    placeholder="your@email.com"
                    aria-label="Your email"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-xs uppercase tracking-widest text-slate-400">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  value={formData.message}
                  onChange={(e) => onFormDataChange({ ...formData, message: e.target.value })}
                  rows={5}
                  className="field resize-none"
                  placeholder="Tell me about your project..."
                  aria-label="Your message"
                  disabled={isLoading}
                />
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <button type="submit" disabled={isLoading} className="btn-primary px-9">
                  {isLoading ? 'Sending...' : 'Send Message'}
                  <span ref={rocketRef} aria-hidden="true" className="inline-block">
                    🚀
                  </span>
                </button>

                {formStatus === 'success' && (
                  <div ref={statusRef} aria-live="polite" className="text-sm text-cyan-200">
                    ✓ Thank you for reaching out! I&apos;ll get back to you soon.
                  </div>
                )}

                {formStatus === 'error' && (
                  <div ref={statusRef} aria-live="polite" role="alert" className="text-sm text-rose-300">
                    ✗ {formError || 'Failed to send message. Please try again.'}
                  </div>
                )}
              </div>
            </form>
          </div>

          <div data-reveal className="mt-10 flex justify-center gap-3">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.aria} className="btn-ghost px-5 py-2">
                {s.label}
              </a>
            ))}
            <button
              type="button"
              onClick={handleEmailCopy}
              title={emailCopied ? 'Email copied!' : 'Click to copy email'}
              aria-label="Copy email address"
              className={`btn-ghost px-5 py-2 ${emailCopied ? 'border-cyan-300/60 text-cyan-100' : ''}`}
            >
              {emailCopied ? '✓ Email Copied' : 'Email'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
