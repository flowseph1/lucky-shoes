import Link from "next/link";

export function BreadCrumb({ sneakerName }: { sneakerName: string }) {
	return (
		<div className="flex flex-row items-center gap-2">
			<Link href="/" className="flex cursor-pointer flex-row items-center gap-2">
				{/* <GoHomeFill size={20} /> */}
				<p className="hover:underline">Inicio</p>
			</Link>
			<span>{" > "}</span>
			<p className="cursor-default font-semibold">{sneakerName}</p>
		</div>
	);
}
