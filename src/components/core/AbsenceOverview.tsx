import EmployeeTable from "@/components/core/EmployeeTable";
import { useQuery } from "@tanstack/react-query";
import getAbsences from "../../lib/helpers/getAbsences";
import { transformCamelCaseToSpaces } from "@/lib/utils";
import transformCell from "@/lib/helpers/transformCell";
import { COLUMN_HEADER_LIST } from "@/lib/defaultData";
import { createColumnHelper } from "@tanstack/react-table";
import type { PersonType } from "@/lib/types";

export default function AbsenceOverview() {
  const queryData = useQuery({
    queryKey: ["absences"],
    queryFn: getAbsences,
    refetchOnWindowFocus: false,
  });

  if (queryData.isLoading) {
    return <div>Loading...</div>;
  }

  if (queryData.isError) {
    return <div>Error: {queryData.error.message}</div>;
  }

  const columnHelper = createColumnHelper<PersonType>();

  const columns = COLUMN_HEADER_LIST.map((columnName) => {
    console.log("columnName", columnName);
    return columnHelper.accessor(columnName, {
      id: columnName,
      // cell: (info) => info.getValue(),
      // size: 24, // size of the column in pixels
      // enableHiding: false, // disable hiding for this column
      cell: (info) => transformCell(info),
      // cell: (info) => transformCellX(info),
      header: () => <span className="capitalize">{transformCamelCaseToSpaces(columnName)}</span>,
      footer: (props) => props.column.id,
      sortUndefined: "last", //force undefined values to the end
      enableSorting: columnName !== "id", //disable sorting for id column
    });
  });

  return (
    <div className="p-4 flex flex-col gap-y-4">
      <div>Absence Overview</div>

      <EmployeeTable queryData={queryData.data} columns={columns} />
    </div>
  );
}

// function Filter({ column }: { column: Column<any, unknown> }) {
//   const columnFilterValue = column.getFilterValue();
//   const { filterVariant } = column.columnDef.meta ?? {};

//   return filterVariant === "range" ? (
//     <div>
//       <div className="flex space-x-2">
//         {/* See faceted column filters example for min max values functionality */}
//         <DebouncedInput
//           type="number"
//           value={(columnFilterValue as [number, number])?.[0] ?? ""}
//           onChange={(value) => column.setFilterValue((old: [number, number]) => [value, old?.[1]])}
//           placeholder={`Min`}
//           className="w-24 border shadow rounded"
//         />
//         <DebouncedInput
//           type="number"
//           value={(columnFilterValue as [number, number])?.[1] ?? ""}
//           onChange={(value) => column.setFilterValue((old: [number, number]) => [old?.[0], value])}
//           placeholder={`Max`}
//           className="w-24 border shadow rounded"
//         />
//       </div>
//       <div className="h-1" />
//     </div>
//   ) : filterVariant === "select" ? (
//     <select
//       onChange={(e) => column.setFilterValue(e.target.value)}
//       value={columnFilterValue?.toString()}
//     >
//       {/* See faceted column filters example for dynamic select options */}
//       <option value="">All</option>
//       <option value="complicated">complicated</option>
//       <option value="relationship">relationship</option>
//       <option value="single">single</option>
//     </select>
//   ) : (
//     <DebouncedInput
//       className="w-36 border shadow rounded"
//       onChange={(value) => column.setFilterValue(value)}
//       placeholder={`Search...`}
//       type="text"
//       value={(columnFilterValue ?? "") as string}
//     />
//     // See faceted column filters example for datalist search suggestions
//   );
// }
