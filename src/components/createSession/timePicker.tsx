import * as React from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { ClockIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "../ui/button";

export default function TimePicker() {
  const [startTime, setStartTime] = React.useState<Date>();

  const hours: string[] = [];
  for (let i = 0; i <= 12; i++) {
    hours.push(i.toString());
  }

  const minutes: string[] = [];
  for (let i = 0; i < 60; i = i + 5) {
    minutes.push(i.toString());
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"outline"} className="w-full">
          {startTime ? (
            format(startTime, "PPP")
          ) : (
            <span className="flex items-center ">
              <ClockIcon className="mr-2 h-4 w-4 " />
              <span className="hidden md:block">Start Time</span>{" "}
            </span>
          )}

          <PopoverContent>
            <div className="flex space-x-1">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Hour" />
                </SelectTrigger>
                <SelectContent className="h-56">
                  {hours.map((hour) => (
                    <SelectItem key={hour} value={hour}>
                      {hour}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Minute" />
                </SelectTrigger>
                <SelectContent className="h-56">
                  {minutes.map((minute) => (
                    <SelectItem key={minute} value={minute}>
                      {minute}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="AM" />
                </SelectTrigger>
                <SelectContent className="h-20">
                  <SelectItem value="AM">AM</SelectItem>
                  <SelectItem value="PM">PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </PopoverContent>
        </Button>
      </PopoverTrigger>
    </Popover>
  );
}
