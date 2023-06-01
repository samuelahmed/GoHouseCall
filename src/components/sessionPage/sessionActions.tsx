import { Button } from "../ui/button";

export default function SessionActions() {
  return (
    <div className="flex flex-row items-center justify-around px-4 py-4">
      <Button className="">Edit Session</Button>
      <Button variant="destructive">Cancel Session</Button>
    </div>
  );
}
