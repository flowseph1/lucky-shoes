'use client'

import { InputContainer } from '@/components/ui/form/input-container'
import { InputError } from '@/components/ui/form/input-error'
import { FilePreview } from '@/components/ui/form/input-file/file-preview'
import { InputFilePlaceholder } from '@/components/ui/form/input-file/input-file-placeholder'
import { InputLabel } from '@/components/ui/form/input-label'
import { cn } from '@/lib/utils'
import { InputFileProps } from '@/types/form'
import { createClient } from '@supabase/supabase-js'
import { useEffect, useRef, useState } from 'react'

const supabaseClient = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
)

export function InputFile({
	label,
	subtitle,
	multiple,
	className,
	error,
	name,
	filePath,
	required,
	defaultValue,
	...props
}: InputFileProps) {
	const fileInputRef = useRef<HTMLInputElement | null>(null)
	const inputRef = useRef<HTMLInputElement | null>(null)
	const [filePreviews, setFilePreviews] = useState<FileList | null>()

	const handleChange = (fileUrl: string) => {
		if (multiple) {
			inputRef.current!.value = fileUrl
		} else {
			inputRef.current!.value = fileUrl
		}
	}
	const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files || Object.keys(e.target.files).length === 0) return
		setFilePreviews(e.target.files)
	}
	const handleReset = () => {
		setFilePreviews(null)
		fileInputRef.current!.value = ''
		inputRef.current!.value = ''
	}

	const handleDelete = (fileName: string) => {
		if (!filePreviews) return
		if (filePreviews.length === 1) {
			setFilePreviews(null)
			return
		}
		const filterFileList = new DataTransfer()
		for (const file of filePreviews) {
			if (file.name !== fileName) {
				filterFileList.items.add(file)
			}
		}
		setFilePreviews(filterFileList.files)
	}
	const handleFormResetEffect = () => {
		const input = inputRef.current
		if (!input) return
		const form = input.closest('form')
		if (!form) return
		form.addEventListener('reset', handleReset)
		return () => {
			form.removeEventListener('reset', handleReset)
		}
	}
	const handleDefaultValueEffect = () => {
		if (defaultValue) {
			inputRef.current!.value = defaultValue as string
		} else {
			inputRef.current!.value = ''
		}
	}

	useEffect(handleFormResetEffect, [])

	return (
		<div className={cn('inline-flex flex-col', className)}>
			{label && <InputLabel htmlFor={name!}>{label}</InputLabel>}
			<InputContainer
				classNames={cn(
					'flex justify-center cursor-pointer items-center min-h-[14rem] p-4 rounded-lg text-sm',
					{
						'justify-start items-start cursor-default': !!filePreviews,
					},
				)}
				onClick={() => fileInputRef.current?.click()}
			>
				{filePreviews ? (
					<>
						{Array.from(filePreviews).map((file) => (
							<FilePreview
								key={file.name}
								file={file}
								filePath={filePath}
								supabaseClient={supabaseClient}
								handleChange={handleChange}
								onDelete={handleDelete}
							/>
						))}
					</>
				) : (
					<InputFilePlaceholder
						multiple={multiple ?? false}
						subtitle={subtitle ?? ''}
					/>
				)}

				<input
					ref={fileInputRef}
					type="file"
					className="hidden"
					onChange={handleInputChange}
					name={name}
					{...props}
				/>

				<input
					type="hidden"
					name={name}
					ref={inputRef}
					className="hidden"
					id={name}
					defaultValue={defaultValue}
				/>
			</InputContainer>
			{error && <InputError error={error} />}
		</div>
	)
}
