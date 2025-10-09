'use client'

import { useQuery } from '@tanstack/react-query'
import { Button } from '@workspace/ui/components/Button'
import { useNProgress } from '@workspace/ui/components/NProgress'
import { Spinner } from '@workspace/ui/components/Spinner'
import React from 'react'

// Simulate a slow API call, returning a promise that resolves after 1 second
function useFakeApiCall() {
    return useQuery({
        queryKey: ['nprogress'],
        queryFn: () => {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(true)
                }, 1000)
            })
        },
    })
}

// Actual demo
export function NProgressDemo() {
    const { isFetching, refetch } = useFakeApiCall()

    useNProgress({ isFetching })

    return (
        <div>
            <Button isDisabled={isFetching} onClick={() => refetch()}>
                {isFetching && <Spinner />}
                Refetch
            </Button>
        </div>
    )
}
