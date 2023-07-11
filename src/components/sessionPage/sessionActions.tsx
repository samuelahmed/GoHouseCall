import { Button } from "../ui/button";
import { api } from "~/utils/api";

export default function SessionActions({
  sessionId,
  userType,
  userId,
  sessionUserId,
  sessionStatus,
}: {
  sessionId: string;
  userType: string;
  userId: string;
  sessionUserId: string;
  sessionStatus: string;
}) {
  const cancelSession = api.careSessionAPI.cancelCareSession.useMutation();
  const activateSession = api.careSessionAPI.activateCareSession.useMutation();

  console.log("id", sessionId);
  console.log("userId", userId);
  console.log("sessionUserId", sessionUserId);

  return (
    <div className="flex flex-row items-center justify-around px-4 py-4">
      {/* only shown in user is a patient and the session belongs to them */}
      {userType === "patient" && userId === sessionUserId && (
        <>
          {/* add if needed later, for now they can cancel and create a new session */}
          {/* <Button variant="outline" className="">
            Edit Session
          </Button> */}
          {sessionStatus === "cancelled" && (
            <Button
              onClick={() => {
                activateSession.mutate({
                  id: sessionId,
                  userId: userId,
                });
              }}
              variant="outline"
            >
              Activate Session
            </Button>
          )}
          {sessionStatus !== "cancelled" && (
            <Button
              onClick={() => {
                cancelSession.mutate({
                  id: sessionId,
                  userId: userId,
                });
              }}
              variant="outline"
            >
              Cancel Session
            </Button>
          )}
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
