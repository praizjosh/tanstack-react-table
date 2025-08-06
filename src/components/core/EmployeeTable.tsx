import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { COLUMN_HEADER_LIST, personObj } from "@/lib/defaultData";
import { useMemo } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import type { PersonType } from "../../lib/types";
import { transformCamelCaseToSpaces } from "@/lib/utils";

type EmployeeTableProps = {
  queryData?: PersonType[];
};

const columnHelper = createColumnHelper<PersonType>();

const columns = COLUMN_HEADER_LIST.map((columnName) => {
  return columnHelper.accessor(columnName, {
    id: columnName,
    cell: (info) => info.getValue(),
    header: () => <span className="capitalize">{transformCamelCaseToSpaces(columnName)}</span>,
    footer: (props) => props.column.id,
  });
});

export default function EmployeeTable({ queryData }: EmployeeTableProps) {
  const fallbackData = useMemo(() => personObj, []);
  const defaultColumns = useMemo(() => columns, []);

  const table = useReactTable<PersonType>({
    data: queryData ?? fallbackData,
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel<PersonType>(),
  });

  return (
    <div className="rounded-lg border border-border mt-8 overflow-hidden">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="bg-gray-400">
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              className="cursor-pointer hover:bg-gray-400/25"
              onClick={() => console.log(`Row ID: ${row.id}`)}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="border">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
