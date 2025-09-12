"use client"

import { Button } from "@workspace/ui/components/button"
import { Tooltip, TooltipTrigger } from "@workspace/ui/components/tooltip"

export function TooltipButton() {
  return (
    <div className="flex space-x-4">
      <TooltipTrigger>
        <Button variant="outline">Save</Button>
        <Tooltip>
          <p>Save your changes (Ctrl+S)</p>
        </Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <Button variant="outline">Delete</Button>
        <Tooltip>
          <p>Delete this item permanently</p>
        </Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <Button variant="outline" disabled>
          Disabled
        </Button>
        <Tooltip>
          <p>This button is currently disabled</p>
        </Tooltip>
      </TooltipTrigger>
    </div>
  )
}
