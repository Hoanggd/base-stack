import { BsNumberField } from '@workspace/ui/components/Numberfield'

export function NumberFieldWithoutStepper() {
    return <BsNumberField showStepper={false} placeholder="Enter a number" />
}
