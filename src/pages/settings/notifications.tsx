import { type NextPage } from "next";
import Head from "next/head";
import SettingsLayout from "~/components/settings/settingsLayout";

const Notifications: NextPage = () => {
  return (
    <>
      <Head>
        <title>Notifications</title>
        <meta name="description" content="Edit your House Call Notifications" />
      </Head>
      <div className="min-h-screen px-4 py-4 md:px-8 md:py-8">
        <SettingsLayout>
          Notifications
        </SettingsLayout>
      </div>
    </>
  );
};

export default Notifications;
