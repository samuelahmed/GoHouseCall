import { columns } from "~/components/sessionTable/columns";
import { DataTable } from "~/components/sessionTable/dataTable";
import { api } from "~/utils/api";

export default function SessionsTableMain() {
  //this will be replaced with the actual data from the api
  const { data: user } = api.careSessionAPI.me.useQuery();
  const { data: allCareSessions } =
    api.careSessionAPI.getAllCareSessions.useQuery();
  console.log(allCareSessions);

  if (!user || !allCareSessions) {
    return <p>Loading...</p>;
  }

  if (!allCareSessions) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <DataTable data={allCareSessions} columns={columns} />
    </>
  );
}
