import { Toast, useToastStore } from '@/lib/store/toast'
import { useEffect, useState } from 'react'

export function useToasts({
	successToasts,
	errorToasts,
}: {
	successToasts: Toast | Toast[] | undefined
	errorToasts?: Toast | Toast[] | undefined
}) {
	const addToast = useToastStore((state) => state.addToast)

	const handleToastsEffect = () => {
		if (successToasts) {
			if (Array.isArray(successToasts)) {
				successToasts.forEach((toast) => addToast(toast))
			} else {
				addToast(successToasts)
			}
		}
		if (errorToasts) {
			if (Array.isArray(errorToasts)) {
				errorToasts.forEach((toast) => addToast(toast))
			} else {
				addToast(errorToasts)
			}
		}
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(handleToastsEffect, [addToast, successToasts, errorToasts])

	return undefined
}
