import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";

import { RouteSignedInUser } from "~/components/auth/routeSignedInUser";
// import { SessionsDisplay } from "~/components/marketing/sessionsDisplay";
import { SettingsDisplay } from "~/components/marketing/settingsDisplay";

export const getServerSideProps = RouteSignedInUser("/sessions");

const Home: NextPage = () => {
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>House Call</title>
        <meta name="description" content="Connecting patients and caregivers" />
      </Head>
      {!sessionData && <SettingsDisplay />}
      {sessionData && <div className="min-h-screen"></div>}
    </>
  );
};

export default Home;
