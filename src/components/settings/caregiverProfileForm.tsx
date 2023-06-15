"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radioGroup";
import { api } from "~/utils/api";
import { toast } from "../ui/useToast";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alertDialog";

const profileFormSchema = z.object({
  userId: z.string(),
  type: z.string(),
  image: z.string(),
  name: z.string(),
  patientType: z.string(),
  email: z.string(),
  bio: z.string(),
  address: z.string(),
  city: z.string(),
  zip: z.string(),
  welcomeFormComplete: z.boolean(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function CaregiverProfileForm() {
  const router = useRouter();

  const { data: user } = api.settingsAPI.userHC_Account.useQuery();
  const mutation = api.settingsAPI.updateUser.useMutation( );

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      userId: user?.userId,
      type: user?.type || "",
      image: user?.image || "",
      name: user?.name || "",
      patientType: "", //this should be empty since not a patient
      email: user?.email || "",
      bio: user?.bio || "",
      address: user?.address || "",
      city: user?.city || "",
      zip: user?.zip || "",
      welcomeFormComplete: user?.welcomeFormComplete || true,
    },
  });

  useEffect(() => {
    if (user) {
      form.setValue("userId", user.userId);
      form.setValue("type", user.type || "");
      form.setValue("image", user.image || "");
      form.setValue("name", user.name || "");
      form.setValue("patientType", ""); //this should be empty since not a patient
      form.setValue("email", user.email || "");
      form.setValue("bio", user.bio || "");
      form.setValue("address", user.address || "");
      form.setValue("city", user.city || "");
      form.setValue("zip", user.zip || "");
      form.setValue("welcomeFormComplete", user.welcomeFormComplete || true);
    }
  }, [user, form]);

  function onSubmit(field: ProfileFormValues) {
    mutation.mutate(field);
    toast({
      title: `${field.name}`,
      description: "You have successfully updated your account!",
      duration: 5000,
    });
    void router.push("/settings/profile");
  }

  return (
    <Form {...form}>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="patientType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="self" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      I am the patient
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="managed" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      I manage this account for a loved one
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea className="resize-none" {...field} />
              </FormControl>
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
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex space-x-2">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zip"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Zip Code</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">Update Profile</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanantly update your
                profile information.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  onSubmit(form.getValues());
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </form>
    </Form>
  );
}
