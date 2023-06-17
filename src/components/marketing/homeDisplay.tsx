import Image from "next/image";
import { useRouter } from "next/router";
import { Button } from "~/components/ui/button";
import { AspectRatio } from "~/components/ui/aspectRatio";
import { signIn } from "next-auth/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Separator } from "~/components/ui/separator";
import { useState } from "react";

export function HomeDisplay() {
  const router = useRouter();
  const [img1Loaded, setImg1Loaded] = useState(false);
  const [img2Loaded, setImg2Loaded] = useState(false);
  const [img3Loaded, setImg3Loaded] = useState(false);
  const [img4Loaded, setImg4Loaded] = useState(false);

  return (
    <>
      <div className="relative">
        <div className="absolute inset-0">
          <div className="grid max-h-screen min-h-screen grid-cols-2 overflow-hidden">
            <AspectRatio ratio={16 / 9} className="bg-muted">
              {img1Loaded === false && (
                <Image
                  src="/housecalloption2small.jpg"
                  fill
                  alt="Authentication"
                  className="block "
                />
              )}
              <Image
                loading="lazy"
                src="/housecalloption2.jpeg"
                alt="background image"
                className="object-cover"
                fill
                onLoadingComplete={() => setImg1Loaded(true)}
              />
            </AspectRatio>
            <AspectRatio ratio={16 / 9} className="bg-muted">
              {img2Loaded === false && (
                <Image
                  src="/housecalloption6small.jpg"
                  fill
                  alt="Authentication"
                  className="block "
                />
              )}
              <Image
                loading="lazy"
                src="/housecalloption6.jpeg"
                alt="background image"
                className="object-cover"
                fill
                onLoadingComplete={() => setImg2Loaded(true)}
              />
            </AspectRatio>
            <AspectRatio ratio={16 / 9} className="bg-muted">
              {img3Loaded === false && (
                <Image
                  src="/housecalloption4small.jpg"
                  fill
                  alt="Authentication"
                  className="block "
                />
              )}
              <Image
                loading="lazy"
                src="/housecalloption4.jpeg"
                alt="background image"
                className="object-cover"
                fill
                onLoadingComplete={() => setImg3Loaded(true)}
              />
            </AspectRatio>
            <AspectRatio ratio={16 / 9} className="bg-muted">
              {img4Loaded === false && (
                <Image
                  src="/housecalloption5small.jpg"
                  fill
                  alt="Authentication"
                  className="block "
                />
              )}
              <Image
                loading="lazy"
                src="/housecalloption5.jpeg"
                alt="background image"
                className="object-cover"
                fill
                onLoadingComplete={() => setImg4Loaded(true)}
              />
            </AspectRatio>
          </div>
        </div>
        <div className="z s-10 relative flex h-screen items-center justify-center">
          <div className="flex flex-col rounded-xl bg-white shadow-2xl hover:shadow-none">
            <Tabs
              defaultValue="houseCall"
              className="min-w-85vw max-w-85vw  md:min-w-50vw md:max-w-50vw"
            >
              <TabsList className="h-full w-full rounded-xl  bg-white p-2 md:p-4">
                <TabsTrigger
                  className="w-full text-base text-black hover:font-bold data-[state=active]:shadow-none md:text-lg lg:text-xl"
                  value="houseCall"
                >
                  Mission
                </TabsTrigger>
                <TabsTrigger
                  className="w-full text-base text-black hover:font-bold data-[state=active]:shadow-none md:text-lg lg:text-xl"
                  value="patients"
                >
                  Patients
                </TabsTrigger>

                <TabsTrigger
                  className="stext-base w-full text-black hover:font-bold data-[state=active]:shadow-none md:text-lg lg:text-xl"
                  value="caregivers"
                >
                  Caregivers
                </TabsTrigger>
              </TabsList>
              <Separator />
              <TabsContent value="houseCall">
                <div className="w-full rounded-xl bg-white p-4 md:p-10">
                  <h1 className="py-4 text-3xl font-semibold lg:text-5xl">
                    Connecting <span className="text-blue11">patients </span>
                    and <span className="text-blue11">caregivers</span>
                  </h1>
                  <div className="flex justify-end space-x-2 py-4 ">
                    <Button
                      size="lg"
                      onClick={() => {
                        void router.push("/about");
                      }}
                    >
                      Learn More
                    </Button>
                    <Button
                      size="lg"
                      onClick={() => {
                        void router.push("/register");
                      }}
                    >
                      Get Started
                    </Button>
                    <Button
                      className="hidden md:block"
                      size="lg"
                      onClick={() => {
                        void signIn();
                      }}
                    >
                      Sign In
                    </Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="patients">
                <div className=" w-full rounded-xl bg-white p-4 md:p-10">
                  <h1 className="py-4 text-3xl font-semibold lg:text-5xl">
                    Find local <span className="text-blue11">caregivers </span>{" "}
                    to help you and your loved ones
                  </h1>
                  <div className="flex justify-end space-x-2 py-4">
                    <Button
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
              </TabsContent>
              <TabsContent value="caregivers">
                <div className=" w-full rounded-xl bg-white p-4 md:p-10">
                  <h1 className="py-4 text-3xl font-semibold lg:text-5xl">
                    Discover <span className="text-blue11">patients </span>
                    that need your help and earn extra income
                  </h1>
                  <div className="flex justify-end space-x-2 py-4">
                    <Button
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
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
