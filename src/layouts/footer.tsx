import { Button } from "~/components/ui/button";
import { useRouter } from "next/router";

export function Footer() {
  const router = useRouter();

  return (
    <footer className="flex h-12 items-center justify-end bg-gray4 text-olive12 ">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          void router.push("/contact");
        }}
      >
        Contact
      </Button>
      <Button
        onClick={() => {
          void router.push("/about");
        }}
        variant="ghost"
        size="sm"
      >
        About
      </Button>
      <Button
        onClick={() => {
          void router.push("/terms");
        }}
        variant="ghost"
        size="sm"
      >
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
    </footer>
  );
}
