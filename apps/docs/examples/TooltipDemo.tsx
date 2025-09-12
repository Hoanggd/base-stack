"use client"

import { Button } from "@workspace/ui/components/button"
import { Tooltip, TooltipTrigger } from "@workspace/ui/components/tooltip"

export function TooltipDemo() {
  return (
    <TooltipTrigger>
      <Button variant="outline">Hover me</Button>
      <Tooltip>
        <p>This is a tooltip that appears on hover</p>
      </Tooltip>
    </TooltipTrigger>
  )
}
