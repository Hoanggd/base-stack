"use client";

import { BsMultipleSelect } from "@workspace/ui/components/select";
import { useState } from "react";

const languages = [
  { id: 1, name: "English" },
  { id: 2, name: "Spanish" },
  { id: 3, name: "French" },
  { id: 4, name: "German" },
  { id: 5, name: "Italian" },
];

export function SelectMultiple() {
  const [value, setValue] = useState<Array<number> | undefined>();

  return (
    <BsMultipleSelect
      isSearchable
      options={languages}
      value={value}
      onChange={setValue}
    />
  );
}
