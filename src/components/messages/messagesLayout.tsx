import { Separator } from "~/components/ui/separator";
import { ContactsNav } from "./contactsNav";

const contactNavItems = [
  {
    title: "Profile",
    name: "John Doe",
  },
  {
    title: "Account",
    name: "Jane Smith",
  },
  {
    title: "Notifications",
    name: "Mr Blue",
  },
];

export default function MessagesLayout() {
  return (
    <>
      <div className="min-h-screen overflow-auto px-4 py-4 md:px-8 md:py-8">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Messages</h2>
          <p className="text-muted-foreground">
            Chat with your House Call contacts
          </p>
        </div>
        <Separator className="my-6" />
        <ContactsNav items={contactNavItems} />
      </div>
    </>
  );
}
