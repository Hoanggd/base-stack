'use client'

import { z } from '@workspace/lib/validation'
import { toast } from '@workspace/ui/components/Sonner'
import { useForm } from 'react-hook-form'

import { Button } from '@workspace/ui/components/Button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@workspace/ui/components/Form'
import { Input } from '@workspace/ui/components/Textfield'
import { Uploader } from '@workspace/ui/components/Uploader'
import { UploaderFile } from '@workspace/ui/components/UploaderItem'
import { CustomUploaderAction } from './UploaderDemo.utils'

interface FormValues {
    name: string
    attachments: Array<UploaderFile>
}

export function UploaderForm() {
    const form = useForm<FormValues>({
        defaultValues: {
            name: '',
            attachments: [],
        },
    })

    function onSubmit(data: FormValues) {
        toast.neutral({
            title: 'You submitted the following values',
            description: <code>{JSON.stringify(data)}</code>,
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                <h2 className="text-xl font-semibold">Uploader</h2>
                <FormField
                    control={form.control}
                    name="name"
                    rules={{ validate: z.string().min(1, 'Please enter your name').validateFn() }}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="attachments"
                    rules={{ validate: z.array(z.any()).min(1, 'Please upload at least one file').validateFn() }}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Attachments</FormLabel>
                            <FormControl>
                                <Uploader
                                    defaultFileList={field.value}
                                    onFileListChange={field.onChange}
                                    action={new CustomUploaderAction()}
                                    maxFileSize={100 * 1024 * 1024}
                                    acceptedFileExtensions={['pdf', 'docx', 'png', 'csv']}
                                />
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
