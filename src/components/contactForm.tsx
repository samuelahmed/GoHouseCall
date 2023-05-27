"use client";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

export function ContactForm() {
  return (
    <div className="flex min-h-screen flex-col-reverse items-center justify-center md:flex-row">
      <div className="w-full px-10 py-10">
        <Card className="">
          <CardHeader>
            <CardTitle className="text-center text-xl md:text-2xl lg:text-3xl">
              Email Support
            </CardTitle>
            <CardDescription className="text-lg">
              Please fill out the form below and the House Call team will get
              back to you as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="Your Email Address">Your Email Address</Label>
              <Input id="Your Email Address" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea className="h-40" id="description" />
            </div>
          </CardContent>
          <CardFooter className="justify-between space-x-2">
            <Button variant="ghost">Cancel</Button>
            <Button>Submit</Button>
          </CardFooter>
        </Card>
      </div>
      <div className="flex w-full flex-col px-10 py-10">
        <Card className="">
          <CardHeader>
            <CardTitle className="text-center text-xl md:text-2xl lg:text-3xl">
              Phone Support
            </CardTitle>
            <CardDescription className="text-lg">
              For immediate assistance, please contact our support team.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <Button>1-408-332-1104</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
