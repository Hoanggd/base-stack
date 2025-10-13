import { Button } from '@workspace/ui/components/Button'
import { Spinner } from '@workspace/ui/components/Spinner'

export function ButtonLoading() {
    return (
        <Button isDisabled>
            <Spinner />
            Please wait
        </Button>
    )
}
