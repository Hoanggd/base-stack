import { Button } from '@workspace/ui/components/Button'
import { SearchIcon } from 'lucide-react'

export function DocsSearch() {
    return (
        <Button size="icon" variant="ghost">
            <SearchIcon />
        </Button>
    )
}
