'use client'

import { useForm, useFormContext } from 'react-hook-form'
import { toast } from '@workspace/ui/components/Sonner'

import { Button } from '@workspace/ui/components/Button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@workspace/ui/components/Form'
import { z } from '@workspace/lib/validation'
import { paginateUsers, User } from '@/shared/actions/examples/users'
import { BsSelectAsync, BsSelectAsyncOption } from '@workspace/ui/components/SelectAsync'
import { useInfiniteQuery } from '@tanstack/react-query'
import React from 'react'

interface FormValues {
    user: User
    role: BsSelectAsyncOption
}

const roleOptions = [
    { id: 'admin', name: 'Admin' },
    { id: 'user', name: 'User' },
]

export function SelectAsyncForm() {
    const form = useForm<FormValues>()

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
                <UserField />
                <FormField
                    control={form.control}
                    name="role"
                    rules={{ validate: z.object({}).validateFn() }}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Role</FormLabel>
                            <FormControl>
                                <BsSelectAsync isClearable isSearchable options={roleOptions} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-2 gap-2 py-2">
                    <Button variant="outline">Cancel</Button>
                    <Button type="submit">Add</Button>
                </div>
            </form>
        </Form>
    )
}

function useUsers({ search }: { search: string }) {
    return useInfiniteQuery({
        queryKey: ['users', search],
        queryFn: ({ pageParam = 0 }) => {
            return paginateUsers(pageParam, search)
        },
        initialPageParam: 0,
        getNextPageParam: lastPage => lastPage.nextCursor,
    })
}

function UserField() {
    const form = useFormContext<FormValues>()

    const [search, setSearch] = React.useState('')
    const usersQuery = useUsers({ search })
    const options = usersQuery.data?.pages.flatMap(page => page.data) || []

    return (
        <FormField
            control={form.control}
            name="user"
            rules={{ validate: z.object({}).validateFn() }}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>User</FormLabel>
                    <FormControl>
                        <BsSelectAsync
                            {...field}
                            isClearable
                            isSearchable
                            options={options}
                            optionsLoader={{
                                onFetchNextPage: usersQuery.fetchNextPage,
                                isFetching: usersQuery.isFetching,
                                hasNextPage: usersQuery.hasNextPage,
                                onSearch: setSearch,
                            }}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
