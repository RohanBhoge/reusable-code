'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import styles from './AppShell.module.css';

export default function AppShell({ children }) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isAuthPage = pathname === '/' || pathname === '/login';

  if (isAuthPage) {
    return <div className={styles.authContainer}>{children}</div>;
  }

  return (
    <div className={styles.shellContainer}>
      <Sidebar
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      <div className={styles.mainWrapper}>
        <Header
          onToggleMobileSidebar={() => setIsMobileOpen((prev) => !prev)}
        />
        <main className={styles.mainContent}>{children}</main>
      </div>
    </div>
  );
}