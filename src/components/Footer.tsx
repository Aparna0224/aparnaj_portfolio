import { NAV_LINKS, SITE } from '@/lib/site';
import { GitHubIcon, LinkedInIcon } from './icons';

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <nav aria-label="Footer" className="flex gap-5 text-sm text-slate-500">
            {NAV_LINKS.map((link) => (
              <a key={link.id} href={`#${link.id}`} className="transition-colors hover:text-white">
                {link.label}
              </a>
            ))}
          </nav>
          <span className="h-4 w-px bg-white/10" />
          <div className="flex gap-3 text-slate-500">
            <a href={SITE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition-colors hover:text-white">
              <GitHubIcon width={16} height={16} />
            </a>
            <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-white">
              <LinkedInIcon width={16} height={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
