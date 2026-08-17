"use client";

import React from 'react';

/**
 * Size preset mappings for buttons and controls (White Theme)
 */

const SIZE_CONFIG = {
  sm: {
    container: 'py-2.5 px-3 text-xs gap-3',
    button: 'h-8 min-w-[32px] px-2 text-xs rounded-lg',
    iconBtn: 'h-8 w-8 text-xs rounded-lg',
    select: 'h-8 px-2 text-xs rounded-lg',
    text: 'text-xs text-slate-500',
  },
  md: {
    container: 'py-3.5 px-4 text-sm gap-4',
    button: 'h-9 min-w-[36px] px-2.5 text-sm rounded-lg',
    iconBtn: 'h-9 w-9 text-sm rounded-lg',
    select: 'h-9 px-2.5 text-sm rounded-lg',
    text: 'text-sm text-slate-600',
  },
  lg: {
    container: 'py-4 px-5 text-base gap-5',
    button: 'h-10 min-w-[40px] px-3 text-base rounded-xl',
    iconBtn: 'h-10 w-10 text-base rounded-xl',
    select: 'h-10 px-3 text-base rounded-xl',
    text: 'text-base text-slate-600',
  },
};

/**
 * Helper to compute visible page numbers with smart ellipsis
 */
const getPaginationRange = (currentPage, totalPages, maxVisible = 5) => {
  if (!totalPages || totalPages <= 0) return [];
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const half = Math.floor((maxVisible - 2) / 2);
  let start = Math.max(2, currentPage - half);
  let end = Math.min(totalPages - 1, currentPage + half);

  if (currentPage <= half + 2) {
    end = Math.min(totalPages - 1, 1 + (maxVisible - 2));
  } else if (currentPage >= totalPages - (half + 1)) {
    start = Math.max(2, totalPages - (maxVisible - 2));
  }

  const range = [1];

  if (start > 2) {
    range.push('left-ellipsis');
  }

  for (let i = start; i <= end; i++) {
    range.push(i);
  }

  if (end < totalPages - 1) {
    range.push('right-ellipsis');
  }

  range.push(totalPages);

  return range;
};

/**
 * Reusable & Responsive Pagination Component (White Theme)
 */
