import { Button } from "../ui/button";
import { Card, CardContent, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { useState } from "react";
import { useEffect } from "react";
import PusherClient from "pusher-js";
import { api } from "~/utils/api";
import { z } from "zod";
import { useRouter } from "next/router";


interface ContactsNavProps extends React.HTMLAttributes<HTMLElement> {
  passSelectedUser: {
    name: string;
    id: string;
    patientId: string;
    caregiverId: string;
    pusherChannelName: string;
  };
}

const Messages = z.object({
  id: z.string(),
  content: z.string().nonempty(),
  senderId: z.string(),
});

type Messages = z.infer<typeof Messages>;

export function MessageContent() {
  // { passSelectedUser }: ContactsNavProps


  const router = useRouter();
  const id = router.query.messageId

  console.log(id)



  const passSelectedUser = {
    name: "test",
    id: "test",
    patientId: "test",
    caregiverId: "test",
    pusherChannelName: "test",
  };

  const [input, setInput] = useState<string>("");
  // const [messages, setMessages] = useState<Messages[]>([]);

  const { data: currentUser } = api.messagesAPI.me.useQuery();
  // const { mutate } = api.messagesAPI.createMessage.useMutation();

  const { data: readMessages } = api.messagesAPI.readMessagesByChannel.useQuery(
    {
      channelName: id as string,
    }
  );

  // console.log(readMessages)

  // useEffect(() => {
  //   if (readMessages) {
  //     setMessages(readMessages);
  //   }
  // }, [readMessages]);



  // const sendMessage = () => {
  //   setMessages((prev) => [
  //     ...prev,
  //     {
  //       content: input,
  //       senderId: currentUser?.id || "",
  //       id: new Date().toISOString(),
  //     },
  //   ]);

  //   mutate({
  //     receiverId: passSelectedUser.id,
  //     pusherChannelName: passSelectedUser.pusherChannelName,
  //     content: input,
  //   });
  //   setInput("");
  // };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row">
          <div className="w-full pr-2">
            <Card className="w-full rounded-none border  border-t-0 py-4">
              <CardTitle className="flex h-6 items-center justify-center text-center">
                {/* {friendName?.data?.name} */}
              </CardTitle>
            </Card>

            <Card className="min-h-65vh w-full rounded-none border border-t-0 py-4">
              <CardContent className="-p-1 px-1">
                <div className="flex max-h-60vh flex-col space-y-2 overflow-auto">
                  {passSelectedUser.pusherChannelName && (
                    <>
                      {readMessages?.map((message) => {
                        return (
                          <div 
                                                          key={message.id}

                          >
                            {message.senderId === currentUser?.id && (
                              <div
                                className="flex flex-row-reverse items-center justify-start space-y-2 text-end "
                                // key={message.id}
                              >
                                <Avatar className="mx-1 mt-1">
                                  <AvatarImage
                                  // src={userImg}
                                  />
                                  <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div className="-p-6 flex h-full w-48 overflow-auto rounded bg-blue-300 p-1 text-sm">
                                  <div>{message.content}</div>
                                </div>
                              </div>
                            )}

                            {message.senderId !== currentUser?.id && (
                              <div
                                className="flex flex-row items-center justify-start space-y-2  text-start "
                                // key={message.id}
                              >
                                <Avatar className="mx-1 mt-1">
                                  <AvatarImage
                                  // src={friendImg.data?.image || ""}
                                  />
                                  <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div className="-p-6 flex h-full w-48 overflow-auto rounded bg-gray-300 p-1 text-sm">
                                  <div>{message.content}</div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* input and send button */}
            <div className="flex flex-row items-center space-x-2">
              <Input
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    // sendMessage();
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
                    // sendMessage();
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
