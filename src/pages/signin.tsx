import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/server/auth";
import { Button } from "~/components/ui/button";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { UserAuthForm } from "~/components/auth/userAuthForm";
import Head from "next/head";

export default function SignIn({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) {
  console;
  return (
    <>
      <Head>
        <title>Sign In</title>
        <meta
          name="description"
          content="Sign or create a House Call account"
        />
      </Head>
      <div className=""></div>
      <div className="container relative  h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Button
          variant="outline"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
          onClick={() => void signIn("google")}
        >
          Sign in
        </Button>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-cover">
            <Image
              src="/houseCallLogin2.jpeg"
              width={1280}
              height={843}
              alt="Authentication"
              className="block"
            />
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;House Call helped me find the perfect caregiver for my
                unique needs. I was able to find someone who was not only
                compassionate about my situation but also had the skills to help
                improve my quality of life.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] ">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="mt-20 text-2xl font-semibold tracking-tight md:mt-0">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
              <UserAuthForm />
            </div>
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
