import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import DashboardLayout from "~/components/dashboard/dashboardLayout";
import Dashboardinfo from "~/components/dashboard/dashboardInfo";
import { RouteSignedOutAndNewUsers } from "~/components/auth/routeSignedOutAndNewUsers";

export const getServerSideProps = RouteSignedOutAndNewUsers("/");

const Dashboard: NextPage = () => {
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard for House Call users." />
      </Head>
      {!sessionData && <div className="min-h-screen"></div>}
      {sessionData && (
        <>
          <div className="min-h-screen px-4 py-4 ">
            <DashboardLayout>
              <Dashboardinfo />
            </DashboardLayout>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
