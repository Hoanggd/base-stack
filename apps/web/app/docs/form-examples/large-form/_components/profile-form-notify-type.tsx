"use client";

import { Checkbox } from "@workspace/ui/components/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { RadioGroup } from "@workspace/ui/components/radio-group";
import { useFormContext } from "react-hook-form";
import { FormInputs } from "./utils";

export function NotifyType() {
  const form = useFormContext<FormInputs>();

  return (
    <div className="space-y-4 py-6">
      <h2 className="uppercase text-gray-500 text-sm font-semibold">
        Notification
      </h2>
      <FormField
        control={form.control}
        name="enableNotify"
        render={({ field }) => (
          <FormItem flow="row">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel>Enable notification</FormLabel>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="notifyType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Notify me about</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                options={[
                  { label: "All new messages", value: "all" },
                  { label: "Direct messages and mentions", value: "mentions" },
                ]}
              ></RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
