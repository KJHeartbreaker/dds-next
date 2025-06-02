import React from 'react';

import CallToAction from '@/app/components/CallToAction';
import Hero from '@/app/components/Hero';
import Info from '@/app/components/InfoSection';
import { Grid } from '@/app/components/Grid';
import { dataAttr } from '@/sanity/lib/utils';

type BlocksType = {
	[key: string]: React.FC<any>;
};

type BlockType = {
	_type: string;
	_key: string;
	[key: string]: any;
};

type BlockProps = {
	index: number;
	block: BlockType;
	pageId: string;
	pageType: string;
};

const blocks: BlocksType = {
	hero: Hero,
	cta: CallToAction,
	infoSection: Info,
	grid: Grid,
};

/**
 * Used by the <PageBuilder>, this component renders a the component that matches the block type.
 */
export default function BlockRenderer({ block, index, pageId, pageType }: BlockProps) {
	const Component = blocks[block._type];

	if (!Component) {
		return null;
	}

	return (
		<div
			key={block._key}
			data-sanity={dataAttr({
				id: pageId,
				type: pageType,
				path: 'content',
			}).toString()}
		>
			<Component block={block} index={index} />
		</div>
	);
}
