import Image from "next/image";
import { useRouter } from "next/router";
import { Button } from "~/components/ui/button";
import { AspectRatio } from "~/components/ui/aspectRatio";
import { signIn } from "next-auth/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export function HomeDisplay() {
  const router = useRouter();

  return (
    <>
      <div className="relative">
        <div className="absolute inset-0">
          <div className="grid max-h-screen min-h-screen grid-cols-2 overflow-hidden">
            <AspectRatio ratio={16 / 9} className="bg-muted">
              <Image
                src="/housecalloption2.jpeg"
                alt="background image"
                className="object-cover"
                fill
              />
            </AspectRatio>
            <AspectRatio ratio={16 / 9} className="bg-muted">
              <Image
                src="/housecalloption6.jpeg"
                alt="background image"
                className="object-cover"
                fill
              />
            </AspectRatio>

            <AspectRatio ratio={16 / 9} className="bg-muted">
              <Image
                src="/housecalloption4.jpeg"
                alt="background image"
                className="object-cover"
                fill
              />
            </AspectRatio>
            <AspectRatio ratio={16 / 9} className="bg-muted">
              <Image
                src="/housecalloption5.jpeg"
                alt="background image"
                className="object-cover"
                fill
              />
            </AspectRatio>
          </div>
        </div>
        {/* //  bg-gradient-to-r from-white via-white to-blue11 */}

        <div className="z s-10 relative flex max-h-screen min-h-screen items-center justify-center">
          <div className="max-h-50vh min-h-50vh mx-20 flex flex-col items-center justify-center bg-white">
            <Tabs defaultValue="houseCall" className="w-full rounded-none">
              <TabsList className="w-full rounded-none">
                <TabsTrigger className="w-full rounded-none" value="houseCall">
                  House Call
                </TabsTrigger>
                <TabsTrigger className="w-full rounded-none" value="patients">
                  Patients
                </TabsTrigger>

                <TabsTrigger className="w-full rounded-none" value="caregivers">
                  Caregivers
                </TabsTrigger>
              </TabsList>
              <TabsContent value="houseCall">
                <div className="w-full px-4 py-4">
                  <h1 className="py-4 text-6xl font-bold  lg:text-8xl">
                    Connecting <span className="text-blue11">Patients </span>
                    with <span className="text-blue11">Caregivers</span>
                  </h1>
                  <div className="flex justify-end space-x-2 py-4">
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
                        void router.push("/signin");
                      }}
                    >
                      Register
                    </Button>
                    <Button
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
                <div className=" w-full px-4 py-4">
                  <h1 className="py-4 text-6xl font-bold  lg:text-8xl">
                    Find local <span className="text-blue11">Caregivers </span>{" "}
                    to help you and your loved ones
                  </h1>
                  <div className="flex justify-end space-x-2 py-4">
                    <Button
                      variant="default"
                      size="lg"
                      onClick={() => {
                        void router.push("/signin");
                      }}
                    >
                      Get Started
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="caregivers">
                <div className=" w-full px-4 py-4">
                  <h1 className="py-4 text-6xl font-bold  lg:text-8xl">
                    Discover <span className="text-blue11">Patients </span>
                    that need your help
                  </h1>
                  <div className="flex justify-end space-x-2 py-4">
                    <Button
                      variant="default"
                      size="lg"
                      onClick={() => {
                        void router.push("/signin");
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
