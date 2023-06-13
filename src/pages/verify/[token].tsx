import { prisma } from "~/server/db";

const EmailVerificationPage = () => {
  return <div>This is where verification will happen.</div>;
};

//Probably need to do better error handling here
export async function getServerSideProps(context: {
  params: { token: string };
}) {
  const { token } = context.params;

  const user = await prisma.user.findFirst({
    where: {
      verificationTokens: {
        some: {
          AND: [
            {
              token,
            },
          ],
        },
      },
    },
  });

  if (!user) {
    return {
      status: 404,
    };
  }

  if (user.emailVerified !== null) {
    return {
      redirect: {
        destination: "/dashboard",
      },
    };
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      emailVerified: new Date(),
    },
  });

  await prisma.verificationToken.update({
    where: {
      token,
    },
    data: {
      identifier: "Used",
    },
  });

  return {
    redirect: {
      destination: "/dashboard",
    },
    props: {},
  };
}

export default EmailVerificationPage;
