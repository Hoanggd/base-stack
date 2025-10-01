'use client'

import { toast } from '@workspace/ui/components/Sonner'
import { useForm } from 'react-hook-form'
import { Button } from '@workspace/ui/components/Button'
import { BsCheckboxGroup, Checkbox } from '@workspace/ui/components/Checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@workspace/ui/components/Form'
import { TextArea } from '@workspace/ui/components/Textfield'

interface FormValues {
    interest: Array<string>
    bio: string
    acceptTerm: boolean
}

export function CheckboxForm() {
    const form = useForm<FormValues>({
        defaultValues: {
            interest: [],
            bio: '',
            acceptTerm: false,
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                    control={form.control}
                    name="interest"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Select your interests</FormLabel>
                            <FormControl>
                                <BsCheckboxGroup
                                    {...field}
                                    options={[
                                        { id: 'reading', name: 'Reading' },
                                        { id: 'writing', name: 'Writing' },
                                        { id: 'coding', name: 'Coding' },
                                    ]}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                                <TextArea {...field} placeholder="Type your bio here..." />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="acceptTerm"
                    rules={{
                        validate: value => value || 'Please accept the terms and conditions',
                    }}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Checkbox isSelected={field.value} onChange={field.onChange}>
                                    I accept the terms and conditions
                                </Checkbox>
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
