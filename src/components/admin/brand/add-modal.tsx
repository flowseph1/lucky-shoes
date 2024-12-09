'use client'

import { Alert } from '@/components/alert'
import { Modal, ModalRef } from '@/components/modal'
import Input from '@/components/ui/form/Input'
import { InputFile } from '@/components/ui/form/input-file/input-file'
import { TextArea } from '@/components/ui/form/text-area'
import { useFormToast } from '@/hooks/use-form-toasts'
import { insertBrand } from '@/lib/actions/brands'
import { useActionState, useEffect, useRef } from 'react'

export function AddModal() {
	const modalRef = useRef<ModalRef>(null)
	const [state, action, isPending] = useActionState(insertBrand, undefined)

	const handleFormSubmitEffect = () => {
		if (state) {
			modalRef.current?.close()
		}
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(handleFormSubmitEffect, [state])
	useFormToast(state)

	return (
		<Modal name="add" ref={modalRef}>
			<Modal.Header title="Agregar Marca" />
			<form className="w-[500px]" action={action}>
				<Modal.Body>
					<div className="grid grid-cols-1 gap-8">
						<Input
							label="Nombre*"
							type="text"
							name="name"
							error={state?.validations?.name}
							defaultValue={state?.fields?.name}
						/>
						<TextArea
							label="Descripción*"
							name="description"
							spellCheck={false}
							error={state?.validations?.description}
							defaultValue={state?.fields?.description}
						/>
						<InputFile
							label="Imagen*"
							filePath="brands"
							name="image"
							accept="image/*"
							subtitle="PNG, JPG, SVG"
							error={state?.validations?.image}
							defaultValue={state?.fields?.name}
							required
						/>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Modal.Button
						title="Agregar"
						intent="primary"
						type="submit"
						isLoading={isPending}
						onClick={() => {}}
					/>
				</Modal.Footer>
			</form>
		</Modal>
	)
}
