import { type GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "~/server/auth";

export const RouteSignedOutUser = ( route: string  ) =>
  async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const session = await getServerAuthSession(ctx);
    if (!session) {
      return {
        redirect: {
          destination: route,
          permanent: false,
        },
      };
    }
    return {
      props: {},
    };
  };
