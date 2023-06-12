import { type NextPage } from "next";
import Head from "next/head";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";
import { type GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "~/server/auth";

const WelcomeForm: NextPage = () => {
  const { data: emailVerified, isLoading } =
    api.emailAPI.userEmailVerificationStatus.useQuery();

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

      <div className="min-h-screen px-4 py-4 md:px-8 md:py-8 space-y-4">
        <h1>Welcome to House Call!</h1>

        <div>Complete your registration to access the rest of the site.</div>

        <div>
          1. Confirm your email address (needs to note when email is sent)
          {!emailVerified?.emailVerified &&
            (isLoading ? (
              <div>loading...</div>
            ) : (
              <Button className="" onClick={() => mutate()}>
                Send Login Email
              </Button>
            ))}
          {emailVerified?.emailVerified &&
            (isLoading ? (
              <div>loading...</div>
            ) : (
              <div> email verified :) </div>
            ))}
        </div>

        <div>2. Select your role</div>

        <div>3. Tell us about yourself</div>

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
