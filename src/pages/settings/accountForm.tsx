// // "use client"


// import { zodResolver } from "hookform/resolvers/zod";

// import { useForm } from "react-hook-form";
// import * as z from "zod";

// import { Button } from "~/components/ui/button";

// import { Input } from "~/components/ui/input";

// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "~/components/react-hook-form/form";



// const accountFormSchema = z.object({
//   name: z
//     .string()
//     .min(2, {
//       message: "Name must be at least 2 characters.",
//     })
//     .max(30, {
//       message: "Name must not be longer than 30 characters.",
//     }),
//   dob: z.date({
//     required_error: "A date of birth is required.",
//   }),
//   language: z.string({
//     required_error: "Please select a language.",
//   }),
// });

// type AccountFormValues = z.infer<typeof accountFormSchema>;

// const defaultValues: Partial<AccountFormValues> = {

// };




// export function AccountForm() {
//   const form = useForm<AccountFormValues>({
//     resolver: zodResolver(accountFormSchema),
//     defaultValues,
//   });

//   function onSubmit(data: AccountFormValues) {
//     console.log(data);
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//         <FormField
//           control={form.control}
//           name="name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Name</FormLabel>
//               <FormControl>
//                 <Input placeholder="Your name" {...field} />
//               </FormControl>
//               <FormDescription>
//                 This is the name that will be displayed on your profile and in
//                 emails.
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button type="submit">Update account</Button>
//       </form>
//     </Form>
//   );
// }
