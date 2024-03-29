import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useForm } from "react-hook-form";
import { Textarea } from "~/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radioGroup";
import { api } from "~/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";
import { toast } from "../ui/useToast";
import { useRouter } from "next/router";
import { Loader2 } from "lucide-react";
import { ImageUpload } from "~/components/s3/imageUpload";

const welcomeFormSchema = z.object({
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

type WelcomeFormValues = z.infer<typeof welcomeFormSchema>;

export function PatientWelcomeForm() {
  const { data: emailVerified } =
    api.emailAPI.userEmailVerificationStatus.useQuery();
  const { data: user } = api.WelcomeFormRouter.me.useQuery();
  const mutation = api.WelcomeFormRouter.registerNewUser.useMutation();
  const router = useRouter();
  const form = useForm<WelcomeFormValues>({
    resolver: zodResolver(welcomeFormSchema),
    defaultValues: {
      userId: user?.id,
      type: "patient",
      image: "",
      name: "",
      patientType: "",
      email: "",
      bio: "",
      address: "",
      city: "",
      zip: "",
      welcomeFormComplete: true,
    },
  });

  useEffect(() => {
    if (user) {
      form.setValue("userId", user.id || "");
      form.setValue("image", user.image2 || user.image || "");
      form.setValue("name", user.name || "");
      form.setValue("email", user.email || "");
      form.setValue("patientType", "self");
    }
  }, [user, form]);

  function onSubmit(field: WelcomeFormValues) {
    mutation.mutate(field);
    toast({
      title: `Welcome ${field.name}`,
      description: "You have successfully created your account!",
      duration: 5000,
    });
    void router.push("/dashboard");
  }

  return (
    <>
      <p className="py-4">3. Tell us about yourself</p>
      <ImageUpload />
      <Form {...form}>
        <form className="space-y-8">
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
            name="patientType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue="self"
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
                        I am making an account for a loved one
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
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    {...field}
                  />
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
                  <Input placeholder="Your Address" {...field} />
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
                <FormItem className="w-full">
                  <FormLabel>Zip Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Zip Code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {!emailVerified?.emailVerified && (
            <Button variant="outline" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verify Email
            </Button>
          )}
          {emailVerified?.emailVerified && (
            <Button
              variant="outline"
              onClick={() => {
                onSubmit(form.getValues());
              }}
            >
              Complete Registration
            </Button>
          )}
        </form>
        <div className="flex flex-col items-start space-y-4"></div>
      </Form>
    </>
  );
}
