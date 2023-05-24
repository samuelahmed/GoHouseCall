import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";

// import RootLayout from "./layout";
// import Link from "next/link";

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const { data: sessionData } = useSession();

  
  return (
    <>
      <Head>
        <title>House Call</title>
        <meta name="description" content="Connecting patients and caregivers" />
        <link
          // rel="iscon" not sure what this is
          href="/faviconLarge.png"
        />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center ">
                {sessionData && <span>Logged in as {sessionData.user?.name}</span>}

      </main>
    </>
  );
};

export default Home;
