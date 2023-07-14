import { type NextPage } from "next";
import Head from "next/head";
import { RouteSignedOutAndNewUsers } from "~/components/auth/routeSignedOutAndNewUsers";
import { ContactsNav } from "~/components/messages/contactsNav";
import { api } from "~/utils/api";

export const getServerSideProps = RouteSignedOutAndNewUsers("/offline/messages");



const Messages: NextPage = () => {



  //id = room id
  //check to make sure user is allowed to access this page

  // const { data: me } = api.messagesAPI.me.useQuery();
  // const { data: currentMessages } = api.messagesAPI.allContactsForUser.useQuery();


  // console.log(currentMessages)

  // if (!currentMessages) {
  //   return <div>Loading...</div>;
  // }




  return (
    <>
      <Head>
        <title>Messages</title>
        <meta name="description" content="Send messages to your contacts" />
      </Head>

      <div className="h-screen">
        <ContactsNav

          // me={me}
          // friendList={currentMessages}
        
        />
      </div>
    </>
  );
};

export default Messages;
