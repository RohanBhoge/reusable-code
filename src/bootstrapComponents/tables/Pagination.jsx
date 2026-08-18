"use client";

import React from "react";

/**
 * Size preset mappings for Bootstrap components
 */
const SIZE_CONFIG = {
  sm: {
    container: "py-2 px-3 text-xs gap-2",
    btn: "btn-sm",
    select: "form-select-sm",
    textSize: "small",
  },
  md: {
    container: "py-3 px-4 text-sm gap-3",
    btn: "",
    select: "",
    textSize: "",
  },
  lg: {
    container: "py-4 px-5 text-base gap-4",
    btn: "btn-lg",
    select: "form-select-lg",
    textSize: "fs-6",
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
    range.push("left-ellipsis");
  }

  for (let i = start; i <= end; i++) {
    range.push(i);
  }

  if (end < totalPages - 1) {
    range.push("right-ellipsis");
  }

  range.push(totalPages);

  return range;
};

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
  size = "md",
  className = "",
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
      itemsInfoText = "Showing 0 entries";
    } else if (itemsPerPage) {
      const startItem = (validCurrentPage - 1) * itemsPerPage + 1;
      const endItem = Math.min(validCurrentPage * itemsPerPage, totalItems);
      itemsInfoText = `Showing ${startItem} to ${endItem} of ${totalItems} entries`;
    } else {
      itemsInfoText = `Total ${totalItems} entries`;
    }
  }

  const paginationRange = getPaginationRange(
    validCurrentPage,
    validTotalPages,
    maxVisiblePages,
  );

  return (
    <div
      className={`d-flex flex-column flex-sm-row align-items-center justify-content-between w-100 bg-white border-top border-light-subtle ${
        config.container
      } ${disabled ? "opacity-50 pointer-events-none" : ""} ${className}`}
      {...rest}
    >
      {/* Left Section: Info text & Items Per Page Selector */}
      <div className="d-flex flex-wrap align-items-center gap-3 mb-2 mb-sm-0">
        {itemsInfoText && (
          <span className={`text-muted fw-medium ${config.textSize}`}>
            {itemsInfoText}
          </span>
        )}

        {showItemsPerPage && onItemsPerPageChange && (
          <div className="d-flex align-items-center gap-2">
            <span className={`text-muted ${config.textSize}`}>Per page:</span>
            <select
              value={itemsPerPage || itemsPerPageOptions[0]}
              disabled={disabled}
              onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
              className={`form-select ${config.select} w-auto cursor-pointer`}
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

      {/* Right Section: Pagination Controls */}
      <nav aria-label="Table pagination">
        <ul className="pagination mb-0 flex-wrap gap-1">
          {/* First Page Button */}
          {showFirstLast && (
            <li className={`page-item ${isFirstPage ? "disabled" : ""}`}>
              <button
                type="button"
                className={`page-link rounded ${config.btn}`}
                disabled={isFirstPage}
                onClick={() => !isFirstPage && onPageChange?.(1)}
                aria-label="First Page"
                title="First Page"
              >
                &laquo;
              </button>
            </li>
          )}

          {/* Previous Page Button */}
          <li className={`page-item ${isFirstPage ? "disabled" : ""}`}>
            <button
              type="button"
              className={`page-link rounded ${config.btn}`}
              disabled={isFirstPage}
              onClick={() =>
                !isFirstPage && onPageChange?.(validCurrentPage - 1)
              }
              aria-label="Previous Page"
              title="Previous Page"
            >
              &lsaquo;
            </button>
          </li>

          {/* Page Number Buttons */}
          {showPageNumbers &&
            paginationRange.map((page, index) => {
              if (typeof page === "string") {
                return (
                  <li key={`${page}-${index}`} className="page-item disabled">
                    <span
                      className={`page-link border-0 text-muted ${config.btn}`}
                    >
                      &hellip;
                    </span>
                  </li>
                );
              }

              const isActive = page === validCurrentPage;

              return (
                <li
                  key={page}
                  className={`page-item ${isActive ? "active" : ""}`}
                >
                  <button
                    type="button"
                    disabled={disabled}
                    onClick={() => onPageChange?.(page)}
                    className={`page-link rounded ${config.btn}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {page}
                  </button>
                </li>
              );
            })}

          {/* Next Page Button */}
          <li className={`page-item ${isLastPage ? "disabled" : ""}`}>
            <button
              type="button"
              className={`page-link rounded ${config.btn}`}
              disabled={isLastPage}
              onClick={() =>
                !isLastPage && onPageChange?.(validCurrentPage + 1)
              }
              aria-label="Next Page"
              title="Next Page"
            >
              &rsaquo;
            </button>
          </li>

          {/* Last Page Button */}
          {showFirstLast && (
            <li className={`page-item ${isLastPage ? "disabled" : ""}`}>
              <button
                type="button"
                className={`page-link rounded ${config.btn}`}
                disabled={isLastPage}
                onClick={() => !isLastPage && onPageChange?.(validTotalPages)}
                aria-label="Last Page"
                title="Last Page"
              >
                &raquo;
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
