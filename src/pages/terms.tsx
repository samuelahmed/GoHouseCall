import { type NextPage } from "next";
import Head from "next/head";
import { TermsOfServiceAgreement } from "~/components/legal/tos";

const Terms: NextPage = () => {
  return (
    <>
      <Head>
        <title>Terms of Service</title>
        <meta
          name="description"
          content="Terms of Service Agreement of House Call"
        />
      </Head>
      <div className="min-h-screen px-4 py-4 md:px-8 md:py-8">
        <TermsOfServiceAgreement />
      </div>
    </>
  );
};

export default Terms;
