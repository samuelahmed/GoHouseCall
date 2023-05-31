import { type NextPage } from "next";
import Head from "next/head";
import MessagesLayout from "~/components/messages/messagesLayout";

const Messages: NextPage = () => {
  return (
    <>
      <Head>
        <title>Messages</title>
        <meta name="description" content="Edit your House Call account" />
      </Head>
      <div className="h-screen">
        <MessagesLayout />
      </div>
    </>
  );
};

export default Messages;