import { type NextPage } from "next";
import Head from "next/head";
import { type GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "~/server/auth";
import { EmailVerification } from "~/components/welcomePage/emailVerification";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { DefaultValues, useForm } from "react-hook-form";
import { Textarea } from "~/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radioGroup";
import { api } from "~/utils/api";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";

const welcomeFormSchema = z.object({
  userId: z.string(), //this is the id of the user and should be pushed automatically
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

const WelcomeForm: NextPage = () => {
  //USED FOR DEFAULT VALUES
  const { data: user } = api.WelcomeFormRouter.me.useQuery();
  //USED TO REGISTER NEW USER ON SUBMIT
  const mutation = api.WelcomeFormRouter.registerNewUser.useMutation();
  
  // console.log(user)
  const form =  useForm<WelcomeFormValues>({
    resolver: zodResolver(welcomeFormSchema),
     defaultValues: {
      userId: user?.id, //Do I want to pass this here?
      type: "",
      image: "",
      name:"",
      patientType: "",
      email: "",
      bio: "",
      address: "",
      city: "",
      zip: "",
      welcomeFormComplete: true,
    },
    // mode: "onChange",
  });

  useEffect(() => {
    if (user) {
      form.setValue("userId", user.id || "");
      form.setValue("image", user.image || "");
      form.setValue("name", user.name || "");
      form.setValue("email", user.email || "");

    }
  }, [user, form]);

  // console.log("form", form.defaultValues?)

  
  function onSubmit(field: WelcomeFormValues) {
    mutation.mutate(field);
    console.log('field',  field);
  }


  return (
    <>
      <Head>
        <title>Welcome Form</title>
        <meta
          name="description"
          content="Terms of Service Agreement of House Call"
        />
      </Head>

      <div className="min-h-screen space-y-4 px-4 py-4 md:px-8 md:py-8">
        <h1 className="text-xl font-semibold">Welcome to House Call</h1>
        <h2 className="text-lg ">
          Complete your registration to access the rest of the site.
        </h2>
        <p className="">1. Verify your email address</p>
        <div className="flex space-x-4 ">
          <EmailVerification />
        </div>
        <p className="">2. Select your role</p>
        <div className="flex w-full items-center space-x-4  ">
          <Tabs defaultValue="account " className="w-[600px]">
            <TabsList>
              <TabsTrigger value="patient">Patient</TabsTrigger>
              <TabsTrigger value="caregiver">Caregiver</TabsTrigger>
            </TabsList>

            <TabsContent value="patient">
              <p className="">3. Tell us about yourself</p>
              <Form {...form}>
                <form
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormLabel>Profile Image</FormLabel>

                  <Avatar className="h-20 w-20 rounded-full object-cover">
                    <AvatarImage src={user?.image || ""} />
                    <AvatarFallback>{user?.image || ""}</AvatarFallback>
                  </Avatar>
                  {/* <Button size="sm" variant="outline">
                    Upload profile image
                  </Button> */}

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input defaultValue={user?.name || ""} />
                        </FormControl>
                        <FormDescription>
                          This is your legal name and will be used for payments
                          and tax purposes.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control } 
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                          // placeholder="shadcn"
                           {...field} />
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
                            defaultValue="all"
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="all" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                I am the patient
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="new_conversation" />
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
                    // control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Address" {...field} />
                        </FormControl>
                        <FormDescription>
                          This address will be the default when creating
                          sessions.
                        </FormDescription>
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
                  <Button variant="outline" type="submit">
                    Complete Registration
                  </Button>
                </form>
                <div className="flex flex-col items-start space-y-4"></div>
              </Form>
            </TabsContent>

            {/* 
            <TabsContent value="caregiver">
              <p className="">3. Tell us about yourself</p>
              <Form {...form}>
                <form
                  // onSubmit={void form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    // control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                          // defaultValue={name}
                          />
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
                          <Input defaultValue="" />
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
                    // control={form.control}
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
                      // control={form.control}
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
                      // control={form.control}
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
                </form>
              </Form>
            </TabsContent> */}
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default WelcomeForm;

//prevent non-logged in users from accessing this page
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getServerAuthSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
