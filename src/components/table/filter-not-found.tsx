import { Button } from '@/components/ui/buttons'

export function FilterNotFound({
	term,
	setTerm,
}: {
	term: string
	setTerm: React.Dispatch<React.SetStateAction<string>>
}) {
	return (
		<div className="h-52">
			<div className="flex flex-col gap-5 absolute inset-0 justify-center items-center">
				<p className="text-center">
					Sin resultados para <span className="font-bold"> "{term}"</span>
				</p>
				<Button
					title="Reiniciar filtro"
					intent="secondary"
					onClick={() => setTerm('')}
				/>
			</div>
		</div>
	)
}
