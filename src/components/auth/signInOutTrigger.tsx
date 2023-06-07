import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/router";

const SignInOutTrigger: React.FC = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  return (
    <>
      {!sessionData && (
        <Button
          className="text-olive1"
          variant="ghost"
          onClick={() => void router.push("/register")}
        >
          Register
        </Button>
      )}
      <Button
        className="text-olive1"
        variant="ghost"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </Button>
    </>
  );
};

export default SignInOutTrigger;
