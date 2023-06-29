import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

interface HourlyRatePickerProps {
  hourlyRate: string;
  onHourlyRateChange: (hour: string) => void;
}

export default function HourlyRatePicker({
  onHourlyRateChange,
}: HourlyRatePickerProps) {
  const rate: string[] = [];
  for (let i = 30; i <= 100; i += 5) {
    rate.push(i.toString());
  }

  return (
    <Select defaultValue="30" onValueChange={onHourlyRateChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="" />
      </SelectTrigger>
      <SelectContent className="h-56">
        {rate.map((hour) => (
          <SelectItem key={hour} value={hour}>
            $ {hour}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
