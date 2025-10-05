'use client'

import { Button } from '@workspace/ui/components/Button'
import { Tooltip, TooltipTrigger } from '@workspace/ui/components/Tooltip'

export function TooltipCustom() {
    return (
        <div className="flex space-x-4">
            <TooltipTrigger>
                <Button variant="outline">Custom Tooltip</Button>
                <Tooltip className="max-w-sm rounded-md">
                    <div className="p-1">
                        <h4 className="font-semibold text-sm mb-1">Custom Tooltip</h4>
                        <p className="text-xs">This tooltip has custom styling with a title and description.</p>
                    </div>
                </Tooltip>
            </TooltipTrigger>
            <TooltipTrigger>
                <Button variant="outline">Rich Content</Button>
                <Tooltip className="max-w-sm rounded-md">
                    <div className="p-1">
                        <div className="flex items-center space-x-2 mb-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm font-medium">Status: Active</span>
                        </div>
                        <p className="text-xs">
                            This tooltip contains rich content with status indicators and multiple lines of text.
                        </p>
                    </div>
                </Tooltip>
            </TooltipTrigger>
        </div>
    )
}
