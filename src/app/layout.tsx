import { Toast } from '@/components/toast'
import '../globals.css'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className="antialiased relative">
				<main>{children}</main>
				<Toast />
			</body>
		</html>
	)
}
