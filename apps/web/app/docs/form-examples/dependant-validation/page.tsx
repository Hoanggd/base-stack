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
import { z } from "@workspace/ui/lib/zod";
import { useForm } from "react-hook-form";

type FormInputs = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

export default function DependantValidationForm() {
  const form = useForm<FormInputs>();

  const onSubmit = (data: FormInputs) => {
    window.alert(JSON.stringify(data, null, 4));
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <h1 className="text-2xl font-semibold">Dependent Validation Form</h1>
        <FormField
          control={form.control}
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
          name="password"
          control={form.control}
          rules={{ validate: z.string().min(6).validateFn() }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          rules={{
            validate: z
              .string()
              .min(6)
              .and(
                z.literal(form.watch("password"), {
                  errorMap: () => ({ message: "Passwords don't match" }),
                })
              )
              .validateFn(),
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
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
