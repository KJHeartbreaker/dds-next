'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import PrimaryNavigation from './PrimaryNavigation';
import MobileMenu from './MobileMenu';

export default function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);
	const pathname = usePathname();

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
					<PrimaryNavigation />
					<MobileMenu
						open={mobileMenuOpen}
						setOpen={setMobileMenuOpen}
						pendingNavigation={pendingNavigation}
						setPendingNavigation={setPendingNavigation}
					/>
				</div>
			</div>
		</header>
	);
}
