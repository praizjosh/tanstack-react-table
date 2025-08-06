import type { CellConfigType, CellInfoType } from "../types";
import { cn, formatDate } from "../utils";

const createCellRenderer = (config: CellConfigType) => {
  return (info: CellInfoType) => {
    const value = info.getValue();

    const colorClass =
      value === "SICKNESS"
        ? "bg-red-100 text-red-700"
        : value === "ANNUAL_LEAVE"
        ? "bg-purple-100 text-purple-800"
        : "bg-gray-100 text-gray-800";

    switch (config.type) {
      case "approved":
        return (
          <span
            className={cn(`px-2 py-1 capitalize rounded-full text-xs font-medium`, {
              "bg-green-100 text-green-800": value,
              "bg-yellow-100 text-yellow-800": !value,
            })}
          >
            {value ? "✓ Approved" : "⏳ Pending"}
          </span>
        );

      case "date":
        return (
          <span className={`text-sm ${config.className || ""}`}>{formatDate(String(value))}</span>
        );

      case "absenceType":
        return (
          <span className={cn(`px-2 py-1 capitalize rounded-full text-xs font-medium`, colorClass)}>
            {String(value).replace(/_/g, " ").toLocaleLowerCase()}
          </span>
        );

      case "employeeId":
        return (
          <span className="font-mono text-xs text-gray-600 max-w-[100px] truncate block">
            {String(value)}
          </span>
        );

      case "name":
        return (
          <span className={`capitalize font-medium ${config.className || ""}`}>
            {String(value)}
          </span>
        );

      default:
        return config.format ? config.format(String(value)) : value;
    }
  };
};

// Column configuration mapping
const columnConfigs: Record<string, CellConfigType> = {
  id: { type: "id" },
  approved: { type: "approved" },
  startDate: { type: "date" },
  absenceType: { type: "absenceType" },
  "employee.id": { type: "employeeId" },
  "employee.firstName": { type: "name" },
  "employee.lastName": { type: "name" },
  days: {
    type: "default",
    format: (value) => `${value} day${Number(value) !== 1 ? "s" : ""}`,
    className: "font-medium",
  },
};

export default function transformCell(info: CellInfoType) {
  const columnId = info.column.id;
  const config = columnConfigs[columnId] || { type: "default" };
  const renderer = createCellRenderer(config);

  return renderer(info);
}
