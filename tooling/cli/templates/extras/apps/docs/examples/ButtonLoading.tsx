import { Button } from '@workspace/ui/components/Button'
import { Loader2Icon } from 'lucide-react'

export function ButtonLoading() {
    return (
        <Button isDisabled>
            <Loader2Icon className="animate-spin" />
            Please wait
        </Button>
    )
}
