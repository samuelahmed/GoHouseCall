import { type NextPage } from "next";
import Head from "next/head";
import { type GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "~/server/auth";
import { EmailVerification } from "~/components/welcomePage/emailVerification";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { PatientWelcomeForm } from "~/components/welcomePage/patientWelcomeForm";
import { CaregiverWelcomeForm } from "~/components/welcomePage/caregiverWelcomeForm";
import { prisma } from "~/server/db";
import { checkIfWelcomeFormComplete } from "~/server/api/routers/welcomeFormRouter";

const WelcomeForm: NextPage = () => {
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
        <h1 className="text-xl font-semibold">Welcome to House Call</h1>
        <h2 className="text-lg ">
          Complete your registration to access the rest of the site.
        </h2>
        <p className="">1. Verify your email address</p>
        <div className="flex space-x-4 ">
          <EmailVerification />
        </div>
        <p className="">2. Select your role</p>
        <div className="flex w-full items-center space-x-4  ">
          <Tabs defaultValue="account " className="w-[600px]">
            <TabsList>
              <TabsTrigger value="patient">Patient</TabsTrigger>
              <TabsTrigger value="caregiver">Caregiver</TabsTrigger>
            </TabsList>
            <TabsContent value="patient">
              <PatientWelcomeForm />
            </TabsContent>
            <TabsContent value="caregiver">
              <CaregiverWelcomeForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default WelcomeForm;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getServerAuthSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
  const userId = session?.user?.id;
  const user = await checkIfWelcomeFormComplete({
    prisma,
    input: { userId },
  });
  if (user?.welcomeFormComplete === true) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
  return {
    props: {
      userId,
      user,
    },
  };
}
