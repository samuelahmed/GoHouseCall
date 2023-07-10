import { type NextPage } from "next";
import Head from "next/head";
import { CaregiverInfo } from "~/components/caregiverProfile/caregiverInfo";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

//Who should be able to access this page?

const CaregiverProfile: NextPage = () => {
  const router = useRouter();
  const id = router.query.profileId;

  const { data: currentCaregiver } = api.userAPI.getUserById.useQuery({
    id: id as string,
  });

  console.log(currentCaregiver);

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
          <CaregiverInfo
            name={currentCaregiver?.name as string}
            image={currentCaregiver?.image as string}
            type={currentCaregiver?.type as string}
            city={currentCaregiver?.city as string}
            bio={currentCaregiver?.bio as string}
          />
        </div>
      </div>
    </>
  );
};

export default CaregiverProfile;
