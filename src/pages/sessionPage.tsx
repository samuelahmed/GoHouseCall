import { type NextPage } from "next";
import Head from "next/head";
import GoogleMaps from "~/components/maps/map";

const Sessions: NextPage = () => {
  return (
    <>
      <Head>
        <title>Session Page</title>
        <meta
          name="description"
          content="House Call session created by a patient looking for a caregiver"
        />
      </Head>
      <div className="h-screen">
< GoogleMaps />

      </div>
    </>
  );
};

export default Sessions;
