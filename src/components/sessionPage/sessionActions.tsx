import { Button } from "../ui/button";

export default function SessionActions() {
  return (
    <div className="flex flex-row justify-around items-center px-4 py-4">

      <Button className="">Edit Session</Button>
      <Button 
      variant="destructive"
      >Cancel Session</Button>

    </div>
  );
}
