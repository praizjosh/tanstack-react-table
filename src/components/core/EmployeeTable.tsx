import { personObj } from "@/lib/defaultData";
import { cn } from "@/lib/utils";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import type { PaginationState, PersonType } from "../../lib/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { ArrowDownUp } from "lucide-react";
import Paginator from "./Paginator";
import { Input } from "../ui/input";

type EmployeeTableProps = {
  queryData?: PersonType[];
  columns;
};

export default function EmployeeTable({ queryData, columns }: EmployeeTableProps) {
  const fallbackData = useMemo(() => personObj, []);
  const defaultColumns = useMemo(() => columns, [columns]);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable<PersonType>({
    data: queryData ?? fallbackData,
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel<PersonType>(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(), //load client-side pagination code
    onPaginationChange: setPagination,
    //no need to pass pageCount or rowCount with client-side pagination as it is calculated automatically
    state: {
      pagination,
    },
  });

  return (
    <div className="rounded-lg p-2 overflow-hidden space-y-4">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search absences..."
          className="p-2 border border-gray-300 rounded"
        />

        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
          🔍
        </span>
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="bg-gray-200">
                  <div className={cn("inline-flex gap-2 justify-between w-full items-center")}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}

                    <ArrowDownUp
                      className={cn("size-3.5", {
                        "cursor-pointer select-none": header.column.getCanSort(),
                        "invisible cursor-default": !header.column.getCanSort(),
                      })}
                      onClick={header.column.getToggleSortingHandler()}
                    />
                  </div>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              className="cursor-pointer hover:bg-gray-400/75"
              onClick={() => console.log(`Row ID: ${row.id}`)}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="border text-start">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>

        {/* <TableFooter>
          {table.getFooterGroups().map((footerGroup) => (
            <TableRow key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <TableHead key={header.id} className="bg-gray-200">
                  {flexRender(header.column.columnDef.footer, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableFooter> */}
      </Table>

      <Paginator methods={table} />
    </div>
  );
}
