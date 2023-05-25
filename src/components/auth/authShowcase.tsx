import { signIn, signOut, useSession} from "next-auth/react";
import { Button } from "~/components/ui/button";
// import { api } from "~/utils/api";

const SignInOutTrigger: React.FC = () => {

  const { data: sessionData } = useSession();
  
  //api used to be called trpc
  //keep as example for now
    //   const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    //     undefined, // no input
    //     { enabled: sessionData?.user !== undefined }
    //   );

  return (
      <Button
        className="text-olive1"
        variant='ghost'
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </Button>
  );
};

export default SignInOutTrigger;
