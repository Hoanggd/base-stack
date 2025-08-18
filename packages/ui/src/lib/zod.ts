import { z } from 'zod'

declare module 'zod' {
	interface ZodType {
		validateFn(): (value: any) => string | boolean
	}
}

z.ZodType.prototype.validateFn = function () {
	return (value: any): string | boolean => {
		const result = this.safeParse(value)
		return result.success || result.error?.errors?.[0]?.message || ''
	}
}

export { z }
