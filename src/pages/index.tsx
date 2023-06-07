import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { HomeDisplay } from "~/components/marketing/homeDisplay";
import { type GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "../server/auth";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getServerAuthSession(ctx);
  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

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
