'use client'

import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from '@workspace/ui/components/Sonner'
import { z } from '@workspace/lib/validation'

import { Button } from '@workspace/ui/components/Button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    setSubmitErrors,
} from '@workspace/ui/components/Form'
import { Input } from '@workspace/ui/components/Textfield'
import { LoadingOverlay } from '@workspace/ui/components/LoadingOverlay'

interface FormValues {
    email: string
    name: string
}

/**
 * This is a mock function that simulates an error creating a user
 * It throws an error with a cause object that contains the error messages for the email and name fields
 */
const createUser = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    throw new Error('Failed to create user', {
        cause: { email: 'Email already exists', name: 'Name already exists' },
    })
}

export function RecFormSubmissionErrors() {
    const form = useForm<FormValues>({
        defaultValues: {
            email: '',
            name: '',
        },
    })
    const createUserMutation = useMutation({ mutationFn: () => createUser() })

    const onSubmit = (data: FormValues) => {
        createUserMutation.mutate(undefined, {
            onSuccess: () => {
                toast.neutral({
                    title: 'User created successfully',
                    description: <code>{JSON.stringify(data)}</code>,
                })
            },
            // we use any for testing purposes, in production you should use the correct type
            onError: (error: any) => {
                const cause = error.cause as Record<string, string>

                // field-specific errors
                setSubmitErrors(form, cause)

                // general form error
                toast.error({
                    title: error.message,
                })
            },
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
                <h2 className="text-xl font-semibold">Sign up</h2>
                <LoadingOverlay isLoading={createUserMutation.isPending}>
                    <div className="grid gap-4">
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
                        <Button className="w-full" type="submit">
                            Sign up
                        </Button>
                    </div>
                </LoadingOverlay>
            </form>
        </Form>
    )
}
