"use client";

import { useState } from "react";
import { MessageContent } from "./messageContent";
import { Card } from "~/components/ui/card";
import { Button } from "../ui/button";

interface ContactsNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    name: string;
    title: string;
    user: string;
  }[];
}

export function ContactsNav({ items }: ContactsNavProps) {
  const [selectedUser, setSelectedUser] = useState({
    name: "",
    title: "",
    user: "",
  });

  const [state, setState] = useState(0);

  return (
    <>
      <div className="flex-rowspace-y-0 flex  ">
        <aside className="">
          <h2 className="text-md flex h-12 items-center justify-center font-bold tracking-tight  md:text-2xl">
            Chat
          </h2>
          <nav className="mx-2 mt-2 flex flex-col space-y-2">
            {items.map((item, index) => (
              <div
                key={item.name}
                onClick={() => {
                  void setSelectedUser(item);
                }}
              >
                <Card
                  className={
                    state === index
                      ? " h-14 w-14 rounded-none bg-gray-100 md:w-44"
                      : " h-14 w-14 rounded-none bg-gray-100 md:w-44"
                  }
                >
                  <Button
                    variant="ghost"
                    className="h-full w-full rounded-none"
                    onClick={() => {
                      setState(index);
                    }}
                  >
                    {item.name}
                  </Button>
                </Card>
              </div>
            ))}
          </nav>
        </aside>
        <div className="h-full flex-1">
          <MessageContent passSelectedUser={selectedUser} />
        </div>
      </div>
    </>
  );
}
