import { NAV_LINKS, SITE } from '@/lib/site';
import { GitHubIcon, LinkedInIcon } from './icons';

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-cream/[0.07] px-6 md:px-12 lg:pr-36">
      <div className="mx-auto max-w-6xl py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label">
            © {new Date().getFullYear()} {SITE.name} · Made in {SITE.location.split(',')[0]}
          </p>
          <div className="flex items-center gap-6">
            <nav aria-label="Footer" className="flex gap-5">
              {NAV_LINKS.map((link) => (
                <a key={link.id} href={`#${link.id}`} className="label transition-colors hover:text-cream">
                  {link.label}
                </a>
              ))}
            </nav>
            <span className="h-4 w-px bg-cream/10" />
            <div className="flex gap-3 text-cream/45">
              <a href={SITE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition-colors hover:text-cream">
                <GitHubIcon width={16} height={16} />
              </a>
              <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-cream">
                <LinkedInIcon width={16} height={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
