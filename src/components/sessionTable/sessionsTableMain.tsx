import { columns } from "~/components/sessionTable/columns";
import { DataTable } from "~/components/sessionTable/dataTable";
import { api } from "~/utils/api";

export default function SessionsTableMain() {
  //this will be replaced with the actual data from the api
  const { data: user } = api.careSessionAPI.me.useQuery();

  const { data: allCareSessionsOfPatient } =
    api.careSessionAPI.getCareSessionsByUserId.useQuery({
      userId: user?.userId as string,
    });

  const { data: allCareSessions } =
    api.careSessionAPI.getAllCareSessions.useQuery();

  if (!user) {
    return <p>Loading...</p>;
  }

  if (!user || !allCareSessionsOfPatient || !allCareSessions) {
    return <p>Loading...</p>;
  }

  if (!allCareSessionsOfPatient || !allCareSessions) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {user.type === "patient" && (
        <DataTable data={allCareSessionsOfPatient} columns={columns} />
      )}
      {user.type === "caregiver" && (
        <DataTable data={allCareSessions} columns={columns} />
      )}
    </>
  );
}
