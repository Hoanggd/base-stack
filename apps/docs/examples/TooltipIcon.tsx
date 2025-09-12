"use client"

import { Tooltip, TooltipTrigger } from "@workspace/ui/components/tooltip"
import { HelpCircle } from "lucide-react"

export function TooltipIcon() {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium">Help</span>
      <TooltipTrigger>
        <HelpCircle className="h-4 w-4 text-muted-foreground" />
        <Tooltip>
          <p>This icon provides additional help information</p>
        </Tooltip>
      </TooltipTrigger>
    </div>
  )
}
