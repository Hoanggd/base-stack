'use client'

import { useForm } from 'react-hook-form'
import { toast } from '@workspace/ui/components/Sonner'
import { z } from '@workspace/ui/lib/zod'

import { Button } from '@workspace/ui/components/Button'
import { BsCheckboxGroup, BsCheckboxGroupOption } from '@workspace/ui/components/Checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@workspace/ui/components/Form'
import { Input } from '@workspace/ui/components/Textfield'
import { BsSelect } from '@workspace/ui/components/Select'

enum Role {
    User = 'user',
    Admin = 'admin',
}

interface EndUserFormInputs {
    name?: string
    email?: string
    role?: Role
}

interface AdminFormInputs {
    name?: string
    email?: string
    role?: Role
    permissions?: string[]
}

type FormValues = EndUserFormInputs | AdminFormInputs

const ROLES = [
    { id: Role.User, name: 'User' },
    { id: Role.Admin, name: 'Admin' },
]

const PERMISSIONS = [
    { id: 'read', name: 'Read' },
    { id: 'write', name: 'Write' },
]

export function RecFormConditionalFields() {
    const form = useForm<FormValues>({
        defaultValues: {
            role: ROLES[0].id,
            name: '',
            permissions: [],
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

    const selectedRole = form.watch('role')

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 container max-w-[500px]">
                <h2 className="text-xl font-semibold">Create User</h2>
                <FormField
                    control={form.control}
                    name="role"
                    rules={{ validate: z.string().validateFn() }}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Role</FormLabel>
                            <FormControl>
                                <BsSelect {...field} options={ROLES} />
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
                {selectedRole === Role.Admin && (
                    <FormField
                        control={form.control}
                        name="permissions"
                        rules={{
                            validate: value => {
                                if (selectedRole === Role.Admin && (!value || value.length === 0)) {
                                    return 'At least one permission is required for admin users'
                                }
                                return true
                            },
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Permissions</FormLabel>
                                <FormControl>
                                    <BsCheckboxGroup {...field} options={PERMISSIONS} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
