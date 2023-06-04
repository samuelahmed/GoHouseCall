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

const accountFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  address: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  zip: z.string().min(2, {
    message: "Zip Code must be at least 2 characters.",
  }),
  sessionType: z.string().min(2, {
    message: "Session Type must be at least 2 characters.",
  }),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;
const defaultValues: Partial<AccountFormValues> = {
  name: "",
  address: "",
  city: "",
  zip: "",
  sessionType: "",
};

export function CreateSessionForm() {
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  function onSubmit(data: AccountFormValues) {
    console.log(data);
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
                name="sessionType"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Date</FormLabel>

                    <CreateSessionDatePicker />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sessionType"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Time</FormLabel>
                    <div className="flex space-x-2">
                      <TimePicker />
                      <EndTimePicker />
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="name"
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
            name="name"
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
                name="sessionType"
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
                name="sessionType"
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
                name="sessionType"
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
            <Button variant="outline" type="submit">
              Create Session
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
