import { Toast, useToastStore } from '@/lib/store/toast'
import { getUuid } from '@/lib/utils'
import { ApiResponse } from '@/types/api'
import { useEffect } from 'react'

export function useFormToast(formState: ApiResponse | undefined) {
	const addToast = useToastStore((state) => state.addToast)

	const handleToastsEffect = () => {
		if (!formState) return

		addToast(
			buildToast(formState.message, formState.success ? 'success' : 'error'),
		)
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(handleToastsEffect, [addToast, formState])

	return undefined
}

export function buildToast(
	message: Toast['message'],
	type: 'success' | 'error',
): Toast {
	if (type === 'error') {
		return {
			id: getUuid(),
			message,
			type: 'error',
		}
	}

	return {
		id: getUuid(),
		message,
		type: 'success',
	}
}
