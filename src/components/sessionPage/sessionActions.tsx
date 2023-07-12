import { Button } from "../ui/button";
import { api } from "~/utils/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alertDialog";
import { toast } from "../ui/useToast";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const cancelSession = api.careSessionAPI.cancelCareSession.useMutation();
  const activateSession = api.careSessionAPI.activateCareSession.useMutation();
  const applyToSession = api.careSessionAPI.applyToCareSession.useMutation();
  const cancelApplication = api.careSessionAPI.cancelApplication.useMutation();

  //check if the user is a caregiver that has already applied to the session
  const { data: hasCaregiverApplied } =
    api.careSessionAPI.hasCaregiverApplied.useQuery({
      careSessionId: sessionId,
      userId: userId,
    });

  console.log("caregiverApplications", hasCaregiverApplied);

  return (
    <div className="flex flex-row items-center justify-around px-4 py-4">
      {/* only shown in user is a patient and the session belongs to them */}
      {userType === "patient" && userId === sessionUserId && (
        <>
          {sessionStatus === "canceled" && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">Reactivate Session</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You can reactivate this session later.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      activateSession.mutate({
                        id: sessionId,
                        userId: userId,
                      });
                      toast({
                        description: "Session reactivated",
                        duration: 5000,
                      });
                      router.reload();
                    }}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          {sessionStatus !== "canceled" && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">Cancel Session</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You can reactivate this session later.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      cancelSession.mutate({
                        id: sessionId,
                        userId: userId,
                      });
                      toast({
                        description: "Session canceled",
                        duration: 5000,
                      });
                      router.reload();
                    }}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </>
      )}

      {/* only shown in user is a caregiver */}
      {userType === "caregiver" && (
        <>
          {/* apply to session */}
          {/* cancel application */}
          {hasCaregiverApplied === false && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">Apply to Session</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You can cancel your application up to 48 hours before the
                    session.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      applyToSession.mutate({
                        id: sessionId,
                        userId: userId,
                        note: "meow",
                      });

                      //create a new application
                      toast({
                        description: "Successfully applied to session",
                        duration: 5000,
                      });
                      router.reload();
                    }}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          {hasCaregiverApplied === true && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">Cancel Application</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You can cancel your application up to 48 hours before the
                    session.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      cancelApplication.mutate({
                        id: sessionId,
                        userId: userId,
                      });

                      //create a new application
                      toast({
                        description: "Successfully applied to session",
                        duration: 5000,
                      });
                      router.reload();
                    }}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </>
      )}
    </div>
  );
}
