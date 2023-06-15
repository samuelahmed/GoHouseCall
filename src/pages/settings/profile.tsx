import { type NextPage } from "next";
import Head from "next/head";
import SettingsLayout from "~/components/settings/settingsLayout";
import { Separator } from "~/components/ui/separator";
import { PatientProfileForm } from "~/components/settings/patientProfileForm";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { RouteSignedOutAndNewUsers } from "~/components/auth/routeSignedOutAndNewUsers";
import { CaregiverProfileForm } from "~/components/settings/caregiverProfileForm";
import { api } from "~/utils/api";

export const getServerSideProps = RouteSignedOutAndNewUsers("/");

const Profile: NextPage = () => {
  const { data: sessionData } = useSession();
  console.log(sessionData);
  const { data: user } = api.settingsAPI.userHC_Account.useQuery();
  console.log(user?.type);

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
                Manage your House Call profile information.
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
            {user?.type === "patient" ? <PatientProfileForm /> : null}
            {user?.type === "caregiver" ? <CaregiverProfileForm /> : null}
          </div>
        </SettingsLayout>
      </div>
    </>
  );
};

export default Profile;
