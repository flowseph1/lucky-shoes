import { CiInstagram } from "react-icons/ci";
import { IoLogoGithub } from "react-icons/io";
import { Container } from "@/components/container";
import { INSTAGRAM_URL } from "@/constants/social";

export function Footer() {
	return (
		<footer className="border-neutral-300 border-t bg-neutral-900 py-20">
			<Container className="flex flex-col items-center justify-between gap-10 text-center sm:flex-row sm:gap-0 sm:text-left">
				<div>
					<p className="text-xs">Made by</p>
					<a href="https://github.com/flowseph1" target="_blank" rel="noreferrer" className="flex items-center gap-2">
						<IoLogoGithub />
						flowseph1
					</a>
				</div>
				<p className="text-text-light/50">
					Copyright &copy; {new Date().getFullYear()} Lucky Shoes. All rights reserved.
				</p>
				<div>
					<a
						href={INSTAGRAM_URL}
						target="_blank"
						rel="noreferrer"
						aria-label="Instagram"
						className="flex h-18 w-18 items-center justify-center rounded-full border border-neutral-300 hover:bg-neutral-500"
					>
						<CiInstagram size={24} />
					</a>
				</div>
			</Container>
		</footer>
	);
}
