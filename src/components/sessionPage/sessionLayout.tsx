import { Separator } from "~/components/ui/separator";
// import { SidebarNav } from "~/components/settings/settingsNav";
// import Seperator  from "~/components/separator";

// const sidebarNavItems = [
//   {
//     title: "Profile",
//     href: "/settings/profile",
//   },
//   {
//     title: "Account",
//     href: "/settings/account",
//   },
//   {
//     title: "Notifications",
//     href: "/settings/notifications",
//   },
// ];

interface sessionPageProps {
  children: React.ReactNode;
}

export default function SessionLayout({ children }: sessionPageProps) {
  return (
    <>
      {/* <div className="min-h-screen overflow-auto px-4 py-4 md:px-8 md:py-8"> */}

        {/* <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0"> */}
          {/* <aside className="-mx-4 lg:w-1/5">
          </aside> */}
          {/* <div className="">{children}</div> */}
        {/* </div> */}
      {/* </div> */}
    </>
  );
}
