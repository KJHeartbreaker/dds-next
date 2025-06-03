import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/image';
import { SanityImage } from '@/app/types/sanity';
import { MainImageBlock } from '@/app/types/grid';

export interface MainImageProps {
	value: MainImageBlock;
}

export function MainImage({ value }: MainImageProps) {
	const image = value as SanityImage;

	if (!image?.asset?._ref) {
		return null;
	}

	const imageUrl = urlForImage(image as any)
		.width(800)
		.height(450)
		.fit('crop')
		.url();

	return (
		<div className="relative aspect-video w-full">
			<Image
				src={imageUrl}
				alt={image.alt || ''}
				fill
				sizes="(max-width: 768px) 100vw, 50vw"
				className="object-cover rounded-lg"
			/>
		</div>
	);
}
