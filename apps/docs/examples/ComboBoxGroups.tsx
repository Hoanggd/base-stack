"use client"

import { BsComboBox } from "@workspace/ui/components/combobox"
import { ComboboxItem, ComboboxSection, ComboboxHeader } from "@workspace/ui/components/combobox"

const groupedOptions = [
  {
    name: "Frontend",
    items: [
      { id: 1, name: "React" },
      { id: 2, name: "Vue" },
      { id: 3, name: "Angular" },
    ],
  },
  {
    name: "Backend",
    items: [
      { id: 4, name: "Node.js" },
      { id: 5, name: "Python" },
      { id: 6, name: "Java" },
    ],
  },
  {
    name: "Mobile",
    items: [
      { id: 7, name: "React Native" },
      { id: 8, name: "Flutter" },
      { id: 9, name: "Swift" },
    ],
  },
]

export function ComboBoxGroups() {
  return (
    <BsComboBox
      label="Technology"
      description="Select a technology by category"
      items={groupedOptions}
    >
      {(section) => (
        <ComboboxSection>
          <ComboboxHeader>{section.name}</ComboboxHeader>
          {section.items.map((item) => (
            <ComboboxItem key={item.id}>{item.name}</ComboboxItem>
          ))}
        </ComboboxSection>
      )}
    </BsComboBox>
  )
}
