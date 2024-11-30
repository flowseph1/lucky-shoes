import { StoragePaths } from '@/types/storage'
import {
	DetailedHTMLProps,
	HTMLAttributes,
	InputHTMLAttributes,
	TextareaHTMLAttributes,
} from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

export type ISelect = {
	[label: string]: any
}

export type FormError = string | string[]

export interface InputBaseProps {
	iconLeft?: React.ReactNode
	iconRight?: React.ReactNode
	label?: string
	fullWidth?: boolean
	error?: FormError
}

export interface InputTextProps
	extends InputBaseProps,
		DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	type?: 'text' | 'password'
	register?: UseFormRegisterReturn
}

export interface TextAreaProps
	extends InputBaseProps,
		DetailedHTMLProps<
			TextareaHTMLAttributes<HTMLTextAreaElement>,
			HTMLTextAreaElement
		> {
	register?: UseFormRegisterReturn
}

export interface InputFileProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string
	subtitle?: string
	error?: FormError
	filePath: StoragePaths
}
