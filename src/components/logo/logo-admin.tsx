export function AdminLogo() {
	return (
		<div className="relative flex items-center mb-20 self-center">
			<div className="logo-shadow animate-flicker font-madi text-[4rem] text-logo -rotate-12">
				Lucky
			</div>

			<div className="absolute logo-shadow animate-flicker font-madi text-[3rem] text-logo-secondary -rotate-12 left-12 top-12">
				Admin
			</div>
		</div>
	);
}
