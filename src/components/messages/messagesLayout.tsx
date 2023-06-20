import { ContactsNav } from "./contactsNav";
import Pusher from "pusher-js";
import { useState } from "react";
import { useEffect } from "react";

const contactNavItems = [
  {
    title: "Profile",
    name: "John Doe",
    user: "meow",
  },
  {
    title: "Account",
    name: "Jane Smith",
    user: "meow",
  },
  {
    title: "Notifications",
    name: "Mr Blue",
    user: "meow",
  },
];

export default function MessagesLayout() {


  Pusher.logToConsole = true;

  const [selectedChannel, setSelectedChannel] = useState([]);
  const [messagesmeow, setMessagesmeow] = useState([]);


  useEffect(() => {

  const pusher = new Pusher("bcf89bc8d5be9acb07da", {
    cluster: "us3",
  });

  const channel = pusher.subscribe("my-channel");

  // channel.bind("my-event", function (data: any) {
  //   console.log(data);
  //   // setMessagesmeow(data);
  // });

  // console.log(channel)

  }, [])

  // channel.bind("my-event", function (data: any) {
  //   console.log(data);
  //   // setMessagesmeow(data);
  // });

  // console.log(channel)



  return (
    <>
      <ContactsNav items={contactNavItems} />
    </>
  );
}
