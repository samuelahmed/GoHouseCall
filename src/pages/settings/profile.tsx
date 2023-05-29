import { type NextPage } from "next";
import Head from "next/head";
import SettingsLayout from "~/components/settings/settingsLayout";
import { Separator } from "~/components/ui/separator";
import { ProfileForm } from "~/components/settings/profileForm";

const Profile: NextPage = () => {
  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Edit your House Call profile" />
      </Head>
      <div className="min-h-screen px-4 py-4 md:px-8 md:py-8">
        <SettingsLayout>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Profile</h3>
              <p className="text-sm text-muted-foreground">
                Public information about your account that will be visible to House Call users.
              </p>
            </div>
            <Separator />
            <ProfileForm />
          </div>
        </SettingsLayout>
      </div>
    </>
  );
};

export default Profile;
