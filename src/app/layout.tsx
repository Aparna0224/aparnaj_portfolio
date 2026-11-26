import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

const sans = Inter({ subsets: ['latin'], variable: '--font-sans' });
const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });

// Hide animated elements before first paint, unless the visitor prefers reduced motion.
const motionScript = `if(window.matchMedia&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')`;

export const metadata: Metadata = {
  metadataBase: new URL('https://aparnaj.dev'),
  title: 'Aparna J | AI Developer & Machine Learning Engineer',
  description:
    'Aparna J - AI Developer, Machine Learning Engineer, and Full-Stack Developer specializing in building intelligent systems and deep learning solutions.',
  keywords: [
    'AI Developer',
    'Machine Learning',
    'Deep Learning',
    'Python',
    'React',
    'Full-Stack',
    'Neural Networks',
    'TensorFlow',
    'PyTorch',
  ],
  authors: [{ name: 'Aparna J' }],
  icons: { icon: '/images/aparnaj.jpg' },
  openGraph: {
    title: 'Aparna J | AI Developer & ML Engineer',
    description:
      'Building intelligent systems through machine learning and deep learning. AI Developer specializing in practical ML solutions.',
    images: ['/images/aparnaj.jpg'],
    type: 'website',
    url: 'https://aparnaj.dev',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aparna J | AI Developer & ML Engineer',
    description: 'Building intelligent systems through machine learning and deep learning.',
    images: ['/images/aparnaj.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: '#03040d',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
