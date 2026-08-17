'use client';

import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown, Inbox } from 'lucide-react';

/**
 * Reusable Universal Table Component for Eduvanta University ERP
 *
 * Supported Props:
 * - columns          : Array of column definitions [{ key, label, sortable, render, align, width }]
 * - data             : Array of row data objects
 * - loading          : Boolean for loading skeleton state
 * - emptyMessage     : String for empty state message (default: "No data found")
 * - striped          : Boolean for alternating row backgrounds
 * - hoverable        : Boolean for row hover effect (default: true)
 * - bordered         : Boolean for cell borders
 * - compact          : Boolean for smaller cell padding
 * - stickyHeader     : Boolean for sticky header
 * - selectable       : Boolean for row selection checkboxes
 * - selectedRows     : Array of selected row IDs or items
 * - onSelectionChange: Callback function (selectedIds, selectedItems) => void
 * - onRowClick       : Callback function (row, index, event) => void
 * - rowKey           : Key property or function to identify unique rows (default: 'id')
 * - className        : Extra classes for outer table wrapper container
 * - headerClassName  : Extra classes for header row / th elements
 * - rowClassName     : Extra classes (or function) for tr elements
 */
export default function Table({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = 'No data found',
  striped = false,
  hoverable = true,
  bordered = false,
  compact = false,
  stickyHeader = false,
  selectable = false,
  selectedRows: externalSelectedRows,
  onSelectionChange,
  onRowClick,
  rowKey = 'id',
  className = '',
  tableClassName = '',
  headerClassName = '',
  rowClassName,
  ...rest
}) {
  // Local state for sorting
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' | 'desc'

  // Local state for row selection if not externally controlled
  const [internalSelectedKeys, setInternalSelectedKeys] = useState([]);

  // Helper to extract row unique key
  const getRowId = (row, index) => {
    if (typeof rowKey === 'function') return rowKey(row, index);
    if (row && row[rowKey] !== undefined) return row[rowKey];
    return index;
  };

  const selectedKeys = externalSelectedRows !== undefined
    ? externalSelectedRows.map((r) => (typeof r === 'object' ? getRowId(r) : r))
    : internalSelectedKeys;

  // Handle column header click for sorting
  const handleSort = (key, sortable) => {
    if (!sortable) return;
    if (sortKey === key) {
      if (sortOrder === 'asc') {
        setSortOrder('desc');
      } else {
        setSortKey(null);
        setSortOrder('asc');
      }
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  // Sorted Data calculation
  const sortedData = useMemo(() => {
    if (!sortKey || !Array.isArray(data)) return data;

    return [...data].sort((a, b) => {
      let valA = a[sortKey];
      let valB = b[sortKey];

      if (valA === null || valA === undefined) return 1;
      if (valB === null || valB === undefined) return -1;

      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = String(valB).toLowerCase();
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortKey, sortOrder]);

  // Selection handlers
  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    let newSelectedIds = [];
    let newSelectedItems = [];

    if (isChecked) {
      newSelectedIds = data.map((row, idx) => getRowId(row, idx));
      newSelectedItems = [...data];
    }

    if (externalSelectedRows === undefined) {
      setInternalSelectedKeys(newSelectedIds);
    }
    if (onSelectionChange) {
      onSelectionChange(newSelectedIds, newSelectedItems);
    }
  };

  const handleSelectRow = (row, index, e) => {
    e.stopPropagation();
    const id = getRowId(row, index);
    const isSelected = selectedKeys.includes(id);

    let newSelectedIds = [];
    if (isSelected) {
      newSelectedIds = selectedKeys.filter((k) => k !== id);
    } else {
      newSelectedIds = [...selectedKeys, id];
    }

    const newSelectedItems = data.filter((item, idx) =>
      newSelectedIds.includes(getRowId(item, idx))
    );

    if (externalSelectedRows === undefined) {
      setInternalSelectedKeys(newSelectedIds);
    }
    if (onSelectionChange) {
      onSelectionChange(newSelectedIds, newSelectedItems);
    }
  };

  const isAllSelected =
    data.length > 0 && selectedKeys.length === data.length;
  const isSomeSelected =
    selectedKeys.length > 0 && selectedKeys.length < data.length;

  // Alignment classes
  const getAlignClass = (align) => {
    if (align === 'center') return 'text-center';
    if (align === 'right') return 'text-right';
    return 'text-left';
  };

  // Cell padding
  const paddingClass = compact ? 'py-2.5 px-3 text-xs' : 'py-3.5 px-4 text-sm';

  return (
    <div
      className={`w-full overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-xs ${className}`.trim()}
      {...rest}
    >
      <table className={`w-full border-collapse ${tableClassName}`.trim()}>
        {/* Table Header */}
        <thead className={`bg-slate-50/90 text-slate-700 font-semibold border-b border-gray-200 ${stickyHeader ? 'sticky top-0 z-10 backdrop-blur-xs' : ''}`}>
          <tr>
            {/* Checkbox Select All Column */}
            {selectable && (
              <th className={`w-12 text-center ${paddingClass} ${bordered ? 'border-r border-gray-200' : ''}`}>
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(input) => {
                    if (input) input.indeterminate = isSomeSelected;
                  }}
                  onChange={handleSelectAll}
                  disabled={loading || data.length === 0}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600 disabled:opacity-40"
                  aria-label="Select all rows"
                />
              </th>
            )}

            {/* Render Columns */}
            {columns.map((col) => {
              const isSorted = sortKey === col.key;
              return (
                <th
                  key={col.key}
                  style={col.width ? { width: col.width } : undefined}
                  onClick={() => handleSort(col.key, col.sortable)}
                  className={`
                    ${paddingClass} ${getAlignClass(col.align)} ${headerClassName}
                    ${col.sortable ? 'cursor-pointer select-none hover:bg-slate-100/80 transition-colors' : ''}
                    ${bordered ? 'border-r border-gray-200 last:border-r-0' : ''}
                    ${col.className || ''}
                  `.trim()}
                >
                  <div className={`inline-flex items-center gap-1.5 ${col.align === 'right' ? 'justify-end' : col.align === 'center' ? 'justify-center' : 'justify-start'}`}>
                    <span>{col.headerRender ? col.headerRender() : col.label}</span>

                    {/* Sort Icon Indicator */}
                    {col.sortable && (
                      <span className="text-slate-400">
                        {isSorted ? (
                          sortOrder === 'asc' ? (
                            <ChevronUp className="w-4 h-4 text-blue-600 stroke-[2.5]" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-blue-600 stroke-[2.5]" />
                          )
                        ) : (
                          <ChevronsUpDown className="w-3.5 h-3.5 opacity-60 hover:opacity-100" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-gray-100 text-slate-700">
          {/* Loading Skeleton State */}
          {loading ? (
            Array.from({ length: 5 }).map((_, skeletonIdx) => (
              <tr key={skeletonIdx} className="animate-pulse bg-white">
                {selectable && (
                  <td className={`text-center ${paddingClass} ${bordered ? 'border-r border-gray-200' : ''}`}>
                    <div className="w-4 h-4 bg-slate-200 rounded mx-auto" />
                  </td>
                )}
                {columns.map((col, colIdx) => (
                  <td
                    key={colIdx}
                    className={`${paddingClass} ${bordered ? 'border-r border-gray-200 last:border-r-0' : ''}`}
                  >
                    <div className="h-4 bg-slate-200 rounded-md w-3/4" />
                  </td>
                ))}
              </tr>
            ))
          ) : sortedData.length === 0 ? (
            /* Empty State */
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                className="py-12 px-4 text-center text-slate-400"
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="p-3 bg-slate-100 text-slate-400 rounded-full">
                    <Inbox className="w-8 h-8 stroke-[1.5]" />
                  </div>
                  <p className="text-sm font-medium text-slate-500">{emptyMessage}</p>
                </div>
              </td>
            </tr>
          ) : (
            /* Data Rows */
            sortedData.map((row, index) => {
              const id = getRowId(row, index);
              const isSelected = selectedKeys.includes(id);

              const computedRowClass = typeof rowClassName === 'function'
                ? rowClassName(row, index)
                : rowClassName || '';

              return (
                <tr
                  key={id}
                  onClick={(e) => onRowClick && onRowClick(row, index, e)}
                  className={`
                    transition-colors duration-150
                    ${striped && index % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'}
                    ${isSelected ? 'bg-blue-50/70 font-medium' : ''}
                    ${hoverable ? 'hover:bg-slate-100/70' : ''}
                    ${onRowClick ? 'cursor-pointer' : ''}
                    ${computedRowClass}
                  `.trim()}
                >
                  {/* Select Row Checkbox */}
                  {selectable && (
                    <td className={`text-center ${paddingClass} ${bordered ? 'border-r border-gray-200' : ''}`}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => handleSelectRow(row, index, e)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
                        aria-label={`Select row ${index + 1}`}
                      />
                    </td>
                  )}

                  {/* Columns Data Render */}
                  {columns.map((col) => {
                    const rawValue = row[col.key];
                    const cellContent = col.render
                      ? col.render(rawValue, row, index)
                      : rawValue !== undefined && rawValue !== null
                      ? String(rawValue)
                      : '-';

                    return (
                      <td
                        key={col.key}
                        className={`
                          ${paddingClass} ${getAlignClass(col.align)}
                          ${bordered ? 'border-r border-gray-200 last:border-r-0' : ''}
                          ${col.className || ''}
                        `.trim()}
                      >
                        {cellContent}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
