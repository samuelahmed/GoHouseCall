import Image from "next/image";
import { useRouter } from "next/router";
import { Button } from "~/components/ui/button";
import { AspectRatio } from "~/components/ui/aspectRatio";
import { signIn } from "next-auth/react";

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
        <div className="z s-10 relative flex max-h-screen min-h-screen items-center justify-center">
          <div className=" border:bg-yellow3 mx-4 flex flex-col items-center justify-center  rounded-xl bg-gradient-to-r from-white via-white to-blue11">
            <div className=" w-full px-4 py-4 pr-8 md:pr-20 xl:pr-36">
              <h1 className="py-4 text-6xl font-bold  lg:text-8xl">
                Connecting <span className="text-blue11">Patients </span>
                with <span className="text-blue11">Caregivers</span>
              </h1>
              <div className="flex justify-end space-x-2 py-4">
                <Button
                  className=""
                  variant="default"
                  size="lg"
                  onClick={() => {
                    void router.push("/about");
                  }}
                >
                  Learn More
                </Button>

                <Button
                  className=""
                  variant="default"
                  size="lg"
                  onClick={() => {
                    void signIn();
                  }}
                >
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
