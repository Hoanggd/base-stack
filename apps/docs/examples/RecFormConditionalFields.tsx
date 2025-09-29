'use client'

import { useForm } from 'react-hook-form'
import { toast } from '@workspace/ui/components/Sonner'
import { z } from '@workspace/ui/lib/zod'

import { Button } from '@workspace/ui/components/Button'
import { Checkbox } from '@workspace/ui/components/Checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@workspace/ui/components/Form'
import { Input } from '@workspace/ui/components/Textfield'
import { BsSelect as Select } from '@workspace/ui/components/Select'

interface Option {
  value: string
  label: string
}

interface EndUserFormInputs {
  name?: string
  email?: string
  role?: Option
}

interface AdminFormInputs {
  name?: string
  email?: string
  role?: Option
  permissions?: string[]
}

type FormInputs = EndUserFormInputs | AdminFormInputs

enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

const ROLES = [
  { id: Role.USER, name: 'User', value: Role.USER, label: 'User' },
  { id: Role.ADMIN, name: 'Admin', value: Role.ADMIN, label: 'Admin' },
]

const PERMISSIONS: Option[] = [
  { value: 'read', label: 'Read' },
  { value: 'write', label: 'Write' },
]

export function RecFormConditionalFields() {
  const form = useForm<FormInputs>({
    defaultValues: {
      role: { value: ROLES[0].value, label: ROLES[0].label },
      name: '',
      permissions: [],
    },
  })

  const onSubmit = (data: FormInputs) => {
    toast.neutral({
      title: 'You submitted the following values',
      description: <code>{JSON.stringify(data)}</code>,
    })
  }

  const selectedRole = form.watch('role')

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 container max-w-[500px]">
        <h2>Create User</h2>
        <FormField
          control={form.control}
          name="role"
          rules={{ validate: z.object({ value: z.string(), label: z.string() }).validateFn() }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Select 
                  value={field.value?.value as Role}
                  onChange={(value) => {
                    const option = ROLES.find(r => r.value === value)
                    field.onChange(option ? { value: option.value, label: option.label } : undefined)
                  }}
                  options={ROLES} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          rules={{ validate: z.string().min(4).validateFn() }}
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
        {selectedRole?.value === Role.ADMIN && (
          <FormField
            control={form.control}
            name="permissions"
            rules={{
              validate: (value) => {
                if (selectedRole?.value === Role.ADMIN && (!value || value.length === 0)) {
                  return 'At least one permission is required for admin users'
                }
                return true
              }
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Permissions</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    {PERMISSIONS.map((permission) => (
                      <div key={permission.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={permission.value}
                          isSelected={field.value?.includes(permission.value) || false}
                          onChange={(checked: boolean) => {
                            const currentPermissions = field.value || []
                            if (checked) {
                              field.onChange([...currentPermissions, permission.value])
                            } else {
                              field.onChange(currentPermissions.filter(p => p !== permission.value))
                            }
                          }}
                        />
                        <label htmlFor={permission.value} className="text-sm font-medium">
                          {permission.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
