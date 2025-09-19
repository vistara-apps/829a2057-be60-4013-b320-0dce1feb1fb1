import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PENGU Watch - Never miss a big PENGU trade again',
  description: 'Get instant alerts for significant $PENGU token trades on major exchanges',
  keywords: ['PENGU', 'crypto', 'trading', 'alerts', 'Base', 'miniapp'],
  openGraph: {
    title: 'PENGU Watch',
    description: 'Never miss a big PENGU trade again. Get instant alerts.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-background">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
