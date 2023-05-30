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
      <div className="min-h-screen overflow-auto px-4 py-4 md:px-8 md:py-8">
        <div className="h-96">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">Messages</h2>
          </div>
          <Separator className="my-6" />
          <ContactsNav items={contactNavItems} />
        </div>
      </div>
    </>
  );
}
