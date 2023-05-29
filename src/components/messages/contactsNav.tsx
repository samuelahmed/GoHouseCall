"use client";

import { useState } from "react";

interface ContactsNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    name: string;
    title: string;
  }[];
}

export function ContactsNav({ items }: ContactsNavProps) {
  const [selectedUser, setSelectedUser] = useState({
    name: "",
    title: "",
  });
  return (
    <>
      <div className="flex flex-row space-x-12 space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <nav className="flex flex-col space-y-2">
            {items.map((item) => (
              <div
                key={item.name}
                onClick={() => {
                  void setSelectedUser(item);
                }}
              >
                {item.name}
              </div>
            ))}
          </nav>
        </aside>
        <div className="flex-1 lg:max-w-2xl">
          <div className="flex-1 lg:max-w-2xl">
            <div>{selectedUser.name}</div>
          </div>
        </div>
      </div>
    </>
  );
}
