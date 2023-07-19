import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

export default function Dashboardinfo() {
  const { data: userData } = api.userAPI.currentUser.useQuery();
  const { data: scheduledSessions } =
    api.careSessionAPI.getScheduledCareSessionsByUserId.useQuery();
  const { data: earnings } = api.careSessionAPI.getMonthyEarnings.useQuery();
  const { data: hoursOfCare } =
    api.careSessionAPI.getTotalMonthlyHoursOfCare.useQuery();
  const { data: monthlySessionInfo } =
    api.careSessionAPI.getMonthlySessionInfo.useQuery();

  console.log(monthlySessionInfo);
  const today = new Date(); // Get today's date
  const thisMonthName = new Intl.DateTimeFormat("en-US", {
    month: "long",
  }).format(today); // Get month name
  // console.log(thisMonthName.format(today))

  const router = useRouter();
  return (
    <>
      <div className="flex min-w-full flex-col space-y-2 px-4 py-4 md:flex-row md:space-x-2 md:space-y-0">
        <div className="h-screen max-h-50vh min-h-50vh w-full">
          <Card className="h-full shadow">
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
            </CardHeader>
            {/* doing some strange pb-20 because h-full is making the content go beyond the card */}
            <CardContent className="h-full pb-20">
              <div className="h-full overflow-auto">
                <div className="space-y-2">
                  {scheduledSessions
                    ?.filter(
                      (session) =>
                        session.date &&
                        session.date.getTime() >= today.setHours(0, 0, 0, 0)
                    )
                    .sort(
                      (a, b) =>
                        (a.date?.getTime() ?? 0) - (b.date?.getTime() ?? 0)
                    )
                    .map((session) => (
                      <div
                        key={session.id}
                        className="flex h-12 items-center justify-around space-x-4 rounded-sm border px-2 text-center"
                      >
                        <div
                          onClick={() => {
                            void router.push(`/careSession/${session.id}`);
                          }}
                          className="hover:cursor-pointer hover:font-bold"
                        >
                          {" "}
                          {session.title}{" "}
                        </div>
                        <div>
                          {session.date
                            ? session.date.toLocaleDateString("en-US", {
                                month: "numeric",
                                day: "numeric",
                              })
                            : ""}
                        </div>
                        <div> {session.startTime} </div>
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="h-screen max-h-50vh min-h-50vh w-full">
          <Card className="h-full shadow">
            <CardHeader>
              <CardTitle>{thisMonthName} Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {userData?.type === "caregiver" && (
                <p className="pb-2 text-lg hover:cursor-pointer hover:font-bold">
                  Total Earnings:{" "}
                  <span className="">${earnings?.earnings}</span>
                </p>
              )}
              {/* onClick route to all completed sessions for month */}
              {userData?.type === "patient" && (
                <p className="pb-2 text-lg hover:cursor-pointer hover:font-bold">
                  Total Care:{" "}
                  <span className="">{hoursOfCare?.hoursOfCare} Hours</span>
                </p>
              )}

              <p
                onClick={() => {
                  void router.push("/sessions");
                }}
                className="hover:cursor-pointer hover:font-bold"
              >
                <span className="">Completed Sessions</span>:{" "}
                {monthlySessionInfo?.completedSessions}
              </p>

              <p
                onClick={() => {
                  //add filter to only show completed sessions
                  void router.push("/sessions");
                }}
                className="hover:cursor-pointer hover:font-bold"
              >
                <span className="">Scheduled Sessions</span>:{" "}
                {monthlySessionInfo?.scheduledSessions}
              </p>


              {userData?.type === "patient" && (
                <p
                  onClick={() => {
                    void router.push("/sessions");
                  }}
                  className="hover:cursor-pointer hover:font-bold"
                >
                  Created Session:{" "}
                  <span className="  hover:cursor-pointer">
                    {monthlySessionInfo?.createdSessions}{" "}
                  </span>
                </p>
              )}

              {/* add caregiver verison - applied session */}

              
            </CardContent>
          </Card>
        </div>
        <div className="h-screen max-h-50vh min-h-50vh w-full">
          <Card className="h-full shadow">
            <CardHeader>
              <CardTitle>Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p
                onClick={() => {
                  void router.push("/messages/noContactSelected");
                }}
                className="hover:cursor-pointer hover:font-bold"
              >
                Messages
              </p>
              <p
                onClick={() => {
                  void router.push("/sessions");
                }}
                className="hover:cursor-pointer hover:font-bold"
              >
                Sessions
              </p>
              <p
                onClick={() => {
                  void router.push("/settings/profile");
                }}
                className="hover:cursor-pointer hover:font-bold"
              >
                Manage Account
              </p>
              <p
                className="hover:cursor-pointer hover:font-bold"
                onClick={() => {
                  void router.push("/settings/notifications");
                }}
              >
                Notifications
              </p>
              <p
                className="hover:cursor-pointer hover:font-bold"
                onClick={() => {
                  void router.push("/settings/payments");
                }}
              >
                Payments
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
