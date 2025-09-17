"use client";

import { Select, MultipleSelect } from "@workspace/ui/components/select";

export function SelectDemo() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <Select />
      <MultipleSelect />
    </div>
  );
}
