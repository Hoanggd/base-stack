import { BsDateField } from '@workspace/ui/components/Datefield'
import { Label } from '@workspace/ui/components/Field'

export function DateFieldWithLabel() {
    return (
        <div className="w-full">
            <Label>Event Date</Label>
            <BsDateField />
        </div>
    )
}
