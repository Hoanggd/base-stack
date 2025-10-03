import { Button } from '@workspace/ui/components/Button'
import { Trash } from 'lucide-react'

export function ButtonIcon() {
    return (
        <Button size="icon" variant="ghost">
            <Trash />
        </Button>
    )
}
