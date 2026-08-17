'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Header';

export default function AppShell({ children }) {
  const pathname = usePathname();

  // Check if current route is login or home (unauthenticated login view)
  const isAuthPage = pathname === '/' || pathname === '/login';

  if (isAuthPage) {
    return (
      <div className="min-h-screen w-full bg-white font-sans text-slate-800">
        {children}
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC] font-sans text-slate-800">
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0 h-screen overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#F8FAFC]">
          {children}
        </main>
      </div>
    </div>
  );
}
