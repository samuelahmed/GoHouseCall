import { type NextPage } from "next";
import Head from "next/head";
import { NotificationsForm } from "~/components/settings/notificationsForm";
import SettingsLayout from "~/components/settings/settingsLayout";
import { Separator } from "~/components/ui/separator";
import { RouteSignedOutAndNewUsers } from "~/components/auth/routeSignedOutAndNewUsers";

export const getServerSideProps = RouteSignedOutAndNewUsers("/");

const Notifications: NextPage = () => {
  return (
    <>
      <Head>
        <title>Notifications</title>
        <meta name="description" content="Edit your House Call notifications" />
      </Head>
      <div className="min-h-screen px-4 py-4">
        <SettingsLayout>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Notifications</h3>
              <p className="text-sm text-muted-foreground">
                Manage how you receive notifications from House Call.
              </p>
            </div>
            <Separator />
            <NotificationsForm />
          </div>
        </SettingsLayout>
      </div>
    </>
  );
};

export default Notifications;
