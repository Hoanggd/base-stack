"use client"

import { BsComboBox } from "@workspace/ui/components/combobox"
import { ComboboxItem } from "@workspace/ui/components/combobox"

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Editor" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "User" },
  { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "Admin" },
]

export function ComboBoxCustom() {
  return (
    <BsComboBox
      label="User"
      description="Search and select a user"
      items={users}
      allowsCustomValue
    >
      {(item) => (
        <ComboboxItem>
          <div className="flex flex-col">
            <span className="font-medium">{item.name}</span>
            <span className="text-sm text-muted-foreground">{item.email}</span>
            <span className="text-xs text-muted-foreground">{item.role}</span>
          </div>
        </ComboboxItem>
      )}
    </BsComboBox>
  )
}
