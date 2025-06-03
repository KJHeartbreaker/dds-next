import PageBuilder from '@/app/components/PageBuilder';
import { sanityFetch } from '@/sanity/lib/live';
import { getHomePageQuery } from '@/sanity/lib/queries';

export default async function Homepage() {
	const { data: page } = await sanityFetch({ query: getHomePageQuery });

	return (
		<div>
			<PageBuilder page={page} />
		</div>
	);
}
