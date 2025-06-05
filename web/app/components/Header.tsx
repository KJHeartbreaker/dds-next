'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import PrimaryNavigation from './PrimaryNavigation';
import MobileMenu from './MobileMenu';

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

export default function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);
	const [navigation, setNavigation] = useState<Navigation | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const pathname = usePathname();

	useEffect(() => {
		async function fetchNavigation() {
			try {
				const response = await fetch('/api/navigation/primary');
				if (!response.ok) throw new Error('Failed to fetch navigation');
				const { data } = await response.json();
				setNavigation(data);
			} catch (error) {
				console.error('Error fetching navigation:', error);
			} finally {
				setIsLoading(false);
			}
		}
		fetchNavigation();
	}, []);

	useEffect(() => {
		if (!mobileMenuOpen || !pendingNavigation) return;
		if (pathname === pendingNavigation) {
			setMobileMenuOpen(false);
			setPendingNavigation(null);
		}
	}, [pathname, mobileMenuOpen, pendingNavigation]);

	return (
		<header className="sticky top-0 left-0 right-0 z-50 bg-white">
			<div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1280px] xl:max-w-[1440px] 2xl:max-w-[1600px]">
				<div className="grid grid-cols-1 sm:grid-cols-[250px_1fr] sm:grid-rows-[90px] h-[70px] sm:h-[100px] relative">
					<Logo
						setPendingNavigation={setPendingNavigation}
						mobileMenuOpen={mobileMenuOpen}
					/>
					<PrimaryNavigation navigation={navigation} isLoading={isLoading} />
					<div className="sm:hidden">
						<MobileMenu
							open={mobileMenuOpen}
							setOpen={setMobileMenuOpen}
							pendingNavigation={pendingNavigation}
							setPendingNavigation={setPendingNavigation}
							navMenuItems={navigation?.navMenuItems || []}
							isLoading={isLoading}
						/>
					</div>
				</div>
			</div>
		</header>
	);
}
