import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/header';
import Providers from './providers';

import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'SLADKOEZHKOVO',
    template: '%s | SLADKOEZHKOVO',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'h-screen')}>
        <Providers>
          {children}
          <Toaster theme="light" position="bottom-left" duration={1500} />
        </Providers>
      </body>
    </html>
  );
}
