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
            Care in the <span className="text-blue11">comfort </span>
            of your <span className="text-blue11">home</span>
          </h1>
        </div>
        <div className="grid w-full grid-cols-1 px-4 py-4 md:grid-cols-1">
          <div className="w-full">
            <div className="px-2 py-2">
              <AspectRatio ratio={16 / 7} className="bg-muted ">
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
              <AspectRatio ratio={16 / 7} className="bg-muted">
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
              House Call’s mission is to improve your quality of life by
              connecting patients and caregivers. If you or a loved one needs
              help, you can create care sessions, by describing your needs and
              be directly connected to local caregivers to hire.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="shadow hover:shadow-inner">
          <CardHeader>
            <CardTitle className="text-center text-xl md:text-2xl lg:text-3xl">
              Caregivers
            </CardTitle>
            <CardDescription className="text-lg">
              Caregivers are passionate and have the skills to help patients
              with their needs. They can apply directly to care sessions created
              by patients and be hired for one time jobs.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="shadow hover:shadow-inner">
          <CardHeader>
            <CardTitle className="text-center text-xl md:text-2xl lg:text-3xl">
              Sessions
            </CardTitle>
            <CardDescription className="text-lg">
              Care sessions are the way that Go House Call connects patients and
              caregivers. They are one-time-jobs in which the patient is the
              boss seeking to directly hire caregivers. Caregivers can apply to
              the care sessions which they have the skills to fulfill. After a
              quick chat to make sure there is alignment, patients can then hire
              the caregiver which they desire and they meet on the scheduled
              day, time, and location.
            </CardDescription>
          </CardHeader>
        </Card>
        <div className="flex flex-col justify-between space-y-4 sm:flex-row md:space-x-4 md:space-y-0">
          <Card className="w-full shadow hover:shadow-inner">
            <CardHeader>
              <CardTitle className="text-center text-xl md:text-2xl lg:text-3xl">
                How does it work?
              </CardTitle>
              <CardContent className="-p-6 text-lg text-muted-foreground">
                <p className="">
                  You can easily hire caregivers or find patients
                </p>
                <ul>
                  <li>1. Patient creates care session</li>
                  <li>2. Caregivers apply to care session</li>
                  <li>3. Patient hires their select caregiver</li>
                  <li>
                    4. Caregiver meets patient at their location for session
                  </li>
                  <li>5. Caregiver is paid for their work</li>
                </ul>
              </CardContent>
            </CardHeader>
          </Card>
          <Card className="w-full shadow hover:shadow-inner">
            <CardHeader>
              <CardTitle className="text-center text-xl md:text-2xl lg:text-3xl">
                Easily get started right now
              </CardTitle>
              <CardContent className="-p-6 text-lg text-muted-foreground">
                <p className="">
                  You can get started right now with three easy steps
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
      </div>
    </>
  );
}
