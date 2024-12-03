import { Toast, useToastStore } from '@/lib/store/toast'
import { getUuid } from '@/lib/utils'
import { useEffect } from 'react'

type ToastMessages = Toast['message'] | Toast['message'][] | undefined

export function useToasts({
	successMessages,
	errorMessages,
}: {
	successMessages: ToastMessages
	errorMessages?: ToastMessages
}) {
	const addToast = useToastStore((state) => state.addToast)

	const handleToastsEffect = () => {
		if (successMessages) {
			if (Array.isArray(successMessages)) {
				successMessages.forEach((message) =>
					addToast(buildToast(message, 'success')),
				)
			} else {
				addToast(buildToast(successMessages, 'success'))
			}
		}
		if (errorMessages) {
			if (Array.isArray(errorMessages)) {
				errorMessages.forEach((message) =>
					addToast(buildToast(message, 'error')),
				)
			} else {
				addToast(buildToast(errorMessages, 'error'))
			}
		}
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(handleToastsEffect, [addToast, successMessages, errorMessages])

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
