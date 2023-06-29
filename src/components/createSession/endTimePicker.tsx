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

interface EndTimePickerProps {
  endHour: string;
  endMinute: string;
  endAMPM: string;
  onHourChange: (hour: string) => void;
  onMinuteChange: (minute: string) => void;
  onAMPMChange: (ampm: string) => void;
}

export default function EndTimePicker({
  endHour,
  endMinute,
  endAMPM,
  onHourChange,
  onMinuteChange,
  onAMPMChange,
}: EndTimePickerProps) {
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
          {endHour ? (
            endHour + ":" + (endMinute || "00") + " " + (endAMPM || "AM")
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
          <Select onValueChange={onHourChange}>
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
          <Select onValueChange={onMinuteChange}>
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
          <Select onValueChange={onAMPMChange}>
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
