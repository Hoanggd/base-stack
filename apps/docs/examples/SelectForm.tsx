'use client'

import { useForm } from 'react-hook-form'
import { toast } from '@workspace/ui/components/Sonner'

import { Button } from '@workspace/ui/components/Button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@workspace/ui/components/Form'
import { BsSelect } from '@workspace/ui/components/Select'
import { z } from '@workspace/lib/validation'

interface FormValues {
    languages: Array<string>
    role: string
}

const languageOptions = [
    { id: 'en', name: 'English' },
    { id: 'es', name: 'Spanish' },
    { id: 'fr', name: 'French' },
    { id: 'de', name: 'German' },
    { id: 'it', name: 'Italian' },
]

const roleOptions = [
    { id: 'admin', name: 'Admin' },
    { id: 'user', name: 'User' },
]

export function SelectForm() {
    const form = useForm<FormValues>({
        defaultValues: {
            role: roleOptions[0].id,
        },
    })

    function onSubmit(data: FormValues) {
        toast.neutral({
            title: 'You submitted the following values',
            description: (
                <pre>
                    <code>{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-full">
                <FormField
                    control={form.control}
                    name="role"
                    rules={{ validate: z.string().min(1).validateFn() }}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Role</FormLabel>
                            <FormControl>
                                <BsSelect isClearable options={roleOptions} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="languages"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Language</FormLabel>
                            <FormControl>
                                <BsSelect selectionMode="multiple" options={languageOptions} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-2 gap-2 py-2">
                    <Button variant="outline">Cancel</Button>
                    <Button type="submit">Save</Button>
                </div>
            </form>
        </Form>
    )
}
