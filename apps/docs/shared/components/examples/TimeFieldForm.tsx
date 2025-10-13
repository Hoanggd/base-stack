'use client'

import { useForm } from 'react-hook-form'
import { toast } from '@workspace/ui/components/Sonner'

import { Button } from '@workspace/ui/components/Button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@workspace/ui/components/Form'
import { BsTimeField } from '@workspace/ui/components/Datefield'
import { BsDatePicker } from '@workspace/ui/components/DatePicker'

interface FormValues {
    appointmentTime: string
    appointmentDate: string
}

export function TimeFieldForm() {
    const form = useForm<FormValues>()

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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
                <div className="flex gap-2">
                    <FormField
                        control={form.control}
                        name="appointmentDate"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Appointment Time</FormLabel>
                                <FormControl>
                                    <BsDatePicker {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="appointmentTime"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="opacity-0">Time</FormLabel>
                                <FormControl>
                                    <BsTimeField {...field} className="w-[72px]" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
