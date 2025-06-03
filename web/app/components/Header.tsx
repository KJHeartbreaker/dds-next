'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Page = {
	_id: string;
	title: string | null;
	slug: string;
};

function Navigation({ pages }: { pages: Page[] }) {
	return (
		<nav>
			<ul
				role="list"
				className="flex items-center gap-4 md:gap-6 leading-5 text-sm md:text-base tracking-tight font-normal"
			>
				{pages?.map((page: Page) => (
					<li key={page._id}>
						<Link
							href={`/${page.slug}`}
							className="hover:text-red-500 transition-colors"
						>
							{page.title}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}

export default function Header() {
	const [pages, setPages] = useState<Page[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchPages() {
			try {
				const response = await fetch('/api/pages');
				if (!response.ok) throw new Error('Failed to fetch pages');
				const { data } = await response.json();
				setPages(data || []);
			} catch (error) {
				console.error('Error fetching pages:', error);
			} finally {
				setIsLoading(false);
			}
		}

		fetchPages();
	}, []);

	return (
		<header className="fixed z-50 h-24 inset-0 bg-white/80 flex items-center backdrop-blur-lg">
			<div className="container py-6 sm:px-6">
				<div className="flex items-center justify-between gap-5">
					{isLoading ? (
						<div className="h-6 w-48 bg-gray-200 animate-pulse rounded" />
					) : (
						<Navigation pages={pages} />
					)}
				</div>
			</div>
		</header>
	);
}
