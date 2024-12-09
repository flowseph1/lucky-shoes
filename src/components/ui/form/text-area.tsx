import { InputContainer } from '@/components/ui/form/input-container'
import { InputError } from '@/components/ui/form/input-error'
import { InputLabel } from '@/components/ui/form/input-label'
import { TextAreaProps } from '@/types/form'
import classNames from 'classnames'

export function TextArea({
	iconLeft,
	iconRight,
	placeholder = 'Ingresar',
	className,
	register,
	fullWidth,
	label,
	disabled,
	error,
	name,
	...props
}: TextAreaProps) {
	return (
		<div
			className={classNames(
				'inline-flex flex-col',
				className,
				fullWidth && 'w-full',
			)}
		>
			{label && <InputLabel htmlFor={name!}>{label}</InputLabel>}
			<div className="flex w-full">
				{iconLeft && <div className="mr-3">{iconLeft}</div>}
				<InputContainer classNames="min-h-[9rem] w-full text-sm">
					<textarea
						className={
							'h-full w-full bg-transparent outline-none p-4 placeholder:text-white/15 placeholder:font-light text-text-base'
						}
						placeholder={placeholder}
						disabled={disabled}
						id={name!}
						name={name}
						{...register}
						{...props}
					/>
				</InputContainer>
				{iconRight && <div className="ml-2">{iconRight}</div>}
			</div>
			{error && <InputError error={error} />}
		</div>
	)
}
