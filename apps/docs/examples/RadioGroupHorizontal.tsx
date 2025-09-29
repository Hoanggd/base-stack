'use client'

import { Label } from '@workspace/ui/components/Field'
import { RadioGroup, Radio } from '@workspace/ui/components/RadioGroup'

export function RadioGroupHorizontal() {
    return (
        <RadioGroup orientation="horizontal">
            <Label>Size</Label>
            <Radio value="xs">xs</Radio>
            <Radio value="sm">sm</Radio>
            <Radio value="md">md</Radio>
            <Radio value="lg">lg</Radio>
            <Radio value="xl">xl</Radio>
        </RadioGroup>
    )
}
