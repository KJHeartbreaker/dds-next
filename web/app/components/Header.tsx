import Link from 'next/link';
import { sanityFetch } from '@/sanity/lib/live';
import { getAllPagesQuery } from '@/sanity/lib/queries';

type Page = {
	_id: string;
	title: string | null;
	slug: string;
};

export default async function Header() {
	const { data: pages } = await sanityFetch({ query: getAllPagesQuery });

	return (
		<header className="fixed z-50 h-24 inset-0 bg-white/80 flex items-center backdrop-blur-lg">
			<div className="container py-6 sm:px-6">
				<div className="flex items-center justify-between gap-5">
					<nav className="">
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
				</div>
			</div>
		</header>
	);
}
