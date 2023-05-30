import { Separator } from "~/components/ui/separator";
// import { SidebarNav } from "~/components/settings/settingsNav";
import { ContactForm } from "./contactForm";

export default function SupportLayout({}) {
  return (
    <>
      <div className="min-h-screen overflow-auto px-4 py-4 md:px-8 md:py-8">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Contact Us</h2>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8  lg:space-y-0">
          <ContactForm />
        </div>
      </div>
    </>
  );
}
