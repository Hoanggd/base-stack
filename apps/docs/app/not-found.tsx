import { Link } from '@workspace/ui/components/Link'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center mt-10">
            <h2 className="text-2xl font-bold">Not Found</h2>
            <p className="text-muted-foreground">Could not find requested resource</p>
            <Link href="/" variant={'outline'} className="mt-4">
                Return Home
            </Link>
        </div>
    )
}
