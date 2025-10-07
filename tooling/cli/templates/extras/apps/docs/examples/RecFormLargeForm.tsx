'use client'

import { toast } from '@workspace/ui/components/Sonner'
import { useFieldArray, useForm, useFormContext } from 'react-hook-form'
import { Button } from '@workspace/ui/components/Button'
import { Checkbox } from '@workspace/ui/components/Checkbox'
import { BsDatePicker } from '@workspace/ui/components/DatePicker'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@workspace/ui/components/Form'
import { BsRadioGroup } from '@workspace/ui/components/RadioGroup'
import { BsSelect } from '@workspace/ui/components/Select'
import { Switch } from '@workspace/ui/components/Switch'
import { Input, TextArea } from '@workspace/ui/components/Textfield'
import { PlusIcon, TrashIcon } from 'lucide-react'

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

interface FormValues {
    isPublic: boolean
    name: string
    bio: string
    birthday: string
    gender: string
    languages: Array<string>
    phoneNumber: string
    works: Array<WorkExperience>
    enableNotify?: boolean
    notifyType: string
}

const languages: Array<Language> = [
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

export function RecFormLargeForm() {
    const form = useForm<FormValues>({
        defaultValues: {
            isPublic: false,
            name: '',
            bio: '',
            birthday: '',
            gender: '',
            languages: [],
            phoneNumber: '',
            works: [],
            enableNotify: false,
            notifyType: '',
        },
    })

    const onSubmit = (data: FormValues) => {
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-[500px] divide-y">
                <Profile />
                <WorkHistory />
                <NotifyType />
                <div className="py-6">
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </Form>
    )
}

function Profile() {
    const form = useFormContext<FormValues>()

    return (
        <div className="space-y-4 py-6">
            <Header />
            <FormField
                control={form.control}
                name="name"
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
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Languages</FormLabel>
                        <FormControl>
                            <BsSelect
                                {...field}
                                selectionMode="multiple"
                                isClearable
                                isSearchable
                                options={languages}
                                placeholder="Select languages"
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
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Birthday</FormLabel>
                        <FormControl>
                            <BsDatePicker {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}

function Header() {
    const form = useFormContext<FormValues>()

    return (
        <div className="flex justify-between items-center">
            <h2 className="uppercase text-muted-foreground text-sm font-semibold">Profile</h2>
            <FormField
                control={form.control}
                name="isPublic"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2">
                        <FormControl>
                            <Switch isSelected={field.value} onChange={field.onChange} />
                        </FormControl>
                        <FormLabel>Public</FormLabel>
                    </FormItem>
                )}
            />
        </div>
    )
}

function WorkHistory() {
    const form = useFormContext<FormValues>()

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'works',
    })

    return (
        <div className="space-y-2 py-6">
            <h2 className="uppercase text-muted-foreground text-sm font-semibold">Work History</h2>
            {fields.length > 0 && (
                <div className="space-y-3">
                    {fields.map((field, index) => (
                        <div key={field.id} className="border rounded-md p-4">
                            <div className="grid grid-cols-2 gap-2.5 flex-1">
                                <FormField
                                    control={form.control}
                                    name={`works.${index}.position`}
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
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Start Date</FormLabel>
                                                <FormControl>
                                                    <BsDatePicker {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`works.${index}.duration.end`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>End Date</FormLabel>
                                                <FormControl>
                                                    <BsDatePicker {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Button
                                    size="sm"
                                    className="mt-3"
                                    variant="outlineDestructive"
                                    onClick={() => remove(index)}
                                >
                                    <TrashIcon /> Delete
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
                <PlusIcon /> Add Work
            </Button>
        </div>
    )
}

function NotifyType() {
    const form = useFormContext<FormValues>()

    return (
        <div className="space-y-4 py-6">
            <h2 className="uppercase text-muted-foreground text-sm font-semibold">Notification</h2>
            <FormField
                control={form.control}
                name="enableNotify"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2">
                        <FormControl>
                            <Checkbox isSelected={field.value} onChange={field.onChange} />
                        </FormControl>
                        <FormLabel>Enable notification</FormLabel>
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="notifyType"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Notify me about</FormLabel>
                        <FormControl>
                            <BsRadioGroup
                                {...field}
                                options={[
                                    { id: 'all', name: 'All new messages' },
                                    { id: 'mentions', name: 'Direct messages and mentions' },
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
