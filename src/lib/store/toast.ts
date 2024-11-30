import { create } from 'zustand'

export interface Toast {
	id: string
	title: string
	description?: string
	type: 'success' | 'error'
}

interface ToastStore {
	toasts: Toast[]
	addToast: (toast: Toast) => void
	removeToast: (id: string) => void
}

export const useToastStore = create<ToastStore>()((set) => ({
	toasts: [],
	addToast: (toast: Toast) => {
		set((state) => ({
			toasts: [...state.toasts, toast],
		}))
	},
	removeToast: (id: string) => {
		set((state) => ({
			toasts: state.toasts.filter((toast) => toast.id !== id),
		}))
	},
}))
