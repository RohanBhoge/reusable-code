'use client';

import React, { useState } from 'react';

/**
 * Reusable Universal Tabs Component for Eduvanta University ERP
 *
 * Supported Variants:
 * - pill      : Segmented control pill style with smooth soft white active tab (Default)
 * - underline : Classic border-bottom indicator tab style
 * - boxed     : Boxed segmented container with primary filled active tab
 *
 * Supported Sizes:
 * - sm : Small (px-3 py-1.5 text-xs)
 * - md : Medium (px-4 py-2 text-sm)
 * - lg : Large (px-5 py-2.5 text-base)
 */
const VARIANT_CONTAINER_MAP = {
  pill: 'inline-flex items-center p-1.5 bg-slate-100/90 rounded-full border border-gray-200/60 shadow-2xs',
  underline: 'flex items-center border-b border-gray-200 gap-2 sm:gap-6',
  boxed: 'inline-flex items-center p-1.5 bg-slate-100 rounded-xl border border-gray-200',
};

const SIZE_MAP = {
  sm: 'px-3 py-1.5 text-xs font-medium gap-1.5',
  md: 'px-4 py-2 text-sm font-medium gap-2',
  lg: 'px-5.5 py-2.5 text-base font-semibold gap-2.5',
};

export function Tabs({
  tabs = [],
  defaultTab,
  activeTab: externalActiveTab,
  onChange,
  variant = 'pill',
  size = 'md',
  fullWidth = false,
  loading = false,
  className = '',
  tabListClassName = '',
  tabClassName = '',
  activeTabClassName = '',
  contentClassName = '',
  ...rest
}) {
  // Determine initial active tab ID
  const firstTabId = tabs.length > 0 ? tabs[0].id : '';
  const initialTabId = defaultTab || firstTabId;

  // Local state for uncontrolled mode
  const [internalActiveId, setInternalActiveId] = useState(initialTabId);

  // Controlled vs Uncontrolled check
  const activeTabId = externalActiveTab !== undefined ? externalActiveTab : internalActiveId;

  // Handle Tab Click
  const handleTabClick = (tabId, disabled) => {
    if (disabled) return;
    if (externalActiveTab === undefined) {
      setInternalActiveId(tabId);
    }
    if (onChange) {
      onChange(tabId);
    }
  };

  // Keyboard Navigation (Left & Right Arrow Keys)
  const handleKeyDown = (e, index) => {
    if (tabs.length === 0) return;
    let nextIndex = index;

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextIndex = (index + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    }

    if (nextIndex !== index && !tabs[nextIndex].disabled) {
      handleTabClick(tabs[nextIndex].id, tabs[nextIndex].disabled);
    }
  };

  // Current active tab object & content
  const activeTabObject = tabs.find((t) => t.id === activeTabId) || tabs[0];
  const sizeStyles = SIZE_MAP[size] || SIZE_MAP.md;
  const containerVariantStyles = VARIANT_CONTAINER_MAP[variant] || VARIANT_CONTAINER_MAP.pill;

  // Get Tab Button Dynamic Classes
  const getTabClasses = (tab, isActive) => {
    const disabledClass = tab.disabled
      ? 'opacity-40 cursor-not-allowed pointer-events-none'
      : 'cursor-pointer';

    if (variant === 'underline') {
      const activeStateClass = isActive
        ? `text-blue-600 font-semibold border-b-2 border-blue-600 -mb-px ${activeTabClassName}`
        : 'text-slate-500 hover:text-slate-800 border-b-2 border-transparent -mb-px';
      return `${activeStateClass} ${disabledClass}`;
    }

    if (variant === 'boxed') {
      const activeStateClass = isActive
        ? `bg-blue-600 text-white font-medium rounded-lg shadow-xs ${activeTabClassName}`
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg';
      return `${activeStateClass} ${disabledClass}`;
    }

    // Pill variant (default)
    const activeStateClass = isActive
      ? `bg-white text-slate-900 font-semibold shadow-xs rounded-full ${activeTabClassName}`
      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 rounded-full';
    return `${activeStateClass} ${disabledClass}`;
  };

  return (
    <div className={`w-full flex flex-col ${className}`.trim()} {...rest}>
      {/* Tab Navigation List */}
      <div className={`${fullWidth ? 'w-full flex' : 'inline-block'} ${className}`}>
        <div
          role="tablist"
          className={`
            ${containerVariantStyles}
            ${fullWidth ? 'w-full flex justify-between' : ''}
            ${tabListClassName}
          `.trim().replace(/\s+/g, ' ')}
        >
          {tabs.map((tab, index) => {
            const isActive = tab.id === activeTabId;
            const iconLeft = tab.leftIcon || tab.icon;

            return (
              <button
                key={tab.id}
                role="tab"
                type="button"
                id={`tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`tabpanel-${tab.id}`}
                aria-disabled={tab.disabled}
                tabIndex={isActive ? 0 : -1}
                onClick={() => handleTabClick(tab.id, tab.disabled)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`
                  inline-flex items-center justify-center transition-all duration-200 select-none outline-none cursor-pointer
                  ${fullWidth ? 'flex-1' : ''}
                  ${sizeStyles}
                  ${getTabClasses(tab, isActive)}
                  ${tabClassName}
                `.trim().replace(/\s+/g, ' ')}
              >
                {/* Left Icon */}
                {iconLeft && (
                  <span className="shrink-0 inline-flex items-center justify-center">
                    {iconLeft}
                  </span>
                )}

                {/* Label Text */}
                <span>{tab.label}</span>

                {/* Right Icon */}
                {tab.rightIcon && (
                  <span className="shrink-0 inline-flex items-center justify-center">
                    {tab.rightIcon}
                  </span>
                )}

                {/* Optional Badge Pill */}
                {tab.badge && (
                  <span className="ml-1 shrink-0 inline-flex items-center">
                    {typeof tab.badge === 'string' || typeof tab.badge === 'number' ? (
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        isActive ? 'bg-blue-50 text-blue-700' : 'bg-slate-200/70 text-slate-700'
                      }`}>
                        {tab.badge}
                      </span>
                    ) : (
                      tab.badge
                    )}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Panel Content Body */}
      {activeTabObject && (
        <div
          role="tabpanel"
          id={`tabpanel-${activeTabObject.id}`}
          aria-labelledby={`tab-${activeTabObject.id}`}
          className={`mt-4 ${contentClassName}`.trim()}
        >
          {loading ? (
            <div className="p-6 bg-white rounded-2xl border border-gray-200 animate-pulse space-y-3">
              <div className="h-5 bg-slate-200 rounded-md w-1/3" />
              <div className="h-4 bg-slate-200 rounded-md w-3/4" />
              <div className="h-4 bg-slate-200 rounded-md w-1/2" />
            </div>
          ) : (
            activeTabObject.content
          )}
        </div>
      )}
    </div>
  );
}

export default Tabs;
