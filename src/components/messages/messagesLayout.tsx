import { Separator } from "~/components/ui/separator";
import { ContactsNav } from "./contactsNav";

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
  return (
    <>
      <ContactsNav items={contactNavItems} />
    </>
  );
}
