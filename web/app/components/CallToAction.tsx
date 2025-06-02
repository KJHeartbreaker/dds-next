import Link from 'next/link';
import { BackgroundColour, SanityCta } from '../types/sanity';

type CallToActionProps = {
	block: SanityCta & { _key: string };
	index: number;
	backgroundColour?: keyof typeof buttonColorMap;
};

const buttonColorMap = {
	// For brown/brownSolid/tan backgrounds
	brown: {
		base: 'bg-[#3d547a] hover:bg-[#b4d4ec] text-white',
		link: 'text-[#3d547a] hover:text-[#b4d4ec]',
	},
	brownSolid: {
		base: 'bg-[#3d547a] hover:bg-[#b4d4ec] text-white',
		link: 'text-[#3d547a] hover:text-[#b4d4ec]',
	},
	tan: {
		base: 'bg-[#3d547a] hover:bg-[#b4d4ec] text-white',
		link: 'text-[#3d547a] hover:text-[#b4d4ec]',
	},
	// For darkBlue/darkBlueSolid backgrounds
	darkBlue: {
		base: 'bg-[#2e1b0c] hover:bg-[#e3c4a8] text-white',
		link: 'text-[#2e1b0c] hover:text-[#e3c4a8]',
	},
	darkBlueSolid: {
		base: 'bg-[#2e1b0c] hover:bg-[#e3c4a8] text-white',
		link: 'text-[#2e1b0c] hover:text-[#e3c4a8]',
	},
	// For lightBlueSolid background
	lightBlueSolid: {
		base: 'bg-[#3d547a] hover:bg-[#e3c4a8] text-white',
		link: 'text-[#3d547a] hover:text-[#2e1b0c]',
	},
};

function getCtaLinkUrl(cta: SanityCta): string {
	if (cta.landingPageRoute?._ref) {
		return `/${cta.landingPageRoute._ref}`;
	}
	if (cta.link) {
		return cta.link;
	}
	if (cta.fileDownload?.asset._ref) {
		return `/${cta.fileDownload.asset._ref}`;
	}
	return '#';
}

export default function CallToAction({
	block,
	index,
	backgroundColour = 'darkBlue',
}: CallToActionProps) {
	if (!block.title) return null;

	const isButton = block.kind !== 'link';
	const colorStyles = buttonColorMap[backgroundColour];
	const linkUrl = getCtaLinkUrl(block);

	return (
		<Link
			href={linkUrl}
			className={`inline-block ${
				isButton
					? `px-6 py-3 rounded-lg transition-colors duration-200 ${colorStyles.base}`
					: `text-lg transition-colors duration-200 ${colorStyles.link}`
			}`}
		>
			{block.title}
		</Link>
	);
}
