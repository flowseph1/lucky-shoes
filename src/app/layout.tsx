import "@/styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
	icons: {
		icon: "/fav-icon.png",
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className="antialiased">
				<main>{children}</main>
			</body>
		</html>
	);
}
