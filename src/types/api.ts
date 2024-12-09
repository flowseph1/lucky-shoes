export interface ApiResponse<T = {}> {
	success: boolean
	code: number
	message: string
	data?: T
	validations?: Record<string, string | string[]>
	fields?: Record<string, string | undefined>
}
