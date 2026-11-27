'use client';

import { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';
import { magnetic, motionEnabled, revealGroups, revealHeadings, useAnime } from '@/lib/motion';
import { SITE } from '@/lib/site';
import { SectionHeading } from './SectionHeading';
import { ArrowUpRightIcon, CheckIcon, GitHubIcon, LinkedInIcon, MailIcon, SendIcon } from './icons';

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
  { href: SITE.linkedin, label: 'LinkedIn', handle: 'Aparna J', aria: 'Visit LinkedIn profile', Icon: LinkedInIcon },
  { href: SITE.github, label: 'GitHub', handle: 'Aparna0224', aria: 'Visit GitHub profile', Icon: GitHubIcon },
];

const rowClass =
  'group flex w-full items-center gap-4 rounded-2xl border border-cream/10 bg-cream/[0.02] p-4 text-left transition-colors duration-300 hover:border-cream/25 hover:bg-cream/[0.04]';

export function Contact({ formData, formStatus, formError, onSubmit, onFormDataChange }: ContactProps) {
  const [emailCopied, setEmailCopied] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const sendIconRef = useRef<HTMLSpanElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useAnime(ref, (ctx) => {
    revealGroups(ctx);
    const undoMagnetic = magnetic(ctx.root, 0.2);
    const undoHeadings = revealHeadings(ctx);
    return () => {
      undoMagnetic();
      undoHeadings();
    };
  });

  // Paper plane drifts while sending.
  useEffect(() => {
    const icon = sendIconRef.current;
    if (!icon || !motionEnabled() || formStatus !== 'loading') return;
    const anim = animate(icon, { x: [0, 4, 0], y: [0, -4, 0], duration: 700, loop: true, ease: 'inOutSine' });
    return () => {
      anim.revert();
    };
  }, [formStatus]);

  // Status message eases in.
  useEffect(() => {
    if (!statusRef.current || !motionEnabled()) return;
    animate(statusRef.current, { opacity: [0, 1], y: [8, 0], duration: 600, ease: 'outExpo' });
  }, [formStatus]);

  const handleEmailCopy = () => {
    navigator.clipboard.writeText(SITE.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const isLoading = formStatus === 'loading';

  return (
    <section ref={ref} id="contact" className="relative px-5 py-28 sm:px-6 md:px-12 md:py-40 lg:pr-36">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          index="05"
          label="Contact"
          description="Interested in collaborating or have a project in mind? I'd love to hear from you."
        >
          Have a problem worth <em className="serif-accent">solving?</em>
        </SectionHeading>

        <div data-reveal-group className="grid gap-8 lg:grid-cols-12">
          <div data-reveal className="space-y-3 lg:col-span-4">
            <button
              type="button"
              onClick={handleEmailCopy}
              title={emailCopied ? 'Email copied!' : 'Click to copy email'}
              aria-label="Copy email address"
              className={rowClass}
            >
              <span className="icon-btn flex-shrink-0">{emailCopied ? <CheckIcon /> : <MailIcon />}</span>
              <span className="min-w-0">
                <span className="label block">Email</span>
                <span className="mt-1 block truncate text-sm text-cream">{emailCopied ? '✓ Email Copied' : SITE.email}</span>
              </span>
            </button>

            {SOCIALS.map(({ href, label, handle, aria, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={aria} className={rowClass}>
                <span className="icon-btn flex-shrink-0">
                  <Icon />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="label block">{label}</span>
                  <span className="mt-1 block truncate text-sm text-cream">{handle}</span>
                </span>
                <ArrowUpRightIcon width={16} height={16} className="text-cream/40 transition-colors group-hover:text-cream" />
              </a>
            ))}
          </div>

          <div data-reveal className="card p-6 sm:p-8 lg:col-span-8">
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="label mb-2.5 block">
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
                  <label htmlFor="email" className="label mb-2.5 block">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => onFormDataChange({ ...formData, email: e.target.value })}
                    className="field"
                    placeholder="you@company.com"
                    aria-label="Your email"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="label mb-2.5 block">
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

              <div className="flex flex-col-reverse gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-h-5 text-sm">
                  {formStatus === 'success' && (
                    <div ref={statusRef} aria-live="polite" className="flex items-center gap-2 text-saffron-300">
                      <CheckIcon width={16} height={16} />
                      Thank you for reaching out! I&apos;ll get back to you soon.
                    </div>
                  )}
                  {formStatus === 'error' && (
                    <div ref={statusRef} aria-live="polite" role="alert" className="text-red-300">
                      {formError || 'Failed to send message. Please try again.'}
                    </div>
                  )}
                </div>

                <button type="submit" disabled={isLoading} data-magnetic className="btn-primary">
                  {isLoading ? 'Sending...' : 'Send Message'}
                  <span ref={sendIconRef} className="inline-flex">
                    <SendIcon width={16} height={16} />
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
