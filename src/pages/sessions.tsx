import { type NextPage } from "next";
import Head from "next/head";
// import MessagesLayout from "~/components/messages/messagesLayout";
// import SessionsLayout from "~/components/sessions/sessionsLayout";
import TaskPage from "~/components/sessionTable/sessionsTableMain";
import SessionsTableMain from "~/components/sessionTable/sessionsTableMain";

const Sessions: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sessions</title>
        <meta name="description" content="House call sessions page" />
      </Head>
      {/* <div className="h-screen">
        <SessionsLayout 
        />
      </div> */}

      < SessionsTableMain />
    </>

  );
};

export default Sessions;
