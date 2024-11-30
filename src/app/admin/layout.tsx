import { AdminHeader } from '@/components/admin/header'
import { AdminSideBar } from '@/components/admin/sidebar'
import { Container } from '@/components/container'

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className="flex flex-row min-h-screen ">
			<AdminSideBar />
			<div className="flex flex-col flex-1">
				<AdminHeader />
				<div className="flex-1">{children}</div>
			</div>
		</div>
	)
}
