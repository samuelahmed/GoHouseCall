import { type NextPage } from "next";
import Head from "next/head";
import SessionsExport from "~/components/sessionTable/sessionsExport";

const Sessions: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sessions</title>
        <meta name="description" content="House call sessions page" />
      </Head>
      <SessionsExport />
    </>
  );
};

export default Sessions;
