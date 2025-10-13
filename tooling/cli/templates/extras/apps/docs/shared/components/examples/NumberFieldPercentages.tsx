import { BsNumberField } from '@workspace/ui/components/Numberfield'

export function NumberFieldPercentages() {
    return (
        <BsNumberField
            placeholder="Enter a number"
            formatOptions={{
                style: 'percent',
            }}
        />
    )
}
