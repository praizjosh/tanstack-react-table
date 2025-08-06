import { formatDate } from "@/lib/utils";
import type { ReactNode } from "react";
import type { CellInfoType } from "../types";

// Cell Renderer Factory Functions
const createStatusCell = (info: CellInfoType) => {
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

const createDateCell = (info: CellInfoType): ReactNode => (
  <span className="text-sm">{formatDate(String(info.getValue()))}</span>
);

const createAbsenceTypeCell = (info: CellInfoType): ReactNode => {
  const value = info.getValue();
  const colorClass =
    value === "SICKNESS"
      ? "bg-red-100 text-red-800"
      : value === "ANNUAL_LEAVE"
      ? "bg-green-100 text-green-800"
      : "bg-gray-100 text-gray-800";
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>
      {String(value).replace(/_/g, " ")}
    </span>
  );
};

const createEmployeeIdCell = (info: CellInfoType) => (
  <span className="font-mono text-xs text-gray-600 max-w-[100px] truncate block">
    {String(info.getValue())}
  </span>
);

const createNameCell = (info: CellInfoType) => (
  <span className="capitalize font-medium">{String(info.getValue())}</span>
);

const createDefaultCell = (info: CellInfoType) => info.getValue();

// Cell renderer mapping
const cellRendererMap: Record<string, (info: CellInfoType) => ReactNode> = {
  approved: createStatusCell,
  startDate: createDateCell,
  absenceType: createAbsenceTypeCell,
  "employee.id": createEmployeeIdCell,
  "employee.firstName": createNameCell,
  "employee.lastName": createNameCell,
  // Add more mappings as needed
};

// Updated transformCell function
const transformCellX = (info: CellInfoType) => {
  const columnId = info.column.id;
  const renderer = cellRendererMap[columnId];

  if (renderer) {
    return renderer(info);
  }

  return createDefaultCell(info);
};

export default transformCellX;
