import { type GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db";
import { checkIfWelcomeFormComplete } from "~/server/api/routers/welcomeFormRouter";

export const RouteSignedOutAndNewUsers = (route: string) =>
  async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const session = await getServerAuthSession(ctx);

    //If user is not signed in, redirect to route
    if (!session) {
      return {
        redirect: {
          destination: route,
          permanent: false,
        },
      };
    }

    if (session) {
      //Find if user has verified email
      // const user = await prisma.user.findFirst({
      //   where: {
      //     id: session.user.id,
      //   },
      // });
      //If user has not verified email, redirect to welcome form

      const userId = session?.user?.id;

      const loggedInUser = await checkIfWelcomeFormComplete({
        prisma,
        input: { userId },
      });
      if (loggedInUser?.welcomeFormComplete !== true) {
        return {
          redirect: {
            destination: "/welcomeForm",
            permanent: false,
          },
        };
      }

      // if (user?.emailVerified === null) {
      //   return {
      //     redirect: {
      //       destination: "/welcomeForm",
      //       permanent: false,
      //     },
      //   };
      // }
    }

    return {
      props: {},
    };
  };
