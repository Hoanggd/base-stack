'use client'

import { paginateUsers, User } from '@/shared/actions/examples/users'
import { useInfiniteQuery } from '@tanstack/react-query'
import { BsSelectAsync } from '@workspace/ui/components/SelectAsync'
import React from 'react'

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

export function SelectAsyncDemo() {
    const [search, setSearch] = React.useState('')
    const usersQuery = useUsers({ search })
    const options = usersQuery.data?.pages.flatMap(page => page.data) || []

    const [value, setValue] = React.useState<User | null>(null)

    return (
        <BsSelectAsync
            isClearable
            isSearchable
            value={value}
            onChange={setValue}
            options={options}
            optionsLoader={{
                onFetchNextPage: usersQuery.fetchNextPage,
                isFetching: usersQuery.isFetching,
                hasNextPage: usersQuery.hasNextPage,
                onSearch: setSearch,
            }}
        />
    )
}
