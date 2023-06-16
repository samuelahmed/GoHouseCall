import { api } from "~/utils/api";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

export function ImageUpload() {
  const { data: user } = api.WelcomeFormRouter.me.useQuery();


//1. get secure url from Server

//2.  post the image directly to the s3 bucket 

//3. post to server to store any extra data



  return (
    <>
      <Avatar className="h-20 w-20 rounded-full object-cover">
        <AvatarImage src={user?.image || ""} />
        <AvatarFallback>{user?.image || ""}</AvatarFallback>
      </Avatar>
      <Button size="sm" variant="outline">
        Upload profile image
      </Button>
    </>
  );
}
