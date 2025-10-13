'use client'

import { Input } from '@workspace/ui/components/Textfield'
import { Label } from '@workspace/ui/components/Field'

export function InputWithLabel() {
    return (
        <div className="w-full">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Password" />
        </div>
    )
}
