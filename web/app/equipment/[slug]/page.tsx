import type { Metadata } from 'next';
import { sanityFetch } from '@/sanity/lib/live';
import { getUsedEquipmentQuery, usedEquipmentSlugs } from '@/sanity/lib/queries';
import EquipmentClient from './EquipmentClient';
import { SanityImage } from '@/app/types/sanity';

type Equipment = {
	_id: string;
	_type: 'used';
	title: string;
	slug: { current: string };
	surplus: boolean;
	tagline: {
		_type: 'pagePortableText';
		portableTextBlock: Array<{
			_type: 'block';
			children: Array<{
				_type: 'span';
				text: string;
			}>;
		}>;
	};
	price: number;
	itemNumber: string;
	images: (SanityImage & { caption?: string })[];
};

export async function generateStaticParams() {
	const { data } = await sanityFetch({
		query: usedEquipmentSlugs,
		perspective: 'published',
		stega: false,
	});
	return data;
}

// @ts-expect-error Async Server Component
export async function generateMetadata({ params }) {
	const { data: equipment } = (await sanityFetch({
		query: getUsedEquipmentQuery,
		params,
		stega: false,
	})) as { data: Equipment | null };

	return {
		title: equipment?.title,
		description: equipment?.tagline?.portableTextBlock?.[0]?.children?.[0]?.text,
	} satisfies Metadata;
}

// @ts-expect-error Async Server Component
export default async function EquipmentPage({ params }) {
	const { data: equipment } = (await sanityFetch({
		query: getUsedEquipmentQuery,
		params,
	})) as { data: Equipment | null };

	if (!equipment) {
		return (
			<div className="py-40">
				<div className="container">
					<h1 className="text-2xl">Equipment not found</h1>
				</div>
			</div>
		);
	}

	return <EquipmentClient equipment={equipment} />;
}
