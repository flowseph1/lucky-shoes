import { Container } from "@/components/container";
import { IoMenuOutline } from "react-icons/io5";
import { Logo } from "./logo";
import { Navbar } from "./navbar";
import { SearchBar } from "./ui";

export const Header = () => {
	return (
		<header className="box-blur fixed left-0 top-0 z-10 h-(--header-height) w-full bg-[rgba(0,2,18,0.5)]">
			<Container>
				<div className="flex h-full justify-between">
					<div className="flex items-center">
						<Logo />
						<Navbar />
					</div>
					<div className="flex items-center">
						<IoMenuOutline className="block sm:hidden text-white" size={20} />
					</div>
				</div>
			</Container>
			<div className="h-[0.1rem] w-full bg-border-gradient" />
		</header>
	);
};
