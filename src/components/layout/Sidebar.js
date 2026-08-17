"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { SIDEBAR_MENU_GROUPS } from '@/constants/sidebarMenu';
import { ChevronRight, X } from 'lucide-react';

export default function Sidebar({ mobileOpenOverride, setMobileOpenOverride }) {
    const pathname = usePathname();
    const [isExpanded, setIsExpanded] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // Sync mobile state with parent or custom event trigger from Navbar
    useEffect(() => {
        if (typeof mobileOpenOverride === 'boolean') {
            setIsMobileOpen(mobileOpenOverride);
        }
    }, [mobileOpenOverride]);

    useEffect(() => {
        const handleToggleMobile = (e) => {
            if (e.detail?.open !== undefined) {
                setIsMobileOpen(e.detail.open);
            } else {
                setIsMobileOpen((prev) => !prev);
            }
        };

        window.addEventListener('toggle-mobile-sidebar', handleToggleMobile);
        return () => {
            window.removeEventListener('toggle-mobile-sidebar', handleToggleMobile);
        };
    }, []);

    const closeMobileSidebar = () => {
        setIsMobileOpen(false);
        if (setMobileOpenOverride) {
            setMobileOpenOverride(false);
        }
    };

    /**
     * Determine if a menu route is active.
     * Matches exact route or sub-route (e.g. /examinations).
     * Default active fallback for '/' matches '/examinations' if configured or current path.
     */
    const checkIsActive = (itemPath) => {
        if (!pathname) return false;
        if (pathname === itemPath) return true;
        if (pathname === '/' && (itemPath === '/examinations' || itemPath === '/dashboard')) {
            return itemPath === '/examinations'; // Matches reference image active state if at root
        }
        if (itemPath !== '/' && pathname.startsWith(itemPath)) return true;
        return false;
    };

    return (
        <>
            {/* Mobile Backdrop Overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300 md:hidden"
                    onClick={closeMobileSidebar}
                    aria-hidden="true"
                />
            )}

            {/* Main Sidebar */}
            <aside
                onMouseEnter={() => setIsExpanded(true)}
                onMouseLeave={() => setIsExpanded(false)}
                className={`
          fixed md:sticky top-0 left-0 z-50 md:z-30 h-screen bg-white border-r border-gray-200 shadow-sm
          flex flex-col justify-between shrink-0 transition-all duration-300 ease-in-out select-none
          ${isExpanded ? "w-[270px]" : "w-[80px]"}
          ${isMobileOpen ? "translate-x-0 w-[270px]" : "-translate-x-full md:translate-x-0"}
        `}
                aria-label="Main Navigation Sidebar"
            >
                {/* Top Header / Logo Section */}
                <div className="flex items-center justify-between h-[76px] px-3.5 border-b border-gray-100 shrink-0">
                    <Link
                        href="/"
                        className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
                        aria-label="Eduvanta Home"
                    >
                        <div className="relative flex items-center justify-center shrink-0">
                            <Image
                                src="/logo.svg"
                                alt="Eduvanta Logo"
                                width={isExpanded || isMobileOpen ? 180 : 54}
                                height={isExpanded || isMobileOpen ? 64 : 54}
                                priority
                                className={`transition-all duration-300 object-contain ${isExpanded || isMobileOpen
                                    ? 'h-14 w-auto max-w-[190px]'
                                    : 'h-12 w-12'
                                    }`}
                            />
                        </div>
                    </Link>

                    {/* Mobile Close Button */}
                    <button
                        onClick={closeMobileSidebar}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 md:hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Close sidebar menu"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Scrollable Navigation List */}
                <nav
                    className="flex-1 overflow-y-auto py-4 px-3 space-y-1 [scrollbar-width:none] [::-webkit-scrollbar]:hidden"
                    aria-label="Sidebar Menu"
                >
                    {SIDEBAR_MENU_GROUPS.map((group, groupIdx) => (
                        <React.Fragment key={group.groupId}>
                            {/* Subtle Group Divider */}
                            {groupIdx > 0 && (
                                <div className="my-3 mx-2 border-t border-gray-200/80" />
                            )}

                            <div className="space-y-1">
                                {group.items.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = checkIsActive(item.path);

                                    return (
                                        <div key={item.id} className="relative group/item">
                                            <Link
                                                href={item.path}
                                                onClick={closeMobileSidebar}
                                                className={`
                          group flex items-center h-11 px-3 rounded-xl transition-all duration-200
                          hover:translate-x-1 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500
                          ${isActive
                                                        ? 'bg-blue-50 text-blue-600 font-medium shadow-xs'
                                                        : 'text-slate-600 hover:bg-slate-100 hover:text-blue-600'
                                                    }
                          ${!isExpanded && !isMobileOpen ? 'justify-center px-0' : 'gap-3.5'}
                        `}
                                            >
                                                {/* Icon */}
                                                <div
                                                    className={`
                            shrink-0 flex items-center justify-center transition-colors duration-200
                            ${isActive ? "text-blue-600" : "text-slate-500 group-hover:text-blue-600"}
                          `}
                                                >
                                                    <Icon className="w-5 h-5 stroke-[1.8]" />
                                                </div>

                                                {/* Label */}
                                                <span
                                                    className={`
                            text-sm transition-all duration-300 whitespace-nowrap overflow-hidden
                            ${isExpanded || isMobileOpen
                                                            ? 'opacity-100 max-w-[170px]'
                                                            : 'opacity-0 max-w-0 pointer-events-none'
                                                        }
                          `}
                                                >
                                                    {item.label}
                                                </span>

                                                {/* Optional Active Route Indicator Dot / Subtle Arrow for submenus */}
                                                {isActive && (isExpanded || isMobileOpen) && (
                                                    <div className="ml-auto shrink-0 w-1.5 h-1.5 rounded-full bg-blue-600" />
                                                )}
                                            </Link>

                                            {/* Tooltip on Icon when Collapsed on Desktop */}
                                            {!isExpanded && !isMobileOpen && (
                                                <div
                                                    className="
                            absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5
                            bg-slate-900 text-white text-xs font-medium rounded-md shadow-md
                            whitespace-nowrap opacity-0 pointer-events-none group-hover/item:opacity-100
                            group-hover/item:pointer-events-auto transition-opacity duration-200 z-50
                          "
                                                    role="tooltip"
                                                >
                                                    {item.label}
                                                    {/* Tooltip arrow */}
                                                    <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-4 border-transparent border-r-slate-900" />
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
