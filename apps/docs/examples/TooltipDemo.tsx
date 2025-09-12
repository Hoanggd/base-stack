"use client";

import { Button } from "@workspace/ui/components/button";
import { Tooltip, TooltipTrigger } from "@workspace/ui/components/tooltip";
import { Pencil } from "lucide-react";

export function TooltipDemo() {
  return (
    <TooltipTrigger delay={700}>
      <Button variant="outline" size="icon" aria-label="Edit">
        <Pencil className="size-4" />
      </Button>
      <Tooltip className="max-w-xs">Edit</Tooltip>
    </TooltipTrigger>
  );
}
