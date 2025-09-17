"use client";

import { BsSelect } from "@workspace/ui/components/select";
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar";
import { Label } from "@workspace/ui/components/field";
import { Button } from "@workspace/ui/components/button";

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    className: "bg-sky-500",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    className: "bg-red-500",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    className: "bg-green-500",
  },
  {
    id: 4,
    name: "Bob Johnson",
    email: "bob@example.com",
    className: "bg-green-500",
  },
  {
    id: 5,
    name: "Alice Brown",
    email: "alice@example.com",
    className: "bg-yellow-500",
  },
  {
    id: 6,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    className: "bg-purple-500",
  },
];

export function SelectCustom() {
  return (
    <BsSelect
      options={users}
      defaultValue={1}
      renderOption={(value) => (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarFallback className={value.className}>
              {value.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span>{value.name}</span>
            <span className="opacity-60 text-xs">{value.email}</span>
          </div>
        </div>
      )}
    />
  );
}
