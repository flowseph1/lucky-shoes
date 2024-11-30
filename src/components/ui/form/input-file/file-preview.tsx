import { Spinner } from '@/components/spinner'
import { SUPABASE_BUCKET_NAME } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { SupabaseClient } from '@supabase/supabase-js'

import Image from 'next/image'
import { memo, useEffect, useRef, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { v4 as uuidv4 } from 'uuid'

export const FilePreview_ = ({
	file,
	filePath,
	supabaseClient,
	handleChange,
	onDelete,
}: {
	file: File
	filePath: string
	supabaseClient: SupabaseClient
	handleChange: (fileUrl: string) => void
	onDelete: (fileName: string) => void
}) => {
	const uploadStarted = useRef(false)
	const [uploadIsLoading, setUploadIsLoading] = useState(true)
	const [uploadError, setUploadError] = useState<string>()
	const [fileName, setFileName] = useState('')

	const handleUploadEffect = async () => {
		const fileName = `${uuidv4()}-${file.name}`
		setFileName(fileName)
		setUploadIsLoading(true)
		const { data, error } = await supabaseClient.storage
			.from(SUPABASE_BUCKET_NAME)
			.upload(`${filePath}/${fileName}`, file)

		if (error) {
			setUploadError(error.message)
			setUploadIsLoading(false)
			return
		}

		const {
			data: { publicUrl },
		} = supabaseClient.storage
			.from(SUPABASE_BUCKET_NAME)
			.getPublicUrl(data.path)

		handleChange(publicUrl)
		setUploadIsLoading(false)
	}

	const handleDelete = async () => {
		onDelete(file.name)
		const { error } = await supabaseClient.storage
			.from(SUPABASE_BUCKET_NAME)
			.remove([`${filePath}/${fileName}`])
		console.log('Error attempting to delete file', error?.message)
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (!uploadStarted.current) {
			uploadStarted.current = true
			handleUploadEffect()
		}
	}, [])

	return (
		<div className="flex flex-wrap gap-4">
			<div
				key={file.name}
				onClick={(e) => e.stopPropagation()}
				className="relative w-28 h-28 rounded-xl bg-neutral-100 group cursor-default"
			>
				<Image
					alt={file.name}
					src={URL.createObjectURL(file)}
					fill
					className={cn(
						'object-contain opacity-100 transition-opacity duration-300',
						{
							'opacity-35': uploadIsLoading || uploadError,
						},
					)}
				/>

				{uploadIsLoading && (
					<div className="absolute inset-0 flex items-center justify-center">
						<Spinner />
					</div>
				)}

				{uploadError && (
					<div className="absolute top-full left-0 right-0 flex">
						<p className="text-red-500 flex-1 truncate text-xxs">
							Error al cargar imagen
						</p>
					</div>
				)}

				{!uploadIsLoading && (
					<div
						onClick={handleDelete}
						className="absolute -right-2 -top-2 w-7 h-7 rounded-full bg-primary-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:cursor-pointer"
					>
						<FaTimes size={8} />
					</div>
				)}
			</div>
		</div>
	)
}

export const FilePreview = memo(FilePreview_)
