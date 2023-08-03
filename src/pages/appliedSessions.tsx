import { type NextPage } from "next";
import Head from "next/head";
import { RouteSignedOutAndNewUsers } from "~/components/auth/routeSignedOutAndNewUsers";
import { DataTableCaregiver } from "~/components/sessionTable/dataTableCaregiver";
import { columnsCaregiver } from "~/components/sessionTable/columnsCaregiver";
import { api } from "~/utils/api";

export const getServerSideProps =
  RouteSignedOutAndNewUsers("/offline/sessions");

const AppliedSessions: NextPage = () => {
  
  //do I want to pull in this page or move to a component?
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
        <DataTableCaregiver data={allCareSessions} columns={columnsCaregiver} />
      </div>
    </>
  );
};

export default AppliedSessions;
