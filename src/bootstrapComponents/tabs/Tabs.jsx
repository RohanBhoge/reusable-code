"use client";

import React, { useState } from "react";

/**
 * Size mappings for Bootstrap utility padding and typography
 */
const SIZE_MAP = {
  sm: "px-2.5 py-1 text-xs gap-1.5",
  md: "px-3 py-2 small gap-2",
  lg: "px-4 py-2.5 fs-6 gap-2.5",
};

/**
 * Container variant mappings for Bootstrap 5
 */
const VARIANT_CONTAINER_MAP = {
  pill: "d-inline-flex align-items-center p-1 bg-light border rounded-pill shadow-sm",
  underline: "d-flex align-items-center border-bottom gap-2 gap-sm-4",
  boxed: "d-inline-flex align-items-center p-1 bg-light border rounded-3",
};

export function Tabs({
  tabs = [],
  defaultTab,
  activeTab: externalActiveTab,
  onChange,
  variant = "pill",
  size = "md",
  fullWidth = false,
  loading = false,
  className = "",
  tabListClassName = "",
  tabClassName = "",
  activeTabClassName = "",
  contentClassName = "",
  ...rest
}) {
  // Determine initial active tab ID
  const firstTabId = tabs.length > 0 ? tabs[0].id : "";
  const initialTabId = defaultTab || firstTabId;

  // Local state for uncontrolled mode
  const [internalActiveId, setInternalActiveId] = useState(initialTabId);

  // Controlled vs Uncontrolled check
  const activeTabId =
    externalActiveTab !== undefined ? externalActiveTab : internalActiveId;

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

    if (e.key === "ArrowRight") {
      e.preventDefault();
      nextIndex = (index + 1) % tabs.length;
    } else if (e.key === "ArrowLeft") {
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
  const containerVariantStyles =
    VARIANT_CONTAINER_MAP[variant] || VARIANT_CONTAINER_MAP.pill;

  // Get Tab Button Dynamic Classes
  const getTabClasses = (tab, isActive) => {
    const disabledClass = tab.disabled
      ? "opacity-50 pe-none cursor-not-allowed"
      : "cursor-pointer";

    if (variant === "underline") {
      const activeStateClass = isActive
        ? `text-primary fw-semibold border-bottom border-2 border-primary ${activeTabClassName}`
        : "text-secondary border-bottom border-2 border-transparent";
      return `${activeStateClass} ${disabledClass}`;
    }

    if (variant === "boxed") {
      const activeStateClass = isActive
        ? `bg-primary text-white fw-medium rounded-2 shadow-sm ${activeTabClassName}`
        : "text-secondary rounded-2";
      return `${activeStateClass} ${disabledClass}`;
    }

    // Pill variant (default)
    const activeStateClass = isActive
      ? `bg-white text-dark fw-semibold shadow-sm rounded-pill ${activeTabClassName}`
      : "text-secondary rounded-pill";
    return `${activeStateClass} ${disabledClass}`;
  };

  return (
    <div className={`w-100 d-flex flex-column ${className}`.trim()} {...rest}>
      {/* Tab Navigation List */}
      <div className={`${fullWidth ? "w-100 d-flex" : "d-inline-block"}`}>
        <div
          role="tablist"
          className={`
            ${containerVariantStyles}
            ${fullWidth ? "w-100 d-flex justify-content-between" : ""}
            ${tabListClassName}
          `
            .trim()
            .replace(/\s+/g, " ")}
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
                  btn border-0 d-inline-flex align-items-center justify-content-center text-nowrap user-select-none
                  ${fullWidth ? "flex-fill" : ""}
                  ${sizeStyles}
                  ${getTabClasses(tab, isActive)}
                  ${tabClassName}
                `
                  .trim()
                  .replace(/\s+/g, " ")}
              >
                {/* Left Icon */}
                {iconLeft && (
                  <span className="flex-shrink-0 d-inline-flex align-items-center justify-content-center">
                    {iconLeft}
                  </span>
                )}

                {/* Label Text */}
                <span>{tab.label}</span>

                {/* Right Icon */}
                {tab.rightIcon && (
                  <span className="flex-shrink-0 d-inline-flex align-items-center justify-content-center">
                    {tab.rightIcon}
                  </span>
                )}

                {/* Optional Badge Pill */}
                {tab.badge && (
                  <span className="ms-1 flex-shrink-0 d-inline-flex align-items-center">
                    {typeof tab.badge === "string" ||
                    typeof tab.badge === "number" ? (
                      <span
                        className={`badge rounded-pill ${
                          isActive
                            ? variant === "boxed"
                              ? "bg-white text-primary"
                              : "bg-primary-subtle text-primary"
                            : "bg-secondary-subtle text-secondary"
                        }`}
                      >
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
          className={`mt-3 ${contentClassName}`.trim()}
        >
          {loading ? (
            <div className="p-4 bg-white rounded-3 border placeholder-glow d-flex flex-column gap-2">
              <span
                className="placeholder col-4 rounded"
                style={{ height: "20px" }}
              />
              <span
                className="placeholder col-8 rounded"
                style={{ height: "16px" }}
              />
              <span
                className="placeholder col-6 rounded"
                style={{ height: "16px" }}
              />
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
