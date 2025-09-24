import { Label } from '@workspace/ui/components/field'
import { BsNumberField } from '@workspace/ui/components/Numberfield'

export function NumberFieldWithLabel() {
    return (
        <div className="flex flex-col gap-2">
            <Label htmlFor="number">Age</Label>
            <BsNumberField id="number" placeholder="Enter a number" />
        </div>
    )
}
