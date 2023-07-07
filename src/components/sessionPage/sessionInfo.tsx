import { Card, CardContent } from "~/components/ui/card";

export function SessionInfo({
  sessionStatus,
  sessionDate,
}: {
  sessionStatus: string;
  sessionDate: Date;
}) {

  
  const formattedDate = sessionDate?.toLocaleDateString();

  return (
    <>
      <div className="px-4">
        <Card className="flex-col-2 my-4 flex">
          <div className="col-span-1 w-full pt-4">
            <CardContent>
              <p>
                <span className="text-sm font-semibold">Status: </span>
                <span className="text-sm">{sessionStatus}</span>
              </p>
            </CardContent>
            <CardContent>
              <p>
                <span className="text-sm font-semibold">Date: </span>
                <span className="text-sm">{formattedDate}</span>
              </p>
            </CardContent>
            <CardContent>
              <p>
                <span className="text-sm font-semibold">Overview: </span>
                <span className="text-sm">help around the house </span>
              </p>
            </CardContent>
          </div>
          <div className="col-span-1 w-full pt-4">
            <CardContent>
              <p>
                <span className="text-sm font-semibold">Session Start: </span>
                <span className="text-sm">2:00 AM</span>
              </p>
            </CardContent>
            <CardContent>
              <p>
                <span className="text-sm font-semibold">Session End: </span>
                <span className="text-sm">5:00 AM</span>
              </p>
            </CardContent>
            <CardContent>
              <p>
                <span className="text-sm font-semibold">Duration: </span>
                <span className="text-sm">3 hours 0 minutes</span>
              </p>
            </CardContent>
          </div>
        </Card>
        <Card className="flex-col-2 flex ">
          <div className="col-span-1 w-full pt-4">
            <CardContent>
              <p>
                <span className="text-sm font-semibold">Hourly Rate: </span>
                <span className="text-sm">$20</span>
              </p>
            </CardContent>
            <CardContent>
              <p>
                <span className="text-sm font-semibold">Total Hours: </span>
                <span className="text-sm">3</span>
              </p>
            </CardContent>
            <CardContent>
              <p>
                <span className="text-sm font-semibold">Total Cost: </span>
                <span className="text-sm">$60</span>
              </p>
            </CardContent>
          </div>
          <div className="col-span-1 w-full pt-4">
            <CardContent>
              <p>
                <span className="text-sm font-semibold">Address: </span>
                <span className="text-sm">5101 lapa drive #4</span>
              </p>
            </CardContent>
            <CardContent>
              <p>
                <span className="text-sm font-semibold">City: </span>
                <span className="text-sm">San Jose</span>
              </p>
            </CardContent>
            <CardContent>
              <p>
                <span className="text-sm font-semibold">Area Code: </span>
                <span className="text-sm">95129</span>
              </p>
            </CardContent>
          </div>
        </Card>
      </div>
    </>
  );
}
