"use client";

import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";

// import { authOptions } from "~/server/auth";


import { Button } from "~/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Command } from "lucide-react";
import { cn } from "~/lib/utils";
import { buttonVariants } from "~/components/ui/button";
// import { UserAuthForm } from "~/app/examples/authentication/components/user-auth-form"
import { UserAuthForm } from "~/components/ui/userAuthForm";

export default function SignIn() {

  // providers,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (

    <>



   



    </>
  );
}

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
//   const session = await getServerSession();

//   // If the user is already logged in, redirect.
//   // Note: Make sure not to redirect to the same page
//   // To avoid an infinite loop!
//   if (session) {
//     return { redirect: { destination: "/" } };
//   }

//   const providers = await getProviders();

//   return {
//     props: { providers: providers ?? [] },
//   };
// }
