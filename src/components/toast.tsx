'use client'

import { Toast as ToastProps, useToastStore } from '@/lib/store/toast'
import { FaCheckCircle } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'

const ICONS = {
	success: <FaCheckCircle className="text-green-200 w-7 h-7" />,
	error: <FaCheckCircle className="text-red-200 w-7 h-7" />,
}

export function Toast() {
	const toasts = useToastStore((state) => state.toasts)

	return (
		<div className="absolute top-0 right-0 z-50 flex flex-col gap-4 p-4">
			{toasts.map((toast) => (
				<ToastItem key={toast.id} {...toast} />
			))}
		</div>
	)
}

export function ToastItem(props: ToastProps) {
	const removeToast = useToastStore((state) => state.removeToast)

	return (
		<div className="flex gap-3 p-4 bg-green-950 text-green-200 rounded-xl items-center">
			<div>{ICONS[props.type]}</div>
			<div>
				{props.title}
				{props.description}
			</div>
			<button
				type="button"
				className="text-green-200 hover:text-green-300 transition-colors"
				onClick={() => removeToast(props.id)}
			>
				<IoClose />
			</button>
		</div>
	)
}
