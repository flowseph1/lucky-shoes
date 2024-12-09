import { InputContainer } from '@/components/ui/form/input-container'
import { CiSearch } from 'react-icons/ci'

export function SearchBar({
	term,
	setTerm,
}: {
	term: string
	setTerm: React.Dispatch<React.SetStateAction<string>>
}) {
	return (
		<InputContainer classNames="w-fit">
			<CiSearch className="mx-4" />
			<input
				type="text"
				value={term}
				onChange={(e) => setTerm(e.target.value)}
				className="bg-transparent outline-none h-full pr-4 text-sm placeholder:text-white/30"
				placeholder="buscar"
			/>
		</InputContainer>
	)
}
