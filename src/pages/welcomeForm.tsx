import { type NextPage } from "next";
import Head from "next/head";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";
import { type GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "~/server/auth";

const WelcomeForm: NextPage = () => {
  const { data: emailVerified, isLoading } =
    api.emailAPI.userEmailVerificationStatus.useQuery();

  const { data: verificationToken } =
    api.emailAPI.checkVerificationToken.useQuery();

  console.log(verificationToken?.identifier);

  //
  const { mutate } = api.emailAPI.sendConfirmationEmail.useMutation();

  return (
    <>
      <Head>
        <title>Welcome Form</title>
        <meta
          name="description"
          content="Terms of Service Agreement of House Call"
        />
      </Head>

      <div className="min-h-screen space-y-4 px-4 py-4 md:px-8 md:py-8">
        <h1>Welcome to House Call!</h1>

        <h2>Complete your registration to access the rest of the site.</h2>

        <div>
          {/* Send Login Email because user is not verified and no token exists */}
          {!emailVerified?.emailVerified &&
            verificationToken?.identifier !== null &&
            (isLoading ? (
              <div>loading...</div>
            ) : (
              <Button className="" onClick={() => mutate()}>
                Send Login Email
              </Button>
            ))}
          {/* Resend Login Email because user is not verified and token exists */}
          {!emailVerified?.emailVerified &&
            verificationToken?.identifier === null &&
            (isLoading ? (
              <div>loading...</div>
            ) : (
              <Button className="" onClick={() => mutate()}>
                Resend Login Email
              </Button>
            ))}
          {/* Email verified */}
          {emailVerified?.emailVerified &&
            (isLoading ? (
              <div>checking...</div>
            ) : (
              <div> email verified :) </div>
            ))}
        </div>

        <div>2. Select your role (pulldown with two options) </div>

        <div>
          3. Tell us about yourself (1. are you making account for yourself? 2.
          what is your bio 3. add address 4. upload profile picture 5. )
        </div>

        <div>
          4. (to create sessions) Setup Payments (maybe put this later on as
          gatekeep to creating sessions)
        </div>
      </div>
    </>
  );
};

export default WelcomeForm;

//prevent non-logged in users from accessing this page
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getServerAuthSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
