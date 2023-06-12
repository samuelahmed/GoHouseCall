import { type GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db";

export const RouteNewUsers = (route: string) =>
  async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const session = await getServerAuthSession(ctx);

    if (session) {
      const user = await prisma.user.findFirst({
        where: {
          id: session.user.id,
        },
      });

      console.log(user?.emailVerified);

      if (user?.emailVerified === null) {
        return {
          redirect: {
            destination: "/welcomeForm",
            // permanent: false,
          },
        };
      }
      // return {
      //   redirect: {
      //     destination: route,
      //     permanent: false,
      //   },
      // };
    }
    return {
      props: {},
    };
  };
