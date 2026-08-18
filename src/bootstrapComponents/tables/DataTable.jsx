"use client";

import React, { useState, useMemo } from "react";
import Table from "./Table";
import Pagination from "./Pagination";

// Sample Columns Configuration
export const sampleColumns = [
  {
    key: "id",
    label: "ID",
    sortable: true,
    width: "100px",
    align: "center",
  },
  {
    key: "name",
    label: "Student",
    sortable: true,
    render: (value, row) => (
      <div className="d-flex align-items-center gap-2">
        <img
          src={row.avatar}
          alt={value}
          className="rounded-circle border"
          width="36"
          height="36"
        />
        <div>
          <div className="fw-semibold text-dark">{value}</div>
          <div className="text-muted small">{row.email}</div>
        </div>
      </div>
    ),
  },
  {
    key: "department",
    label: "Department",
    sortable: true,
  },
  {
    key: "gpa",
    label: "GPA",
    sortable: true,
    align: "right",
    render: (value) => (
      <span className="fw-semibold">{Number(value).toFixed(2)}</span>
    ),
  },
  {
    key: "status",
    label: "Status",
    sortable: true,
    align: "center",
    render: (status) => {
      const badgeStyle =
        status === "Active"
          ? "bg-success-subtle text-success border border-success-subtle"
          : status === "On Leave"
            ? "bg-warning-subtle text-warning border border-warning-subtle"
            : "bg-danger-subtle text-danger border border-danger-subtle";

      return <span className={`badge ${badgeStyle} px-2 py-1`}>{status}</span>;
    },
  },
  {
    key: "actions",
    label: "Action",
    align: "center",
    render: (_, row) => (
      <div className="btn-group btn-group-sm">
        <button
          className="btn btn-outline-primary"
          onClick={(e) => {
            e.stopPropagation();
            alert(`Editing ${row.name}`);
          }}
        >
          Edit
        </button>
      </div>
    ),
  },
];

// Sample Data Array (Unique IDs)
export const sampleData = Array.from({ length: 25 }, (_, index) => {
  const departments = [
    "Computer Science",
    "Electrical Eng.",
    "Mechanical Eng.",
    "Information Tech.",
  ];
  const statuses = ["Active", "On Leave", "Suspended"];
  const names = [
    "Aarav Sharma",
    "Ananya Patel",
    "Rohan Verma",
    "Priya Nair",
    "Karan Mehta",
  ];

  const name = names[index % names.length];
  const dept = departments[index % departments.length];
  const status = statuses[index % statuses.length];

  return {
    id: `STU-${101 + index}`,
    name: `${name} ${index + 1}`,
    email: `student${index + 1}@eduvanta.edu`,
    avatar: `https://i.pravatar.cc/150?img=${(index % 70) + 1}`,
    department: dept,
    gpa: (2.5 + (index % 15) * 0.1).toFixed(2),
    status: status,
  };
});

export default function DataTable({
  columns = sampleColumns,
  data = sampleData,
  loading = false,
  emptyMessage = "No data found",
  striped = false,
  hoverable = true,
  bordered = false,
  compact = false,
  stickyHeader = false,
  selectable = false,
  selectedRows,
  onSelectionChange,
  onRowClick,
  rowKey = "id",

  // Pagination Props
  currentPage: externalPage,
  totalPages: externalTotalPages,
  onPageChange: externalOnPageChange,
  totalItems: externalTotalItems,
  itemsPerPage: externalItemsPerPage = 10, // Default to 10 entries per page
  showItemsPerPage = true,
  itemsPerPageOptions = [5, 10, 20, 50],
  onItemsPerPageChange: externalOnItemsPerPageChange,
  showPagination = true,
  paginationSize = "md",

  // Custom styling props
  containerClassName = "",
  tableClassName = "",
  paginationClassName = "",
  ...rest
}) {
  // Internal pagination states if not controlled externally
  const [internalPage, setInternalPage] = useState(1);
  const [internalPerPage, setInternalPerPage] = useState(externalItemsPerPage);

  const currentPage = externalPage !== undefined ? externalPage : internalPage;
  const itemsPerPage = externalItemsPerPage ?? internalPerPage;

  const totalItems = externalTotalItems ?? data.length;
  const calculatedTotalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const totalPages = externalTotalPages ?? calculatedTotalPages;

  // Slice data for client-side pagination
  const paginatedData = useMemo(() => {
    // If controlled externally (e.g. server-side pagination), render full data array passed
    if (externalPage !== undefined && externalTotalPages !== undefined) {
      return data;
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  }, [data, currentPage, itemsPerPage, externalPage, externalTotalPages]);

  const handlePageChange = (newPage) => {
    if (externalOnPageChange) {
      externalOnPageChange(newPage);
    } else {
      setInternalPage(newPage);
    }
  };

  const handleItemsPerPageChange = (newPerPage) => {
    if (externalOnItemsPerPageChange) {
      externalOnItemsPerPageChange(newPerPage);
    } else {
      setInternalPerPage(newPerPage);
      setInternalPage(1); // Reset to page 1 on page size change
    }
  };

  return (
    <div
      className={`card border shadow-sm rounded-3 overflow-hidden ${containerClassName}`}
    >
      {/* Bootstrap Table */}
      <Table
        columns={columns}
        data={paginatedData}
        loading={loading}
        emptyMessage={emptyMessage}
        striped={striped}
        hoverable={hoverable}
        bordered={bordered}
        compact={compact}
        stickyHeader={stickyHeader}
        selectable={selectable}
        selectedRows={selectedRows}
        onSelectionChange={onSelectionChange}
        onRowClick={onRowClick}
        rowKey={rowKey}
        className="mb-0"
        tableClassName={tableClassName}
        {...rest}
      />

      {/* Bootstrap Pagination */}
      {showPagination && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          showItemsPerPage={showItemsPerPage}
          itemsPerPageOptions={itemsPerPageOptions}
          onItemsPerPageChange={handleItemsPerPageChange}
          size={paginationSize}
          className={paginationClassName}
          disabled={loading}
        />
      )}
    </div>
  );
}

// Re-export sub-components
export { Table, Pagination };
