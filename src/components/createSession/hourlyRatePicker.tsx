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

interface HourlyRatePickerProps {
  hourlyRate: string;
  onHourlyRateChange: (hour: string) => void;
}

export default function HourlyRatePicker({
  hourlyRate,
  onHourlyRateChange,
}: HourlyRatePickerProps) {
  const rate: string[] = [];
  for (let i = 30; i <= 100; i += 5) {
    rate.push(i.toString());
  }

  return (
    <Select onValueChange={onHourlyRateChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Hour" />
      </SelectTrigger>
      <SelectContent className="h-56">
        {rate.map((hour) => (
          <SelectItem key={hour} value={hour}>
            {hour}
          </SelectItem>
        ))}
        {/* <SelectItem>
          </SelectItem> */}
      </SelectContent>
    </Select>
  );
}
