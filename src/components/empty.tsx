import { AiOutlineInbox } from 'react-icons/ai'

export function Empty({
	title,
	action,
}: {
	title: string
	action?: React.ReactNode
}) {
	return (
		<div className="flex flex-col items-center justify-center gap-6 px-5 py-20">
			<AiOutlineInbox size={50} />
			<div className="text-center flex flex-col items-center justify-center gap-2 mb-3">
				<h1 className="text-lg font-semibold text-text-base">{title}</h1>
				<p className="text-text-light">
					Lo sentimos, no hay nada aquí para mostrar
				</p>
			</div>
			{action}
		</div>
	)
}
