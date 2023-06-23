import { Button } from "../ui/button";
import { Card, CardContent, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { useState } from "react";
import { useEffect } from "react";
import PusherClient from "pusher-js";
import { api } from "~/utils/api";
import { useRef } from "react";
import { z } from "zod";

interface ContactsNavProps extends React.HTMLAttributes<HTMLElement> {
  passSelectedUser: {
    name: string;
    id: string;
    pusherChannelName: string;
  };
}

//use this to somehow validate the message to be at least size of 1
const Messages = z.object({
  id: z.string(),
  content: z.string(),
  senderId: z.string(),
});

type Messages = z.infer<typeof Messages>;

export function MessageContent({ passSelectedUser }: ContactsNavProps) {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Messages[]>([]);

  const { data: currentUser } = api.messagesAPI.me.useQuery();
  const { mutate } = api.messagesAPI.createMessage.useMutation();
  const { data: readMessages } = api.messagesAPI.readMessagesByChannel.useQuery(
    {
      channelName: passSelectedUser.pusherChannelName,
    }
  );

  const userImg = currentUser?.image || "";

  const messageHandler = (message: Messages) => {
    setMessages((prev) => [...prev, message]);
  };

  useEffect(() => {
    if (readMessages) {
      setMessages(readMessages);
    }
  }, [readMessages]);

  useEffect(() => {
    const pusherClient = new PusherClient("bcf89bc8d5be9acb07da", {
      cluster: "us3",
    });

    pusherClient.subscribe(passSelectedUser.pusherChannelName || "");
    pusherClient.bind("my-event", messageHandler);

    return () => {
      pusherClient.unsubscribe(passSelectedUser.pusherChannelName || "");
      pusherClient.unbind("my-event", messageHandler);
      pusherClient.disconnect();
    };
  }, []);

  const sendMessage = () => {
    messageHandler({
      content: input,
      senderId: currentUser?.id || "",
      //giving it random id.... probably need a better way to do this
      id: new Date().toISOString(),
    });
    mutate({
      receiverId: passSelectedUser.id,
      pusherChannelName: passSelectedUser.pusherChannelName,
      content: input,
    });
    setInput("");
  };

  const scrollDownRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (scrollDownRef.current) {
      scrollDownRef.current.scrollIntoView({});
    }
  });

  console.log(messages);
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row">
          <div className="w-full pr-2">
            {/* get selected 'contact' from contact nav  */}
            <Card className="w-full rounded-none border  border-t-0 py-4">
              <CardTitle className="flex h-6 items-center justify-center text-center">
                {passSelectedUser.name}
              </CardTitle>
            </Card>

            <Card className="min-h-65vh w-full rounded-none border border-t-0 py-4">
              <CardContent className="-p-1 px-1">
                <div className="flex max-h-60vh flex-col space-y-2 overflow-auto">
                  {messages?.map((message) => {
                    return (
                      <>
                        {message.senderId === currentUser?.id && (
                          <div
                            className="flex flex-row-reverse items-center justify-start space-y-2 text-end "
                            key={message.id}
                          >
                            <div ref={scrollDownRef} />

                            <Avatar className="mx-1 mt-1">
                              <AvatarImage src={userImg} />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            {/* //replace overflow with thicker text box */}
                            <div className="-p-6 flex h-full w-48 overflow-auto rounded bg-blue-300 p-1 text-sm">
                              <div>{message.content}</div>
                            </div>
                          </div>
                        )}

                        {message.senderId !== currentUser?.id && (
                          <div
                            className="flex flex-row items-center justify-start space-y-2  text-start "
                            key={message.id}
                          >
                            <div ref={scrollDownRef} />

                            <Avatar className="mx-1 mt-1">
                              <AvatarImage src={userImg} />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            {/* //replace overflow with thicker text box */}
                            <div className="-p-6 flex h-full w-48 overflow-auto rounded bg-gray-300 p-1 text-sm">
                              <div>{message.content}</div>
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* input and send button */}
            <div className="flex flex-row items-center space-x-2">
              <Input
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                onChange={(e) => {
                  // setMessagesMeow(e.target.value);
                  setInput(e.target.value);
                }}
                value={input}
                className="my-2 px-4 py-4"
                aria-label="Input for message"
              />
              <div className="flex h-16 items-center justify-end ">
                <Button
                  onClick={() => {
                    sendMessage();
                  }}
                  variant="outline"
                >
                  Send
                </Button>
              </div>
            </div>
          </div>

          {/* far right menu */}
          <div className="hidden w-72 lg:block">
            <div className="flex items-center justify-center pt-4">
              <Avatar>
                <AvatarImage src="https://lh3.googleusercontent.com/a/AAcHTtc4YvX9jKd0aR3FDN0GrP848CYTjuZgb7Yicq6K=s96-c" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="py-2 text-center">{passSelectedUser.name}</div>
            <div className="flex flex-row items-center justify-center space-x-1 px-4 text-lg">
              <Button variant="outline" size="sm">
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
