import { PortableTextBlock } from '@portabletext/types';
import { SanityImage } from './sanity';

type BaseGridBlock = {
	disabled?: boolean;
};

export type PagePortableTextBlock = BaseGridBlock & {
	_type: 'pagePortableText';
	portableTextBlock?: PortableTextBlock[];
	center?: boolean;
};

export type MainImageBlock = SanityImage & {
	_type: 'mainImage';
	disabled?: boolean;
};

export type ContactFormBlock = BaseGridBlock & {
	_type: 'contactForm';
	title?: string;
	description?: string;
};

export type GridBlock = PagePortableTextBlock | MainImageBlock | ContactFormBlock;

export type Grid = {
	_type: 'grid';
	_key: string;
	blocks: GridBlock[];
};
