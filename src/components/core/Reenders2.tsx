// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { COLUMN_HEADER_LIST } from "@/lib/defaultData";
import type { PersonType } from "@/lib/types";
import { formatDate, transformCamelCaseToSpaces } from "@/lib/utils";
import { createColumnHelper } from "@tanstack/react-table";

// Cell Renderer Factory Functions
const createStatusCell = (info) => {
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
};

const createDateCell = (info) => <span className="text-sm">{formatDate(info.getValue())}</span>;

const createAbsenceTypeCell = (info) => {
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
};

const createEmployeeIdCell = (info) => (
  <span className="font-mono text-xs text-gray-600 max-w-[100px] truncate block">
    {info.getValue()}
  </span>
);

const createNameCell = (info) => <span className="capitalize font-medium">{info.getValue()}</span>;

const createDefaultCell = (info) => info.getValue();

// Cell renderer mapping
const cellRendererMap: Record<string, (info) => React.ReactNode> = {
  approved: createStatusCell,
  startDate: createDateCell,
  absenceType: createAbsenceTypeCell,
  "employee.id": createEmployeeIdCell,
  "employee.firstName": createNameCell,
  "employee.lastName": createNameCell,
  // Add more mappings as needed
};

// Updated transformCell function
const transformCell = (info) => {
  const columnId = info.column.id;
  const renderer = cellRendererMap[columnId];

  if (renderer) {
    return renderer(info);
  }

  return createDefaultCell(info);
};

// ...existing code remains the same...
const columnHelper = createColumnHelper<PersonType>();

const columns = COLUMN_HEADER_LIST.map((columnName) => {
  return columnHelper.accessor(columnName, {
    id: columnName,
    cell: (info) => transformCell(info),
    header: () => <span className="capitalize">{transformCamelCaseToSpaces(columnName)}</span>,
    footer: (props) => props.column.id,
  });
});

console.log("columns", columns);

// ...rest of your component remains unchanged...

// Advanced Cell Renderer Factory
type CellConfig = {
  type: "status" | "date" | "absenceType" | "employeeId" | "name" | "default";
  className?: string;
  format?: (value) => string;
};

const colorClass =
  value === "SICKNESS"
    ? "bg-red-100 text-red-800"
    : value === "ANNUAL_LEAVE"
    ? "bg-green-100 text-green-800"
    : "bg-gray-100 text-gray-800";

const createCellRenderer = (config: CellConfig) => {
  return (info) => {
    const value = info.getValue();

    switch (config.type) {
      case "status":
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              value ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {value ? "✓ Approved" : "⏳ Pending"}
          </span>
        );

      case "date":
        return <span className={`text-sm ${config.className || ""}`}>{formatDate(value)}</span>;

      case "absenceType":
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>
            {value.replace(/_/g, " ")}
          </span>
        );

      case "employeeId":
        return (
          <span className="font-mono text-xs text-gray-600 max-w-[100px] truncate block">
            {value}
          </span>
        );

      case "name":
        return <span className={`capitalize font-medium ${config.className || ""}`}>{value}</span>;

      default:
        return config.format ? config.format(value) : value;
    }
  };
};

// Column configuration mapping
const columnConfigs: Record<string, CellConfig> = {
  approved: { type: "status" },
  startDate: { type: "date" },
  absenceType: { type: "absenceType" },
  "employee.id": { type: "employeeId" },
  "employee.firstName": { type: "name" },
  "employee.lastName": { type: "name" },
  days: {
    type: "default",
    format: (value) => `${value} day${value !== 1 ? "s" : ""}`,
    className: "font-medium",
  },
};

// Updated transformCell function
const transformCell2 = (info) => {
  const columnId = info.column.id;
  const config = columnConfigs[columnId] || { type: "default" };
  const renderer = createCellRenderer(config);

  return renderer(info);
};

console.log(typeof transformCell2, "transformCell2 function type");
