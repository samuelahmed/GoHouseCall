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
import { Button } from "../ui/button";

export default function EndTimePicker() {
  const [startHour, setStartHour] = React.useState<string | null>(null);
  const [startMinute, setStartMinute] = React.useState<string | null>(null);
  const [startAMPM, setStartAMPM] = React.useState<string | null>(null);

  const hours: string[] = [];
  for (let i = 0; i <= 12; i++) {
    hours.push(i.toString());
  }

  const minutes: string[] = [];
  for (let i = 0; i < 60; i = i + 5) {
    if (i < 10) {
      minutes.push("0" + i.toString());
    } else minutes.push(i.toString());
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"outline"} className="w-full">
          {startHour ? (
            startHour + ":" + (startMinute || "00") + " " + (startAMPM || "AM")
          ) : (
            <span className="flex items-center font-normal text-muted-foreground">
              <ClockIcon className="mr-2 h-4 w-4 " />
              End
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="pb-2 text-center text-sm">End Time</div>
        <div className="flex space-x-1">
          <Select onValueChange={setStartHour}>
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
          <Select onValueChange={setStartMinute}>
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
          <Select onValueChange={setStartAMPM}>
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
    </Popover>
  );
}