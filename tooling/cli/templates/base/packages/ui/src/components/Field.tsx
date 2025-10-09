'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import {
    Group as AriaGroup,
    GroupProps as AriaGroupProps,
    Label as AriaLabel,
    LabelProps as AriaLabelProps,
    composeRenderProps,
} from 'react-aria-components'

import { cn } from '@workspace/ui/lib/utils'

const labelVariants = cva([
    'text-sm font-medium',
    /* Disabled */
    'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-70',
])

const Label = ({ className, ...props }: AriaLabelProps) => (
    <AriaLabel className={cn(labelVariants(), className)} {...props} />
)

const fieldGroupVariants = cva('', {
    variants: {
        variant: {
            default: [
                'shadow-sm bg-background-secondary relative flex h-8 w-full items-center overflow-hidden rounded-sm px-3 py-2 md:text-sm',
                'ring-inset ring ring-input',
                /* Focus Within */
                'transition-all data-[focus-within]:ring-primary! data-[focus-within]:ring-2 aria-invalid:ring-destructive',
                /* Disabled */
                'data-[disabled]:opacity-80',
                /* Invalid */
                'data-[invalid]:ring-destructive',
            ],
            ghost: '',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
})

interface GroupProps extends AriaGroupProps, VariantProps<typeof fieldGroupVariants> {}

function FieldGroup({ className, variant, ...props }: GroupProps) {
    return (
        <AriaGroup
            className={composeRenderProps(className, className => cn(fieldGroupVariants({ variant }), className))}
            {...props}
        />
    )
}

export { FieldGroup, fieldGroupVariants, Label, labelVariants }
