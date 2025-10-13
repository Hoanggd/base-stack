'use client'

import { useFieldArray, useForm, useFormContext } from 'react-hook-form'
import { toast } from '@workspace/ui/components/Sonner'
import { z } from '@workspace/lib/validation'
import { PlusCircleIcon, Trash } from 'lucide-react'

import { Button } from '@workspace/ui/components/Button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@workspace/ui/components/Form'
import { Input } from '@workspace/ui/components/Textfield'
import { Separator } from 'react-aria-components'

interface User {
    email: string
    name: string
}

interface FormValues {
    users: Array<User>
}

export function RecFormFieldArray() {
    const form = useForm<FormValues>({
        defaultValues: {
            users: [{ email: '', name: '' }],
        },
    })

    const onSubmit = (data: FormValues) => {
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full max-w-[600px]">
                <h2 className="text-xl font-semibold">Add Users</h2>
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
                <Separator />
                <div className="flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={() => form.resetField('users')}>
                        Cancel
                    </Button>
                    <Button type="submit">Add Users</Button>
                </div>
            </form>
        </Form>
    )
}

function UserFields() {
    const { control } = useFormContext<FormValues>()

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'users',
    })

    return (
        <div className="flex flex-col gap-3">
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
                    {fields.length > 1 && (
                        <Button size="icon" variant="outlineDestructive" onClick={() => remove(index)}>
                            <Trash />
                        </Button>
                    )}
                </div>
            ))}
            <div>
                <Button variant="outline" size="sm" onClick={() => append({ email: '', name: '' })}>
                    <PlusCircleIcon />
                    Add
                </Button>
            </div>
        </div>
    )
}
