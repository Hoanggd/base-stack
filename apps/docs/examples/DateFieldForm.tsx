'use client'

import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@workspace/ui/components/Button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@workspace/ui/components/Form'
import { BsDateField } from '@workspace/ui/components/Datefield'

interface FormData {
    eventDate: string
}

export function DateFieldForm() {
    const form = useForm<FormData>({
        defaultValues: {
            eventDate: '',
        },
    })

    function onSubmit(data: FormData) {
        toast('You submitted the following values', {
            description: (
                <pre className="mt-2 w-[320px] rounded-md bg-background-tertiary p-4">
                    <code className="text-foreground">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
                <FormField
                    control={form.control}
                    name="eventDate"
                    rules={{
                        required: 'Event date is required',
                    }}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Event Date</FormLabel>
                            <FormControl>
                                <BsDateField {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
