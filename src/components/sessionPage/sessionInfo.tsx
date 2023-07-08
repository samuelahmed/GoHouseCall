import { Card, CardContent } from "~/components/ui/card";

export function SessionInfo({
  sessionStatus,
  sessionDate,
  sessionDescription,
  sessionStart,
  sessionEnd,
  sessionDuration,
  sessionHourlyRate,
  sessionTotal,
  sessionAddress,
  sessionCity,
  sessionZip,
}: {
  sessionStatus: string;
  sessionDate: Date;
  sessionDescription: string;
  sessionStart: string;
  sessionEnd: string;
  sessionDuration: number;
  sessionHourlyRate: number;
  sessionTotal: number;
  sessionAddress: string;
  sessionCity: string;
  sessionZip: string;
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
                <span className="text-sm">{sessionDescription} </span>
              </p>
            </CardContent>
          </div>
          <div className="col-span-1 w-full pt-4">
            <CardContent>
              <p>
                <span className="text-sm font-semibold">Session Start: </span>
                <span className="text-sm">{sessionStart}</span>
              </p>
            </CardContent>
            <CardContent>
              <p>
                <span className="text-sm font-semibold">Session End: </span>
                <span className="text-sm">{sessionEnd}</span>
              </p>
            </CardContent>
          </div>
        </Card>
        <Card className="flex-col-2 flex ">
          <div className="col-span-1 w-full pt-4">
            <CardContent>
              <p>
                <span className="text-sm font-semibold">Hourly Rate: </span>
                <span className="text-sm">${sessionHourlyRate}</span>
              </p>
            </CardContent>
            <CardContent>
              <p>
                <span className="text-sm font-semibold">Duration: </span>
                <span className="text-sm">{sessionDuration} hours</span>
              </p>
            </CardContent>
            <CardContent>
              <p>
                <span className="text-sm font-semibold">Total Cost: </span>
                <span className="text-sm">${sessionTotal}</span>
              </p>
            </CardContent>
          </div>
          <div className="col-span-1 w-full pt-4">
            <CardContent>
              <p>
                <span className="text-sm font-semibold">Address: </span>
                <span className="text-sm">{sessionAddress}</span>
              </p>
            </CardContent>
            <CardContent>
              <p>
                <span className="text-sm font-semibold">City: </span>
                <span className="text-sm">{sessionCity}</span>
              </p>
            </CardContent>
            <CardContent>
              <p>
                <span className="text-sm font-semibold">Area Code: </span>
                <span className="text-sm">{sessionZip}</span>
              </p>
            </CardContent>
          </div>
        </Card>
      </div>
    </>
  );
}
