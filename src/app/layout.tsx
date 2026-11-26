import type { Metadata, Viewport } from 'next';
import './globals.css';
import './App.css';

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
  themeColor: '#000000',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
