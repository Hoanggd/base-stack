import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/Avatar'

export function AvatarDemo() {
    return (
        <Avatar>
            <AvatarImage src="https://github.com/henry-phm.png" alt="@henry-phm" />
            <AvatarFallback>HP</AvatarFallback>
        </Avatar>
    )
}
