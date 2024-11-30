import { CiSearch } from 'react-icons/ci'

export function SearchBar({
	term,
	setTerm,
}: {
	term: string
	setTerm: React.Dispatch<React.SetStateAction<string>>
}) {
	return (
		<div className="bg-neutral-300 rounded-md w-fit flex items-center ring-1 ring-neutral-50">
			<CiSearch className="mx-4" />
			<input
				type="text"
				value={term}
				onChange={(e) => setTerm(e.target.value)}
				className="bg-transparent outline-none h-12 pr-4 text-sm placeholder:text-white/30"
				placeholder="buscar"
			/>
		</div>
	)
}
