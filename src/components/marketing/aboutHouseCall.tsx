import Image from "next/image";
import { useRouter } from "next/router";
import { Button } from "~/components/ui/button";
import { AspectRatio } from "~/components/ui/aspectRatio";

export function AboutHouseCall() {
  const router = useRouter();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className=" w-full px-4 py-4 ">
          <h1 className="overflow-hidden py-4 text-4xl font-bold md:text-8xl">
            Care in the comfort <span className="text-blue11">comfort </span>
            of your <span className="text-blue11">home</span>
          </h1>
        </div>

        <div className="grid w-full grid-cols-1 px-4 py-4 md:grid-cols-2">
          {/* <div className=" flex"> */}
          <ul className=" grid w-full list-disc content-around px-4 py-4">
            <li className="text-lg md:text-2xl ">Find the perfect caregiver</li>

            <li className="text-lg md:text-2xl ">Control your sessions</li>

            <li className="text-lg md:text-2xl ">
              Build lifelong relationships
            </li>
            <li className=" text-lg md:text-2xl ">
              Discover patients who need your help
            </li>
          </ul>

          <div className="w-full">
            <div className="px-2 py-2">
              <AspectRatio ratio={16 / 9} className="bg-muted ">
                <Image
                  src="/aboutSquare2.png"
                  alt="House Call Example Patient"
                  fill
                  className="rounded-md object-cover"
                />
              </AspectRatio>
            </div>

            <div className="px-2 py-2">
              <AspectRatio ratio={16 / 9} className="bg-muted">
                <Image
                  src="/aboutSquare1.png"
                  alt="House Call Example Patient"
                  fill
                  className="rounded-md object-cover"
                />
              </AspectRatio>
            </div>
          </div>
        </div>
      </div>

      <div className="my-4 flex items-center justify-center">
        <Button
          className="bg-blue11 hover:bg-blue12"
          variant="default"
          size="lg"
          onClick={() => {
            void router.push("/register");
          }}
        >
          Register
        </Button>
      </div>
      <h1 className="py-4 text-center text-3xl md:py-2 md:text-4xl">
        Our Community
      </h1>
      <h2 className="py-1 text-2xl md:py-2">Patients</h2>
      <p className="py-1 md:py-2">
        We built House Call to help patients improve their quality of life.
        Anyone who needs help with their daily activities is welcome to join
        House Call and create sessions that describe their needs. While we are
        not a medical service, we do allow patients to create sessions that
        describe their needs and what they are looking for in a caregiver, so
        they can fill any gaps in their heath plans. We encourage patients to
        consult with their doctor before creating a session.
      </p>
      <h2 className="py-1 text-2xl md:py-2">Caregivers</h2>
      <p className="py-1 md:py-2">
        Caregivers are the backbone of House Call. They are passionate to help
        patients improve their quality of life and make a real difference.
        Anyone who feels the drive to help those in need is welcome to apply to
        become a caregiver.
      </p>
      <h2 className="py-1 text-2xl md:py-2">Sessions</h2>
      <p className="py-1 md:py-2">
        Care sessions are the core of House Call. They are created by patients
        to describe their needs. Caregivers can apply to sessions that match
        their skills and interests. When a caregiver applies to a session, the
        patient will be able to message them to discuss details, make sure they
        are a good fit, and ultimatelly accept them as their caregiver.
      </p>

      <h2 className="py-1 text-2xl md:py-2">Easily get started right now</h2>
      <p className="py-1 md:py-2">
        You can get started right now with three easy steps:
      </p>
      <ul>
        <li>1. Register your account</li>
        <li>2. Select your role</li>
        <li>3. Create or apply to sessions</li>
      </ul>
    </>
  );
}
