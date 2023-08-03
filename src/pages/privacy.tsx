import { type NextPage } from "next";
import Head from "next/head";
import { PrivacyPolicy } from "~/components/legal/privacyPolicy";

const Privacy: NextPage = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy</title>
        <meta name="description" content="Privacy policy of House Call" />
      </Head>
      <div className="min-h-screen px-4 py-4 md:px-8 md:py-8">
        <PrivacyPolicy />
      </div>
    </>
  );
};

export default Privacy;
