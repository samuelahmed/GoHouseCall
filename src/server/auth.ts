import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { loginSchema } from "~/types/authSchemas";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { ProviderType } from "~/components/auth/userAuthForm";

// console.log(ProviderType)


const googleAuthOptions: NextAuthOptions =  {
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        // email: user.email,
      },
    }),
  },
  pages: {
    signIn: "/signin",
    signOut: "/auth/signout",
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: "/register", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};

const credentialsAuthOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "placeholder@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const cred = await loginSchema.parseAsync(credentials);
        const user = await prisma.user.findFirst({
          where: { email: cred.email },
        });
        if (!user) {
          return null;
        }
        const isValidPassword = bcrypt.compareSync(
          cred.password,
          user.password as string
        );
        if (!isValidPassword) {
          return null;
        }
        return {
          id: user.id,
          email: user.email,
        };
      },
    }),
  ],
  // callbacks: {
  //   session: ({ session, user }) => ({
  //     ...session,
  //     user: {
  //       ...session.user,
  //       id: user.id,
  //       // email: user.email,
  //     },
    // }),
  // },
  pages: {
    signIn: "/signin",
    signOut: "/auth/signout",
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: "/register", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};

//select which provider

const providerType = "google"

let selectedAuthOptions: NextAuthOptions 

console.log("providerType", providerType);
if (providerType === "google") {
  selectedAuthOptions = googleAuthOptions;

} else {
  selectedAuthOptions = credentialsAuthOptions;


}
export const authOptions: NextAuthOptions = selectedAuthOptions;

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};

//TODO:figure out what this does.
//it breaks id: ctx.session?.user?.id when deleted.
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

// TODO: figure how to fix session so it creates a session item in the db upon login
// SESSION OPTION 1
// session({ session, token }) {
//   if (token && session.user) {
//     session.user.id = token.id as string;
//   }
//   return session;
// },
// SESSION OPTION 2
