import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
	return (
		<div className="hidden h-[3.2rem] w-92 cursor-pointer items-center rounded-lg border-[0.1rem] border-border-color bg-container focus-within:shadow-container-shadow hover:shadow-container-shadow sm:flex">
			<div className="px-4 text-zinc-500">
				<CiSearch size={18} />
			</div>
			<div className="flex-1 pr-5">
				<input type="text" placeholder="Buscar" className="w-full flex-1 bg-transparent outline-none" />
			</div>
		</div>
	);
};

export default SearchBar;
