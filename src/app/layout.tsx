import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono, Manrope, Sora } from 'next/font/google';
import './globals.css';

const sans = Manrope({ subsets: ['latin'], variable: '--font-sans' });
const display = Sora({ subsets: ['latin'], variable: '--font-display' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

// Hide animated elements before first paint, unless the visitor prefers reduced motion.
const motionScript = `if(window.matchMedia&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')`;

export const metadata: Metadata = {
  metadataBase: new URL('https://aparnaj.dev'),
  title: 'Aparna J | AI Engineer & Backend Developer',
  description:
    'Aparna J – AI Engineer and Backend Developer from Chennai building REST APIs, FastAPI services, cloud solutions and AI-powered systems.',
  keywords: [
    'Aparna J',
    'AI Engineer',
    'Backend Developer',
    'Python',
    'FastAPI',
    'Machine Learning',
    'RAG',
    'Docker',
    'AWS',
    'Azure',
  ],
  authors: [{ name: 'Aparna J' }],
  icons: { icon: '/images/aparnaj.jpg' },
  openGraph: {
    title: 'Aparna J | AI Engineer & Backend Developer',
    description:
      'Building scalable backend systems, REST APIs and AI-powered applications with Python, FastAPI and the cloud.',
    images: ['/images/aparnaj.jpg'],
    type: 'website',
    url: 'https://aparnaj.dev',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aparna J | AI Engineer & Backend Developer',
    description: 'Building scalable backend systems and AI-powered applications.',
    images: ['/images/aparnaj.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: '#03040d',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
