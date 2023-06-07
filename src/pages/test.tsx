import { type NextPage } from "next";
import Head from "next/head";
import { TermsOfServiceAgreement } from "~/components/legal/tos";

import RegisterForm from "~/components/auth/credentialsRegisterForm";

const Test: NextPage = () => {
  return (
    <>
      <Head>
        <title>Test</title>
        <meta
          name="description"
          content="Terms of Service Agreement of House Call"
        />
      </Head>
      <div className="min-h-screen px-4 py-4 md:px-8 md:py-8">
        {/* <TermsOfServiceAgreement /> */}
       < RegisterForm />
      </div>
    </>
  );
};

export default Test;
