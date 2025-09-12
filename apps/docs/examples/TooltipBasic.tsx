"use client"

import { Button } from "@workspace/ui/components/button"
import { Tooltip, TooltipTrigger } from "@workspace/ui/components/tooltip"

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
