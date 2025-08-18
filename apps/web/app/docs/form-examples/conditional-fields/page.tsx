"use client";

import { Button } from "@workspace/ui/components/button";
import { CheckboxGroup } from "@workspace/ui/components/checkbox-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/textfield";
import { Select } from "@workspace/ui/components/select";
import { useForm } from "react-hook-form";
import { z } from "@workspace/ui/lib/zod";

export const optionSchema = z.object({
  value: z.string(),
  label: z.string(),
});

export type Option = z.infer<typeof optionSchema>;

type EndUserFormInputs = {
  name?: string;
  email?: string;
  role?: Option;
};

type AdminFormInputs = {
  name?: string;
  email?: string;
  role?: Option;
  permissions?: Option[];
};

type FormInputs = EndUserFormInputs | AdminFormInputs;

enum Role {
  USER = "user",
  ADMIN = "admin",
}

const ROLES = [
  { value: Role.USER, label: "User" },
  { value: Role.ADMIN, label: "Admin" },
];

const PERMISSIONS = [
  { value: "read", label: "Read" },
  { value: "write", label: "Write" },
];

export default function ConditionalFieldsForm() {
  const form = useForm<FormInputs>({
    defaultValues: {
      role: undefined,
      name: "",
    },
  });

  const onSubmit = (data: FormInputs) => {
    window.alert(JSON.stringify(data, null, 4));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <h1 className="text-2xl font-semibold">Create User</h1>
        <FormField
          control={form.control}
          name="role"
          rules={{ validate: optionSchema.validateFn() }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Select {...field} options={ROLES} isSearchable={false} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          rules={{ validate: z.string().min(4).validateFn() }}
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
        {form.watch("role")?.value === Role.ADMIN && (
          <FormField
            control={form.control}
            name="permissions"
            rules={{
              validate: z.array(optionSchema).min(1).validateFn(),
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Permissions</FormLabel>
                <FormControl>
                  <CheckboxGroup {...field} options={PERMISSIONS} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
