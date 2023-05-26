import { Button } from "~/components/ui/button";
import { useRouter } from "next/router";

export function Footer() {
  const router = useRouter();

  return (
    <footer className="h-12 bg-gray4 text-olive12">
      <div className="flex h-full w-full items-center justify-end px-4 py-4">
        <Button variant="ghost" size="sm">
          Contact
        </Button>
        <Button variant="ghost" size="sm">
          About
        </Button>
        <Button 
                  onClick={() => {
                    void router.push("/terms");
                  }}
        
        variant="ghost" size="sm">
          Terms
        </Button>
        <Button
          onClick={() => {
            void router.push("/privacy");
          }}
          variant="ghost"
          size="sm"
        >
          Privacy
        </Button>
      </div>
    </footer>
  );
}
