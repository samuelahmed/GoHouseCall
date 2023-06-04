import { type NextPage } from "next";
import Head from "next/head";
import GoogleMaps from "~/components/maps/map";
import { SessionInfo } from "~/components/sessionPage/sessionInfo";
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
      <div className=" min-h-screen  px-4 py-4 md:flex-row md:px-8 md:py-8">
        <div className="flex flex-col md:flex-row">
          <div className="w-full">
            <div className="space-y-0.5">
              <h2 className="text-center text-2xl font-semibold tracking-tight ">
                Home Care:
                <span className=""> Help around my house</span>
              </h2>
            </div>
            <SessionInfo />
            <SessionActions />
          </div>
          <div className="w-full">
            <div className="px-4 py-4">
              <PotentialCaregiverTable />
            </div>
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
