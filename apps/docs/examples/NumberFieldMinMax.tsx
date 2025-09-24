import { BsNumberField } from '@workspace/ui/components/Numberfield'

export function NumberFieldMinMax() {
    return <BsNumberField minValue={0} maxValue={10} placeholder="Enter a number" />
}
