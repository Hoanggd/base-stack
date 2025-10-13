'use client'

import { useForm } from 'react-hook-form'
import { toast } from '@workspace/ui/components/Sonner'
import { Button } from '@workspace/ui/components/Button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@workspace/ui/components/Form'
import { Input } from '@workspace/ui/components/Textfield'
import { LoadingOverlay } from '@workspace/ui/components/LoadingOverlay'
import { useMutation } from '@tanstack/react-query'

interface FormValues {
    email: string
    name: string
}

export function RecFormWithLoading() {
    // fake mutation
    const mutation = useMutation({
        mutationFn: (data: FormValues) => {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(data)
                }, 2000)
            })
        },
    })

    const form = useForm<FormValues>({
        defaultValues: {
            email: '',
            name: '',
        },
    })

    const onSubmit = (data: FormValues) => {
        mutation.mutate(data, {
            onSuccess: () => {
                toast.neutral({
                    title: 'You submitted the following values',
                    description: <code>{JSON.stringify(data)}</code>,
                })
            },
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 container max-w-[500px]">
                <h2 className="text-xl font-semibold">Sign up</h2>
                <LoadingOverlay isLoading={mutation.isPending}>
                    <div className="grid gap-4">
                        <FormField
                            control={form.control}
                            name="email"
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
                        <Button type="submit" className="w-full">
                            Sign up
                        </Button>
                    </div>
                </LoadingOverlay>
            </form>
        </Form>
    )
}
