'use client'

import { Button } from '@workspace/ui/components/Button'
import {
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from '@workspace/ui/components/Dialog'
import { Label } from '@workspace/ui/components/Field'
import { Input } from '@workspace/ui/components/Textfield'

export function DialogDemo() {
    return (
        <DialogTrigger>
            <Button>Sign up</Button>
            <DialogOverlay>
                <DialogContent className="md:max-w-[425px]">
                    {({ close }) => (
                        <div className="flex flex-col gap-4">
                            <DialogHeader>
                                <DialogTitle>Sign up</DialogTitle>
                                <DialogDescription>Please fill out the form below to sign up.</DialogDescription>
                            </DialogHeader>
                            <div className="flex-1 space-y-4">
                                <div className="flex flex-col gap-2">
                                    <Label>First Name</Label>
                                    <Input placeholder="First Name" autoFocus />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label>Last Name</Label>
                                    <Input placeholder="Last Name" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={close}>
                                    Cancel
                                </Button>
                                <Button onClick={close} type="submit">
                                    Save changes
                                </Button>
                            </DialogFooter>
                        </div>
                    )}
                </DialogContent>
            </DialogOverlay>
        </DialogTrigger>
    )
}
