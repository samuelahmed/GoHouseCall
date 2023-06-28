"use client";

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
import { set } from "date-fns";

const careSessionFormSchema = z.object({
  userId: z.string(),
  status: z.string(),
  date: z.date(),
  startTime: z.string(),
  endTime: z.string(),
  sessionType: z.string(),
  title: z.string(),
  description: z.string(),
  hourlyRate: z.string(),
  duration: z.string(),
  total: z.string(),
  address: z.string(),
  city: z.string(),
  zip: z.string(),
});

type CareSessionFormValues = z.infer<typeof careSessionFormSchema>;

export function CreateSessionForm() {
  const { data: user } = api.careSessionAPI.me.useQuery();
  const mutation = api.careSessionAPI.createNewCareSession.useMutation();

  const [selectedDate, setSelectedDate] = React.useState<Date>();

  const [startTime, setStartTime] = React.useState<string | null | undefined>();
  const [startHour, setStartHour] = React.useState<string>("00");
  const [startMinute, setStartMinute] = React.useState<string>("00");
  const [startAMPM, setStartAMPM] = React.useState<string>("AM");

  const [endTime, setEndTime] = React.useState<string | null | undefined>();
  const [endHour, setEndHour] = React.useState<string>("00");
  const [endMinute, setEndMinute] = React.useState<string>("00");
  const [endAMPM, setEndAMPM] = React.useState<string>("AM");

  const form = useForm<CareSessionFormValues>({
    resolver: zodResolver(careSessionFormSchema),
    defaultValues: {
      userId: user?.userId,
      status: "",
      startTime: startTime || "",
      date: selectedDate,
      endTime: endTime || "",
      sessionType: "",
      title: "",
      description: "",
      hourlyRate: "",
      duration: "",
      total: "",
      address: user?.address || "",
      city: user?.city || "",
      zip: user?.zip || "",
    },
  });

  useEffect(() => {
    setStartTime(
      startHour + ":" + (startMinute || "00") + " " + (startAMPM || "AM")
    );
  }, [startHour, startMinute, startAMPM]);

  useEffect(() => {
    setEndTime(endHour + ":" + (endMinute || "00") + " " + (endAMPM || "AM"));
  }, [endHour, endMinute, endAMPM]);

  useEffect(() => {
    if (user) {
      form.setValue("userId", user.userId);
      form.setValue("status", "");
      form.setValue("date", selectedDate as Date);
      form.setValue("startTime", startTime as string);
      form.setValue("endTime", endTime as string);
      form.setValue("sessionType", "");
      form.setValue("title", "");
      form.setValue("description", "");
      form.setValue("hourlyRate", "");
      form.setValue("duration", "");
      form.setValue("total", "");
      form.setValue("address", user.address || "");
      form.setValue("city", user.city || "");
      form.setValue("zip", user.zip || "");
    }
  }, [user, selectedDate, setStartTime, startTime, endTime, setEndTime, form]);

  function onSubmit(field: CareSessionFormValues) {
    mutation.mutate(field);
  }

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
                  <Select>
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

                        {/* <EndTimePicker /> */}
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

                  {/* <Input placeholder="" {...field} /> */}
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
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hourly Rate</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
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
                      <Input placeholder="" {...field} />
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
                      <Input placeholder="" {...field} />
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
