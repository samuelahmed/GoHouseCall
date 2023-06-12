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

  console.log(emailVerified);
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
            <Button className="w-full" onClick={() => mutate()}>
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
