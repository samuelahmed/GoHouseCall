import { type NextPage } from "next";
import Head from "next/head";
import { RouteSignedOutAndNewUsers } from "~/components/auth/routeSignedOutAndNewUsers";
import { DataTable } from "~/components/sessionTable/dataTable";
import { columns } from "~/components/sessionTable/columnsCaregiver";
import { api } from "~/utils/api";

export const getServerSideProps =
  RouteSignedOutAndNewUsers("/offline/sessions");

const Sessions: NextPage = () => {
  const { data: user } = api.careSessionAPI.me.useQuery();

  const { data: allCareSessions } =
    api.careSessionAPI.getAllCareSessionsCaregiver.useQuery({
      userId: user?.userId as string,
    });

  if (!allCareSessions) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Head>
        <title>Sessions</title>
        <meta name="description" content="House call sessions page" />
      </Head>
      <div className="h-fit min-h-screen px-4 py-4 md:px-8 md:py-8">
        Table of sessions the caregiver has applied to
        {/* < AppliedSessionsTable /> */}
        <DataTable
          data={
            // allCareSessions.allCareSession
            allCareSessions
          }
          columns={columns}
        />
      </div>
    </>
  );
};

export default Sessions;
