
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { CreateSessionDatePicker } from "./createSessionDatepicker";
import TimePicker from "./timePicker";
import EndTimePicker from "./endTimePicker";
import { api } from "~/utils/api";
import { use, useEffect } from "react";
import React from "react";
import HourlyRatePicker from "./hourlyRatePicker";
import { useState } from "react";

const careSessionFormSchema = z.object({
  userId: z.string(),
  status: z.string(),
  date: z.date(),
  startTimeAsDate: z.date(),
  endTimeAsDate: z.date(),
  startTime: z.string(),
  endTime: z.string(),
  sessionType: z.string(),
  title: z.string(),
  description: z.string(),
  hourlyRate: z.number(),
  duration: z.number(),
  total: z.number(),
  address: z.string(),
  city: z.string(),
  zip: z.string(),
});

type CareSessionFormValues = z.infer<typeof careSessionFormSchema>;

export function CreateSessionForm(props: any) {
  const { data: user } = api.careSessionAPI.me.useQuery();
  const mutation = api.careSessionAPI.createNewCareSession.useMutation();

  const [selectedDate, setSelectedDate] = useState<Date>();
  const [sessionType, setSessionType] = useState<string>("");
  const [startTimeAsDateTime, setStartTimeAsDateTime] = useState<Date>();
  const [endTimeAsDateTime, setEndTimeAsDateTime] = useState<Date>();
  const [startTime, setStartTime] = useState<string | null | undefined>();
  const [startHour, setStartHour] = useState<string>("00");
  const [startMinute, setStartMinute] = useState<string>("00");
  const [startAMPM, setStartAMPM] = useState<string>("AM");
  const [endTime, setEndTime] = useState<string | null | undefined>();
  const [endHour, setEndHour] = useState<string>("00");
  const [endMinute, setEndMinute] = useState<string>("00");
  const [endAMPM, setEndAMPM] = useState<string>("AM");
  const [hourlyRate, setHourlyRate] = useState<string>("30");

  let startHourAsNumber = 0;
  if (startHour !== "00" && startAMPM === "AM") {
    startHourAsNumber = parseInt(startHour, 10);
  } else if (startHour !== "00" && startAMPM === "PM") {
    startHourAsNumber = parseInt(startHour, 10) + 12;
  }
  let startMinuteAsNumber = 0;
  if (startMinute !== "00") {
    startMinuteAsNumber = parseInt(startMinute, 10);
  } else if (startMinute === "00" && startAMPM === "PM") {
    startMinuteAsNumber = parseInt(startMinute, 10) + 12;
  }
  let endHourAsNumber = 0;
  if (endHour !== "00" && endAMPM === "AM") {
    endHourAsNumber = parseInt(endHour, 10);
  } else if (endHour !== "00" && endAMPM === "PM") {
    endHourAsNumber = parseInt(endHour, 10) + 12;
  }
  let endMinuteAsNumber = 0;
  if (endMinute !== "00") {
    endMinuteAsNumber = parseInt(endMinute, 10);
  } else if (endMinute === "00" && endAMPM === "PM") {
    endMinuteAsNumber = parseInt(endMinute, 10) + 12;
  }

  let totalDuration = endHourAsNumber - startHourAsNumber;
  if (totalDuration < 0) {
    totalDuration = 0;
  }
  let totalMinutes = endMinuteAsNumber - startMinuteAsNumber;
  if (totalMinutes < 0) {
    totalMinutes = 0;
  }
  totalDuration = totalDuration + totalMinutes / 60;

  const displayDuration = Math.ceil(totalDuration);
  const hourlyRateAsNumber = parseInt(hourlyRate, 10);
  const totalCost = Math.ceil(totalDuration * hourlyRateAsNumber);

  // console.log(totalDuration);

  const form = useForm<CareSessionFormValues>({
    resolver: zodResolver(careSessionFormSchema),
    defaultValues: {
      userId: user?.userId,
      status: "new",
      date: selectedDate,
      startTimeAsDate: startTimeAsDateTime,
      endTimeAsDate: endTimeAsDateTime,
      startTime: startTime || "",
      endTime: endTime || "",
      sessionType: sessionType || "",
      title: "",
      description: "",
      hourlyRate: hourlyRateAsNumber,
      duration: totalDuration,
      total: totalCost,
      address: user?.address || "",
      city: user?.city || "",
      zip: user?.zip || "",
    },
  });

  useEffect(() => {
    if (user) {
      form.setValue("userId", user.userId);
      form.setValue("status", "new");
      form.setValue("date", selectedDate as Date);
      form.setValue("startTimeAsDate", startTimeAsDateTime as Date);
      form.setValue("endTimeAsDate", endTimeAsDateTime as Date);
      form.setValue("startTime", startTime as string);
      form.setValue("endTime", endTime as string);
      form.setValue("sessionType", sessionType);
      form.setValue("title", "");
      form.setValue("description", "");
      form.setValue("hourlyRate", hourlyRateAsNumber);
      form.setValue("duration", displayDuration);
      form.setValue("total", totalCost);
      form.setValue("address", user.address || "");
      form.setValue("city", user.city || "");
      form.setValue("zip", user.zip || "");
    }
  }, [
    user,
    selectedDate,
    setStartTime,
    startTime,
    endTime,
    setEndTime,
    form,
    startTimeAsDateTime,
    endTimeAsDateTime,
    totalDuration,
    totalCost,
    displayDuration,
    hourlyRate,
    hourlyRateAsNumber,
    sessionType,
  ]);

  useEffect(() => {
    if (selectedDate) {
      const newDate = new Date(selectedDate);
      newDate.setHours(startHourAsNumber, startMinuteAsNumber, 0, 0);
      setStartTimeAsDateTime(newDate);
    }
  }, [selectedDate, startHourAsNumber, startMinuteAsNumber]);

  useEffect(() => {
    if (selectedDate) {
      const newDate = new Date(selectedDate);
      newDate.setHours(endHourAsNumber, endMinuteAsNumber, 0, 0);
      setEndTimeAsDateTime(newDate);
    }
  }, [selectedDate, endHourAsNumber, endMinuteAsNumber]);

  useEffect(() => {
    setStartTime(
      startHour + ":" + (startMinute || "00") + " " + (startAMPM || "AM")
    );
  }, [startHour, startMinute, startAMPM]);

  useEffect(() => {
    setEndTime(endHour + ":" + (endMinute || "00") + " " + (endAMPM || "AM"));
  }, [endHour, endMinute, endAMPM]);

  function onSubmit(field: CareSessionFormValues) {
    mutation.mutate(field);
  }

  console.log(form.getValues().address || user?.address)
  //send address to google maps
  //doesn't seem to work on first render

  const [exportAddress, setExportAddress] = useState<string | null | undefined>();
  const [exportCity, setExportCity] = useState<string | null | undefined>();
  const [exportZip, setExportZip] = useState<string | null | undefined>();

  useEffect(() => {
    setExportAddress(form.getValues().address || user?.address)
    setExportCity(form.getValues().city || user?.city)
    setExportZip(form.getValues().zip || user?.zip)
  }, [form, user?.address, user?.city, user?.zip, form.getValues().address, form.getValues().city, form.getValues().zip])



  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    props.CallBack(
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      exportAddress +
      " " +
      exportCity +
      " " +
      exportZip
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exportAddress, exportCity, exportZip]);

  
  return (
    <>
      <Form {...form}>
        <form onSubmit={void form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex w-full space-x-4">
            <FormField
              control={form.control}
              name="sessionType"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Select onValueChange={setSessionType}>
                    <FormLabel>Session Type</FormLabel>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue
                        placeholder="Select Session Type"
                        {...field}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="home care">Home Care</SelectItem>
                      <SelectItem value="mobility support">
                        Mobility Support
                      </SelectItem>
                      <SelectItem value="personal care">
                        Personal Care
                      </SelectItem>
                      <SelectItem value="transportation">
                        Transportation
                      </SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <div className="w-full ">
              <FormField
                control={form.control}
                name="date"
                render={() => (
                  <FormItem className="w-full">
                    <FormLabel>Date</FormLabel>
                    <CreateSessionDatePicker
                      date={selectedDate}
                      onSelect={setSelectedDate}
                    />
                  </FormItem>
                )}
              />
              <div className="flex space-x-2">
                <FormField
                  control={form.control}
                  name="startTime"
                  render={() => (
                    <FormItem className="w-full">
                      <FormLabel>Start Time</FormLabel>
                      <div className="flex space-x-2">
                        <TimePicker
                          startHour={startHour}
                          onHourChange={setStartHour}
                          startMinute={startMinute}
                          onMinuteChange={setStartMinute}
                          startAMPM={startAMPM}
                          onAMPMChange={setStartAMPM}
                        />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endTime"
                  render={() => (
                    <FormItem className="w-full">
                      <FormLabel>End Time</FormLabel>
                      <div className="flex space-x-2">
                        <EndTimePicker
                          endHour={endHour}
                          onHourChange={setEndHour}
                          endMinute={endMinute}
                          onMinuteChange={setEndMinute}
                          endAMPM={endAMPM}
                          onAMPMChange={setEndAMPM}
                        />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Session Title</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>
                  Up to 30 characters to describe your session.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Session Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="" {...field} />
                </FormControl>
                <FormDescription>
                  Describe your session and goals in detail.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full space-x-4">
            <div className="w-full">
              <FormField
                control={form.control}
                name="hourlyRate"
                render={({}) => (
                  <FormItem>
                    <FormLabel>Hourly Rate</FormLabel>
                    <FormControl>
                      <HourlyRatePicker
                        hourlyRate={hourlyRate}
                        onHourlyRateChange={setHourlyRate}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <FormControl>
                      <Input
                        className="disabled:opacity-100"
                        {...field}
                        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
                        value={field.value + " hours"}
                        disabled
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="total"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Cost</FormLabel>
                    <FormControl>
                      <Input
                        className="disabled:opacity-100"
                        disabled
                        {...field}
                        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
                        value={"$ " + field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Your Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full space-x-4">
            <div className="w-full">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="zip"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zip Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Zip Code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col items-start space-y-4">
            <Button
              variant="outline"
              type="submit"
              onClick={() => {
                onSubmit(form.getValues());
              }}
            >
              Create Session
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
