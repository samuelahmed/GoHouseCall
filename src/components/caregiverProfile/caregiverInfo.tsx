import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "../ui/button";
import { useRouter } from "next/router";  

export function CaregiverInfo({
  name,
  image,
  type,
  city,
  bio,
}: {
  name: string;
  image: string;
  type: string;
  city: string;
  bio: string;
}) {

  const router = useRouter();

  return (
    <>
      <div className="px-4 py-4">
        <Card>
          <CardHeader className="space-y-2">
            <CardTitle>{name}</CardTitle>
            <Avatar>
              <AvatarImage src={image} />
              <AvatarFallback>user name</AvatarFallback>
            </Avatar>
            <CardDescription>{type}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">
              <span className="font-semibold">City: </span>
              <span>{city}</span>
            </p>
            <p className="text-sm">
              <span className="font-semibold">Bio: </span>
              <span>{bio}</span>
            </p>
          </CardContent>
        </Card>
        <div className="flex flex-row items-center justify-start space-x-4">
          <Button
            onClick={() => {
              //route to the message page w/ this user id open in the chat
              // router.push(`/messages/${}`);
            }}
            variant="outline"
            size="sm"
            className="mt-4"
          >
            Message
          </Button>
          {/* <Button variant="outline" size="sm" className="mt-4">
            Request Caregiver
          </Button> */}
        </div>
      </div>
    </>
  );
}
