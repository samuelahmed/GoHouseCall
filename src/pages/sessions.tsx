import { type NextPage } from "next";
import Head from "next/head";
import SessionsTableMain from "~/components/sessionTable/sessionsTableMain";

const Sessions: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sessions</title>
        <meta name="description" content="House call sessions page" />
      </Head>
      <SessionsTableMain />
    </>
  );
};

export default Sessions;
