"use client";

import { Button } from "@workspace/ui/components/button";
import { DateRangePicker } from "@workspace/ui/components/date-range-picker";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/textfield";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormInputs } from "./utils";

export function WorkHistory() {
  const form = useFormContext<FormInputs>();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "works",
  });

  return (
    <div className="space-y-2 py-6">
      <h2 className="uppercase text-neutral-500 text-sm font-semibold">
        Work History
      </h2>
      {fields.length > 0 && (
        <div className="space-y-3">
          {fields.map((field, index) => (
            <div key={field.id} className="border rounded-md p-4">
              <div className="grid grid-cols-2 gap-2.5 flex-1">
                <FormField
                  control={form.control}
                  name={`works.${index}.position`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Position" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`works.${index}.company`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Company" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`works.${index}.duration`}
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Duration</FormLabel>
                      <FormControl>
                        <DateRangePicker {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end">
                <Button
                  variant="link"
                  className="px-0 h-7 text-red-500 mt-2"
                  onClick={() => remove(index)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      <Button
        variant="outline"
        onClick={() =>
          append({
            company: "",
            position: "",
            duration: { start: "", end: "" },
          })
        }
      >
        + Add Work
      </Button>
    </div>
  );
}
