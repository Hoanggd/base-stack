'use client'

import { Button } from '@workspace/ui/components/Button'
import {
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetOverlay,
    SheetTitle,
    SheetTrigger,
    SheetDescription,
} from '@workspace/ui/components/Sheet'
import { Label } from '@workspace/ui/components/Field'
import { Input } from '@workspace/ui/components/Textfield'

export function SheetDemo() {
    return (
        <SheetTrigger>
            <Button>Sign up</Button>
            <SheetContent>
                {({ close }) => (
                    <div className="flex flex-col">
                        <SheetHeader>
                            <SheetTitle>Sign up</SheetTitle>
                            <SheetDescription>Please fill out the form below to sign up.</SheetDescription>
                        </SheetHeader>
                        <div className="flex-1 space-y-4 px-4">
                            <div className="flex flex-col gap-2">
                                <Label>First Name</Label>
                                <Input placeholder="First Name" autoFocus />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Last Name</Label>
                                <Input placeholder="Last Name" />
                            </div>
                        </div>
                        <SheetFooter>
                            <Button variant="outline" onClick={close}>
                                Cancel
                            </Button>
                            <Button onClick={close} type="submit">
                                Save changes
                            </Button>
                        </SheetFooter>
                    </div>
                )}
            </SheetContent>
        </SheetTrigger>
    )
}
