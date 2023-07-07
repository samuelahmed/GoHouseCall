import { type NextPage } from "next";
import Head from "next/head";
import GoogleMaps from "~/components/maps/map";
import { SessionInfo } from "~/components/sessionPage/sessionInfo";
import SessionActions from "~/components/sessionPage/sessionActions";
import { PotentialCaregiverTable } from "~/components/sessionPage/potentialCaregiverTable";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

//lock out the page if the user is not logged in

const CareSession: NextPage = () => {
  const router = useRouter();

  //find the session by id
  const id = router.query.careSessionId;
  //get the session data using the id
  const { data: currentSession } =
    api.careSessionAPI.getCareSessionById.useQuery({ id: id as string });

  //push the session data to the right components

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
                {currentSession?.sessionType}:
                <span className=""> {currentSession?.title}</span>
              </h2>
            </div>
            <SessionInfo
                sessionStatus={currentSession?.status as string}
                sessionDate={currentSession?.date as Date}
            
            />
            <SessionActions />
          </div>
          <div className="w-full">
            <div className="px-4 py-4">
              <PotentialCaregiverTable />
            </div>
          </div>
        </div>
        <div className="flex h-screen max-h-60vh w-full items-center justify-center px-4 py-4 ">
          <GoogleMaps googleAddress="1234 Main St, San Francisco, CA 94122, USA" />
        </div>
      </div>
    </>
  );
};

export default CareSession;
