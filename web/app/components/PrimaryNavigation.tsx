'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavMenuItem = {
	_type: 'cta';
	_key: string;
	title: string;
	kind?: 'button' | 'link';
	landingPageRoute?: {
		slug: string;
	};
	link?: string;
	fileDownload?: {
		asset: {
			url: string;
		};
	};
};

type Navigation = {
	_id: string;
	_type: 'nav';
	title: string;
	navMenuItems: NavMenuItem[];
};

function getHref(item: NavMenuItem): string {
	if (item.landingPageRoute?.slug) {
		return `/${item.landingPageRoute.slug}`;
	}
	if (item.link) {
		return item.link;
	}
	if (item.fileDownload?.asset?.url) {
		return item.fileDownload.asset.url;
	}
	return '#';
}

export default function PrimaryNavigation({
	navigation,
	isLoading,
}: {
	navigation: Navigation | null;
	isLoading: boolean;
}) {
	const pathname = usePathname();

	if (isLoading) {
		return <div className="h-6 w-48 bg-gray-200 animate-pulse rounded" />;
	}

	if (!navigation?.navMenuItems?.length) {
		return null;
	}

	return (
		<nav className="hidden sm:flex items-center justify-end mr-5 pl-0">
			<ul className="flex items-center">
				{navigation.navMenuItems.map((item) => {
					const href = getHref(item);
					const isActive = pathname === href;
					const isContact = item.title.toLowerCase().includes('contact');

					return (
						<li key={item._key} className="list-none text-center mb-0">
							<Link
								href={href}
								className={
									isContact
										? 'font-oswald font-bold no-underline mx-5 px-4 py-2 bg-[#42587A] text-white rounded transition-colors hover:bg-[#2d3e5c]'
										: `nav-link no-underline mx-5 transition-colors hover:border-b-2 hover:border-black hover:pb-3.5 md:hover:pb-2.5 ${
												isActive
													? 'border-b-2 border-black pb-3.5 md:pb-2.5'
													: ''
											}`
								}
								aria-current={isActive ? 'page' : undefined}
							>
								{item.title}
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
