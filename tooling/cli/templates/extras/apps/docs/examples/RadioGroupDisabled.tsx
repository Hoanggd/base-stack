'use client'

import { Label } from '@workspace/ui/components/Field'
import { RadioGroup, Radio } from '@workspace/ui/components/RadioGroup'

export function RadioGroupDisabled() {
    return (
        <RadioGroup isDisabled value="red">
            <Label>Color</Label>
            <Radio value="red">Red</Radio>
            <Radio value="blue">Blue</Radio>
            <Radio value="green">Green</Radio>
            <Radio value="yellow">Yellow</Radio>
        </RadioGroup>
    )
}
