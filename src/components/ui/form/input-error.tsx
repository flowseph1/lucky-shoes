export function InputError({ error }: { error: string | string[] }) {
	return <p className="text-[1.1rem] text-red-500 mt-2">{error.toString()}</p>
}
