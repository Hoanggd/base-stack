import { LoadingOverlay } from '@workspace/ui/components/LoadingOverlay'
import { Button } from '@workspace/ui/components/Button'
import { Input } from '@workspace/ui/components/Textfield'
import { Label } from '@workspace/ui/components/Field'

export function LoadingOverlayDemo() {
    return (
        <LoadingOverlay isLoading={true}>
            <div className="space-y-4 w-full max-w-[350px]">
                <div className="space-y-2">
                    <div>
                        <Label>Email</Label>
                        <Input placeholder="Enter your email" />
                    </div>
                    <div>
                        <Label>Password</Label>
                        <Input placeholder="Enter your password" />
                    </div>
                </div>
                <Button className="w-full">Login</Button>
            </div>
        </LoadingOverlay>
    )
}
