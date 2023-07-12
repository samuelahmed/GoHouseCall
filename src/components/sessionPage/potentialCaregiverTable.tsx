import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Button } from "../ui/button";
import { useRouter } from "next/router";
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

export function PotentialCaregiverTable({ sessionId }: { sessionId: string }) {
  const router = useRouter();
  const { data: careSessionApplications } =
    api.careSessionAPI.careSessionApplications.useQuery({
      sessionId: sessionId,
    });

  const acceptCaregiver = api.careSessionAPI.acceptCaregiver.useMutation({});
  const cancelOtherApplications =
    api.careSessionAPI.cancelOtherApplications.useMutation({});
  const updateCareSessionStatus =
    api.careSessionAPI.updateCareSessionStatus.useMutation({});

  return (
    <div className="max-h-96 overflow-auto rounded-md border ">
      <Table>
        <TableCaption>
          {careSessionApplications?.length === undefined && (
            <>No Caregivers have applied to your session.</>
          )}
          {careSessionApplications?.length !== undefined && (
            <>Caregivers who have applied to your session.</>
          )}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Note</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {careSessionApplications &&
            careSessionApplications.map((sessionApplicant) => (
              <TableRow className="px-4 py-2" key={sessionApplicant.userId}>
                <TableCell className="font-medium">
                  {sessionApplicant.user?.name}
                </TableCell>
                <TableCell className="">
                  {sessionApplicant.applicationStatus}
                </TableCell>
                <TableCell className="">{sessionApplicant.note}</TableCell>
                <TableCell className="flex space-x-1 text-right">
                  <Button
                    onClick={() => {
                      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                      void router.push(`/profile/${sessionApplicant.userId}`);
                    }}
                    size="sm"
                    variant="outline"
                  >
                    Profile
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      void router.push("/messages");
                    }}
                    size="sm"
                  >
                    Message
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="outline">
                        Hire
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          To hire this caregiver you will pay the session cost,
                          the session will be scheduled, and the caregiver will
                          be notified.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            acceptCaregiver.mutate({
                              applicationId: sessionApplicant.id,
                              userId: sessionApplicant.userId as string,
                            });
                            cancelOtherApplications.mutate({
                              applicationId: sessionApplicant.id,
                              userId: sessionApplicant.userId as string,
                            });
                            updateCareSessionStatus.mutate({
                              sessionId: sessionId,
                            });
                            toast({
                              description: "Session canceled",
                              duration: 5000,
                            });
                            router.reload();
                          }}
                        >
                          Hire
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
