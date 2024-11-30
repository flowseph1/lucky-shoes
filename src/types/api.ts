import { FieldErrors } from 'react-hook-form'

export interface ApiResponse<T, E extends FieldErrors> {
	success: boolean
	message: string
	data?: T
	error?: {
		code: number
		message: string
		validations?: E
	}
}
