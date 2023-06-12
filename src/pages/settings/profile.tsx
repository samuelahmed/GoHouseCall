import { type NextPage } from "next";
import Head from "next/head";
import SettingsLayout from "~/components/settings/settingsLayout";
import { Separator } from "~/components/ui/separator";
import { ProfileForm } from "~/components/settings/profileForm";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { RouteSignedOutAndNewUsers } from "~/components/auth/routeSignedOutAndNewUsers";

export const getServerSideProps = RouteSignedOutAndNewUsers("/");

const Profile: NextPage = () => {
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Edit your House Call profile" />
      </Head>
      <div className="min-h-screen px-4 py-4">
        <SettingsLayout>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Profile</h3>
              <p className="text-sm text-muted-foreground">
                Public information about your account that will be visible to
                House Call users.
              </p>
            </div>
            <Separator />
            <Avatar className="h-20 w-20 rounded-full object-cover">
              <AvatarImage src={sessionData?.user?.image || ""} />
              <AvatarFallback>{sessionData?.user?.name || ""}</AvatarFallback>
            </Avatar>
            <Button size="sm" variant="outline">
              Change profile picture
            </Button>
            <ProfileForm
              name={sessionData?.user?.name || ""}
              username={""}
              email={""}
              bio={""}
            />
          </div>
        </SettingsLayout>
      </div>
    </>
  );
};

export default Profile;
