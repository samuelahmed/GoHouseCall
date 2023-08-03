import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { RouteSignedInUser } from "~/components/auth/routeSignedInUser";
import { MessagesDisplay } from "~/components/marketing/messagesDisplay";

export const getServerSideProps = RouteSignedInUser("/sessions");

const OfflineMessages: NextPage = () => {
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>House Call</title>
        <meta name="description" content="Messages preview page" />
      </Head>
      {!sessionData && <MessagesDisplay />}
      {sessionData && <div className="min-h-screen"></div>}
    </>
  );
};

export default OfflineMessages;
