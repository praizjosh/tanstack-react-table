import { formatDate } from "@/lib/utils";
import { createColumnHelper } from "@tanstack/react-table";
import type { PersonType } from "../../lib/types";

const columnHelper = createColumnHelper<PersonType>();

// Remove the transformCell function entirely
// Replace the generic columns mapping with specific column definitions:
const columns1 = [
  // ID Column
  columnHelper.accessor("id", {
    id: "id",
    header: () => <span>ID</span>,
    cell: (info) => <span className="font-mono text-sm">{info.getValue()}</span>,
  }),

  // Start Date Column - with date formatting
  columnHelper.accessor("startDate", {
    id: "startDate",
    header: () => <span>Start Date</span>,
    cell: (info) => <span className="text-sm">{formatDate(info.getValue())}</span>,
  }),

  // Days Column
  columnHelper.accessor("days", {
    id: "days",
    header: () => <span>Days</span>,
    cell: (info) => <span className="font-medium">{info.getValue()}</span>,
  }),

  // Absence Type Column - with styling
  columnHelper.accessor("absenceType", {
    id: "absenceType",
    header: () => <span>Absence Type</span>,
    cell: (info) => {
      const value = info.getValue();
      const colorClass =
        value === "SICKNESS"
          ? "bg-red-100 text-red-800"
          : value === "ANNUAL_LEAVE"
          ? "bg-green-100 text-green-800"
          : "bg-gray-100 text-gray-800";
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>
          {value.replace(/_/g, " ")}
        </span>
      );
    },
  }),

  // Employee First Name
  columnHelper.accessor("employee.firstName", {
    id: "employee.firstName",
    header: () => <span>First Name</span>,
    cell: (info) => <span className="capitalize">{info.getValue()}</span>,
  }),

  // Employee Last Name
  columnHelper.accessor("employee.lastName", {
    id: "employee.lastName",
    header: () => <span>Last Name</span>,
    cell: (info) => <span className="capitalize">{info.getValue()}</span>,
  }),

  // Employee ID
  columnHelper.accessor("employee.id", {
    id: "employee.id",
    header: () => <span>Employee ID</span>,
    cell: (info) => (
      <span className="font-mono text-xs text-gray-600 max-w-[100px] truncate block">
        {info.getValue()}
      </span>
    ),
  }),

  // Approved Column - your original logic but targeted correctly
  columnHelper.accessor("approved", {
    id: "approved",
    header: () => <span>Status</span>,
    cell: (info) => {
      const isApproved = info.getValue();
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            isApproved ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {isApproved ? "✓ Approved" : "⏳ Pending"}
        </span>
      );
    },
  }),
];

console.log("columns1", columns1);

const columns = [
  // ID Column
  columnHelper.accessor("id", {
    id: "id",
    header: () => <span className="capitalize">ID</span>,
    cell: (info) => <span className="font-mono text-sm">{info.getValue()}</span>,
  }),

  // Start Date Column - Custom formatting
  columnHelper.accessor("startDate", {
    id: "startDate",
    header: () => <span className="capitalize">Start Date</span>,
    cell: (info) => <span className="text-sm">{formatDate(info.getValue())}</span>,
  }),

  // Days Column
  columnHelper.accessor("days", {
    id: "days",
    header: () => <span className="capitalize">Days</span>,
    cell: (info) => <span className="font-semibold text-center block">{info.getValue()}</span>,
  }),

  // Absence Type Column
  columnHelper.accessor("absenceType", {
    id: "absenceType",
    header: () => <span className="capitalize">Absence Type</span>,
    cell: (info) => {
      const value = info.getValue();
      const colorClass =
        value === "SICKNESS"
          ? "bg-red-100 text-red-800"
          : value === "ANNUAL_LEAVE"
          ? "bg-green-100 text-green-800"
          : "bg-gray-100 text-gray-800";
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>
          {value.replace(/_/g, " ")}
        </span>
      );
    },
  }),

  // Employee First Name
  columnHelper.accessor("employee.firstName", {
    id: "employee.firstName",
    header: () => <span className="capitalize">First Name</span>,
    cell: (info) => <span className="font-medium">{info.getValue()}</span>,
  }),

  // Employee Last Name
  columnHelper.accessor("employee.lastName", {
    id: "employee.lastName",
    header: () => <span className="capitalize">Last Name</span>,
    cell: (info) => <span className="font-medium">{info.getValue()}</span>,
  }),

  // Employee ID
  columnHelper.accessor("employee.id", {
    id: "employee.id",
    header: () => <span className="capitalize">Employee ID</span>,
    cell: (info) => (
      <span className="font-mono text-xs text-gray-500 truncate max-w-[100px] block">
        {info.getValue()}
      </span>
    ),
  }),

  // Approved Status
  columnHelper.accessor("approved", {
    id: "approved",
    header: () => <span className="capitalize">Approved</span>,
    cell: (info) => {
      const isApproved = info.getValue();
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            isApproved ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {isApproved ? "✓ Approved" : "⏳ Pending"}
        </span>
      );
    },
  }),
];

console.log("columns", typeof columns);
