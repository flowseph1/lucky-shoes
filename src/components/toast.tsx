'use client'

import { Toast as ToastProps, useToastStore } from '@/lib/store/toast'
import { cn } from '@/lib/utils'
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'

const ICONS = {
	success: <FaCheckCircle className="text-green-200 w-7 h-7" />,
	error: <FaExclamationCircle className="text-red-200 w-7 h-7" />,
}

export function Toast() {
	const toasts = useToastStore((state) => state.toasts)

	return (
		<div className="absolute top-5 right-5 z-50 flex flex-col gap-4 p-4">
			{toasts.map((toast) => (
				<ToastItem key={toast.id} {...toast} />
			))}
		</div>
	)
}

export function ToastItem(props: ToastProps) {
	const removeToast = useToastStore((state) => state.removeToast)

	return (
		<div
			className={cn(
				'flex gap-3 p-4 bg-green-950 text-green-200 rounded-xl items-center',
				{
					'bg-red-950 text-red-200': props.type === 'error',
				},
			)}
		>
			<div>{ICONS[props.type]}</div>
			<div>{props.message}</div>
			<button
				type="button"
				className={cn('text-green-200 hover:text-green-300 transition-colors', {
					'text-red-200 hover:text-red-300 bg-red-950': props.type === 'error',
				})}
				onClick={() => removeToast(props.id)}
			>
				<IoClose />
			</button>
		</div>
	)
}
