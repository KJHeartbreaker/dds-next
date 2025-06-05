'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// NavMenuItem type and getHref function copied from PrimaryNavigation

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

export default function MobileMenu({
	open,
	setOpen,
	pendingNavigation,
	setPendingNavigation,
}: {
	open: boolean;
	setOpen: (open: boolean) => void;
	pendingNavigation: string | null;
	setPendingNavigation: (href: string | null) => void;
}) {
	const [navMenuItems, setNavMenuItems] = useState<NavMenuItem[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const menuRef = useRef<HTMLDivElement>(null);
	const pathname = usePathname();

	// Fetch nav data dynamically
	useEffect(() => {
		async function fetchNavigation() {
			try {
				const response = await fetch('/api/navigation/primary');
				if (!response.ok) throw new Error('Failed to fetch navigation');
				const { data } = await response.json();
				setNavMenuItems(data?.navMenuItems || []);
			} catch (error) {
				console.error('Error fetching navigation:', error);
			} finally {
				setIsLoading(false);
			}
		}
		fetchNavigation();
	}, []);

	// Close on ESC
	useEffect(() => {
		if (!open) return;
		function onKeyDown(e: KeyboardEvent) {
			if (e.key === 'Escape') setOpen(false);
		}
		window.addEventListener('keydown', onKeyDown);
		return () => window.removeEventListener('keydown', onKeyDown);
	}, [open, setOpen]);

	// Focus trap
	useEffect(() => {
		if (!open || !menuRef.current) return;
		const focusable = menuRef.current.querySelectorAll<HTMLElement>(
			"a, button, [tabindex]:not([tabindex='-1'])"
		);
		if (focusable.length) focusable[0].focus();
	}, [open]);

	// Close menu after navigation completes
	useEffect(() => {
		if (!open || !pendingNavigation) return;
		if (pathname === pendingNavigation) {
			setOpen(false);
			setPendingNavigation(null);
		}
	}, [pathname, open, pendingNavigation, setOpen, setPendingNavigation]);

	// Hamburger/X placement: inside header grid, right aligned, vertically centered
	return (
		<>
			{/* Single button toggles hamburger/X */}
			<button
				className="unstyled sm:hidden flex items-center justify-center h-full w-10 absolute right-6 top-1/2 -translate-y-1/2 z-50 bg-transparent"
				aria-label={open ? 'Close menu' : 'Open menu'}
				aria-expanded={open}
				aria-controls="mobile-menu"
				onClick={() => setOpen(!open)}
			>
				<span className="w-full h-full flex items-center justify-center text-3xl text-black m-0">
					{open ? '×' : '☰'}
				</span>
			</button>

			{/* Dropdown Menu fills below header */}
			{open && (
				<div
					ref={menuRef}
					id="mobile-menu"
					className="fixed left-0 right-0 top-[70px] bottom-0 z-40 bg-white shadow-lg animate-dropdown flex flex-col items-center pt-8 px-4"
					tabIndex={-1}
				>
					<nav className="w-full mt-8 flex flex-col gap-6 items-center justify-start">
						{isLoading ? (
							<div className="h-6 w-48 bg-gray-200 animate-pulse rounded" />
						) : (
							navMenuItems
								.filter((item) => !item.title.toLowerCase().includes('contact'))
								.map((item) => {
									const href = getHref(item);
									const isActive = pathname === href;
									return (
										<Link
											key={item._key}
											href={href}
											className={`nav-link text-xl w-full text-left border-b border-gray-400 pb-4 pt-2${
												isActive
													? ' font-bold underline underline-offset-4 decoration-[#8ec73f] decoration-2'
													: ''
											}`}
											tabIndex={0}
											onClick={() => setPendingNavigation(href)}
										>
											{item.title}
										</Link>
									);
								})
						)}
						{/* Contact button below menu items */}
						{isLoading
							? null
							: navMenuItems
									.filter((item) => item.title.toLowerCase().includes('contact'))
									.map((item) => {
										const href = getHref(item);
										return (
											<Link
												key={item._key}
												href={href}
												className="font-oswald font-bold text-lg px-8 py-3 bg-[#42587A] text-white rounded transition-colors hover:bg-[#2d3e5c] mt-8"
												tabIndex={0}
												onClick={() => setOpen(false)}
											>
												{item.title}
											</Link>
										);
									})}
					</nav>
				</div>
			)}
			<style jsx global>{`
				@keyframes dropdown {
					from {
						opacity: 0;
						transform: translateY(-10px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
				.animate-dropdown {
					animation: dropdown 0.2s cubic-bezier(0.4, 0, 0.2, 1);
				}
			`}</style>
		</>
	);
}
