import { Button } from "../ui/button";
import { api } from "~/utils/api";

export default function SessionActions({
  sessionId,
  userType,
  userId,
  sessionUserId,
}: {
  sessionId: string;
  userType: string;
  userId: string;
  sessionUserId: string;
}) {
  const mutation = api.careSessionAPI.cancelCareSession.useMutation();

  console.log("id", sessionId);
  console.log("userId", userId);
  console.log("sessionUserId", sessionUserId);

  return (
    <div className="flex flex-row items-center justify-around px-4 py-4">


      {/* only shown in user is a patient and the session belongs to them */}
      {userType === "patient" && userId === sessionUserId && (
        <>
          <Button variant="outline" className="">
            Edit Session
          </Button>

          <Button
            onClick={() => {
              mutation.mutate({
                id: sessionId,
                userId: userId,
              });
            }}
            variant="outline"
          >
            Cancel Session
          </Button>
        </>
      )}

      {/* only shown in user is a caregiver */}
      {userType === "caregiver" && (
        <>
          {/* apply to session */}
          {/* cancel application */}
        </>
      )}
    </div>
  );
}
