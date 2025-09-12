"use client"

import { BsComboBox } from "@workspace/ui/components/combobox"
import { ComboboxItem } from "@workspace/ui/components/combobox"

const frameworks = [
  { id: 1, name: "React" },
  { id: 2, name: "Vue" },
  { id: 3, name: "Angular" },
  { id: 4, name: "Svelte" },
  { id: 5, name: "Next.js" },
  { id: 6, name: "Nuxt.js" },
  { id: 7, name: "SvelteKit" },
]

export function ComboBoxDemo() {
  return (
    <BsComboBox
      label="Framework"
      description="Choose your preferred framework"
      items={frameworks}
    >
      {(item) => <ComboboxItem>{item.name}</ComboboxItem>}
    </BsComboBox>
  )
}
