import { BsNumberField } from '@workspace/ui/components/Numberfield'

export function NumberFieldCurrency() {
    return (
        <BsNumberField
            placeholder="Enter a number"
            formatOptions={{
                style: 'currency',
                currency: 'USD',
            }}
        />
    )
}
