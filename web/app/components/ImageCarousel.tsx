'use client';

import { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/utils';
import { SanityImage } from '@/app/types/sanity';

const DEFAULT_IMAGE =
	'https://cdn.sanity.io/images/zl202m2f/production/d7e2fa5aa9cb4b01dfba51ec2d723bd20bd33681-1280x720.png';

interface ImageCarouselProps {
	images: (SanityImage & { caption?: string })[];
	title: string;
}

export default function ImageCarousel({ images, title }: ImageCarouselProps) {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

	const scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev();
	}, [emblaApi]);

	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext();
	}, [emblaApi]);

	if (!images?.length) {
		return (
			<div className="aspect-square relative">
				<Image
					src={DEFAULT_IMAGE}
					alt={`${title} - Default Image`}
					fill
					sizes="(max-width: 768px) 100vw, 50vw"
					className="object-cover"
					priority
				/>
			</div>
		);
	}

	// Filter out any images without valid assets
	const validImages = images.filter((image) => image?.asset);

	if (!validImages.length) {
		return (
			<div className="aspect-square relative">
				<Image
					src={DEFAULT_IMAGE}
					alt={`${title} - Default Image`}
					fill
					sizes="(max-width: 768px) 100vw, 50vw"
					className="object-cover"
					priority
				/>
			</div>
		);
	}

	return (
		<div className="relative">
			<div className="overflow-hidden" ref={emblaRef}>
				<div className="flex">
					{validImages.map((image, index) => {
						// Handle both direct URLs and Sanity image references
						let imageUrl: string | undefined;
						if (image.asset.url) {
							imageUrl = image.asset.url;
						} else {
							imageUrl = urlForImage(image)
								?.width?.(800)
								?.height?.(800)
								?.fit?.('crop')
								?.url?.();
						}

						if (!imageUrl) return null;

						return (
							<div key={index} className="flex-[0_0_100%] min-w-0">
								<div className="aspect-square relative">
									<Image
										src={imageUrl}
										alt={
											image.alt ||
											image.caption ||
											`${title} - Image ${index + 1}`
										}
										fill
										sizes="(max-width: 768px) 100vw, 50vw"
										className="object-cover"
										priority={index === 0}
									/>
									{image.caption && (
										<div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-sm">
											{image.caption}
										</div>
									)}
								</div>
							</div>
						);
					})}
				</div>
			</div>
			{validImages.length > 1 && (
				<>
					<button
						className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
						onClick={scrollPrev}
						aria-label="Previous image"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15.75 19.5L8.25 12l7.5-7.5"
							/>
						</svg>
					</button>
					<button
						className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
						onClick={scrollNext}
						aria-label="Next image"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M8.25 4.5l7.5 7.5-7.5 7.5"
							/>
						</svg>
					</button>
				</>
			)}
			{validImages.length > 1 && (
				<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
					{validImages.map((_, index) => (
						<button
							key={index}
							className="w-2 h-2 rounded-full bg-white/80 hover:bg-white"
							onClick={() => emblaApi?.scrollTo(index)}
							aria-label={`Go to image ${index + 1}`}
						/>
					))}
				</div>
			)}
		</div>
	);
}
