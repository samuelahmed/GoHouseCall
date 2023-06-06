import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useRouter } from "next/router";

export default function Dashboardinfo() {
  const router = useRouter();
  return (
    <>
      <div className="flex min-w-full flex-col space-y-2 px-4 py-4 md:flex-row md:space-x-2 md:space-y-0">
        <div className="w-full">
          <Card className="shadow">
            <CardHeader>
              <CardTitle>Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Scheduled Sessions: 3</p>
              <p
                onClick={() => {
                  void router.push("/sessions");
                }}
                className="underline hover:cursor-pointer"
              >
                Applied Sessions: 5
              </p>
              <p>Completed Sessions: 6</p>
            </CardContent>
          </Card>
        </div>
        <div className="w-full">
        <Card className="shadow">
            <CardHeader>
              <CardTitle>Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <p
                onClick={() => {
                  void router.push("/messages");
                }}
                className="underline hover:cursor-pointer"
              >
                Unread Messages: 5
              </p>
              <p>Sent Messages: 3</p>
              <p>Total Contacts: 6</p>
            </CardContent>
          </Card>
        </div>
        <div className="w-full">
        <Card className="shadow">
            <CardHeader>
              <CardTitle>Account</CardTitle>
            </CardHeader>
            <CardContent>
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
                  void router.push("/settings/account");
                }}
              >
                Payments
              </p>
              <p
                className="underline hover:cursor-pointer"
                onClick={() => {
                  void router.push("/settings/notifications");
                }}
              >
                Notifications
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex flex-col space-y-4 px-4">
        <div className="w-full">
        <Card className="shadow">
            <CardHeader>
              <CardTitle className="text-center">Scheduled Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Session Info</p>
            </CardContent>
          </Card>
        </div>
        <div className="w-full">
        <Card className="shadow">
            <CardHeader>
              <CardTitle className="text-center">Applied Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Session Info</p>
            </CardContent>
          </Card>
        </div>
        <div className="w-full">
        <Card className="shadow">
            <CardHeader>
              <CardTitle className="text-center">Completed Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Session Info</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
