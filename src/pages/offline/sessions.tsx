import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { RouteSignedInUser } from "~/components/auth/routeSignedInUser";
import { SessionsDisplay } from "~/components/marketing/sessionsDisplay";

export const getServerSideProps = RouteSignedInUser("/sessions");

const OfflineSessions: NextPage = () => {
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>House Call</title>
        <meta name="description" content="Sessions preview page" />
      </Head>
      {!sessionData && <SessionsDisplay />}
      {sessionData && <div className="min-h-screen"></div>}
    </>
  );
};

export default OfflineSessions;
