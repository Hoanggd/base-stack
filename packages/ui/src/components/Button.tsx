'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { Button as AriaButton, composeRenderProps, type ButtonProps as AriaButtonProps } from 'react-aria-components'

import { cn } from '@workspace/ui/lib/utils'

const buttonVariants = cva(
    [
        'cursor-pointer font-medium inline-flex items-center gap-1 justify-center whitespace-nowrap rounded-sm text-sm ring-offset-background transition-all no-underline',
        'data-[hovered]:opacity-90 data-[pressed]:opacity-100',
        /* SVGs */
        '[&_svg]:pointer-events-none [&_svg]:size-[14px] [&_svg]:shrink-0 [&_svg]:stroke-2',
        /* Disabled */
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-60',
        /* Focus Visible */
        'data-[focus-visible]:outline-none data-[focus-visible]:ring-primary/40 data-[focus-visible]:ring-2 data-[focus-visible]:ring-offset-2',
        /* Resets */
        'focus-visible:outline-none',
    ],
    {
        variants: {
            variant: {
                default: 'bg-linear-to-b from-primary/90 to-primary text-white button-3d',
                destructive: 'bg-linear-to-b from-destructive/90 to-destructive text-white button-3d',
                outline: 'bg-background-secondary shadow-sm border border-input text-foreground',
                secondary: 'border-transparent bg-neutral-500/15 text-secondary-foreground',
                ghost: 'data-[hovered]:bg-accent data-[hovered]:text-accent-foreground data-[pressed]:bg-accent/50',
                link: 'text-primary underline-offset-4 data-[hovered]:underline px-0! py-0! h-auto! underline',
                unstyled: '',
            },
            size: {
                default: 'h-8 px-3 py-2',
                sm: 'h-7 px-2',
                lg: 'h-9 px-4 rounded-md',
                xl: 'h-11 px-4 text-base rounded-md',
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
        VariantProps<typeof buttonVariants> {}

const Button = ({ className, variant, size, ...props }: ButtonProps) => {
    return (
        <AriaButton
            className={composeRenderProps(className, className =>
                cn(
                    buttonVariants({
                        variant,
                        size,
                        className,
                    }),
                ),
            )}
            {...props}
        />
    )
}

export { Button, buttonVariants }
export type { ButtonProps }
