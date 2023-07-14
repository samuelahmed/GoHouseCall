import { type NextPage } from "next";
import Head from "next/head";
import { RouteSignedOutAndNewUsers } from "~/components/auth/routeSignedOutAndNewUsers";
import { ContactsNav } from "~/components/messages/contactsNav";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

export const getServerSideProps = RouteSignedOutAndNewUsers("/offline/messages");



const Messages: NextPage = () => {

  const router = useRouter();
  const id = router.query.profileId;

  // const { data: currentMessages } = api


  


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
