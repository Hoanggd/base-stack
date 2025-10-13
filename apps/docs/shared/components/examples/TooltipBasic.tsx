'use client'

import { Button } from '@workspace/ui/components/Button'
import { Tooltip, TooltipTrigger } from '@workspace/ui/components/Tooltip'

export function TooltipBasic() {
    return (
        <div className="flex space-x-4">
            <TooltipTrigger>
                <Button variant="outline">Basic Tooltip</Button>
                <Tooltip>
                    <p>Simple tooltip text</p>
                </Tooltip>
            </TooltipTrigger>
            <TooltipTrigger>
                <Button variant="outline">Another Tooltip</Button>
                <Tooltip>
                    <p>Another simple tooltip</p>
                </Tooltip>
            </TooltipTrigger>
        </div>
    )
}
