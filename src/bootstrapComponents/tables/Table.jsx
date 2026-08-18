"use client";

import React, { useState, useMemo } from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown, Inbox } from "lucide-react";

export default function Table({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = "No data found",
  striped = false,
  hoverable = true,
  bordered = false,
  compact = false,
  stickyHeader = false,
  selectable = false,
  selectedRows: externalSelectedRows,
  onSelectionChange,
  onRowClick,
  rowKey = "id",
  className = "",
  tableClassName = "",
  headerClassName = "",
  rowClassName,
  ...rest
}) {
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [internalSelectedKeys, setInternalSelectedKeys] = useState([]);

  const getRowId = (row, index) => {
    if (typeof rowKey === "function") return rowKey(row, index);
    if (row && row[rowKey] !== undefined) return row[rowKey];
    return index;
  };

  const selectedKeys =
    externalSelectedRows !== undefined
      ? externalSelectedRows.map((r) =>
          typeof r === "object" ? getRowId(r) : r,
        )
      : internalSelectedKeys;

  const handleSort = (key, sortable) => {
    if (!sortable) return;
    if (sortKey === key) {
      if (sortOrder === "asc") {
        setSortOrder("desc");
      } else {
        setSortKey(null);
        setSortOrder("asc");
      }
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortedData = useMemo(() => {
    if (!sortKey || !Array.isArray(data)) return data;

    return [...data].sort((a, b) => {
      let valA = a[sortKey];
      let valB = b[sortKey];

      if (valA === null || valA === undefined) return 1;
      if (valB === null || valB === undefined) return -1;

      if (typeof valA === "string") {
        valA = valA.toLowerCase();
        valB = String(valB).toLowerCase();
      }

      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortKey, sortOrder]);

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
      newSelectedIds.includes(getRowId(item, idx)),
    );

    if (externalSelectedRows === undefined) {
      setInternalSelectedKeys(newSelectedIds);
    }
    if (onSelectionChange) {
      onSelectionChange(newSelectedIds, newSelectedItems);
    }
  };

  const isAllSelected = data.length > 0 && selectedKeys.length === data.length;
  const isSomeSelected =
    selectedKeys.length > 0 && selectedKeys.length < data.length;

  const getAlignClass = (align) => {
    if (align === "center") return "text-center";
    if (align === "right") return "text-end";
    return "text-start";
  };

  return (
    <div className={`table-responsive w-100 ${className}`} {...rest}>
      <table
        className={`table align-middle ${striped ? "table-striped" : ""} ${
          hoverable ? "table-hover" : ""
        } ${bordered ? "table-bordered" : ""} ${
          compact ? "table-sm" : ""
        } ${tableClassName}`}
      >
        <thead className={`table-light ${stickyHeader ? "sticky-top" : ""}`}>
          <tr>
            {selectable && (
              <th scope="col" className="text-center" style={{ width: "40px" }}>
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(input) => {
                    if (input) input.indeterminate = isSomeSelected;
                  }}
                  onChange={handleSelectAll}
                  disabled={loading || data.length === 0}
                  className="form-check-input cursor-pointer"
                  aria-label="Select all rows"
                />
              </th>
            )}

            {columns.map((col) => {
              const isSorted = sortKey === col.key;
              return (
                <th
                  key={col.key}
                  scope="col"
                  style={col.width ? { width: col.width } : undefined}
                  onClick={() => handleSort(col.key, col.sortable)}
                  className={`${getAlignClass(col.align)} ${headerClassName} ${
                    col.sortable ? "cursor-pointer user-select-none" : ""
                  } ${col.className || ""}`}
                >
                  <div
                    className={`d-inline-flex align-items-center gap-1 ${
                      col.align === "right"
                        ? "justify-content-end"
                        : col.align === "center"
                          ? "justify-content-center"
                          : "justify-content-start"
                    }`}
                  >
                    <span>
                      {col.headerRender ? col.headerRender() : col.label}
                    </span>

                    {col.sortable && (
                      <span className="text-muted small">
                        {isSorted ? (
                          sortOrder === "asc" ? (
                            <ChevronUp size={16} className="text-primary" />
                          ) : (
                            <ChevronDown size={16} className="text-primary" />
                          )
                        ) : (
                          <ChevronsUpDown size={14} className="opacity-50" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {loading ? (
            Array.from({ length: 5 }).map((_, skeletonIdx) => (
              <tr key={skeletonIdx}>
                {selectable && (
                  <td className="text-center">
                    <div className="placeholder-glow">
                      <span className="placeholder col-12 rounded" />
                    </div>
                  </td>
                )}
                {columns.map((col, colIdx) => (
                  <td key={colIdx}>
                    <div className="placeholder-glow">
                      <span className="placeholder col-8 rounded" />
                    </div>
                  </td>
                ))}
              </tr>
            ))
          ) : sortedData.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                className="py-5 text-center text-muted"
              >
                <div className="d-flex flex-column align-items-center justify-content-center gap-2">
                  <div className="p-3 bg-light rounded-circle text-secondary">
                    <Inbox size={32} />
                  </div>
                  <p className="mb-0 fw-medium text-secondary">
                    {emptyMessage}
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            sortedData.map((row, index) => {
              const id = getRowId(row, index);
              const isSelected = selectedKeys.includes(id);

              const computedRowClass =
                typeof rowClassName === "function"
                  ? rowClassName(row, index)
                  : rowClassName || "";

              return (
                <tr
                  key={id}
                  onClick={(e) => onRowClick && onRowClick(row, index, e)}
                  className={`${isSelected ? "table-primary" : ""} ${
                    onRowClick ? "cursor-pointer" : ""
                  } ${computedRowClass}`}
                >
                  {selectable && (
                    <td className="text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => handleSelectRow(row, index, e)}
                        className="form-check-input cursor-pointer"
                        aria-label={`Select row ${index + 1}`}
                      />
                    </td>
                  )}

                  {columns.map((col) => {
                    const rawValue = row[col.key];
                    const cellContent = col.render
                      ? col.render(rawValue, row, index)
                      : rawValue !== undefined && rawValue !== null
                        ? String(rawValue)
                        : "-";

                    return (
                      <td
                        key={col.key}
                        className={`${getAlignClass(col.align)} ${
                          col.className || ""
                        }`}
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
