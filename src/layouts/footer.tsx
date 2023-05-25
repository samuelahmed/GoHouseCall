import { Button } from "~/components/ui/button";

export function Footer() {
  return (
    <footer className=" h-12 bg-gray4 text-olive12">
      <div className="flex h-full w-full items-center justify-end py-4">
        <Button variant="ghost" size="sm">
          Contact
        </Button>
        <Button variant="ghost" size="sm">
          About
        </Button>
        <Button variant="ghost" size="sm">
          Terms
        </Button>
        <Button variant="ghost" size="sm">
          Privacy
        </Button>
      </div>
    </footer>
  );
}
