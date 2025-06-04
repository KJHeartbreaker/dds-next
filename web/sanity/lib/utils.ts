import createImageUrlBuilder from '@sanity/image-url';
import { Link } from '@/sanity.types';
import { dataset, projectId, studioUrl } from '@/sanity/lib/api';
import { createDataAttribute, CreateDataAttributeProps } from 'next-sanity';
import type { FitMode } from '@sanity/image-url/lib/types/types';

const imageBuilder = createImageUrlBuilder({
	projectId: projectId || '',
	dataset: dataset || '',
});

type ImageUrlBuilder = {
	url: () => string;
	width?: (width: number) => ImageUrlBuilder;
	height?: (height: number) => ImageUrlBuilder;
	fit?: (fit: FitMode) => ImageUrlBuilder;
	auto?: (auto: 'format') => ImageUrlBuilder;
};

export const urlForImage = (source: any): ImageUrlBuilder | undefined => {
	// Handle both asset reference formats
	if (!source?.asset) {
		return undefined;
	}

	// If the asset has a direct URL, use it
	if (source.asset.url) {
		const url = source.asset.url;
		return {
			url: () => url,
			width: () => ({
				url: () => url,
				width: () => ({
					url: () => url,
					height: () => ({ url: () => url, fit: () => ({ url: () => url }) }),
				}),
			}),
			height: () => ({
				url: () => url,
				width: () => ({
					url: () => url,
					height: () => ({ url: () => url, fit: () => ({ url: () => url }) }),
				}),
			}),
			fit: () => ({
				url: () => url,
				width: () => ({
					url: () => url,
					height: () => ({ url: () => url, fit: () => ({ url: () => url }) }),
				}),
			}),
		};
	}

	// Otherwise use the Sanity image builder
	return imageBuilder?.image(source).auto('format').fit('max');
};

export function resolveOpenGraphImage(image: any, width = 1200, height = 627) {
	if (!image) return;
	const imageUrl = urlForImage(image);
	if (!imageUrl) return;
	const url = imageUrl?.width?.(1200)?.height?.(627)?.fit?.('crop')?.url?.();
	if (!url) return;
	return { url, alt: image?.alt as string, width, height };
}

// Depending on the type of link, we need to fetch the corresponding page, or URL.  Otherwise return null.
export function linkResolver(link: Link | undefined) {
	if (!link) return null;

	// If linkType is not set but href is, lets set linkType to "href".  This comes into play when pasting links into the portable text editor because a link type is not assumed.
	if (!link.linkType && link.href) {
		link.linkType = 'href';
	}

	switch (link.linkType) {
		case 'href':
			return link.href || null;
		case 'page':
			if (link?.page && typeof link.page === 'string') {
				return `/${link.page}`;
			}
		default:
			return null;
	}
}

type DataAttributeConfig = CreateDataAttributeProps &
	Required<Pick<CreateDataAttributeProps, 'id' | 'type' | 'path'>>;

export function dataAttr(config: DataAttributeConfig) {
	const dataAttribute = createDataAttribute({
		projectId,
		dataset,
		baseUrl: studioUrl,
	}).combine(config);

	// Encode the data attribute to handle special characters
	return {
		'data-sanity': encodeURIComponent(dataAttribute.toString()),
	};
}
