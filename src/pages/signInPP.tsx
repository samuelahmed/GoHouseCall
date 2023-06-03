import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import NextAuth from "./api/auth/[...nextauth]";
import { Button } from "~/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { buttonVariants } from "~/components/ui/button";
import { UserAuthForm } from "~/components/ui/userAuthForm";

export default function SignInMeow({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
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
          <div
            className="absolute inset-0 bg-cover"
            // style={{
            //   backgroundImage:
            //     "url(https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80)",
            // }}
          >
            <Image
              src="/houseCallLogin4.jpeg"
              width={1280}
              height={843}
              alt="Authentication"
              className="block"
            />
          </div>

          {/* <div className="relative z-20 flex items-center text-lg font-medium">
             House Call
          </div> */}
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

      {/* {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => void signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))} */}
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const session = await getServerSession(context.req, context.res, NextAuth);

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