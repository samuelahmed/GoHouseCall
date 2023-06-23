import { useState } from "react";
import { MessageContent } from "./messageContent";
import { Card } from "~/components/ui/card";
import { Button } from "../ui/button";
import { api } from "~/utils/api";

export function ContactsNav() {
  const { data: me } = api.messagesAPI.me.useQuery();
  const { data: friendList } = api.messagesAPI.getFriends.useQuery();

  const [selectedUser, setSelectedUser] = useState({
    name: "",
    id: "",
    pusherChannelName: "",
    // channelId: "",
  });

  // console.log(selectedUser)

  const [state, setState] = useState(0);

  return (
    <>
      <div className="flex flex-row space-y-0 ">
        <aside className="">
          <h2 className="flex h-12 items-center justify-center text-2xl font-bold tracking-tight">
            Chat
          </h2>
          <nav className="mx-2 mt-2 flex flex-col space-y-2">
            {friendList?.map((friendList, index) => (
              <div
                key={friendList.id}
                onClick={() =>
                  setSelectedUser({
                    name: friendList.caregiverName || "",
                    id: friendList.id || "",
                    pusherChannelName: friendList.pusherChannelName || "",
                  })
                }
              >
                <Card
                  className={
                    state === index
                      ? " h-14 w-14  bg-gray-100 md:w-44"
                      : " h-14 w-14  md:w-44"
                  }
                >
                  <Button
                    variant="ghost"
                    className="h-full w-full text-sm"
                    onClick={() => {
                      setState(index);
                    }}
                  >
                    {me && me.type === "caregiver"
                      ? friendList.patientName
                      : friendList.caregiverName}
                  </Button>
                </Card>
              </div>
            ))}
          </nav>
        </aside>
        <div className="flex-1">
          <MessageContent passSelectedUser={selectedUser} />
        </div>
      </div>
    </>
  );
}
