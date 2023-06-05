import { type NextPage } from "next";
import Head from "next/head";
import SettingsLayout from "~/components/settings/settingsLayout";
import { AccountForm } from "~/components/settings/accountForm";
import { Separator } from "~/components/ui/separator";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";






  //keep as example for now
    //   const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    //     undefined, // no input
    //     { enabled: sessionData?.user !== undefined }
    //   );

const Account: NextPage = () => {
  const { data: sessionData } = useSession();


//   const { data: userInfo } = api.settings.readCurrentUser.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined }

// );

// console.log(userInfo)
// console.log(sessionData)




  return (
    <>
      <Head>
        <title>Account</title>
        <meta name="description" content="Edit your House Call account" />
      </Head>
      <div className="min-h-screen px-4 py-4 ">
        <SettingsLayout>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Account</h3>
              <p className="text-sm text-muted-foreground">
                Private settings and personal information for your account.
              </p>
            </div>
            <Separator />
            <AccountForm
              name={sessionData?.user?.name || ""}
              address={""}
              city={""}
              zip={""}
            
            />
          </div>
        </SettingsLayout>
      </div>
    </>
  );
};

export default Account;
