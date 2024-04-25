'use client';

import DashboardSidebar from '@/components/sidebar';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-screen 2xl:grid-cols-[1.1fr_6fr] grid-cols-[1.2fr_6fr] ">
      <DashboardSidebar />
      <main className="p-big-layout overflow-x-hidden max-h-screen relative px-12 py-6">
        {children}
      </main>
    </div>
  );
}
