'use client'

import { Modal, ModalRef } from '@/components/modal'
import { useToasts } from '@/hooks/use-toasts'
import { deleteBrand } from '@/lib/actions/brands'
import { redirect, useSearchParams } from 'next/navigation'
import { useActionState, useEffect, useRef } from 'react'

export function DeleteModal() {
	const modalRef = useRef<ModalRef>(null)
	const [state, action, isPending] = useActionState(deleteBrand, undefined)

	const params = useSearchParams()
	const modal = params.get('modal')
	const id = params.get('id')
	const name = params.get('name')

	useToasts({
		successMessages: state?.success ? state?.message : undefined,
		errorMessages: state?.success ? undefined : state?.message,
	})

	const handleRequestDoneEffect = () => {
		if (state) {
			modalRef.current?.close()
		}
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(handleRequestDoneEffect, [state])

	if (modal !== 'delete') return null

	if (!id) {
		redirect('/admin/brands')
	}

	return (
		<Modal name="delete" ref={modalRef}>
			<Modal.Header title={`Eliminar ${name}`} />
			<form action={action}>
				<Modal.Body>
					<p>
						¿Estás seguro de que quieres eliminar la marca <b>{name}</b>?
					</p>
					<input type="hidden" name="id" defaultValue={id} />
				</Modal.Body>
				<Modal.Footer addCancelButton>
					<Modal.Button
						title="Eliminar"
						intent="danger"
						type="submit"
						isLoading={isPending}
					/>
				</Modal.Footer>
			</form>
		</Modal>
	)
}
