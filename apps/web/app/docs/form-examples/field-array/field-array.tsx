'use client'

import { Button } from '@workspace/ui/components/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFieldArray,
  useForm,
  useFormContext,
} from '@workspace/ui/components/form'
import { Input } from '@workspace/ui/components/input'
import { Trash } from 'lucide-react'
import { z } from '@workspace/ui/lib/zod'

const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
})

type User = z.infer<typeof userSchema>

type FormInputs = {
  users: User[]
}

export const FieldArray = () => {
  const form = useForm<FormInputs>({
    defaultValues: {
      users: [{ email: '', name: '' }],
    },
  })

  const onSubmit = (data: FormInputs) => {
    window.alert(JSON.stringify(data, null, 4))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <h2>Field Array</h2>

        {/* FormField is used here just to display validation errors for the entire users array */}
        <FormField
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
  const form = useFormContext<FormInputs>()

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'users',
    rules: {
      schema: z.array(z.any()).min(1).max(10),
    },
  })

  return (
    <div className="flex flex-col gap-2">
      {fields.map((item, index) => (
        <div key={item.id} className="grid grid-cols-[1fr_1fr_auto] gap-3">
          <FormField
            name={`users.${index}.email`}
            rules={{ schema: z.string().email() }}
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
            name={`users.${index}.name`}
            rules={{ schema: z.string().min(1) }}
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
