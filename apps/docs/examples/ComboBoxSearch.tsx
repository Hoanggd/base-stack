"use client"

import { BsComboBox } from "@workspace/ui/components/combobox"
import { ComboboxItem } from "@workspace/ui/components/combobox"

const countries = [
  { id: 1, name: "United States" },
  { id: 2, name: "Canada" },
  { id: 3, name: "United Kingdom" },
  { id: 4, name: "Germany" },
  { id: 5, name: "France" },
  { id: 6, name: "Japan" },
  { id: 7, name: "Australia" },
  { id: 8, name: "Brazil" },
  { id: 9, name: "India" },
  { id: 10, name: "China" },
]

export function ComboBoxSearch() {
  return (
    <BsComboBox
      label="Country"
      description="Search and select a country"
      items={countries}
      allowsCustomValue
    >
      {(item) => <ComboboxItem>{item.name}</ComboboxItem>}
    </BsComboBox>
  )
}
