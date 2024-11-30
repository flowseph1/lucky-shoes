'use client'

import { cn } from '@/lib/utils'
import { useState } from 'react'
import { IoCheckmarkCircle, IoClose, IoCloseCircle } from 'react-icons/io5'

interface AlertProps {
	type: 'success' | 'error'
	message: string
	className?: string
}

const ICON_MAP = {
	success: <IoCheckmarkCircle />,
	error: <IoCloseCircle />,
}

export function Alert(props: AlertProps) {
	const [show, setShow] = useState(true)

	if (!show) return null

	return (
		<div
			className={cn(
				'flex justify-between p-4 text-green-400 bg-green-950 rounded-xl items-center',
				{
					'text-red-400 bg-red-950': props.type === 'error',
				},
				props.className,
			)}
		>
			<div className="flex gap-3 items-center justify-center">
				<div>{ICON_MAP[props.type]}</div>
				<div>{props.message}</div>
			</div>
			<button
				type="button"
				className="text-green-200 hover:text-green-300 transition-colors"
				onClick={() => setShow(false)}
			>
				<IoClose />
			</button>
		</div>
	)
}
