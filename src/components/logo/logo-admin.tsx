export function AdminLogo() {
	return (
		<div className="relative mb-24 flex items-center justify-center">
			<div className="logo-shadow -rotate-12 animate-flicker font-madi text-[4rem] text-logo">Lucky</div>

			<div className="logo-shadow -rotate-12 absolute top-10 left-1/2 animate-flicker font-madi text-[3rem] text-logo-secondary">
				Admin
			</div>
		</div>
	);
}
