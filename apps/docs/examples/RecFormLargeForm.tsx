'use client'

import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from '@workspace/ui/components/Sonner'
import { z } from '@workspace/ui/lib/zod'

import { Button } from '@workspace/ui/components/Button'
import { Checkbox } from '@workspace/ui/components/Checkbox'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@workspace/ui/components/Form'
import { Input } from '@workspace/ui/components/Textfield'
import { RadioGroup } from '@workspace/ui/components/RadioGroup'
import { BsSelect } from '@workspace/ui/components/Select'
import { Switch } from '@workspace/ui/components/Switch'
import { TextArea } from '@workspace/ui/components/Textfield'

interface Option {
    value: string
    name: string
}

interface Language {
    name: string
    id: string
    flag: string
}

interface WorkExperience {
    company: string
    position: string
    duration: {
        start: string
        end: string
    }
}

interface FormInputs {
    isPublic: boolean
    name: string
    bio: string
    birthday: string
    gender: Option
    languages: Language[]
    phoneNumber: string
    works: WorkExperience[]
    enableNotify?: boolean
    notifyType: string
}

const languages: Language[] = [
    { name: 'English - United Kingdom', id: 'GB', flag: '🇬🇧' },
    { name: 'English - United States', id: 'US', flag: '🇺🇸' },
    { name: 'French', id: 'FR', flag: '🇫🇷' },
    { name: 'German', id: 'DE', flag: '🇩🇪' },
    { name: 'Hindi', id: 'IN', flag: '🇮🇳' },
    { name: 'Italian', id: 'IT', flag: '🇮🇹' },
    { name: 'Japanese', id: 'JP', flag: '🇯🇵' },
    { name: 'Portuguese', id: 'BR', flag: '🇧🇷' },
    { name: 'Spanish', id: 'MX', flag: '🇲🇽' },
]

export function LargeForm() {
    const form = useForm<FormInputs>({
        defaultValues: {
            isPublic: false,
            name: '',
            bio: '',
            birthday: '',
            gender: { id: '', name: '' },
            languages: [languages[0]],
            phoneNumber: '',
            works: [],
            enableNotify: false,
            notifyType: '',
        },
    })

    const onSubmit = (data: FormInputs) => {
        toast.neutral({
            title: 'You submitted the following values',
            description: <code>{JSON.stringify(data)}</code>,
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="container max-w-[600px] divide-y my-10">
                <Profile form={form} />
                <WorkHistory form={form} />
                <NotifyType form={form} />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}

function Profile({ form }: { form: any }) {
    return (
        <div className="space-y-4 py-6">
            <Header form={form} />
            <FormField
                control={form.control}
                name="name"
                rules={{ validate: z.string().min(2).validateFn() }}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="Enter your name" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="gender"
                rules={{ validate: z.object({ value: z.string(), label: z.string() }).validateFn() }}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <FormControl>
                            <BsSelect
                                {...field}
                                options={[
                                    { id: 'male', name: 'Male' },
                                    { id: 'female', name: 'Female' },
                                    { id: 'other', name: 'Other' },
                                ]}
                                placeholder="Select gender"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="languages"
                rules={{ validate: z.array(z.any()).min(1).validateFn() }}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Languages</FormLabel>
                        <FormControl>
                            <BsSelect {...field} isMulti options={languages} placeholder="Select languages" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="bio"
                rules={{ validate: z.string().min(10).validateFn() }}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                            <TextArea {...field} placeholder="Tell us about yourself" />
                        </FormControl>
                        <FormMessage />
                        <FormDescription>Brief description for your profile</FormDescription>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="birthday"
                rules={{ validate: z.string().min(1).validateFn() }}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Birthday</FormLabel>
                        <FormControl>
                            <Input {...field} type="date" placeholder="Select your birthday" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}

function Header({ form }: { form: any }) {
    return (
        <div className="flex justify-between items-center">
            <h2 className="uppercase text-gray-500 text-sm font-semibold">Profile</h2>
            <FormField
                control={form.control}
                name="isPublic"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2">
                        <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel>Public</FormLabel>
                    </FormItem>
                )}
            />
        </div>
    )
}

function WorkHistory({ form }: { form: any }) {
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'works',
    })

    return (
        <div className="space-y-2 py-6">
            <h2 className="uppercase text-gray-500 text-sm font-semibold">Work History</h2>
            {fields.length > 0 && (
                <div className="space-y-3">
                    {fields.map((field, index) => (
                        <div key={field.id} className="border rounded-md p-4">
                            <div className="grid grid-cols-2 gap-2.5 flex-1">
                                <FormField
                                    control={form.control}
                                    name={`works.${index}.position`}
                                    rules={{ validate: z.string().min(1).validateFn() }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Position</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Position" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`works.${index}.company`}
                                    rules={{ validate: z.string().min(1).validateFn() }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Company</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Company" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="col-span-2 grid grid-cols-2 gap-2">
                                    <FormField
                                        control={form.control}
                                        name={`works.${index}.duration.start`}
                                        rules={{ validate: z.string().min(1).validateFn() }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Start Date</FormLabel>
                                                <FormControl>
                                                    <Input {...field} type="date" placeholder="Start date" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`works.${index}.duration.end`}
                                        rules={{ validate: z.string().min(1).validateFn() }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>End Date</FormLabel>
                                                <FormControl>
                                                    <Input {...field} type="date" placeholder="End date" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Button
                                    variant="link"
                                    className="px-0 h-7 text-red-500 mt-2"
                                    onClick={() => remove(index)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <Button
                variant="outline"
                onClick={() =>
                    append({
                        company: '',
                        position: '',
                        duration: { start: '', end: '' },
                    })
                }
            >
                + Add Work
            </Button>
        </div>
    )
}

function NotifyType({ form }: { form: any }) {
    return (
        <div className="space-y-4 py-6">
            <h2 className="uppercase text-gray-500 text-sm font-semibold">Notification</h2>
            <FormField
                control={form.control}
                name="enableNotify"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2">
                        <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel>Enable notification</FormLabel>
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="notifyType"
                rules={{ validate: z.string().min(1).validateFn() }}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Notify me about</FormLabel>
                        <FormControl>
                            <RadioGroup
                                value={field.value}
                                onValueChange={field.onChange}
                                options={[
                                    { label: 'All new messages', value: 'all' },
                                    { label: 'Direct messages and mentions', value: 'mentions' },
                                ]}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}
