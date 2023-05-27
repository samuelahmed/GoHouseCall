import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { AboutHouseCall } from "~/components/marketing/aboutHouseCall";
import { HomeDisplay } from "~/components/marketing/homeDisplay";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>House Call</title>
        <meta name="description" content="Connecting patients and caregivers" />
      </Head>
      {!sessionData && (
          <HomeDisplay />
      )}
      {sessionData && (

      <div className="min-h-screen px-4 py-4 md:px-8 md:py-8">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </div>
      )}
    </>
  );
};

export default Home;
