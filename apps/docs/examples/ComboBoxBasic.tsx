"use client"

import { BsComboBox } from "@workspace/ui/components/combobox"
import { ComboboxItem } from "@workspace/ui/components/combobox"

const options = [
  { id: 1, name: "Option 1" },
  { id: 2, name: "Option 2" },
  { id: 3, name: "Option 3" },
  { id: 4, name: "Option 4" },
]

export function ComboBoxBasic() {
  return (
    <BsComboBox
      label="Basic ComboBox"
      items={options}
    >
      {(item) => <ComboboxItem>{item.name}</ComboboxItem>}
    </BsComboBox>
  )
}
