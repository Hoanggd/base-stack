'use client'

import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@workspace/ui/components/Button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@workspace/ui/components/Form'
import { Checkbox } from '@workspace/ui/components/Checkbox'
import { CheckboxGroup } from '@workspace/ui/components/Checkbox'
import { TextArea } from '@workspace/ui/components/Textfield'

interface FormData {
    interest: Array<string>
    bio: string
    acceptTerm: boolean
}

export function CheckboxForm() {
    const form = useForm<FormData>({
        defaultValues: {
            interest: [],
            bio: '',
            acceptTerm: false,
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                    control={form.control}
                    name="interest"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <CheckboxGroup {...field}>
                                    <FormLabel>Select your interests</FormLabel>
                                    <div className="grid grid-cols-3 gap-4">
                                        <Checkbox value="reading">Reading</Checkbox>
                                        <Checkbox value="writing">Writing</Checkbox>
                                        <Checkbox value="coding">Coding</Checkbox>
                                    </div>
                                </CheckboxGroup>
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
                            <FormControl {...field}>
                                <Checkbox>I accept the terms and conditions</Checkbox>
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
