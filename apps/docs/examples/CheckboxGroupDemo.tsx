import { CheckboxGroup, Checkbox } from '@workspace/ui/components/Checkbox'
import { Label } from '@workspace/ui/components/Field'

export function CheckboxGroupDemo() {
    return (
        <CheckboxGroup>
            <Label>Choose your favorite fruits</Label>
            <div className="grid grid-cols-3 gap-4">
                <Checkbox value="apple">Apple</Checkbox>
                <Checkbox value="banana">Banana</Checkbox>
                <Checkbox value="orange">Orange</Checkbox>
            </div>
        </CheckboxGroup>
    )
}
