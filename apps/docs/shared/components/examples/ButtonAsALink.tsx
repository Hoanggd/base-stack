import { Button } from '@workspace/ui/components/Button'
import { SquareArrowOutUpRight } from 'lucide-react'
import Link from 'next/link'

export function ButtonAsALink() {
    return (
        <Button variant={'default'} asChild>
            <Link href="https://react-spectrum.adobe.com/react-aria/index.html" target="_blank">
                React Aria Components
                <SquareArrowOutUpRight />
            </Link>
        </Button>
    )
}
