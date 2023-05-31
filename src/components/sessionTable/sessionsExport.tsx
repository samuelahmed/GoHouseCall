import { useRouter } from "next/router";
import { Button } from "~/components/ui/button";
import SessionsTableMain from "./sessionsTableMain";

export default function SessionsExport() {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between px-5 py-4">
        <Button
          onClick={() => {
            console.log(router.push("/sessionPage"));
          }}
        >
          Create Session
        </Button>
      </div>
      <SessionsTableMain />
    </>
  );
}
