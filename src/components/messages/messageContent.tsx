/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Button } from "../ui/button";
import { Card, CardContent, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { useState } from "react";
import { useEffect } from "react";
import PusherClient from "pusher-js";
import { api } from "~/utils/api";

//Currently not working live
//Does save to database
//can connect to pusher channel and recieve messages from their debugger but does not display them, nor can I send any out.

const lastMessagedUser = "John Doe";
interface ContactsNavProps extends React.HTMLAttributes<HTMLElement> {
  passSelectedUser: {
    name: string;
    id: string;
    pusherChannelName: string;
  };
}

export function MessageContent({ passSelectedUser }: ContactsNavProps) {
  const { data: currentUser } = api.messagesAPI.me.useQuery();

  const currentSelectedUser = passSelectedUser.id || lastMessagedUser;
  
  const [input, setInput] = useState<string>("");
  const { mutate } = api.messagesAPI.createMessage.useMutation();

  const { data: selectedUserImage } = api.messagesAPI.getUserImage.useQuery({
    userId: currentSelectedUser,
  });

  const { data: readMessages } =
    api.messagesAPI.readAllMessagesBySelectedUser.useQuery({
      receiverId: currentSelectedUser,
      senderId: currentUser?.userId || "",
    });

  const [messages, setMessages] = useState<any[]>([]);

  const sendMessage = () => {
    mutate({
      receiverId: passSelectedUser.id,
      pusherChannelName: passSelectedUser.pusherChannelName,
      content: input,
    });
    setInput("");
  };

  const [selectedChannel, setSelectedChannel] = useState("");
  useEffect(() => {
    setSelectedChannel(passSelectedUser.pusherChannelName || "");
  }, [passSelectedUser.pusherChannelName]);

  const channel = selectedChannel;

  useEffect(() => {
    const pusherClient = new PusherClient("bcf89bc8d5be9acb07da", {
      cluster: "us3",
    });

    pusherClient.subscribe(channel);

    // const channel = pusher.subscribe(selectedChannel.channelName);

    // const messageHandler = (message: any) => {
    // }

    pusherClient.bind("my-event", function (data: any) {
      setMessages((prev) => {
        console.log(data)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return [data, ...prev];
      });
    });

    return () => {
      pusherClient.unsubscribe(channel);
      pusherClient.unbind("my-event");
      pusherClient.disconnect();
    };
  }, [channel]);

  console.log(channel);

  useEffect(() => {
    if (readMessages) {
      setMessages(readMessages);
    }
  }, [readMessages]);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row">
          <div className="w-full pr-2">
            {/* get selected 'contact' from contact nav  */}
            <Card className="w-full rounded-none border  border-t-0 py-4">
              <CardTitle className="flex h-6 items-center justify-center text-center">
                {passSelectedUser.name || lastMessagedUser}
              </CardTitle>
            </Card>

            <Card className="min-h-65vh w-full rounded-none border border-t-0 py-4">
              <CardContent className="-p-1 px-1">
                <div className="flex max-h-60vh flex-col space-y-2 overflow-auto">
                  {messages?.map((message) => {
                    if (message.senderId === currentUser?.userId) {
                      return (
                        <div
                          className="flex flex-row-reverse items-center justify-start space-y-2 text-end"
                          key={message.id}
                        >
                          <Avatar className="mx-1 mt-1">
                            <AvatarImage src={currentUser?.image || ""} />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <div className="-p-6 rounded bg-blue-300 p-1 text-sm">
                            {message.content}
                            {/* {message.} */}
                          </div>
                        </div>
                      );
                    }
                    if (message.receiverId !== currentUser?.userId) {
                      return (
                        <div
                          className="flex flex-row items-center justify-start space-y-2 text-end"
                          key={message.id}
                        >
                          <Avatar className="mx-1 mt-1">
                            <AvatarImage src={selectedUserImage?.image || ""} />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <CardContent className="-p-4 rounded bg-gray-300 p-1 text-sm">
                            {/* {liveMessages} */}
                            {message.content}
                          </CardContent>
                        </div>
                      );
                    }
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
