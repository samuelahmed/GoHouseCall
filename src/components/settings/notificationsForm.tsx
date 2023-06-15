/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "~/components/ui/button";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radioGroup";
import { Switch } from "~/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { api } from "~/utils/api";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
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
import { toast } from "../ui/useToast";
import { useRouter } from "next/router";

const notificationsFormSchema = z.object({
  userId: z.string(),
  messageNotifications: z.boolean(),
  messageFrequency: z.string(),
  sessionApplications: z.boolean(),
  payments: z.boolean(),
});

type NotificationsFormValues = z.infer<typeof notificationsFormSchema>;

export function NotificationsForm() {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const { data: user } = api.NotificationsAPI.userHC_Notifications.useQuery();
  const mutation = api.NotificationsAPI.updateNotifications.useMutation();

  const form = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: {
      userId: sessionData?.user?.id || "",
      messageNotifications: user?.messageNotifications || false,
      messageFrequency: user?.messageFrequency || "",
      sessionApplications: user?.sessionApplications || false,
      payments: user?.payments || false,
    },
  });

  useEffect(() => {
    if (user) {
      form.setValue("userId", user.userId);
      form.setValue(
        "messageNotifications",
        user?.messageNotifications || false
      );
      form.setValue("messageFrequency", user?.messageFrequency || "");
      form.setValue("sessionApplications", user?.sessionApplications || false);
      form.setValue("payments", user?.payments || false);
    }
  }, [user, form]);

  function onSubmit(data: NotificationsFormValues) {
    mutation.mutate(data);
    toast({
      title: `${sessionData?.user?.name || ""}`,
      description: "You have successfully updated your account!",
      duration: 5000,
    });
    void router.push("/settings/notifications");
  }

  return (
    <Form {...form}>
      <form className="space-y-8">
        <div>
          <h3 className="mb-4 text-lg font-medium">Email Notifications</h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="messageNotifications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Messages</FormLabel>
                    <FormDescription>
                      Receive emails when someone sends you a message.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="messageFrequency"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue="all"
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="allMessages" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          All messages
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="newConversation" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          The first message in a new conversation
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sessionApplications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Session Applications
                    </FormLabel>
                    <FormDescription>
                      Receive emails whenever you are accepted or passed for a
                      session.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="payments"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Payments</FormLabel>
                    <FormDescription>
                      Receive emails whenever you receive a payment.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">Update Notifications</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently update your notifications settings.
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
