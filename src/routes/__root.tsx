import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import "@/styles/globals.css";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: "Lucky Shoes" },
		],
		links: [{ rel: "icon", href: "/fav-icon.png" }],
	}),
	component: RootDocument,
});

function RootDocument() {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body className="antialiased">
				<main>
					<Outlet />
				</main>
				<Scripts />
			</body>
		</html>
	);
}
