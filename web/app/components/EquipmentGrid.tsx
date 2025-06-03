import Link from 'next/link';
import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/utils';
import { SanityImage } from '@/app/types/sanity';
import { dataAttr } from '@/sanity/lib/utils';

type EquipmentReference = {
	equipment: {
		_id: string;
		_type: 'used';
		title: string;
		slug: { current: string };
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
		images: (SanityImage & { caption?: string })[];
	};
};

type EquipmentGridProps = {
	block: {
		_type: 'equipmentGrid';
		_key: string;
		title?: string;
		content?: EquipmentReference[];
		disabled?: boolean;
	};
	index: number;
};

const MAX_EXCERPT_LENGTH = 100;

function getExcerpt(text: string): string {
	if (text.length <= MAX_EXCERPT_LENGTH) return text;
	return text.slice(0, MAX_EXCERPT_LENGTH).trim() + '...';
}

function getTaglineText(tagline: EquipmentReference['equipment']['tagline']): string {
	if (!tagline?.portableTextBlock?.[0]?.children?.[0]?.text) return '';
	return tagline.portableTextBlock[0].children[0].text;
}

export default function EquipmentGrid({ block }: EquipmentGridProps) {
	const { title, content = [], disabled } = block;
	if (disabled || !content?.length) return null;

	return (
		<div
			className="container py-12"
			{...dataAttr({
				id: block._key,
				type: 'equipmentGrid',
				path: 'content',
			})}
		>
			{title && (
				<h2
					className="text-3xl font-bold mb-8"
					{...dataAttr({
						id: block._key,
						type: 'equipmentGrid',
						path: 'title',
					})}
				>
					{title}
				</h2>
			)}
			<div
				className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
				{...dataAttr({
					id: block._key,
					type: 'equipmentGrid',
					path: 'content',
				})}
			>
				{content.map((item, index) => {
					if (!item?.equipment) return null;

					const equipment = item.equipment;
					const image = equipment.images?.[0];
					const imageUrl =
						image?.asset?.url ||
						urlForImage(image)?.width?.(800)?.height?.(800)?.fit?.('crop')?.url?.();
					const taglineText = getTaglineText(equipment.tagline);
					const excerpt = getExcerpt(taglineText);

					return (
						<Link
							key={equipment._id}
							href={`/equipment/${equipment.slug.current}`}
							className="group block"
							{...dataAttr({
								id: equipment._id,
								type: 'equipmentReference',
								path: `content[${index}]`,
							})}
						>
							<div className="aspect-square relative overflow-hidden bg-gray-100">
								{imageUrl ? (
									<Image
										src={imageUrl}
										alt={equipment.title}
										fill
										className="object-cover transition-transform duration-300 group-hover:scale-105"
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
									/>
								) : (
									<div className="absolute inset-0 flex items-center justify-center text-gray-400">
										No image available
									</div>
								)}
							</div>
							<div className="mt-4">
								<h3 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
									{equipment.title}
								</h3>
								{taglineText && (
									<p className="mt-2 text-gray-600 line-clamp-3 text-sm">
										{excerpt}
										{taglineText.length > MAX_EXCERPT_LENGTH && (
											<span className="text-blue-600 ml-1 text-xs">
												Read more...
											</span>
										)}
									</p>
								)}
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
}
