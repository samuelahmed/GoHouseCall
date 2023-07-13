import { type NextPage } from "next";
import Head from "next/head";
import { RouteSignedOutAndNewUsers } from "~/components/auth/routeSignedOutAndNewUsers";
import { ContactsNav } from "~/components/messages/contactsNav";

export const getServerSideProps = RouteSignedOutAndNewUsers("/offline/messages");



const Messages: NextPage = () => {
  return (
    <>
      <Head>
        <title>Messages</title>
        <meta name="description" content="Edit your House Call account" />
      </Head>
      <div className="h-screen">
        <ContactsNav />
      </div>
    </>
  );
};

export default Messages;
