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
      <div className="flex flex-row space-x-4 space-y-0  px-4">
        <aside className="">
          <nav className="flex flex-col space-y-2 pt-4">
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
                      ? " flex h-12 flex-row items-center justify-between bg-gray-100"
                      : " flex h-12 flex-row items-center justify-between"
                  }
                >
                  <Button
                    variant="ghost"
                    className="flex h-full w-full flex-row items-center justify-between px-4 py-4"
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
