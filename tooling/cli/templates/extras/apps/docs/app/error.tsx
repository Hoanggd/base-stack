'use client'

import React from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    React.useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="flex flex-col items-center justify-center mt-10">
            <h2 className="text-2xl font-bold">Something went wrong!</h2>
            <button onClick={() => reset()}>Try again</button>
        </div>
    )
}
