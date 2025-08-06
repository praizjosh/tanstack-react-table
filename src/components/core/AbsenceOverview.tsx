import { useQuery } from "@tanstack/react-query";
import getAbsences from "../../lib/helpers/getAbsences";
import EmployeeTable from "@/components/core/EmployeeTable";

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

  return (
    <>
      <div>AbsenceOverview</div>

      <EmployeeTable queryData={queryData.data} />
    </>
  );
}