export const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  totalItems,
  itemsPerPage,
  showItemsPerPage = false,
  itemsPerPageOptions = [5, 10, 20, 50],
  onItemsPerPageChange,
  showPageNumbers = true,
  showFirstLast = true,
  maxVisiblePages = 5,
  size = 'md',
  className = '',
  disabled = false,
  ...rest
}) => {
  const config = SIZE_CONFIG[size] || SIZE_CONFIG.md;

  const validTotalPages = Math.max(1, totalPages);
  const validCurrentPage = Math.min(Math.max(1, currentPage), validTotalPages);

  const isFirstPage = validCurrentPage <= 1 || disabled;
  const isLastPage = validCurrentPage >= validTotalPages || disabled;

  let itemsInfoText = null;
  if (totalItems !== undefined && totalItems !== null) {
    if (totalItems === 0) {
      itemsInfoText = 'Showing 0 entries';
    } else if (itemsPerPage) {
      const startItem = (validCurrentPage - 1) * itemsPerPage + 1;
      const endItem = Math.min(validCurrentPage * itemsPerPage, totalItems);
      itemsInfoText = `Showing ${startItem} to ${endItem} of ${totalItems} entries`;
    } else {
      itemsInfoText = `Total ${totalItems} entries`;
    }
  }

  const paginationRange = getPaginationRange(validCurrentPage, validTotalPages, maxVisiblePages);

  return (
    <div
      className={`
        flex flex-col sm:flex-row items-center justify-between w-full
        bg-white border-t border-slate-200
        ${config.container}
        ${disabled ? 'opacity-60 pointer-events-none' : ''}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      {...rest}
    >
      {/* Left Section: Info text & Items Per Page Selector */}
      <div className="flex flex-wrap items-center gap-4">
        {itemsInfoText && (
          <span className={`font-medium ${config.text}`}>
            {itemsInfoText}
          </span>
        )}

        {showItemsPerPage && onItemsPerPageChange && (
          <div className="flex items-center gap-2">
            <span className={config.text}>Per page:</span>
            <select
              value={itemsPerPage || itemsPerPageOptions[0]}
              disabled={disabled}
              onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
              className={`
                bg-slate-50 text-slate-700
                border border-slate-200 font-medium
                focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500
                cursor-pointer transition-colors ${config.select}
              `.trim().replace(/\s+/g, ' ')}
            >
              {itemsPerPageOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Right Section: Pagination Navigation Controls */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {/* First Page Button */}
        {showFirstLast && (
          <button
            type="button"
            disabled={isFirstPage}
            onClick={() => !isFirstPage && onPageChange?.(1)}
            aria-label="Go to first page"
            title="First Page"
            className={`
              flex items-center justify-center border font-medium transition-all
              ${config.iconBtn}
              ${
                isFirstPage
                  ? 'border-slate-100 text-slate-300 cursor-not-allowed bg-slate-50/50'
                  : 'border-slate-200 text-slate-600 bg-white hover:bg-slate-50 cursor-pointer'
              }
            `.trim().replace(/\s+/g, ' ')}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Previous Page Button */}
        <button
          type="button"
          disabled={isFirstPage}
          onClick={() => !isFirstPage && onPageChange?.(validCurrentPage - 1)}
          aria-label="Go to previous page"
          title="Previous Page"
          className={`
            flex items-center justify-center border font-medium transition-all
            ${config.iconBtn}
            ${
              isFirstPage
                ? 'border-slate-100 text-slate-300 cursor-not-allowed bg-slate-50/50'
                : 'border-slate-200 text-slate-600 bg-white hover:bg-slate-50 cursor-pointer'
            }
          `.trim().replace(/\s+/g, ' ')}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Page Number Buttons */}
        {showPageNumbers &&
          paginationRange.map((page, index) => {
            if (typeof page === 'string') {
              return (
                <span
                  key={`${page}-${index}`}
                  className={`flex items-center justify-center text-slate-400 font-bold select-none ${config.iconBtn}`}
                >
                  •••
                </span>
              );
            }

            const isActive = page === validCurrentPage;

            return (
              <button
                key={page}
                type="button"
                disabled={disabled}
                onClick={() => onPageChange?.(page)}
                aria-current={isActive ? 'page' : undefined}
                className={`
                  flex items-center justify-center border font-medium transition-all cursor-pointer
                  ${config.button}
                  ${
                    isActive
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs font-semibold'
                      : 'border-slate-200 text-slate-700 bg-white hover:bg-slate-50'
                  }
                `.trim().replace(/\s+/g, ' ')}
              >
                {page}
              </button>
            );
          })}

        {/* Next Page Button */}
        <button
          type="button"
          disabled={isLastPage}
          onClick={() => !isLastPage && onPageChange?.(validCurrentPage + 1)}
          aria-label="Go to next page"
          title="Next Page"
          className={`
            flex items-center justify-center border font-medium transition-all
            ${config.iconBtn}
            ${
              isLastPage
                ? 'border-slate-100 text-slate-300 cursor-not-allowed bg-slate-50/50'
                : 'border-slate-200 text-slate-600 bg-white hover:bg-slate-50 cursor-pointer'
            }
          `.trim().replace(/\s+/g, ' ')}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Last Page Button */}
        {showFirstLast && (
          <button
            type="button"
            disabled={isLastPage}
            onClick={() => !isLastPage && onPageChange?.(validTotalPages)}
            aria-label="Go to last page"
            title="Last Page"
            className={`
              flex items-center justify-center border font-medium transition-all
              ${config.iconBtn}
              ${
                isLastPage
                  ? 'border-slate-100 text-slate-300 cursor-not-allowed bg-slate-50/50'
                  : 'border-slate-200 text-slate-600 bg-white hover:bg-slate-50 cursor-pointer'
              }
            `.trim().replace(/\s+/g, ' ')}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
