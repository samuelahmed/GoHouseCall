import { type NextPage } from "next";
import Head from "next/head";
import SettingsLayout from "~/components/settings/settingsLayout";

const Profile: NextPage = () => {
  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Edit your House Call profile" />
      </Head>
      <div className="min-h-screen px-4 py-4 md:px-8 md:py-8">
        <SettingsLayout>
          Profile
        </SettingsLayout>
      </div>
    </>
  );
};

export default Profile;
