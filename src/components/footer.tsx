import Link from "next/link";
import { CiInstagram } from "react-icons/ci";
import { IoLogoGithub } from "react-icons/io";
import { Container } from "@/components/container";

export function Footer() {
	return (
		<footer className="border-neutral-300 border-t bg-neutral-900 py-20">
			<Container className="flex items-center justify-between">
				<div>
					<p className="text-xs">Made by</p>
					<Link href="https://github.com/flowseph1" target="_blank" className="flex items-center gap-2">
						<IoLogoGithub />
						flowseph1
					</Link>
				</div>
				<p className="text-text-light/50">
					Copyright &copy; {new Date().getFullYear()} Lucky Shoes. All rights reserved.
				</p>
				<div>
					<Link
						href="/"
						className="flex h-18 w-18 items-center justify-center rounded-full border border-neutral-300 hover:bg-neutral-500"
					>
						<CiInstagram size={24} />
					</Link>
				</div>
			</Container>
		</footer>
	);
}
