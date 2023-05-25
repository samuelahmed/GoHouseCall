import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>House Call</title>
        <meta name="description" content="Connecting patients and caregivers" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center ">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </main>
    </>
  );
};

export default Home;
