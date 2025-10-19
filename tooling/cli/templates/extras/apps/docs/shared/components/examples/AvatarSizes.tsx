import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/Avatar'

export function AvatarSizes() {
    return (
        <div className="flex items-center space-x-4">
            <Avatar className="size-8">
                <AvatarImage src="https://github.com/henry-phm.png" alt="@henry-phm" />
                <AvatarFallback>HP</AvatarFallback>
            </Avatar>
            <Avatar className="size-12">
                <AvatarImage src="https://github.com/henry-phm.png" alt="@henry-phm" />
                <AvatarFallback>HP</AvatarFallback>
            </Avatar>
            <Avatar className="size-16">
                <AvatarImage src="https://github.com/henry-phm.png" alt="@henry-phm" />
                <AvatarFallback>HP</AvatarFallback>
            </Avatar>
        </div>
    )
}
