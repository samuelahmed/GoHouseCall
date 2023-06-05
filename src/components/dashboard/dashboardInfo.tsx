import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { useRouter } from "next/router";

export default function Dashboardinfo() {
  const router = useRouter();
  return (
    <>
      <div className="flex min-w-full flex-col space-y-2 px-4 py-4 md:flex-row md:space-x-2 md:space-y-0">
        <div className="w-full">
          <Card>
            <CardHeader>
              <CardTitle>Sessions</CardTitle>
              {/* <CardDescription>Applied Sessions</CardDescription> */}
            </CardHeader>
            <CardContent>
              <p
                onClick={() => {
                  void router.push("/sessions");
                }}
                className="underline hover:cursor-pointer"
              >
                Applied Sessions: 5
              </p>
              <p>Upcoming Sessions: 3</p>
              <p>Completed Sessions: 6</p>
            </CardContent>
            {/* <CardFooter>
              <p>Card Footer</p>
            </CardFooter> */}
          </Card>
        </div>
        <div className="w-full">
          <Card>
            <CardHeader>
              <CardTitle>Messages</CardTitle>
              {/* <CardDescription>Applied Sessions</CardDescription> */}
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
            {/* <CardFooter>
              <p>Card Footer</p>
            </CardFooter> */}
          </Card>
        </div>
        <div className="w-full">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              {/* <CardDescription>Applied Sessions</CardDescription> */}
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
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Scheduled Sessions</CardTitle>
              <CardDescription>
                Sessions that have been scheduled
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Session Info</p>
            </CardContent>
          </Card>
        </div>
        <div className="w-full">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Scheduled Sessions</CardTitle>
              <CardDescription>
                Sessions that have been scheduled
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Session Info</p>
            </CardContent>
          </Card>
        </div>
        <div className="w-full">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Scheduled Sessions</CardTitle>
              <CardDescription>
                Sessions that have been scheduled
              </CardDescription>
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
