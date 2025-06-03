import type { Metadata } from 'next';
import { sanityFetch } from '@/sanity/lib/live';
import { getUsedEquipmentQuery, usedEquipmentSlugs } from '@/sanity/lib/queries';
import PortableText from '@/app/components/PortableText';
import ImageCarousel from '@/app/components/ImageCarousel';
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

	return (
		<div className="container">
			<div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-8">
				<div className="flex flex-col items-center justify-center p-5">
					<h1 className="text-4xl font-bold mb-6">{equipment.title}</h1>
					{equipment.itemNumber && (
						<h3 className="text-xl mb-4">Item Number: {equipment.itemNumber}</h3>
					)}
					{equipment.tagline && (
						<div className="prose max-w-none mb-6">
							<PortableText value={equipment.tagline.portableTextBlock} />
						</div>
					)}
					<div className="text-2xl font-semibold mb-6">
						<em className="not-italic">
							{equipment.price
								? `$${(equipment.price / 100).toLocaleString()}`
								: 'Call for pricing'}
						</em>
					</div>
				</div>
				<div className="p-5">
					<ImageCarousel images={equipment.images} title={equipment.title} />
				</div>
			</div>
		</div>
	);
}
