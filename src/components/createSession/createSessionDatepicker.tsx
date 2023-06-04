"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import TimePicker from "./timePicker";

export function CreateSessionDatePicker() {
  const [date, setDate] = React.useState<Date>();
  const [startTime, setStartTime] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >

          <CalendarIcon className="mr-2 h-4 w-4 " />
          <div className="">
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </div>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="mx-4 w-auto p-0">


        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
