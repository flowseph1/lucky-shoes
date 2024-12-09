import { FaArrowUp, FaRegFile } from 'react-icons/fa'

export function InputFilePlaceholder({
	multiple,
	subtitle,
}: {
	multiple: boolean
	subtitle: string
}) {
	return (
		<div className="flex flex-col items-center justify-center gap-2">
			<div className="relative w-14 h-14 rounded-full bg-neutral-500 flex items-center justify-center">
				<FaRegFile className="text-text-light" />
				<div className="absolute -right-2 bottom-0 w-7 h-7 rounded-full bg-primary-500 flex items-center justify-center">
					<FaArrowUp size={8} />
				</div>
			</div>
			<p className="text-text-light">
				{multiple ? 'Seleccionar archivos' : 'Seleccionar un archivo'}
			</p>
			{subtitle && <p className="text-white/20 text-[1.1rem]">{subtitle}</p>}
		</div>
	)
}
