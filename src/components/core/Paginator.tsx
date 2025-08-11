import type { PersonType } from "@/lib/types";
import type { Table } from "@tanstack/react-table";

type PaginatorProps = {
  methods: Table<PersonType>;
};

export default function Paginator({ methods }: PaginatorProps) {
  console.log("methods", methods.getState().sorting);
  return (
    <div className="flex items-center gap-2">
      <button
        className="border rounded p-1"
        onClick={() => methods.setPageIndex(0)}
        disabled={!methods.getCanPreviousPage()}
      >
        {"<<"}
      </button>
      <button
        className="border rounded p-1"
        onClick={() => methods.previousPage()}
        disabled={!methods.getCanPreviousPage()}
      >
        {"<"}
      </button>
      <button
        className="border rounded p-1"
        onClick={() => methods.nextPage()}
        disabled={!methods.getCanNextPage()}
      >
        {">"}
      </button>
      <button
        className="border rounded p-1"
        onClick={() => methods.setPageIndex(methods.getPageCount() - 1)}
        disabled={!methods.getCanNextPage()}
      >
        {">>"}
      </button>
      <span className="flex items-center gap-1">
        <div>Page</div>
        <strong>
          {methods.getState().pagination.pageIndex + 1} of {methods.getPageCount()}
        </strong>
      </span>
      <span className="flex items-center gap-1">
        | Go to page:
        <input
          type="number"
          min="1"
          max={methods.getPageCount()}
          defaultValue={methods.getState().pagination.pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            methods.setPageIndex(page);
          }}
          className="border p-1 rounded w-16"
        />
      </span>
      <select
        value={methods.getState().pagination.pageSize}
        onChange={(e) => {
          methods.setPageSize(Number(e.target.value));
        }}
      >
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </div>
  );
}
