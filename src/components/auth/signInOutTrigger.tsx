import { signIn, signOut, useSession} from "next-auth/react";
// import { api } from "~/utils/api";

const SignInOutTrigger: React.FC = () => {

  const { data: sessionData } = useSession();
  
  //api used to be called trpc
  //keep as reminder for now
    //   const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    //     undefined, // no input
    //     { enabled: sessionData?.user !== undefined }
    //   );

  return (
    // <div className="flex flex-col items-center justify-center ">
    //   <p className="text-center ">
    //   </p>
      <button
        className=""
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    // </div>
  );
};

export default SignInOutTrigger;
