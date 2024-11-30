import { InputError } from '@/components/ui/form/input-error'
import { InputLabel } from '@/components/ui/form/input-label'
import { cn } from '@/lib/utils'
import { InputTextProps } from '@/types/form'
import { memo } from 'react'

const Input = ({
	type = 'text',
	iconLeft,
	iconRight,
	placeholder = 'Ingresar',
	className,
	register,
	fullWidth,
	label,
	name,
	disabled,
	error,
	...props
}: InputTextProps) => {
	return (
		<div
			className={cn('inline-flex flex-col', className, fullWidth && 'w-full')}
		>
			{label && <InputLabel htmlFor={name!}>{label}</InputLabel>}
			<div
				className={cn(
					'flex h-14 w-full items-center rounded-lg border-[0.1rem] border-neutral-50 bg-neutral-500 px-4 text-sm transition-shadow focus-within:shadow-input-shadow',
					disabled ? '' : 'hover:shadow-input-shadow',
				)}
			>
				{iconLeft && <div className="mr-3">{iconLeft}</div>}
				<input
					type={type}
					className={cn(
						'h-full w-full bg-transparent  outline-none placeholder:text-white/15 placeholder:font-light',
						disabled ? 'text-text-extra-light' : 'text-text-base',
					)}
					id={name}
					name={name}
					placeholder={placeholder}
					disabled={disabled}
					{...props}
					{...register}
				/>
				{iconRight && <div className="ml-2">{iconRight}</div>}
			</div>

			{error && <InputError error={error} />}
		</div>
	)
}

export default memo(Input)
