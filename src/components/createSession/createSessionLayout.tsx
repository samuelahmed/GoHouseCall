import { Separator } from "~/components/ui/separator";


interface CreateSessionProps {
  children: React.ReactNode;
}

export default function CreateSessionLayout({ children }: CreateSessionProps) {
  return (
    <>
      <div className="min-h-screen overflow-auto  ">
        <div className="-mb-3 space-y-0.5 ">
          <h2 className="justify-start text-2xl font-bold tracking-tight">
            Create Care Session
          </h2>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 px-4">
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  );
}
