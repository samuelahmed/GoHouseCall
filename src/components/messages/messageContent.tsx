"use client";

import { Button } from "../ui/button";
import { Card, CardContent, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";

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
      <div className="flex flex-col ">
        <div className="flex justify-center px-4 py-4">
          <CardTitle className="flex h-6 items-center">
            {passSelectedUser.name || lastMessagedUser}
          </CardTitle>
        </div>
        <Card className="h-96 px-4 py-4">
          <CardContent>
            <div className="flex flex-col space-y-2 overflow-auto">
              {messages.map((message) => {
                //messages sent
                if (
                  message.sender === currentUser &&
                  message.receiver === currentSelectedUser
                ) {
                  return (
                    <div
                      className="flex flex-col items-end justify-end space-y-2 text-end"
                      key={message.id}
                    >
                      <CardContent className="rounded bg-blue-300">
                        {message.content}
                      </CardContent>
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
                      className="flex flex-col items-start justify-start space-y-2 text-end"
                      key={message.id}
                    >
                      <CardContent className="rounded bg-gray-300">
                        {message.content}
                      </CardContent>
                    </div>
                  );
                }
              })}
            </div>
          </CardContent>
        </Card>
        <Input 
        className="my-2 px-4 py-4"
        // placeholder="Type your message here..."
        aria-label="Input for message"
        
        />
        <div className="flex h-16 items-center justify-end">
          <Button>Send</Button>
        </div>
      </div>
    </>
  );
}
