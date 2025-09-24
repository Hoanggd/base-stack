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
import { useForm } from "react-hook-form";
import { z } from "@workspace/ui/lib/zod";

type FormInputs = {
  email: string;
  name: string;
};

export default function ValidationForm() {
  const form = useForm<FormInputs>({ defaultValues: { email: "", name: "" } });

  const onSubmit = (data: FormInputs) => {
    window.alert(JSON.stringify(data, null, 4));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <h1 className="text-2xl font-semibold">Create User</h1>
        <FormField
          name="email"
          rules={{ validate: z.string().email().validateFn() }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="name"
          rules={{ validate: z.string().min(6).validateFn() }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
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
