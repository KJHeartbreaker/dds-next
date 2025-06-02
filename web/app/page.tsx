import type { Metadata } from 'next';
import Head from 'next/head';

import PageBuilder from '@/app/components/PageBuilder';
import { sanityFetch } from '@/sanity/lib/live';
import { getHomePageQuery } from '@/sanity/lib/queries';
import { GetPageQueryResult } from '@/sanity.types';
import { PageOnboarding } from '@/app/components/Onboarding';

export default async function Homepage() {
	const { data: page } = await sanityFetch({ query: getHomePageQuery });

	if (!page?._id) {
		return (
			<div className="py-40">
				<PageOnboarding />
			</div>
		);
	}

	return (
		<div className="my-12 lg:my-24">
			<Head>
				<title>{page.title}</title>
			</Head>
			<div className="">
				<div className="container">
					<div className="pb-6 border-b border-gray-100">
						<div className="max-w-3xl">
							<h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-7xl">
								{page.title}
							</h2>
						</div>
					</div>
				</div>
			</div>
			<PageBuilder page={page} />
		</div>
	);
}
