'use client'

import { Button } from '@/components/ui/buttons'
import { ButtonProps } from '@/components/ui/buttons/Button'
import { cn } from '@/lib/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { v4 as uuid } from 'uuid'

interface ModalProps {
	name: string
	children: React.ReactNode
	onClose?: () => void
}

const ModalContext = createContext<{
	handleClose: (() => void) | undefined
}>({
	handleClose: () => {},
})

export function Modal({ children, name, onClose }: ModalProps) {
	const [key, setKey] = useState(uuid())
	const dialogRef = useRef<HTMLDialogElement>(null)
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const router = useRouter()
	const p = searchParams.get('modal')

	const handleToggleModalEffect = () => {
		if (!p) {
			setKey(uuid())
			return
		}

		if (p === name) {
			dialogRef.current?.showModal()
		}
	}
	const handleClose = async () => {
		router.replace(pathname)
		onClose && onClose()
		dialogRef.current?.close()
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: false positive
	useEffect(handleToggleModalEffect, [p])

	return (
		<ModalContext.Provider value={{ handleClose }}>
			<dialog
				ref={dialogRef}
				key={key}
				onClick={handleClose}
				className="bg-neutral-600 rounded-xl shadow-xl text-white/90 border-[1px] border-neutral-50 backdrop:bg-black/30"
				onKeyDown={(e) => {
					if (e.key === 'Escape') {
						e.preventDefault()
						handleClose()
					}
				}}
			>
				<div onClick={(e) => e.stopPropagation()} className="">
					{children}
				</div>
			</dialog>
		</ModalContext.Provider>
	)
}

Modal.Header = ModalHeader
Modal.Body = ModalBody
Modal.Footer = ModalFooter
Modal.Button = ModalButton

export function ModalHeader({ title }: { title: string }) {
	const { handleClose } = useContext(ModalContext)
	return (
		<div className="flex justify-between py-5 px-6 border-b-[1px] border-b-neutral-400 bg-neutral-900">
			<p className="text-[1.7rem] font-semibold text-text-base">{title}</p>
			<button
				type="button"
				onClick={handleClose}
				className="flex justify-center items-center w-10 h-10"
			>
				<IoClose />
			</button>
		</div>
	)
}

export function ModalBody({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-w-[300px] py-7 px-6 bg-neutral-900">{children}</div>
	)
}

export function ModalFooter({ children }: { children: React.ReactNode }) {
	return (
		<div
			className={cn(
				'flex justify-end py-5 px-6 border-t-[1px] border-t-neutral-400 bg-neutral-900/40',
			)}
		>
			{children}
		</div>
	)
}

export function ModalButton(props: ButtonProps) {
	return <Button {...props} />
}
