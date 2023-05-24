import { type NextPage } from "next";
import Head from "next/head";
import AuthShowcase from "~/components/auth/authShowcase";

// import RootLayout from "./layout";
// import Link from "next/link";

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="House Call" content="Connecting patients and caregivers" />
        <link
          // rel="iscon" not sure what this is
          href="/faviconLarge.png"
        />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center ">
        <AuthShowcase />
      </main>
    </>
  );
};

export default Home;
