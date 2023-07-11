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
  const id = router.query.careSessionId;
  const { data: currentSession } =
    api.careSessionAPI.getCareSessionById.useQuery({ id: id as string });

  const googleAddress =
    (currentSession?.address || "") +
    " " +
    (currentSession?.city || "") +
    " " +
    (currentSession?.zip || "");

  const { data: currentUser } = api.userAPI.currentUser.useQuery();
  const currentUserType = currentUser?.type;


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
              sessionDescription={currentSession?.description as string}
              sessionStart={currentSession?.startTime as string}
              sessionEnd={currentSession?.endTime as string}
              sessionDuration={currentSession?.duration as number}
              sessionHourlyRate={currentSession?.hourlyRate as number}
              sessionTotal={currentSession?.total as number}
            />
            <SessionActions 
            sessionId={currentSession?.id as string}
            sessionUserId={currentSession?.userId as string}
            sessionStatus={currentSession?.status as string}
            userType={currentUserType as string}
            userId={currentUser?.userId as string}
            
            />
          </div>
          <div className="w-full">
            <div className="px-4 py-4">
              <PotentialCaregiverTable
              sessionId={currentSession?.id as string}
              />
            </div>
          </div>
        </div>
        <div className="flex h-screen max-h-60vh w-full items-center justify-center px-4 py-4 ">
          <GoogleMaps googleAddress={googleAddress} />
        </div>
      </div>
    </>
  );
};

export default CareSession;
