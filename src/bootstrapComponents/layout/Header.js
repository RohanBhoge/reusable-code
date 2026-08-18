'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Bell,
  ChevronDown,
  User,
  Settings,
  UserCheck,
  LogOut,
  Menu,
  ChevronRight,
} from 'lucide-react';
import { FLAT_SIDEBAR_MENU } from '@/constants/sidebarMenu';
import styles from './Header.module.css';

export default function Header({ pageTitle, onToggleMobileSidebar }) {
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [hasUnreadNotification, setHasUnreadNotification] = useState(true);
  const profileRef = useRef(null);

  const getCurrentPageTitle = () => {
    if (pageTitle) return pageTitle;
    const matchedItem = FLAT_SIDEBAR_MENU?.find((item) => item.path === pathname);
    if (matchedItem) return matchedItem.label;
    if (pathname === '/' || pathname === '/dashboard') return 'Dashboard';

    const formatted = pathname?.replace('/', '').replace('-', ' ');
    return formatted
      ? formatted.charAt(0).toUpperCase() + formatted.slice(1)
      : 'Examinations';
  };

  const currentTitle = getCurrentPageTitle();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={styles.header} aria-label="Top Application Header">
      {/* Left Section */}
      <div className={styles.leftSection}>
        <button
          onClick={onToggleMobileSidebar}
          className={styles.mobileMenuBtn}
          aria-label="Toggle Navigation Drawer"
        >
          <Menu className={styles.iconSm} />
        </button>

        <div className={styles.breadcrumbGroup}>
          <div className={styles.breadcrumb}>
            <Link href="/dashboard" className={styles.breadcrumbLink}>
              Admin
            </Link>
            <ChevronRight className={styles.breadcrumbSeparator} />
            <span className={styles.breadcrumbCurrent}>{currentTitle}</span>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className={styles.rightSection}>
        <button
          className={styles.notificationBtn}
          aria-label="Notifications"
          onClick={() => setHasUnreadNotification(false)}
        >
          <Bell className={styles.iconSm} />
          {hasUnreadNotification && (
            <span className={styles.badgeWrapper}>
              <span className={styles.badgePing} />
              <span className={styles.badgeDot} />
            </span>
          )}
        </button>

        <div className={styles.verticalDivider} />

        {/* Profile Dropdown */}
        <div className={styles.profileWrapper} ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen((prev) => !prev)}
            className={styles.profileBtn}
            aria-expanded={isProfileOpen}
            aria-haspopup="true"
            aria-label="User Profile Options"
          >
            <div className={styles.avatar}>AU</div>

            <div className={styles.profileMeta}>
              <span className={styles.profileName}>Admin User</span>
              <span className={styles.profileRole}>Administrator</span>
            </div>

            <ChevronDown
              className={`${styles.chevron} ${isProfileOpen ? styles.chevronOpen : ''}`}
            />
          </button>

          {isProfileOpen && (
            <div className={styles.dropdown} role="menu">
              <div className={styles.dropdownHeader}>
                <p className={styles.dropdownName}>Admin User</p>
                <p className={styles.dropdownEmail}>admin@university.edu</p>
                <span className={styles.roleBadge}>Administrator</span>
              </div>

              <div className={styles.dropdownGroup}>
                <Link
                  href="/profile"
                  onClick={() => setIsProfileOpen(false)}
                  className={styles.dropdownItem}
                  role="menuitem"
                >
                  <User className={styles.dropdownIcon} />
                  <span>Profile</span>
                </Link>

                <Link
                  href="/account"
                  onClick={() => setIsProfileOpen(false)}
                  className={styles.dropdownItem}
                  role="menuitem"
                >
                  <UserCheck className={styles.dropdownIcon} />
                  <span>My Account</span>
                </Link>

                <Link
                  href="/settings"
                  onClick={() => setIsProfileOpen(false)}
                  className={styles.dropdownItem}
                  role="menuitem"
                >
                  <Settings className={styles.dropdownIcon} />
                  <span>Settings</span>
                </Link>
              </div>

              <div className={styles.dropdownFooter}>
                <button
                  onClick={() => setIsProfileOpen(false)}
                  className={styles.logoutItem}
                  role="menuitem"
                >
                  <LogOut className={styles.logoutIcon} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}