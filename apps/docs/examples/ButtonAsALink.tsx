import { Link } from '@workspace/ui/components/Link'
import { SquareArrowOutUpRight } from 'lucide-react'

export function ButtonAsALink() {
    return (
        <Link variant={'default'} href="https://react-spectrum.adobe.com/react-aria/index.html" target="_blank">
            React Aria Components
            <SquareArrowOutUpRight />
        </Link>
    )
}
