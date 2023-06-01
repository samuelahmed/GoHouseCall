import { type NextPage } from "next";
import Head from "next/head";
import GoogleMaps from "~/components/maps/map";
import SessionLayout from "~/components/sessionPage/sessionLayout";
// import SessionInfo from "~/components/sessionPage/sessionInfo";
import { SessionInfo } from "~/components/sessionPage/sessionInfo";
import { Separator } from "~/components/ui/separator";

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
      <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Care Session: 392348</h2>
        </div>
        <Separator className="my-4" />

      <div className="flex min-h-screen flex-col px-4 py-4 md:flex-row md:px-8 md:py-8">
        <div className="w-full">
          <SessionInfo />
        </div>

        <div className="flex h-full w-full items-center justify-center bg-yellow-300">
          <GoogleMaps />
        </div>
      </div>
    </>
  );
};

export default Sessions;
