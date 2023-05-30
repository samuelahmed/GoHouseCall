import { Separator } from "~/components/ui/separator";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Button } from "../ui/button";
import TaskPage from "./sessionsTableMain";


export default function SessionsLayout() {
  return (
    <>
      <div className="flex h-16 flex-row items-center justify-start px-8">
        <Button variant="default" size="sm">
          Create New Session
        </Button>
      </div>
      <Separator />
      <TaskPage />
    </>
  );
}
