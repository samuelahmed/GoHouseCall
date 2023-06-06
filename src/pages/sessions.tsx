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
      <div className="h-fit px-4 py-4 md:px-8 md:py-8">
      <SessionsExport />

      </div>
    </>
  );
};

export default Sessions;
