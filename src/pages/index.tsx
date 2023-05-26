import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { AboutHouseCall } from "~/components/aboutHouseCall";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>House Call</title>
        <meta name="description" content="Connecting patients and caregivers" />
      </Head>
      <div className="min-h-screen px-4 py-4 md:px-8 md:py-8">
        {!sessionData && <AboutHouseCall />}

        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </div>
    </>
  );
};

export default Home;
