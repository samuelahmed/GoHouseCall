import Image from "next/image";
import { useRouter } from "next/router";
import { Button } from "~/components/ui/button";
import { AspectRatio } from "~/components/ui/aspectRatio";
import { signIn } from "next-auth/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Separator } from "~/components/ui/separator";
import { useState } from "react";

export function MessagesDisplay() {
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
                  src="/messages1small.jpg"
                  fill
                  alt="Authentication"
                  className="block "
                />
              )}
              <Image
                loading="lazy"
                src="/messages1.jpeg"
                alt="background image"
                className="object-cover"
                fill
                onLoadingComplete={() => setImg1Loaded(true)}
              />
            </AspectRatio>
            <AspectRatio ratio={16 / 9} className="bg-muted">
              {img2Loaded === false && (
                <Image
                  src="/messages3small.jpg"
                  fill
                  alt="Authentication"
                  className="block "
                />
              )}
              <Image
                loading="lazy"
                src="/messages3.jpeg"
                alt="background image"
                className="object-cover"
                fill
                onLoadingComplete={() => setImg2Loaded(true)}
              />
            </AspectRatio>
            <AspectRatio ratio={16 / 9} className="bg-muted">
              {img3Loaded === false && (
                <Image
                  src="/messages2small.jpg"
                  fill
                  alt="Authentication"
                  className="block "
                />
              )}
              <Image
                loading="lazy"
                src="/messages2.jpeg"
                alt="background image"
                className="object-cover"
                fill
                onLoadingComplete={() => setImg3Loaded(true)}
              />
            </AspectRatio>
            <AspectRatio ratio={16 / 9} className="bg-muted">
              {img4Loaded === false && (
                <Image
                  src="/messages4small.jpg"
                  fill
                  alt="Authentication"
                  className="block "
                />
              )}
              <Image
                loading="lazy"
                src="/messages4.jpeg"
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
              className="min-w-85vw max-w-85vw  md:min-w-60vw md:max-w-60vw"
            >
              <TabsList className="h-full w-full rounded-xl  bg-white p-2 md:p-4">
                <TabsTrigger
                  className="w-full text-base text-black hover:font-bold data-[state=active]:shadow-none md:text-lg lg:text-xl"
                  value="houseCall"
                >
                  Messages
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
                  <h1 className="py-4 text-3xl  font-semibold lg:text-5xl">
                    Directly <span className="text-blue11">chat</span> together
                    to create the perfect care session
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
                    Get to know your{" "}
                    <span className="text-blue11">caregiver</span> before
                    meeting and ask any questions
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
                    Easily send messages to your
                    <span className="text-blue11"> patients </span> without any
                    downloads
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
