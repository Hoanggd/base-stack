"use client";

import { Button } from "@workspace/ui/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/textfield";
import { extractDecimal, extractLetters, formatDecimal } from "@/lib/text";
import { useForm } from "react-hook-form";

type FormInputs = {
  currency: string;
  value: string;
};

export default function ParseAndTransform() {
  const form = useForm<FormInputs>({
    defaultValues: {
      currency: "",
      value: "",
    },
  });

  const onSubmit = (data: FormInputs) => {
    window.alert(JSON.stringify(data, null, 4));
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <h1 className="text-2xl font-semibold">Parse and Transform</h1>
        <FormField
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Currency</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onChange={(e) =>
                    field.onChange(extractLetters(e.target.value.toUpperCase()))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Value</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onChange={(e) =>
                    field.onChange(extractDecimal(e.target.value))
                  }
                  onBlur={(e) => field.onChange(formatDecimal(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
