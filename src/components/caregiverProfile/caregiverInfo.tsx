import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "../ui/button";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

export function CaregiverInfo() {
  // const router = useRouter();

  const { data: user } = api.messagesAPI.me.useQuery();
  // console.log(user)

  const { mutate } = api.messagesAPI.createNewFriend.useMutation();

  const publish = () => {
    mutate({
      caregiverId: "climxehhu0008uq3cqk4tx67b",
      patientId: user?.id || "",
    });
  };

  return (
    <>
      <div className="px-4 py-4">
        <Card>
          <CardHeader className="space-y-2">
            <CardTitle>Bill Gates</CardTitle>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>user name</AvatarFallback>
            </Avatar>
            <CardDescription>Caregiver</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">
              <span className="font-semibold">City: </span>
              <span>San Jose</span>
            </p>
            <p className="text-sm">
              <span className="font-semibold">Bio: </span>
              <span>
                Bill Gates is an American business magnate, software developer,
                investor, and philanthropist. He is best known as the co-founder
                of Microsoft Corporation.
              </span>
            </p>
          </CardContent>
          <CardFooter>
            <a className="text-sm" href="https://www.gohousecall.com/">
              www.billgates.com
            </a>
          </CardFooter>
        </Card>
        <div className="flex flex-row items-center justify-start space-x-4">
          <Button
            onClick={() => {
              publish();
              // void router.push("/messages");
            }}
            variant="outline"
            size="sm"
            className="mt-4"
          >
            Message
          </Button>
          <Button variant="outline" size="sm" className="mt-4">
            Request Caregiver
          </Button>
        </div>
      </div>
    </>
  );
}
