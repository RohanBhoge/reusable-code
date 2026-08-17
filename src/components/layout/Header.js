"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  ChevronDown,
  User,
  Settings,
  UserCheck,
  LogOut,
  Menu,
  ChevronRight,
} from "lucide-react";
import { FLAT_SIDEBAR_MENU } from "@/constants/sidebarMenu";

/**
 * University Admin Portal - Reusable Navbar Component
 * Height: 72px
 * Features:
 * - Dynamic Page Title & Breadcrumbs based on route
 * - Mobile Menu Hamburger Toggle button
 * - Notifications Bell icon with unread badge/dot
 * - User Profile Avatar (Initial "AU") with name & role ("Administrator")
 * - Profile Dropdown with keyboard accessibility & click-outside close
 */
export default function Header({
  pageTitle,
  breadcrumbs,
  onToggleMobileSidebar,
}) {
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [hasUnreadNotification, setHasUnreadNotification] = useState(true);
  const profileRef = useRef(null);

  // Derive current page title dynamically from route if not explicitly passed
  const getCurrentPageTitle = () => {
    if (pageTitle) return pageTitle;
    const matchedItem = FLAT_SIDEBAR_MENU.find(
      (item) => item.path === pathname,
    );
    if (matchedItem) return matchedItem.label;
    if (pathname === "/" || pathname === "/dashboard") return "Dashboard";
    // Fallback formatting: /fees-finance -> Fees & Finance
    const formatted = pathname?.replace("/", "").replace("-", " ");
    return formatted
      ? formatted.charAt(0).toUpperCase() + formatted.slice(1)
      : "Examinations";
  };

  const currentTitle = getCurrentPageTitle();

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle Mobile Hamburger Click
  const handleToggleMobile = () => {
    if (onToggleMobileSidebar) {
      onToggleMobileSidebar();
    } else {
      window.dispatchEvent(new CustomEvent("toggle-mobile-sidebar"));
    }
  };

  return (
    <header
      className="sticky top-0 z-20 h-[72px] bg-white border-b border-gray-200 shadow-xs flex items-center justify-between px-4 sm:px-6 md:px-8 shrink-0"
      aria-label="Top Application Header"
    >
      {/* Left Section: Mobile Menu Toggle & Page Title / Breadcrumb */}
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={handleToggleMobile}
          className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 md:hidden focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          aria-label="Toggle Navigation Drawer"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Page Title & Breadcrumbs */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <Link
              href="/dashboard"
              className="hover:text-blue-600 transition-colors"
            >
              Admin
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className="text-slate-600 font-normal">{currentTitle}</span>
          </div>
          {/* <h1 className="text-lg sm:text-xl font-bold text-slate-800 tracking-tight leading-tight">
                        {currentTitle}
                    </h1> */}
        </div>
      </div>

      {/* Right Section: Notification Icon & User Profile Menu */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Notification Bell Icon */}
        <button
          className="relative p-2 rounded-full text-slate-600 hover:text-blue-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 active:scale-95"
          aria-label="Notifications"
          onClick={() => setHasUnreadNotification(false)}
        >
          <Bell className="w-5 h-5 stroke-[1.8]" />

          {/* Red Notification Badge / Dot */}
          {hasUnreadNotification && (
            <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 ring-2 ring-white" />
            </span>
          )}
        </button>

        {/* Vertical Divider */}
        <div className="h-7 w-[1px] bg-slate-200 hidden sm:block" />

        {/* Profile Dropdown Container */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen((prev) => !prev)}
            className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            aria-expanded={isProfileOpen}
            aria-haspopup="true"
            aria-label="User Profile Options"
          >
            {/* Avatar Circle with Initials AU */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#33557A] text-white flex items-center justify-center font-semibold text-sm shadow-xs shrink-0">
              AU
            </div>

            {/* Name & Role (Hidden on small screens) */}
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-sm font-semibold text-slate-800 leading-tight">
                Admin User
              </span>
              <span className="text-xs text-slate-500 font-normal">
                Administrator
              </span>
            </div>

            {/* Rotating Chevron Icon */}
            <ChevronDown
              className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
                isProfileOpen ? "rotate-180 text-blue-600" : ""
              }`}
            />
          </button>

          {/* Animated Profile Dropdown Menu */}
          {isProfileOpen && (
            <div
              className={`
                absolute right-0 mt-2 w-56 rounded-2xl bg-white shadow-xl border border-gray-100 py-2 z-50
                transition-all duration-200 transform origin-top-right animate-in fade-in slide-in-from-top-2
              `}
              role="menu"
              aria-orientation="vertical"
            >
              {/* Profile Card Header */}
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-slate-800">
                  Admin User
                </p>
                <p className="text-xs text-slate-500 truncate">
                  admin@university.edu
                </p>
                <span className="inline-block mt-1.5 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-blue-700 bg-blue-50 rounded-full">
                  Administrator
                </span>
              </div>

              {/* Menu Items */}
              <div className="py-1">
                <Link
                  href="/profile"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                  role="menuitem"
                >
                  <User className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                  <span>Profile</span>
                </Link>

                <Link
                  href="/account"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                  role="menuitem"
                >
                  <UserCheck className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                  <span>My Account</span>
                </Link>

                <Link
                  href="/settings"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                  role="menuitem"
                >
                  <Settings className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                  <span>Settings</span>
                </Link>
              </div>

              {/* Logout Item */}
              <div className="border-t border-gray-100 pt-1">
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    // Logout logic placeholder
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                  role="menuitem"
                >
                  <LogOut className="w-4 h-4 text-red-500" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
