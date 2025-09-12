"use client"

import { Button } from "@workspace/ui/components/button"
import { Tooltip, TooltipTrigger } from "@workspace/ui/components/tooltip"

export function TooltipCustom() {
  return (
    <div className="flex space-x-4">
      <TooltipTrigger>
        <Button variant="outline">Custom Tooltip</Button>
        <Tooltip className="max-w-xs">
          <div className="p-2">
            <h4 className="font-semibold text-sm mb-1">Custom Tooltip</h4>
            <p className="text-xs text-muted-foreground">
              This tooltip has custom styling with a title and description.
            </p>
          </div>
        </Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <Button variant="outline">Rich Content</Button>
        <Tooltip className="max-w-sm">
          <div className="p-3">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium">Status: Active</span>
            </div>
            <p className="text-xs text-muted-foreground">
              This tooltip contains rich content with status indicators and
              multiple lines of text.
            </p>
          </div>
        </Tooltip>
      </TooltipTrigger>
    </div>
  )
}
