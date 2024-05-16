'use client';

import { usePathname } from 'next/navigation';
import { Footer } from './footer';
import Header from './header';
import { ReactNode } from 'react';

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  const forbidden = '/dashboard';

  return (
    <>
      {!pathname.includes(forbidden) && <Header className="flex-none" />}
      {children}
      {!pathname.includes(forbidden) && <Footer className="flex-none" />}
    </>
  );
};
