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
