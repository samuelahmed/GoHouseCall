import Image from "next/image";
import { useRouter } from "next/router";
import { Button } from "~/components/ui/button";
import { AspectRatio } from "~/components/ui/aspectRatio";

export function AboutHouseCall() {

  const router = useRouter();

  return (
    <div className="px-2">
      <h1 className="text-center text-3xl md:py-4  md:text-4xl">
        Connecting <span className="text-blue11">Patients </span>
        with <span className="text-blue11">Caregivers</span>
      </h1>
      <div className="grid grid-cols-1 grid-rows-1 md:grid-cols-2 md:grid-rows-1">
        <div className="cols-span-1 flex flex-col px-2 py-4 md:px-4">
          <h2 className="py-2 text-center text-2xl  ">
            Find the perfect caregiver
          </h2>
          <p className=" py-2 ">
            Connect with compassionate caregivers who can assist you with your
            daily needs.
          </p>

          <h2 className="mt-8 py-2 text-center text-2xl ">
            Discover patients who need your help
          </h2>
          <p className="py-2">
            Satisfy your passion by helping patients and earn while doing so.
          </p>
          <h2 className="mt-8 py-2 text-center text-2xl ">
            Build lifelong relationships
          </h2>
          <p className="py-2">
            Meet locals who need your services and caregivers to improve your
            quality of life.
          </p>
        </div>
        <div className="cols-span-1 px-2 py-4 md:px-4">
          <div className="grid grid-cols-1">
            <AspectRatio ratio={16 / 9} className="bg-muted">
              <Image
                src="/aboutSquare2.png"
                alt="House Call Example Patient"
                fill
                className="rounded-md object-cover"
              />
            </AspectRatio>
          </div>
        </div>
        {/* for md screens and up */}
        <div className="cols-span-1 hidden py-4 md:mt-8 md:block md:px-4">
          <div className="col-span-1">
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
        <div className="cols-span-1 flex-center justify-top flex flex-col px-2 md:mt-8 md:px-4">
          <h2 className=" py-2 text-center text-2xl ">Control your sessions</h2>
          <p className="py-2">
            Patients have full control of their sessions and caregivers can
            discover and apply to sessions that fit their skills and schedule.
          </p>
          <h2 className="mt-8 py-2 text-center text-2xl ">
            Meet in the comfort of home
          </h2>
          <p className="py-2">
            By default all sessions are in the comfort of the patients home.
            Ultimately up to the patient and caregiver to decide how to best
            hold their sessions.
          </p>
          <h2 className="mt-8 py-2 text-center text-2xl ">
            Easily get started right now
          </h2>
          <p className="py-2">
            You can get started right now with three easy steps:
          </p>
          <ul>
            <li>1. Register your account</li>
            <li>2. Select your role</li>
            <li>3. Create or apply to sessions</li>
          </ul>
          <div className="my-4 flex items-center justify-center">
            <Button
              className="bg-blue11 hover:bg-blue12"
              variant="default"
              size="lg"
              onClick={() => {
                void router.push("/register");
              }}
            >
              Get Started
            </Button>
          </div>
        </div>
        <div className="cols-span-1 block px-2 md:hidden">
          <div className="col-span-1">
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
        House Call operates the www.gohousecall.com website, which provides the
        service.
      </p>
    </div>
  );
}
