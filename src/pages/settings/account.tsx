import { type NextPage } from "next";
import Head from "next/head";
import SettingsLayout from "~/components/settings/settingsLayout";
import { AccountForm } from "~/components/settings/accountForm";
import { Separator } from "~/components/ui/separator";

const Account: NextPage = () => {
  return (
    <>
      <Head>
        <title>Account</title>
        <meta name="description" content="Edit your House Call account" />
      </Head>
      <div className="min-h-screen px-4 py-4 md:px-8 md:py-8">
        <SettingsLayout>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Account</h3>
              <p className="text-sm text-muted-foreground">
                Private settings and personal information for your account.
              </p>
            </div>
            <Separator />
            <AccountForm />
          </div>
        </SettingsLayout>
      </div>
    </>
  );
};

export default Account;
