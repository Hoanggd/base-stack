'use client'

import { toast } from '@workspace/ui/components/Sonner'
import { useForm } from 'react-hook-form'
import { Button } from '@workspace/ui/components/Button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@workspace/ui/components/Form'
import { BsRadioGroup } from '@workspace/ui/components/RadioGroup'
import { Separator } from '@workspace/ui/components/Separator'
import { z } from '@workspace/lib/validation'

interface FormValues {
    shippingMethod: string
    paymentMethod: string
}

export function RadioGroupForm() {
    const form = useForm<FormValues>({
        defaultValues: {
            shippingMethod: '',
            paymentMethod: '',
        },
    })

    function onSubmit(data: FormValues) {
        toast.neutral({
            title: 'You submitted the following values',
            description: (
                <pre>
                    <code>{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <FormField
                    control={form.control}
                    name="shippingMethod"
                    rules={{ validate: z.string().min(1).validateFn() }}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Shipping Method</FormLabel>
                            <FormControl>
                                <BsRadioGroup
                                    {...field}
                                    options={[
                                        { id: 'standard', name: 'Standard Shipping (3-5 days)' },
                                        { id: 'express', name: 'Express Shipping (1-2 days)' },
                                        { id: 'overnight', name: 'Overnight Shipping' },
                                    ]}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="paymentMethod"
                    rules={{ validate: z.string().min(1).validateFn() }}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Payment Method</FormLabel>
                            <FormControl>
                                <BsRadioGroup
                                    {...field}
                                    options={[
                                        { id: 'credit', name: 'Credit Card' },
                                        { id: 'debit', name: 'Debit Card' },
                                        { id: 'paypal', name: 'PayPal' },
                                    ]}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Separator />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
