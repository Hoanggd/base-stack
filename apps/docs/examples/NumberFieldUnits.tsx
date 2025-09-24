import { BsNumberField } from '@workspace/ui/components/Numberfield'

export function NumberFieldUnits() {
    return (
        <BsNumberField
            placeholder="Enter a number"
            formatOptions={{
                style: 'unit',
                unit: 'inch',
            }}
        />
    )
}
