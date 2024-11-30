'use client'

import { AdminLogo } from '@/components/logo/logo-admin'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import {
	MdLabelImportantOutline,
	MdOutlineDashboardCustomize,
} from 'react-icons/md'
import { PiSneaker } from 'react-icons/pi'

const OPTIONS = [
	{
		name: 'Dashboard',
		slug: 'dashboard',
		href: '/admin',
		icon: <MdOutlineDashboardCustomize />,
	},
	{
		name: 'Sneakers',
		slug: 'sneakers',
		href: '/admin/sneakers',
		icon: <PiSneaker />,
	},
	{
		name: 'Marcas',
		slug: 'brands',
		href: '/admin/brands',
		icon: <MdLabelImportantOutline />,
	},
]

export function AdminSideBar() {
	return (
		<div className="flex flex-col border-r-[1px] border-neutral-100 w-[23rem] p-5 gap-4 bg-neutral-900">
			<AdminLogo />

			{/* Navigation Bar */}
			<ul className="flex flex-col w-full mt-10">
				{OPTIONS.map((item) => (
					<SideBarItem key={item.name} item={item} />
				))}
			</ul>
		</div>
	)
}

interface SideBarProps {
	name: string
	slug: string
	href: string
	icon: ReactNode
}

export function SideBarItem({ item }: { item: SideBarProps }) {
	const pathname = usePathname()

	const active =
		item.slug === 'dashboard' && pathname === '/admin'
			? true
			: pathname.includes(item.slug)

	return (
		<Link href={item.href}>
			<li
				className={cn(
					'flex flex-row gap-2 items-center px-5 py-4 hover:text-white/70 rounded-lg',
					{
						'text-white font-semibold bg-neutral-300 hover:text-white': active,
					},
				)}
			>
				<div>{item.icon}</div>
				<p>{item.name}</p>
			</li>
		</Link>
	)
}
