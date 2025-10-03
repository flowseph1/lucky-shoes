import { IoMenuOutline } from "react-icons/io5";
import { Container } from "@/components/container";
import { Logo } from "./logo";
import { Navbar } from "./navbar";

export const Header = () => {
	return (
		<header className="box-blur fixed top-0 left-0 z-10 h-(--header-height) w-full bg-[rgba(0,2,18,0.5)]">
			<Container>
				<div className="flex h-full justify-between">
					<div className="flex flex-1 items-center">
						<Logo />
						<Navbar />
					</div>
					<div className="flex items-center">
						<IoMenuOutline className="block text-white sm:hidden" size={20} />
					</div>
				</div>
			</Container>
			<div className="h-[0.1rem] w-full bg-border-gradient" />
		</header>
	);
};
