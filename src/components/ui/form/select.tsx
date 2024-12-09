import { InputContainer } from '@/components/ui/form/input-container'
import { useClickOutside } from '@/hooks/use-click-outside'
import { cn } from '@/lib/utils'
import { LabelValue } from '@/types'
import { memo, useMemo, useRef, useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

export function Select({
	options,
	value,
	onValueChange,
}: {
	options: LabelValue[]
	value: string
	onValueChange: (value: string) => void
}) {
	const ref = useRef<HTMLDivElement>(null)
	const [showDropdown, setShowDropdown] = useState(false)
	useClickOutside(ref, () => setShowDropdown(false))

	const selectedOption = useMemo(
		() => options.find((option) => option.value === value),
		[value, options],
	)

	return (
		<div
			ref={ref}
			className="relative"
			onClick={() => setShowDropdown(!showDropdown)}
		>
			<InputContainer classNames="px-4 cursor-pointer flex gap-4">
				<p>{selectedOption?.label}</p>
				{showDropdown ? <FaChevronUp /> : <FaChevronDown />}
			</InputContainer>
			{showDropdown && (
				<Dropdown
					options={options}
					selectedValue={selectedOption?.value}
					onValueChange={onValueChange}
				/>
			)}
		</div>
	)
}

interface OptionProps extends LabelValue {
	onPress: (value: LabelValue['value']) => void
	isSelected: boolean
}

export function Option(props: OptionProps) {
	return (
		<div
			onClick={() => props.onPress(props.value)}
			className={cn(
				'truncate bg-neutral-500 hover:bg-neutral-600 p-2 cursor-pointer',
				{
					'bg-neutral-600': props.isSelected,
				},
			)}
		>
			<p>{props.label}</p>
		</div>
	)
}

export const Dropdown = memo(
	({
		options,
		selectedValue,
		onValueChange,
	}: {
		options: LabelValue[]
		selectedValue: string | undefined
		onValueChange: (value: string) => void
	}) => {
		return (
			<div className="flex flex-col mt-2 absolute z-50 top-full left-0 right-0 bg-neutral-500 rounded-xl overflow-hidden p-2">
				{options.map((option) => (
					<Option
						key={option.value}
						isSelected={option.value === selectedValue}
						onPress={(value) => onValueChange(value.toString())}
						{...option}
					/>
				))}
			</div>
		)
	},
)
