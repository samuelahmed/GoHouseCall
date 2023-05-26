import { type NextPage } from "next";
import Head from "next/head";
import { AboutHouseCall } from "~/components/marketing/aboutHouseCall";

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>About</title>
        <meta
          name="description"
          content="About House Call"
        />
      </Head>
      <div className="min-h-screen px-4 py-4 md:px-8 md:py-8">
        <AboutHouseCall />
      </div>
    </>
  );
};

export default About;
