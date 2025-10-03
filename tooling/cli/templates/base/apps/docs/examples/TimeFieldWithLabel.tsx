import { BsTimeField } from '@workspace/ui/components/Datefield'
import { Label } from '@workspace/ui/components/Field'

export function TimeFieldWithLabel() {
    return (
        <div>
            <Label>Time</Label>
            <BsTimeField className="w-[72px]" />
        </div>
    )
}
