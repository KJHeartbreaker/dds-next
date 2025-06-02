import { PortableTextBlock } from '@portabletext/types';

// Common image type used across components
export type SanityImage = {
	_type: 'image';
	asset: {
		_ref: string;
		_type: 'reference';
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
