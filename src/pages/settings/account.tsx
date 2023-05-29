import { type NextPage } from "next";
import Head from "next/head";
import SettingsLayout from "~/components/settings/settingsLayout";
import { AccountForm } from "~/components/settings/accountForm";

const Account: NextPage = () => {
  return (
    <>
      <Head>
        <title>Account</title>
        <meta name="description" content="Edit your House Call account" />
      </Head>
      <div className="min-h-screen px-4 py-4 md:px-8 md:py-8">
        <SettingsLayout>
          < AccountForm />
        </SettingsLayout>
      </div>
    </>
  );
};

export default Account;
