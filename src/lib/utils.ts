import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { v4 as uuid } from 'uuid'

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs))
}

export const sleep = (ms: number) => {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

export function ApiResponse<T, F>({
	success,
	code,
	message,
	data,
	validations,
	fields,
}: {
	success: boolean
	code: number
	message: string
	data?: T
	validations?: Record<string, string | string[]>
	fields?: Record<string, string | undefined>
}) {
	return {
		success,
		code,
		message,
		data,
		validations,
		fields,
	}
}

export const getUuid = () => uuid()
