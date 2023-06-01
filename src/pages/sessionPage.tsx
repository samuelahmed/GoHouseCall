import { type NextPage } from "next";
import Head from "next/head";
import GoogleMaps from "~/components/maps/map";
import SessionLayout from "~/components/sessionPage/sessionActions";
// import SessionInfo from "~/components/sessionPage/sessionInfo";
import { SessionInfo } from "~/components/sessionPage/sessionInfo";
import { Separator } from "~/components/ui/separator";
import SessionActions from "~/components/sessionPage/sessionActions";
import { PotentialCaregiverTable } from "~/components/sessionPage/potentialCaregiverTable";

const Sessions: NextPage = () => {
  return (
    <>
      <Head>
        <title>Care Session</title>
        <meta
          name="description"
          content="House Call session created by a patient looking for a caregiver"
        />
      </Head>

      <Separator className="my-4" />
      <div className=" min-h-screen  px-4 py-4 md:flex-row md:px-8 md:py-8">
        <div className="flex flex-col md:flex-row">
          <div className="w-full">
            <div className="space-y-0.5">
              <h2 className="text-center text-2xl font-bold tracking-tight">
                Care Session: 392348
              </h2>
            </div>
            <SessionInfo />
            <SessionActions />
          </div>
          <div className="w-full">
            <h3 className="text-center font-bold tracking-tight">
              Potential Caregivers
            </h3>
            <PotentialCaregiverTable />
          </div>
        </div>

        <div className="flex h-screen max-h-60vh w-full items-center justify-center px-4 py-4 ">
          <GoogleMaps />
        </div>
      </div>
    </>
  );
};

export default Sessions;