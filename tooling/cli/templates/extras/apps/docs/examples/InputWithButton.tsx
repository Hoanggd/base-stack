import { Button } from '@workspace/ui/components/Button'
import { Input } from '@workspace/ui/components/Textfield'

export function InputWithButton() {
    return (
        <div className="flex items-center gap-2 w-full">
            <Input placeholder="Email" />
            <Button>Subscribe</Button>
        </div>
    )
}
