import { Separator } from "~/components/ui/separator";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";


interface DashboardProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardProps) {
    // const { data: sessionData } = useSession();
    const { data: userData } = api.userAPI.currentUser.useQuery();


  return (
    <>
      <div className="min-h-screen overflow-auto  ">
        <div className="-mb-3 space-y-0.5 ">
          <h2 className="justify-start text-2xl font-bold tracking-tight">
            {userData?.name}&apos;s Dashboard
          </h2>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 px-4 lg:flex-row lg:space-x-12 lg:space-y-0">
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </>
  );
}
