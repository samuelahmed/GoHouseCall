import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { HomeDisplay } from "~/components/marketing/homeDisplay";
import { RouteSignedInUser } from "~/components/auth/routeSignedInUser";

export const getServerSideProps = RouteSignedInUser("/dashboard");

const Home: NextPage = () => {
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>House Call</title>
        <meta name="description" content="Connecting patients and caregivers" />
      </Head>
      {!sessionData && <HomeDisplay />}
      {sessionData && <div className="min-h-screen"></div>}
    </>
  );
};

export default Home;
