import { NAV_LINKS, SITE } from '@/lib/site';
import { GitHubIcon, LinkedInIcon } from './icons';

export function Footer() {
  return (
    <footer className="relative border-t border-cream/[0.07] px-5 sm:px-6 md:px-12 lg:pr-36">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <p className="label">
          © {new Date().getFullYear()} {SITE.name} · Made in {SITE.location.split(',')[0]}
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <nav aria-label="Footer" className="-mx-2 flex flex-wrap">
            {NAV_LINKS.map((link) => (
              <a key={link.id} href={`#${link.id}`} className="label inline-flex min-h-11 items-center px-2 transition-colors hover:text-cream">
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex gap-1 text-cream/45">
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:text-cream"
            >
              <GitHubIcon width={16} height={16} />
            </a>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:text-cream"
            >
              <LinkedInIcon width={16} height={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
