'use client'

import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from '@workspace/ui/components/Sonner'
import { z } from '@workspace/ui/lib/zod'

import { Button } from '@workspace/ui/components/Button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@workspace/ui/components/Form'
import { Input } from '@workspace/ui/components/Textfield'

interface FormInputs {
  email: string
  name: string
}

const createUser = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  throw new Error('Error creating user', {
    cause: { email: 'Email already exists', name: 'Name already exists' },
  })
}

export function RecFormSubmissionErrors() {
  const form = useForm<FormInputs>()
  const createUserMutation = useMutation({ mutationFn: () => createUser() })

  const onSubmit = (data: FormInputs) => {
    createUserMutation.mutate(undefined, {
      onSuccess: () => {
        toast.neutral({
          title: 'User created successfully',
          description: <code>{JSON.stringify(data)}</code>,
        })
      },
      onError: (error: any) => {
        form.setError('root', {
          message: 'Error creating user',
        })
        form.setError('email', {
          message: error.cause?.email || 'Email error',
        })
        form.setError('name', {
          message: error.cause?.name || 'Name error',
        })
      },
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 container max-w-[500px]">
        <h2>Submission Errors</h2>
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
          name="name"
          rules={{ validate: z.string().min(4).validateFn() }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter your name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button isDisabled={createUserMutation.isPending} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  )
}
