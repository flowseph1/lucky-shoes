import Link from "next/link";

const Logo = () => {
	return (
		<Link className="relative mr-16 flex items-center" href={"/"}>
			<div className="logo-shadow -rotate-12 animate-flicker font-madi text-[4rem] text-logo">Lucky</div>
			<div className="logo-shadow -rotate-12 absolute top-11 left-7 animate-flicker font-madi text-[4rem] text-logo-secondary">
				Shoes
			</div>
		</Link>
	);
};

export default Logo;
