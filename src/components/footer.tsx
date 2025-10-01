import Link from "next/link";
import { CiInstagram } from "react-icons/ci";
import { IoLogoGithub } from "react-icons/io";
import { Container } from "@/components/container";

export function Footer() {
	return (
		<footer className="bg-neutral-900 py-20 border-t border-neutral-300">
			<Container className="flex justify-between items-center">
				<div>
					<p className="text-xs">Made by</p>
					<Link
						href="https://github.com/flowseph1"
						target="_blank"
						className="flex gap-2 items-center"
					>
						<IoLogoGithub />
						flowseph1
					</Link>
				</div>
				<p className="text-text-light/50">
					Copyright &copy; {new Date().getFullYear()} Lucky Shoes. All rights
					reserved.
				</p>
				<div>
					<Link
						href="/"
						className="h-18 w-18 flex items-center justify-center border border-neutral-300 rounded-full hover:bg-neutral-500"
					>
						<CiInstagram size={24} />
					</Link>
				</div>
			</Container>
		</footer>
	);
}
