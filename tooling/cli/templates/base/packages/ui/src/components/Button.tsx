'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@workspace/ui/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import { Button as AriaButton, type ButtonProps as AriaButtonProps } from 'react-aria-components'

const buttonVariants = cva(
    [
        'cursor-pointer font-medium inline-flex items-center gap-1.5 justify-center whitespace-nowrap rounded-sm text-sm ring-offset-background transition-all no-underline',
        'hover:opacity-90 active:opacity-100',
        /* SVGs */
        '[&_svg]:pointer-events-none [&_svg]:size-[14px] [&_svg]:shrink-0 [&_svg]:stroke-2',
        /* Disabled */
        'disabled:pointer-events-none disabled:opacity-60',
        /* Focus Visible */
        'focus-visible:outline-none focus-visible:ring-primary/40 focus-visible:ring-2 focus-visible:ring-offset-2',
        /* Resets */
        'focus-visible:outline-none',
    ],
    {
        variants: {
            variant: {
                default: 'bg-primary text-white button-3d',
                destructive: 'bg-destructive text-white button-3d',
                outline: 'bg-background-secondary shadow-sm border text-foreground hover:bg-background-tertiary/70 ',
                outlineDestructive:
                    'bg-background-secondary shadow-sm border text-destructive-foreground hover:bg-background-tertiary/70 ',
                secondary: 'hover:opacity-80 border-transparent bg-neutral-500/15 text-secondary-foreground',
                ghost: 'hover:bg-neutral-500/10 hover:text-accent-foreground active:bg-accent/50 text-secondary-foreground',
                link: 'text-primary-foreground underline-offset-4 hover:underline px-0! py-0! h-auto! underline',
                unstyled: '',
            },
            size: {
                default: 'h-8 px-3 py-2',
                sm: 'h-7 px-2 text-[13px]',
                lg: 'h-9 px-4 rounded-md gap-2',
                xl: 'h-11 px-5 text-base rounded-md gap-2',
                icon: 'size-8',
                iconSm: 'size-6',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
)

interface ButtonProps
    extends AriaButtonProps,
        React.RefAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
    const Comp = (asChild ? Slot : AriaButton) as typeof AriaButton

    return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button, buttonVariants }
export type { ButtonProps }
