'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { SIDEBAR_MENU_GROUPS } from '@/constants/sidebarMenu';
import { X } from 'lucide-react';
import styles from './Sidebar.module.css';

export default function Sidebar({ isMobileOpen, onCloseMobile }) {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);

  const checkIsActive = (itemPath) => {
    if (!pathname) return false;
    if (pathname === itemPath) return true;
    if (pathname === '/' && (itemPath === '/examinations' || itemPath === '/dashboard')) {
      return itemPath === '/examinations';
    }
    return itemPath !== '/' && pathname.startsWith(itemPath);
  };

  const getSidebarClassName = () => {
    let classes = [styles.sidebar];
    if (isExpanded) classes.push(styles.expanded);

    if (isMobileOpen) {
      classes.push(styles.mobileOpen);
    } else {
      classes.push(styles.mobileClosed);
    }

    return classes.join(' ');
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          className={styles.backdrop}
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Static layout reserve on desktop */}
      <div className={styles.desktopSpacer} />

      {/* Hover-expandable Sidebar */}
      <aside
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        className={getSidebarClassName()}
        aria-label="Main Navigation Sidebar"
      >
        {/* Header / Logo */}
        <div className={styles.sidebarHeader}>
          <Link href="/" className={styles.logoLink} aria-label="Eduvanta Home">
            <Image
              src="/logo.svg"
              alt="Eduvanta Logo"
              width={isExpanded || isMobileOpen ? 180 : 54}
              height={isExpanded || isMobileOpen ? 64 : 54}
              priority
              className={`${styles.logoImage} ${
                isExpanded || isMobileOpen ? styles.logoFull : styles.logoCompact
              }`}
            />
          </Link>

          <button
            onClick={onCloseMobile}
            className={styles.closeMobileBtn}
            aria-label="Close sidebar menu"
          >
            <X className={styles.closeIcon} />
          </button>
        </div>

        {/* Navigation List */}
        <nav className={styles.nav} aria-label="Sidebar Menu">
          {SIDEBAR_MENU_GROUPS?.map((group, groupIdx) => (
            <React.Fragment key={group.groupId || groupIdx}>
              {groupIdx > 0 && <div className={styles.groupDivider} />}

              <div className={styles.groupItems}>
                {group.items?.map((item) => {
                  const Icon = item.icon;
                  const isActive = checkIsActive(item.path);

                  const linkClasses = [
                    styles.navLink,
                    isActive ? styles.navLinkActive : styles.navLinkInactive,
                    !isExpanded && !isMobileOpen ? styles.navLinkCollapsed : '',
                  ].join(' ');

                  const labelClasses = [
                    styles.navLabel,
                    isExpanded || isMobileOpen
                      ? styles.navLabelExpanded
                      : styles.navLabelCollapsed,
                  ].join(' ');

                  return (
                    <div key={item.id} className={styles.navItemWrapper}>
                      <Link
                        href={item.path}
                        onClick={onCloseMobile}
                        className={linkClasses}
                      >
                        <div
                          className={`${styles.navIcon} ${
                            isActive ? styles.navIconActive : styles.navIconInactive
                          }`}
                        >
                          <Icon className={styles.iconSm} />
                        </div>

                        <span className={labelClasses}>{item.label}</span>

                        {isActive && (isExpanded || isMobileOpen) && (
                          <div className={styles.activeIndicatorDot} />
                        )}
                      </Link>

                      {/* Tooltip when collapsed */}
                      {!isExpanded && !isMobileOpen && (
                        <div className={styles.tooltip} role="tooltip">
                          {item.label}
                          <div className={styles.tooltipArrow} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </React.Fragment>
          ))}
        </nav>
      </aside>
    </>
  );
}