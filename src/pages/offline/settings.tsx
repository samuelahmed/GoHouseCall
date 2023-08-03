import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { RouteSignedInUser } from "~/components/auth/routeSignedInUser";
import { SettingsDisplay } from "~/components/marketing/settingsDisplay";

export const getServerSideProps = RouteSignedInUser("/sessions");

const OfflineSettings: NextPage = () => {
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>House Call</title>
        <meta name="description" content="Settings preview page" />
      </Head>
      {!sessionData && <SettingsDisplay />}
      {sessionData && <div className="min-h-screen"></div>}
    </>
  );
};

export default OfflineSettings;
