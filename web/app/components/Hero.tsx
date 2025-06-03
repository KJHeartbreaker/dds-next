import { PortableText } from '@portabletext/react';
import Image from 'next/image';

import { urlForImage } from '@/sanity/lib/image';
import { dataAttr } from '@/sanity/lib/utils';
import CallToAction from './CallToAction';
import { BackgroundColour, SanityCta, SanityImage, SanityPortableText } from '../types/sanity';

type HeroProps = {
	block: {
		_type: 'hero';
		_key: string;
		singleColumn?: boolean;
		backgroundColour?: BackgroundColour;
		heading?: string;
		tagline?: SanityPortableText;
		illustration?: SanityImage;
		cta?: SanityCta;
		disabled?: boolean;
	};
	index: number;
};

const backgroundColourMap = {
	brown: 'bg-gradient-to-r from-[#2e1b0c] to-[#e3c4a8]',
	darkBlue: 'bg-gradient-to-r from-[#3d547a] to-[#7c8cc4]',
	brownSolid: 'bg-[#2e1b0c]',
	tan: 'bg-[#e3c4a8]',
	darkBlueSolid: 'bg-[#3d547a]',
	lightBlueSolid: 'bg-[#b4d4ec]',
};

const textColorMap = {
	brown: 'text-white',
	darkBlue: 'text-white',
	brownSolid: 'text-white',
	darkBlueSolid: 'text-white',
	tan: 'text-black',
	lightBlueSolid: 'text-black',
};

export default function Hero({ block, index }: HeroProps) {
	if (block.disabled) return null;

	// Clean the backgroundColour value by removing any non-printable characters
	const cleanBackgroundColour = block.backgroundColour?.replace(/[\u200B-\u200D\uFEFF]/g, '');

	const backgroundClass = cleanBackgroundColour
		? backgroundColourMap[cleanBackgroundColour as keyof typeof backgroundColourMap]
		: 'bg-white';

	const textColorClass = cleanBackgroundColour
		? textColorMap[cleanBackgroundColour as keyof typeof textColorMap]
		: 'text-black';

	return (
		<section
			className={`py-16 ${backgroundClass}`}
			data-sanity={dataAttr({
				id: block._key,
				type: 'hero',
				path: `content[${index}]`,
			}).toString()}
		>
			<div
				className={`container mx-auto px-4 ${block.singleColumn ? 'text-center' : 'grid md:grid-cols-2 gap-8 items-center'}`}
			>
				<div
					className={`${block.singleColumn ? 'max-w-3xl mx-auto' : ''} ${textColorClass}`}
				>
					{block.heading && (
						<h1 className="text-4xl md:text-5xl font-bold mb-6">{block.heading}</h1>
					)}
					{block.tagline?.portableTextBlock && (
						<div
							className={`prose prose-lg mb-8 ${block.tagline.center ? 'text-center' : ''}`}
						>
							<PortableText value={block.tagline.portableTextBlock} />
						</div>
					)}
					{block.cta && (
						<CallToAction
							block={{
								...block.cta,
								_key: block._key + '-cta',
							}}
							index={index}
							backgroundColour={
								cleanBackgroundColour as keyof typeof backgroundColourMap
							}
						/>
					)}
				</div>
				{!block.singleColumn &&
					block.illustration &&
					typeof block.illustration?.asset?._type === 'string' && (
						<div className="relative aspect-video">
							<Image
								src={urlForImage(block.illustration as any)
									.width(800)
									.height(450)
									.fit('crop')
									.url()}
								alt={block.heading || 'Hero image'}
								fill
								sizes="(max-width: 768px) 100vw, 50vw"
								className="object-cover rounded-lg"
								priority
							/>
						</div>
					)}
			</div>
		</section>
	);
}
