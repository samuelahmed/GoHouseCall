import { type NextPage } from "next";
import Head from "next/head";
import { CreateSessionForm } from "~/components/createSession/createSessionForm";
import CreateSessionLayout from "~/components/createSession/createSessionLayout";
import GoogleMaps from "~/components/maps/map";

import { useState } from "react";
//Who should be able to access this page?

const Sessions: NextPage = () => {
  const [loadedAddress, setLoadedAddress] = useState("");

  function CallBack(address: string) {
    setLoadedAddress(address);
    console.log(loadedAddress, " from callback")
  }

  console.log(loadedAddress, " from create session page")

  return (
    <>
      <Head>
        <title>Create Session</title>
        <meta
          name="description"
          content="Create session form for a patient looking for a caregiver"
        />
      </Head>
      <div className=" flex min-h-screen flex-col px-4 py-4 md:flex-row md:px-8 md:py-8">
        <div className="w-full px-4 py-4">
          <CreateSessionLayout>
            <CreateSessionForm CallBack={CallBack} />
          </CreateSessionLayout>
        </div>
        <div className="flex h-screen max-h-60vh w-full items-center justify-center px-4 py-4 ">
          <GoogleMaps
            googleAddress={loadedAddress}
          />
        </div>
      </div>
    </>
  );
};

export default Sessions;
