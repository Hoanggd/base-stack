'use client'

import { BsSelect } from '@workspace/ui/components/Select'
import React from 'react'

const languages = [
    { id: 1, name: 'English' },
    { id: 2, name: 'Spanish' },
    { id: 3, name: 'French' },
    { id: 4, name: 'German' },
    { id: 5, name: 'Italian' },
]

export function SelectDemo() {
    return <BsSelect options={languages} />
}
