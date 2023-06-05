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
});

type AccountFormValues = z.infer<typeof accountFormSchema>;





export function AccountForm( {name, address, city, zip}: AccountFormValues) {

  const defaultValues: Partial<AccountFormValues> = {
    name: name,
    address: "",
    city: "",
    zip: "",
  };


  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  function onSubmit(data: AccountFormValues) {
    console.log(data);
  }

  console.log(name)
  return (
    <Form {...form}>
      <form onSubmit={void form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input 
                defaultValue={name}                
                />
              </FormControl>
              <FormDescription>
                This is your legal name and will be used for payments and tax
                purposes.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Your Address" {...field} />
              </FormControl>
              <FormDescription>
                This address will be the default when creating sessions.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <div className="flex flex-col items-start space-y-4">
          <Button variant="outline">Payments Dashboard</Button>
          <Button variant="outline" type="submit">
            Update account
          </Button>
        </div>
      </form>
    </Form>
  );
}
