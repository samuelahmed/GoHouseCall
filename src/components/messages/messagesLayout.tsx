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
      <div className="space-y-0.5 px-4 py-4 ">
        <h2 className="text-2xl font-bold tracking-tight">Messages</h2>
      </div>
      <Separator />
      <ContactsNav items={contactNavItems} />
    </>
  );
}
