import { type NextPage } from "next";
import Head from "next/head";
// import MessagesLayout from "~/components/messages/messagesLayout";
import SessionsLayout from "~/components/sessions/sessionsLayout";
import TaskPage from "~/components/sessions/sessionsTableMain";

const Sessions: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sessions</title>
        <meta name="description" content="House call sessions page" />
      </Head>
      <div className="h-screen">
        <SessionsLayout />
      </div>
    </>
  );
};

export default Sessions;
