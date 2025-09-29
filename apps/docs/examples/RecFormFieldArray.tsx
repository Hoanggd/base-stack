'use client'

import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from '@workspace/ui/components/Sonner'
import { z } from '@workspace/ui/lib/zod'
import { Trash } from 'lucide-react'

import { Button } from '@workspace/ui/components/Button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@workspace/ui/components/Form'
import { Input } from '@workspace/ui/components/Textfield'

const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
})

interface User {
  email: string
  name: string
}

interface FormInputs {
  users: User[]
}

export function RecFormFieldArray() {
  const form = useForm<FormInputs>({
    defaultValues: {
      users: [{ email: '', name: '' }],
    },
  })

  const onSubmit = (data: FormInputs) => {
    toast.neutral({
      title: 'You submitted the following values',
      description: <code>{JSON.stringify(data)}</code>,
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <h2>Field Array</h2>

        {/* FormField is used here just to display validation errors for the entire users array */}
        <FormField
          control={form.control}
          name="users"
          render={() => (
            <FormItem>
              <FormLabel>Users</FormLabel>
              <UserFields />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

function UserFields() {
  const { control } = useForm<FormInputs>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'users',
  })

  return (
    <div className="flex flex-col gap-2">
      {fields.map((item, index) => (
        <div key={item.id} className="grid grid-cols-[1fr_1fr_auto] gap-3">
          <FormField
            control={control}
            name={`users.${index}.email`}
            rules={{ validate: z.string().email().validateFn() }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`users.${index}.name`}
            rules={{ validate: z.string().min(1).validateFn() }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button onClick={() => remove(index)} variant="outline" size="icon">
            <Trash />
          </Button>
        </div>
      ))}
      <div>
        <Button size="sm" variant="outline" onClick={() => append({ email: '', name: '' })}>
          Add User
        </Button>
      </div>
    </div>
  )
}
