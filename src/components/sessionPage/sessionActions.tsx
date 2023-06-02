import { Button } from "../ui/button";

export default function SessionActions() {
  return (
    <div className="flex flex-row items-center justify-around px-4 py-4">
      <Button 
      variant="outline"
      className="">Edit Session</Button>
      <Button variant="outline">Cancel Session</Button>
    </div>
  );
}
