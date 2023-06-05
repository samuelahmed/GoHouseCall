import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { HomeDisplay } from "~/components/marketing/homeDisplay";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  if (sessionData) {
    void router.push("/dashboard");
  }

  return (
    <>
      <Head>
        <title>House Call</title>
        <meta name="description" content="Connecting patients and caregivers" />
      </Head>
      {!sessionData && <HomeDisplay />}
      {sessionData && <>
      {/* Logged in users are redirected to dashboard */}
      </>}
    </>
  );
};

export default Home;
