'use client'

import { useForm } from 'react-hook-form'
import { toast } from '@workspace/ui/components/Sonner'
import { z } from '@workspace/ui/lib/zod'

import { Button } from '@workspace/ui/components/Button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@workspace/ui/components/Form'
import { Input } from '@workspace/ui/components/Textfield'

interface FormInputs {
  email: string
  name: string
  password: string
  confirmPassword: string
}

export function RecDependantValidation() {
  const form = useForm<FormInputs>()

  const onSubmit = (data: FormInputs) => {
    toast.neutral({
      title: 'You submitted the following values',
      description: <code>{JSON.stringify(data)}</code>,
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 container max-w-[500px]">
        <h3>Dependent Validation Form</h3>
        <FormField
          control={form.control}
          name="email"
          rules={{ validate: z.string().email().validateFn() }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter your email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          rules={{ validate: z.string().min(6).validateFn() }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" placeholder="Enter your password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          rules={{
            validate: (value) => {
              const password = form.watch('password')
              if (value !== password) {
                return "Passwords don't match"
              }
              return z.string().min(6).validateFn()(value)
            }
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" placeholder="Confirm your password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
