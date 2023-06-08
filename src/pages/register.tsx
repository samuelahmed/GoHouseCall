import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { UserRegisterForm } from "~/components/auth/userRegisterForm";
import { type NextPage } from "next";
import { RouteSignedInUser } from "~/components/auth/routeSignedInUser";

export const getServerSideProps = RouteSignedInUser("/");

const Register: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sign In</title>
        <meta
          name="description"
          content="Register to create your House Call account"
        />
      </Head>
      <div className="container relative min-h-screen flex-col items-center justify-center pb-4 md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 overflow-hidden bg-cover">
            <Image
              src="/houseCallLogin6.jpeg"
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
                Create Your Account
              </h1>
              <p className="text-sm text-muted-foreground">
                Create an account with your email address and password.
              </p>
              <UserRegisterForm />
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
};

export default Register;
