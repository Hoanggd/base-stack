'use client'

import {
    ProgressBar as AriaProgressBar,
    ProgressBarProps as AriaProgressBarProps,
    composeRenderProps,
} from 'react-aria-components'
import { Label, labelVariants } from '@workspace/ui/components/Field'

import { cn } from '@workspace/ui/lib/utils'

interface ProgressProps extends AriaProgressBarProps {
    barClassName?: string
    fillClassName?: string
}

const Progress = ({ className, barClassName, fillClassName, children, ...props }: ProgressProps) => (
    <AriaProgressBar
        aria-label="Progress"
        className={composeRenderProps(className, className => cn('w-full', className))}
        {...props}
    >
        {composeRenderProps(children, (children, renderProps) => (
            <>
                {children}
                <div className={cn('relative h-4 w-full overflow-hidden rounded-full bg-neutral-500/15', barClassName)}>
                    <div
                        className={cn('size-full flex-1 bg-primary-foreground transition-all', fillClassName)}
                        style={{
                            transform: `translateX(-${100 - (renderProps.percentage || 0)}%)`,
                        }}
                    />
                </div>
            </>
        ))}
    </AriaProgressBar>
)

const CircleProgress = ({ className, iconClassName, ...props }: ProgressProps & { iconClassName?: string }) => {
    const center = 16
    const strokeWidth = 4
    const r = 16 - strokeWidth
    const c = 2 * r * Math.PI

    return (
        <AriaProgressBar
            aria-label="Progress"
            className={composeRenderProps(className, className => cn('w-fit', className))}
            {...props}
        >
            {({ percentage }) => (
                <>
                    <svg
                        width={64}
                        height={64}
                        viewBox="0 0 32 32"
                        fill="none"
                        strokeWidth={strokeWidth}
                        className={cn('size-5', iconClassName)}
                    >
                        <circle cx={center} cy={center} r={r} strokeWidth={4} className="stroke-neutral-500/30" />
                        <circle
                            cx={center}
                            cy={center}
                            r={r}
                            className="stroke-primary-foreground"
                            strokeWidth={4}
                            strokeDasharray={`${c} ${c}`}
                            strokeDashoffset={c - ((percentage || 0) / 100) * c}
                            // strokeLinecap="round"
                            transform="rotate(-90 16 16)"
                            style={{
                                transition: 'stroke-dashoffset 0.3s ease-in-out',
                            }}
                        />
                    </svg>
                </>
            )}
        </AriaProgressBar>
    )
}

interface BsProgressBarProps extends ProgressProps {
    label?: string
    showValue?: boolean
}

function BsProgressBar({ label, className, showValue = true, ...props }: BsProgressBarProps) {
    return (
        <Progress
            className={composeRenderProps(className, className => cn('group flex flex-col gap-2', className))}
            {...props}
        >
            {({ valueText }) => (
                <div className="flex w-full justify-between">
                    <Label>{label}</Label>
                    {showValue && <span className={labelVariants()}>{valueText}</span>}
                </div>
            )}
        </Progress>
    )
}

export { Progress, CircleProgress, BsProgressBar }
export type { ProgressProps, BsProgressBarProps }
