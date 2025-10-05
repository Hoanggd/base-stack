'use client'

import { Button } from '@workspace/ui/components/Button'
import { Popover, PopoverDialog, PopoverTrigger } from '@workspace/ui/components/Popover'
import { Switch } from '@workspace/ui/components/Switch'

export function PopoverBottomRight() {
    return (
        <PopoverTrigger>
            <Button variant="outline">Settings</Button>
            <Popover placement="bottom right">
                <PopoverDialog>
                    <div className="flex flex-col gap-4">
                        <Switch defaultSelected>
                            <div className="indicator" /> Wi-Fi
                        </Switch>
                        <Switch defaultSelected>
                            <div className="indicator" /> Bluetooth
                        </Switch>
                        <Switch>
                            <div className="indicator" /> Mute
                        </Switch>
                    </div>
                </PopoverDialog>
            </Popover>
        </PopoverTrigger>
    )
}
