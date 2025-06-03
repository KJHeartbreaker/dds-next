import { PortableTextBlock } from '@portabletext/types';

// Common image type used across components
export type SanityImage = {
	_type: 'image';
	asset: {
		_ref?: string;
		_type?: 'reference';
		url?: string;
		_id?: string;
		originalId?: string;
		rev?: string;
		assetId?: string;
		extension?: string;
		metadata?: {
			_type: 'sanity.imageMetadata';
			blurHash?: string;
			dimensions?: {
				_type: 'sanity.imageDimensions';
				aspectRatio: number;
				height: number;
				width: number;
			};
			hasAlpha?: boolean;
			isOpaque?: boolean;
			lqip?: string;
			palette?: any;
		};
		mimeType?: string;
		originalFilename?: string;
		path?: string;
		sha1hash?: string;
		size?: number;
		uploadId?: string;
	};
	hotspot?: {
		x: number;
		y: number;
		height: number;
		width: number;
	};
	crop?: {
		top: number;
		bottom: number;
		left: number;
		right: number;
	};
	alt?: string;
};

// Common CTA type used across components
export type SanityCta = {
	_type: 'cta';
	_key: string;
	title: string;
	landingPageRoute?: {
		_type: 'reference';
		_ref: string;
	};
	link?: string;
	fileDownload?: {
		_type: 'file';
		asset: {
			_ref: string;
			_type: 'reference';
		};
	};
	kind?: 'button' | 'link';
	disabled?: boolean;
};

// Common portable text type used across components
export type SanityPortableText = {
	_type: 'pagePortableText';
	portableTextBlock: PortableTextBlock[];
	center?: boolean;
	disabled?: boolean;
};

// Common background color type used across components
export type BackgroundColour =
	| 'brown'
	| 'darkBlue'
	| 'brownSolid'
	| 'tan'
	| 'darkBlueSolid'
	| 'lightBlueSolid';
