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
    <div className="flex min-h-screen flex-col-reverse md:flex-row">
      <div className="w-full px-10 py-10">
        <Card className="">
          <CardHeader>
            <CardTitle className="text-center ">Email Support</CardTitle>
            <CardDescription>
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
          <CardFooter className="justify-end space-x-2">
            <Button variant="outline">Submit</Button>
          </CardFooter>
        </Card>
      </div>
      <div className="flex min-h-full w-full flex-col space-y-10 px-10 pt-10">
        <Card className="">
          <CardHeader>
            <CardTitle className="text-center">Help Center</CardTitle>
            <CardDescription className="">
              Find answers to your questions and get the help you need.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <Button variant="outline">Help Center</Button>
          </CardContent>
        </Card>
        <Card className="">
          <CardHeader>
            <CardTitle className="text-center">Phone Support</CardTitle>
            <CardDescription className="">
              For immediate assistance, please contact our support team.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <Button variant="outline">1-408-332-1104</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
