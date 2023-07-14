import { useState } from "react";
import { MessageContent } from "./messageContent";
import { Card } from "~/components/ui/card";
import { Button } from "../ui/button";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

export function ContactsNav() {
  
  const { data: currentMessages } =
    api.messagesAPI.allContactsForUser.useQuery();
  const { data: me } = api.messagesAPI.me.useQuery();

  console.log(currentMessages)

  const router = useRouter();
  const [selectedUserBgColor, setSelectedUserBgColor] = useState(0);

  return (
    <>
      <div className="flex flex-row space-y-0 ">
        <aside className="">
          <h2 className="flex h-12 items-center justify-center text-2xl font-bold tracking-tight">
            Chat
          </h2>
          <nav className="mx-2 mt-2 flex flex-col space-y-2">
            {currentMessages?.map((contact, index) => (
              <div
                key={contact.id}
                onClick={() => {
                  void router.push(`/messages/${contact.pusherChannelName || ""}`);
                }}
              >
                <Card
                  className={
                    selectedUserBgColor === index
                      ? " h-14 w-14  bg-gray-100 md:w-44"
                      : " h-14 w-14  md:w-44"
                  }
                >
                  <Button
                    variant="ghost"
                    className="h-full w-full text-sm"
                    onClick={() => {
                      setSelectedUserBgColor(index);
                    }}
                  >
                    {me?.type === "caregiver"
                      ? contact.patientName
                      : contact.caregiverName}
                  </Button>
                </Card>
              </div>
            ))}
          </nav>
        </aside>
        <div className="flex-1">
          <MessageContent />
        </div>
      </div>
    </>
  );
}
