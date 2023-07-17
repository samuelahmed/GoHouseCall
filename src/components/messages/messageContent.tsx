import { Button } from "../ui/button";
import { Card, CardContent, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { useState, useEffect, useRef } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import PusherClient from "pusher-js";
import { z } from "zod";

const Messages = z.object({
  id: z.string(),
  content: z.string().nonempty().nonempty(),
  senderId: z.string(),
  receiverId: z.string(),
  message: z.string().nonempty(),
  createdAt: z.string(),
});
type Messages = z.infer<typeof Messages>;

export function MessageContent() {
  const router = useRouter();
  const channelName = router.query.messageId;
  const [input, setInput] = useState<string>("");
  const { data: currentUser } = api.messagesAPI.me.useQuery();
  const { data: readMessages } = api.messagesAPI.readMessagesByChannel.useQuery(
    {
      channelName: channelName as string,
    }
  );
  const { data: currentChannel } =
    api.messagesAPI.getContactChannelInfo.useQuery({
      channelName: channelName as string,
    });

  const caregiverId = currentChannel?.caregiverId;
  const patientId = currentChannel?.patientId;

  let contactId = "";

  if (caregiverId === currentUser?.userId) {
    contactId = patientId as string;
  } else if (patientId === currentUser?.userId) {
    contactId = caregiverId as string;
  }
  const { data: contactInfo } = api.messagesAPI.getContactInfo.useQuery({
    userId: contactId,
  });

  const [allMessagesForChannel, setAllMessagesForChannel] = useState<
    Messages[]
  >([]);

  useEffect(() => {
    if (!readMessages) {
      return;
    }
    setAllMessagesForChannel(readMessages as unknown as Messages[]);
  }, [readMessages]);

  const currentChannelName = currentChannel?.pusherChannelName;

  useEffect(() => {
    //If I want to user pusher for other purposes, I need to move the create pusher isntance to earlier in the program
    const pusher = new PusherClient("bcf89bc8d5be9acb07da", {
      cluster: "us3",
    });

    if (!currentChannelName) {
      return;
    }

    const pusherChannel = pusher.subscribe(`${currentChannelName}`);

    pusherChannel.bind("my-event", function (data: Messages) {
      console.log(data);

      setAllMessagesForChannel((prev) => {
        return [...prev, data] as Messages[];
      });
    });

    return () => {
      pusher.disconnect();
      pusher.unsubscribe(`${currentChannelName}`);
    };
  }, [currentChannelName]);

  const sendMessage = api.messagesAPI.createMessage.useMutation();

  const sendMessageFunction = () => {
    sendMessage.mutate({
      content: input,
      receiverId: contactId,
      pusherChannelName: currentChannelName as string,
    });
    setInput("");
  };

  const bottomEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();

    function scrollToBottom() {
      if (bottomEl.current) {
        bottomEl.current.scrollIntoView({
          behavior: "instant",
          block: "end",
          inline: "nearest",
        });
      }
    }
  }, [allMessagesForChannel]);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row">
          <div className="w-full pr-2">
            <Card className="w-full rounded-none border  border-t-0 py-4">
              <CardTitle className="flex h-6 items-center justify-center text-center">
                {contactInfo?.name}
              </CardTitle>
            </Card>

            <Card className="min-h-65vh w-full rounded-none border border-t-0 py-4">
              <CardContent className="-p-1 px-1">
                <div className="flex max-h-60vh flex-col space-y-2 overflow-auto">
                  <>
                    {allMessagesForChannel.map((message) => {
                      return (
                        <div key={message.createdAt}>
                          {message.senderId === currentUser?.id && (
                            <div className="flex flex-row-reverse items-center justify-start space-y-2 text-end ">
                              <Avatar className="mx-1 mt-1">
                                <AvatarImage src={currentUser?.image || ""} />
                                <AvatarFallback></AvatarFallback>
                              </Avatar>
                              <div className="-p-6 flex h-full w-40 overflow-auto rounded bg-blue-300 p-1 text-sm md:w-96">
                                <div>{message.content}</div>
                                <div>{message.message}</div>
                              </div>
                            </div>
                          )}
                          {message.senderId !== currentUser?.id && (
                            <div className="flex flex-row items-center justify-start space-y-2  text-start ">
                              <Avatar className="mx-1 mt-1">
                                <AvatarImage src={contactInfo?.image || ""} />
                                <AvatarFallback></AvatarFallback>
                              </Avatar>
                              <div className="-p-6 flex h-full w-40 overflow-auto rounded bg-gray-300 p-1 text-sm md:w-96">
                                <div>{message.content}</div>
                                <div>{message.message}</div>
                              </div>
                            </div>
                          )}
                          <div ref={bottomEl} />
                        </div>
                      );
                    })}
                  </>
                </div>
              </CardContent>
            </Card>

            {/* input and send button */}
            <div className="flex flex-row items-center space-x-2">
              <Input
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessageFunction();
                  }
                }}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                value={input}
                className="my-2 px-4 py-4"
                aria-label="Input for message"
              />
              <div className="flex h-16 items-center justify-end ">
                <Button
                  onClick={() => {
                    sendMessageFunction();
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
                <AvatarImage src={contactInfo?.image || ""} />
                <AvatarFallback></AvatarFallback>
              </Avatar>
            </div>
            <div className="py-2 text-center">{contactInfo?.name}</div>
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
