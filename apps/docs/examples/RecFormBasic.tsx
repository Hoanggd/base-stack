'use client'

import { Button } from '@workspace/ui/components/Button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@workspace/ui/components/Form'
import { toast } from '@workspace/ui/components/Sonner'
import { Input } from '@workspace/ui/components/Textfield'
import { useForm } from 'react-hook-form'

interface FormValues {
    email: string
    name: string
}

export function RecFormBasic() {
    const form = useForm<FormValues>({
        defaultValues: {
            email: '',
            name: '',
        },
    })

    const onSubmit = (data: FormValues) => {
        toast.neutral({
            title: 'You submitted the following values',
            description: <code>{JSON.stringify(data)}</code>,
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 container max-w-[500px]">
                <h2 className="text-xl font-semibold">Sign up</h2>
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
            </form>
        </Form>
    )
}
