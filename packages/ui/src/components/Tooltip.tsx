'use client'

import {
    Tooltip as AriaTooltip,
    TooltipTrigger as AriaTooltipTrigger,
    composeRenderProps,
    type TooltipProps as AriaTooltipProps,
} from 'react-aria-components'

import { cn } from '@workspace/ui/lib/utils'

const TooltipTrigger = AriaTooltipTrigger

const Tooltip = ({ className, offset = 4, ...props }: AriaTooltipProps) => (
    <AriaTooltip
        offset={offset}
        className={composeRenderProps(className, className =>
            cn(
                'max-w-xs',
                'z-50 text-xs overflow-hidden rounded-sm bg-neutral-800 px-2.5 py-1.5 text-neutral-200 animate-in fade-in-0 dark:border',
                /* Exiting */
                'data-[exiting]:animate-out data-[exiting]:fade-out-0',
                className,
            ),
        )}
        {...props}
    />
)

export { Tooltip, TooltipTrigger }
