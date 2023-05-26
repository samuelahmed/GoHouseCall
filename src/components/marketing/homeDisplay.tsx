import Image from "next/image";
import { useRouter } from "next/router";
import { Button } from "~/components/ui/button";
import { AspectRatio } from "~/components/ui/aspectRatio";

export function HomeDisplay() {
  const router = useRouter();

  return (
    <>
      <div className="relative">
        <div className="absolute inset-0">
          <div className="grid min-h-full grid-cols-2">
            <AspectRatio ratio={16 / 9} className="bg-muted">
              <Image
                src="/housecalloption2.jpeg"
                alt="background image"
                className="rounded-md object-cover"
                fill
              />
            </AspectRatio>
            <AspectRatio ratio={16 / 9} className="bg-muted">
              <Image
                src="/housecalloption6.jpeg"
                alt="background image"
                className="rounded-md object-cover"
                fill
              />
            </AspectRatio>

            <AspectRatio ratio={16 / 9} className="bg-muted">
              <Image
                src="/housecalloption4.jpeg"
                alt="background image"
                className="rounded-md object-cover"
                fill
              />
            </AspectRatio>
            <AspectRatio ratio={16 / 9} className="bg-muted">
              <Image
                src="/housecalloption4.jpeg"
                alt="background image"
                className="rounded-md object-cover"
                fill
              />
            </AspectRatio>
          </div>
        </div>
        <div className="relative z-10 flex h-screen items-center justify-center">
          <div className=" flex flex-col items-center justify-center border rounded-xl mx-4 bg-white ">
            <div className=" w-full px-4 py-4 ">
              <h1 className=" py-4 text-4xl font-bold md:text-8xl ">
                Connecting <span className="text-blue11">Patients </span>
                with <span className="text-blue11">Caregivers</span>
              </h1>
              <div className="flex justify-around py-4 space-x-1"> 
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
            void router.push("/register");
          }}
        >
          Register
        </Button>
        <Button
          className=""
          variant="default"
          size="lg"
          onClick={() => {
            void router.push("/register");
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
