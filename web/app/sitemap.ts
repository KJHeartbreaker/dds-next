import { MetadataRoute } from 'next';
import { sanityFetch } from '@/sanity/lib/live';
import { sitemapData } from '@/sanity/lib/queries';
import { headers } from 'next/headers';

/**
 * This file creates a sitemap (sitemap.xml) for the application. Learn more about sitemaps in Next.js here: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 * Be sure to update the `changeFrequency` and `priority` values to match your application's content.
 */

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const allPages = await sanityFetch({
		query: sitemapData,
	});
	const headersList = await headers();
	const sitemap: MetadataRoute.Sitemap = [];
	const domain = headersList.get('host') || 'localhost:3000';

	sitemap.push({
		url: `https://${domain}`,
		lastModified: new Date(),
		priority: 1,
		changeFrequency: 'monthly',
	});

	if (allPages?.data?.length) {
		for (const p of allPages.data) {
			let priority = 0.5; // default priority
			let changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] = 'monthly'; // default frequency
			let url = `https://${domain}`; // default URL

			switch (p._type) {
				case 'page':
					priority = 0.8;
					changeFrequency = 'monthly';
					url = `https://${domain}/${p.slug}`;
					break;
			}

			sitemap.push({
				lastModified: p._updatedAt || new Date(),
				priority,
				changeFrequency,
				url,
			});
		}
	}

	return sitemap;
}
