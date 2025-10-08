import { Spinner } from '@workspace/ui/components/Spinner'

export function SpinnerDemo() {
    return (
        <div className="flex gap-4 items-center">
            <Spinner className="size-3" />
            <Spinner className="size-4" />
            <Spinner className="size-5" />
            <Spinner className="size-6" />
        </div>
    )
}
