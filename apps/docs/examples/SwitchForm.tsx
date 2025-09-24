'use client'

import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from '@workspace/ui/lib/zod'

import { Button } from '@workspace/ui/components/Button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@workspace/ui/components/Form'
import { Switch } from '@workspace/ui/components/Switch'
import { Separator } from '@workspace/ui/components/Separator'

interface FormData {
    airplaneMode: boolean
    wifi: boolean
    bluetooth: boolean
}

export function SwitchForm() {
    const form = useForm<FormData>({
        defaultValues: {
            airplaneMode: false,
            wifi: true,
            bluetooth: false,
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                <FormField
                    control={form.control}
                    name="airplaneMode"
                    render={({ field }) => (
                        <FormItem className="flex flex-row justify-between">
                            <FormLabel>Airplane mode</FormLabel>
                            <FormControl>
                                <Switch isSelected={field.value} onChange={field.onChange} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Separator />
                <FormField
                    control={form.control}
                    name="wifi"
                    render={({ field }) => (
                        <FormItem className="flex flex-row justify-between">
                            <FormLabel>Wi-Fi</FormLabel>
                            <FormControl>
                                <Switch isSelected={field.value} onChange={field.onChange} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Separator />
                <FormField
                    control={form.control}
                    name="bluetooth"
                    render={({ field }) => (
                        <FormItem className="flex flex-row justify-between">
                            <FormLabel>Bluetooth</FormLabel>
                            <FormControl>
                                <Switch isSelected={field.value} onChange={field.onChange} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Separator />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
