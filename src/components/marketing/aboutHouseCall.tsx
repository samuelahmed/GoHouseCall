import Image from "next/image";
import { useRouter } from "next/router";
import { Button } from "~/components/ui/button";
import { AspectRatio } from "~/components/ui/aspectRatio";
import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { useState } from "react";

export function AboutHouseCall() {
  const router = useRouter();
  const [img1Loaded, setImg1Loaded] = useState(false);
  const [img2Loaded, setImg2Loaded] = useState(false);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex w-full items-center justify-center px-4 py-4">
          <h1 className="overflow-hidden py-4 text-6xl font-bold xl:text-8xl">
            Care in the comfort <span className="text-blue11">comfort </span>
            of your <span className="text-blue11">home</span>
          </h1>
        </div>
        <div className="grid w-full grid-cols-1 px-4 py-4 md:grid-cols-2">
          <div className="flex h-full flex-col content-around space-y-2 px-2">
            <div className="h-full">
              <Card className="shadow hover:shadow-inner">
                <CardHeader>
                  <CardTitle className="text-center ">
                    Find the perfect caregiver
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>
            <div className="h-full">
              <Card className="shadow hover:shadow-inner">
                <CardHeader>
                  <CardTitle className="text-center">
                    Control your sessions
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>
            <div className="h-full">
              <Card className="shadow hover:shadow-inner">
                <CardHeader>
                  <CardTitle className="text-center">
                    Build lifelong relationships
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>
            <div className="h-full">
              <Card className="shadow hover:shadow-inner">
                <CardHeader>
                  <CardTitle className="text-center">
                    Discover patients who need your help
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>
          </div>
          <div className="w-full">
            <div className="px-2 py-2">
              <AspectRatio ratio={16 / 9} className="bg-muted ">
                {img1Loaded === false && (
                  <Image
                    src="/aboutSquare2small.jpg"
                    fill
                    alt="Authentication"
                    className="block "
                  />
                )}
                <Image
                  loading="lazy"
                  src="/aboutSquare2.png"
                  alt="House Call Example Patient"
                  fill
                  className="rounded-md object-cover"
                  onLoadingComplete={() => setImg1Loaded(true)}
                />
              </AspectRatio>
            </div>
            <div className="px-2 py-2">
              <AspectRatio ratio={16 / 9} className="bg-muted">
                {img2Loaded === false && (
                  <Image
                    src="/aboutSquare1small.jpg"
                    fill
                    alt="Authentication"
                    className="block "
                  />
                )}
                <Image
                  loading="lazy"
                  src="/aboutSquare1.png"
                  alt="House Call Example Patient"
                  fill
                  className="rounded-md object-cover"
                  onLoadingComplete={() => setImg2Loaded(true)}
                />
              </AspectRatio>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4 px-4 py-4">
        <Card className="shadow hover:shadow-inner">
          <CardHeader>
            <CardTitle className="text-center text-xl md:text-2xl lg:text-3xl">
              Patients
            </CardTitle>
            <CardDescription className="text-lg">
              We built House Call to help patients improve their quality of
              life. Anyone who needs help with their daily activities is welcome
              to join House Call and create sessions that describe their needs.
              While we are not a medical service, we do allow patients to create
              sessions that describe their needs and what they are looking for
              in a caregiver, so they can fill any gaps in their heath plans. We
              encourage patients to consult with their doctor before creating a
              session.{" "}
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="shadow hover:shadow-inner">
          <CardHeader>
            <CardTitle className="text-center text-xl md:text-2xl lg:text-3xl">
              Caregivers
            </CardTitle>
            <CardDescription className="text-lg">
              Caregivers are the backbone of House Call. They are passionate to
              help patients improve their quality of life and make a real
              difference. Anyone who feels the drive to help those in need is
              welcome to apply to become a caregiver.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="shadow hover:shadow-inner">
          <CardHeader>
            <CardTitle className="text-center text-xl md:text-2xl lg:text-3xl">
              Sessions
            </CardTitle>
            <CardDescription className="text-lg">
              Care sessions are the core of House Call. They are created by
              patients to describe their needs. Caregivers can apply to sessions
              that match their skills and interests. When a caregiver applies to
              a session, the patient will be able to message them to discuss
              details, make sure they are a good fit, and ultimatelly accept
              them as their caregiver.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="shadow hover:shadow-inner">
          <CardHeader>
            <CardTitle className="text-center text-xl md:text-2xl lg:text-3xl">
              Easily get started right now
            </CardTitle>
            <CardContent className="-p-6 text-lg text-muted-foreground">
              <p className="">
                You can get started right now with three easy steps:
              </p>
              <ul>
                <li>1. Register your account</li>
                <li>2. Select your role</li>
                <li>3. Create or apply to sessions</li>
              </ul>
            </CardContent>
          </CardHeader>
          <div className="flex px-4 pb-4 ">
            <Button
              size="lg"
              onClick={() => {
                void router.push("/register");
              }}
            >
              Register
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}
