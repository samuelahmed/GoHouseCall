"use client";

import { Button } from "../ui/button";
import { Card, CardContent, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

const messages = [
  {
    id: "1",
    createdAt: "2021-08-01T12:00:00.000Z",
    content: "Hello, how are you?",
    sender: "John Doe",
    receiver: "meow",
  },
  {
    id: "2",
    createdAt: "2021-08-01T12:00:00.000Z",
    content: "I'm good, how are you?",
    sender: "Jane Smith",
    receiver: "meow",
  },
  {
    id: "3",
    createdAt: "2021-08-01T12:00:00.000Z",
    content: "I'm good, thanks!",
    sender: "Mr Blue",
    receiver: "meow",
  },
  {
    id: "4",
    createdAt: "2021-08-01T12:00:00.000Z",
    content: "I'm good, thanks!",
    sender: "John Doe",
    receiver: "meow",
  },
  {
    id: "5",
    createdAt: "2021-08-01T12:00:00.000Z",
    content: "Sent message by meow!",
    sender: "meow",
    receiver: "John Doe",
  },
];

const lastMessagedUser = "John Doe";

interface ContactsNavProps extends React.HTMLAttributes<HTMLElement> {
  passSelectedUser: {
    name: string;
    title: string;
    user: string;
  };
}

export function MessageContent({ passSelectedUser }: ContactsNavProps) {
  const currentSelectedUser = passSelectedUser.name || lastMessagedUser;
  const currentUser = "meow";

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row">
          <div className="w-full pr-2">
            <Card className="w-full rounded-none border  border-t-0 py-4">
              <CardTitle className="flex h-6 items-center justify-center text-center">
                {passSelectedUser.name || lastMessagedUser}
              </CardTitle>
            </Card>
            <Card className="min-h-65vh w-full rounded-none border border-t-0 py-4">
              <CardContent className="-p-1 px-1">
                <div className="flex flex-col space-y-2 overflow-auto">
                  {messages.map((message) => {
                    //messages sent
                    if (
                      message.sender === currentUser &&
                      message.receiver === currentSelectedUser
                    ) {
                      return (
                        <div
                          className="flex flex-row-reverse items-center justify-start space-y-2 text-end"
                          key={message.id}
                        >
                          <Avatar className="mx-1 mt-1">
                            <AvatarImage src="https://lh3.googleusercontent.com/a/AGNmyxbdo5KPhSRdaHNUKqGun6H40eqqTz3zbUCf0oCA=s96-c" />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <div className="-p-6 rounded bg-blue-300 p-1 text-sm">
                            {message.content}
                          </div>
                        </div>
                      );
                    }
                    //messages received
                    if (
                      message.sender === currentSelectedUser &&
                      message.receiver === currentUser
                    ) {
                      return (
                        <div
                          className="flex flex-row items-center justify-start space-y-2 text-end"
                          key={message.id}
                        >
                          <Avatar className="mx-1 mt-1">
                            <AvatarImage src="https://lh3.googleusercontent.com/a/AAcHTtc4YvX9jKd0aR3FDN0GrP848CYTjuZgb7Yicq6K=s96-c" />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <CardContent className="-p-4 rounded bg-gray-300 p-1 text-sm">
                            {message.content}
                          </CardContent>
                        </div>
                      );
                    }
                  })}
                </div>
              </CardContent>
            </Card>
            <div className="flex flex-row items-center space-x-2">
              <Input
                className="my-2 px-4 py-4"
                aria-label="Input for message"
              />
              <div className="flex h-16 items-center justify-end ">
                <Button>Send</Button>
              </div>
            </div>
          </div>

          <div className="hidden w-72 md:block">
            <div className="flex items-center justify-center pt-4">
              <Avatar>
                <AvatarImage src="https://lh3.googleusercontent.com/a/AAcHTtc4YvX9jKd0aR3FDN0GrP848CYTjuZgb7Yicq6K=s96-c" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="py-2 text-center">
              {passSelectedUser.name || lastMessagedUser}
            </div>

            <div className="flex flex-row items-center justify-center space-x-1 px-4 text-lg">
              <Button
          
                variant="outline"
                size="sm"
              >
                Profile
              </Button>
              <Button variant="outline" size="sm">
                Mute
              </Button>
              <Button variant="outline" size="sm">
                Remove
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
