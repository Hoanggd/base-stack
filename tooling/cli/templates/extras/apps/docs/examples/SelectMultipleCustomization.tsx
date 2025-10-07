'use client'

import { BsSelect } from '@workspace/ui/components/Select'

const languages = [
    {
        id: 1,
        name: 'English',
        flag: '🇬🇧',
    },
    {
        id: 2,
        name: 'Spanish',
        flag: '🇪🇸',
    },
    {
        id: 3,
        name: 'French',
        flag: '🇫🇷',
    },
]

export function SelectMultipleCustomization() {
    return (
        <BsSelect
            selectionMode="multiple"
            options={languages}
            renderValue={value => (
                <div className="flex items-center gap-2">
                    <span>{value.flag}</span>
                    <span>{value.name}</span>
                </div>
            )}
            renderOption={value => (
                <div className="flex items-center gap-2">
                    <span className="text-xl">{value.flag}</span>
                    <span>{value.name}</span>
                </div>
            )}
        />
    )
}
