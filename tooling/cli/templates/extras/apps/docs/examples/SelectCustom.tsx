'use client'

import { Avatar, AvatarFallback } from '@workspace/ui/components/Avatar'
import { BsSelect } from '@workspace/ui/components/Select'

const users = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        className: 'bg-sky-500',
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        className: 'bg-red-500',
    },
    {
        id: 3,
        name: 'Bob Johnson',
        email: 'bob@example.com',
        className: 'bg-green-500',
    },
]

export function SelectCustom() {
    return (
        <BsSelect
            options={users}
            defaultValue={1}
            renderValue={value => (
                <div className="flex items-center gap-2">
                    <Avatar className="size-5 text-xs">
                        <AvatarFallback className={value.className}>{value.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">{value.name}</div>
                </div>
            )}
            renderOption={value => (
                <div className="flex items-center gap-2">
                    <Avatar>
                        <AvatarFallback className={value.className}>{value.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span>{value.name}</span>
                        <span className="opacity-60 text-xs">{value.email}</span>
                    </div>
                </div>
            )}
        />
    )
}
