import { type NextPage } from "next";
import Head from "next/head";
import SessionsExport from "~/components/sessionTable/sessionsExport";
import { RouteSignedOutAndNewUsers } from "~/components/auth/routeSignedOutAndNewUsers";

export const getServerSideProps = RouteSignedOutAndNewUsers("/offline/sessions");

const Sessions: NextPage = () => {
  return (
    <>
      <Head>  
        <title>Sessions</title>
        <meta name="description" content="House call sessions page" />
      </Head>
      <div className="h-fit px-4 py-4 md:px-8 md:py-8 min-h-screen">
        <SessionsExport />
      </div>
    </>
  );
};

export default Sessions;
