import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useRouter } from "next/router";

export default function Dashboardinfo() {
  const router = useRouter();
  return (
    <>
      <div className="flex min-w-full flex-col space-y-2 px-4 py-4 md:flex-row md:space-x-2 md:space-y-0">
        <div className="h-screen max-h-50vh min-h-50vh w-full">
          <Card className="h-full shadow">
            <CardHeader>
              <CardTitle>Scheduled Sessions</CardTitle>
            </CardHeader>
            <CardContent>meow list of upcoming sessions</CardContent>
          </Card>
        </div>

        <div className="h-screen max-h-50vh min-h-50vh w-full">
          <Card className="h-full shadow">
            <CardHeader>
              <CardTitle>Monthly Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="pb-2 text-lg">
                Earnings: <span className="">$532</span>
              </p>
              <p
                onClick={() => {
                  //add filter to only show completed sessions
                  void router.push("/sessions");
                }}
                className=" hover:cursor-pointer"
              >
                <span className="underline">Completed Sessions</span>: 5
              </p>
              <p
                onClick={() => {
                  //add filter to only show completed sessions
                  void router.push("/sessions");
                }}
                className=" hover:cursor-pointer"
              >
                <span className="underline">Applied Sessions</span>: 9
              </p>
              <p
                onClick={() => {
                  //add filter to only show completed sessions
                  void router.push("/sessions");
                }}
                className=" hover:cursor-pointer"
              >
                <span className="underline">Canceled Sessions</span>: 2
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="h-screen max-h-50vh min-h-50vh w-full">
          <Card className="h-full shadow">
            <CardHeader>
              <CardTitle>Account</CardTitle>
            </CardHeader>
            <CardContent>
              <p
                onClick={() => {
                  void router.push("/messages/noContactSelected");
                }}
                className="underline hover:cursor-pointer"
              >
                Messages
              </p>
              <p
                onClick={() => {
                  void router.push("/sessions");
                }}
                className="underline hover:cursor-pointer"
              >
                Sessions
              </p>
              <p
                onClick={() => {
                  void router.push("/settings/profile");
                }}
                className="underline hover:cursor-pointer"
              >
                Manage Account
              </p>
              <p
                className="underline hover:cursor-pointer"
                onClick={() => {
                  void router.push("/settings/notifications");
                }}
              >
                Notifications
              </p>
              <p
                className="underline hover:cursor-pointer"
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
