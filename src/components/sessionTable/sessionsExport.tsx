import { useRouter } from "next/router";
import { Button } from "~/components/ui/button";
import SessionsTableMain from "./sessionsTableMain";
import { api } from "~/utils/api";

export default function SessionsExport() {
  const router = useRouter();
  const { data: user } = api.careSessionAPI.me.useQuery();

  return (
    <>
      {user?.type === "patient" && (
        <div className="flex items-center justify-between px-5 py-4">
          <Button
            variant="outline"
            onClick={() => {
              console.log(router.push("/createSession"));
            }}
          >
            Create Session
          </Button>
        </div>
      )}

      <SessionsTableMain />
    </>
  );
}
