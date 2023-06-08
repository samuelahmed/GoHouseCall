import { type NextPage } from "next";
import Head from "next/head";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";

const WelcomeForm: NextPage = () => {
  const mutation = api.emailAPI.sendLoginEmail.useMutation();
  const { data: emailVerified, isLoading } =
    api.emailAPI.userEmailVerificationStatus.useQuery();

  // console.log(emailVerified?.emailVerified);

  return (
    <>
      <Head>
        <title>Welcome Form</title>
        <meta
          name="description"
          content="Terms of Service Agreement of House Call"
        />
      </Head>
      <div className="min-h-screen px-4 py-4 md:px-8 md:py-8">
        {!emailVerified?.emailVerified &&
          (isLoading ? (
            <div>loading...</div>
          ) : (
            <Button
              className="w-full"
              onClick={() => {
                mutation.mutate();
              }}
            >
              Send Login Email
            </Button>
          ))}

        {emailVerified?.emailVerified &&
          (isLoading ? <div>loading...</div> : <div> email verified :) </div>)}
      </div>
    </>
  );
};

export default WelcomeForm;
