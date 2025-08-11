export type AbsenceType = "SICKNESS" | "ANNUAL_LEAVE" | "UNPAID_LEAVE";

//TData
export type PersonType = {
  id: number;
  startDate: string;
  days: number;
  absenceType: AbsenceType;
  employee: {
    firstName: string;
    lastName: string;
    id: string;
  };
  approved: boolean;
};

// TColumnHeader
export type ColumnHeaderType =
  | keyof PersonType
  | "employee.firstName"
  | "employee.lastName"
  | "employee.id";

export type CellConfigType = {
  type: "id" | "approved" | "date" | "absenceType" | "employeeId" | "name" | "default";
  className?: string;
  format?: (value: string) => string;
};

// Updated transformCell function
// Define interfaces for better type safety
export interface CellInfoType<T = unknown> {
  getValue: () => T;
  column: {
    id: string;
  };
  // Include other properties that might be used in the future
}

// pagination
export type PaginationType = {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
};

export type PaginationState = {
  pageIndex: number;
  pageSize: number;
};

export type PaginationTableState = {
  pagination: PaginationState;
};

export type PaginationInitialTableState = {
  pagination?: Partial<PaginationState>;
};

// sorting
type ColumnSort = {
  id: string;
  desc: boolean;
};
export type SortingState = ColumnSort[];
