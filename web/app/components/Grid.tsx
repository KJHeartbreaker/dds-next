import { MainImage } from '@/app/components/MainImage';
import { ContactForm } from '@/app/components/ContactForm';
import { dataAttr } from '@/sanity/lib/utils';
import {
	Grid as GridType,
	GridBlock,
	MainImageBlock,
	ContactFormBlock,
	PagePortableTextBlock,
} from '@/app/types/grid';
import PortableText from '@/app/components/PortableText';

interface GridProps {
	block: GridType;
	index: number;
}

function isPagePortableText(block: GridBlock): block is PagePortableTextBlock {
	return (block as any)._type === 'pagePortableText';
}

function isMainImage(block: GridBlock): block is MainImageBlock {
	return (block as any)._type === 'mainImage';
}

function isContactForm(block: GridBlock): block is ContactFormBlock {
	return (block as any)._type === 'contactForm';
}

const renderBlock = (block: GridBlock) => {
	if (block.disabled) return null;

	if (isPagePortableText(block)) {
		return block.portableTextBlock ? (
			<div className={`prose prose-lg ${block.center ? 'text-center' : ''}`}>
				<PortableText value={block.portableTextBlock} />
			</div>
		) : null;
	}

	if (isMainImage(block)) {
		return <MainImage value={block} />;
	}

	if (isContactForm(block)) {
		return <ContactForm value={block} />;
	}

	return null;
};

export function Grid({ block, index }: GridProps) {
	if (!block.blocks?.length) return null;

	const gridColumns = block.blocks.length;
	let columns = '';

	if (gridColumns === 2) columns = 'grid-cols-1 md:grid-cols-2';
	if (gridColumns === 3) columns = 'grid-cols-1 md:grid-cols-3';
	if (gridColumns === 4) columns = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';

	return (
		<div
			className="container mx-auto px-4 py-8"
			data-sanity={dataAttr({
				id: block._key,
				type: 'grid',
				path: `content[${index}]`,
			}).toString()}
		>
			<div className={`grid gap-6 ${columns}`}>
				{block.blocks.map((block, blockIndex) => (
					<div key={blockIndex} className="w-full p-5 flex justify-center items-center">
						{renderBlock(block)}
					</div>
				))}
			</div>
		</div>
	);
}
