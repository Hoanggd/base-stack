'use client'

import { useForm } from 'react-hook-form'
import { toast } from '@workspace/ui/components/Sonner'
import { z } from '@workspace/lib/validation'

import { Button } from '@workspace/ui/components/Button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@workspace/ui/components/Form'
import { Input, PasswordInput } from '@workspace/ui/components/Textfield'

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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
                <h2 className="text-xl font-semibold">Register</h2>
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
                                <PasswordInput {...field} placeholder="Enter your password" />
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
                                z.literal(form.watch('password'), {
                                    errorMap: () => ({ message: "Passwords don't match" }),
                                }),
                            )
                            .validateFn(),
                    }}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <PasswordInput {...field} type="password" placeholder="Confirm your password" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">
                    Register
                </Button>
            </form>
        </Form>
    )
}
