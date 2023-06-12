import { type NextPage } from "next";
import Head from "next/head";
import { CaregiverInfo } from "~/components/caregiverProfile/caregiverInfo";

//Who should be able to access this page?

const CaregiverProfile: NextPage = () => {
  return (
    <>
      <Head>
        <title>Caregiver Profile</title>
        <meta
          name="description"
          content="Unique profile about a House Call caregiver"
        />
      </Head>
      <div className=" min-h-screen px-4 py-4">
        <div className="w-full">
          <CaregiverInfo />
        </div>
      </div>
    </>
  );
};

export default CaregiverProfile;
