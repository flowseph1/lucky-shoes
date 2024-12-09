import { ApiResponse as ApiResponseProps } from '@/types/api'
import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { v4 as uuid } from 'uuid'

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs))
}

export const sleep = (ms: number) => {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

export function ApiResponse<T = {}>({
	success,
	code,
	message,
	data,
	validations,
	fields,
}: ApiResponseProps<T>): ApiResponseProps<T> {
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
