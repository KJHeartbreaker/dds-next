/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */

import { PortableText as BasePortableText, PortableTextComponents } from '@portabletext/react';
import CallToAction from './CallToAction';
import { SanityCta } from '../types/sanity';

const components: PortableTextComponents = {
	block: {
		h1: (props) => <h1 className="text-4xl font-bold mb-4">{props.children}</h1>,
		h2: (props) => <h2 className="text-3xl font-bold mb-3">{props.children}</h2>,
		h3: (props) => <h3 className="text-2xl font-bold mb-2">{props.children}</h3>,
		normal: (props) => <p className="mb-4">{props.children}</p>,
		blockquote: (props) => (
			<blockquote className="border-l-4 border-gray-300 pl-4 italic">
				{props.children}
			</blockquote>
		),
	},
	marks: {
		strong: (props) => <strong className="font-bold">{props.children}</strong>,
		em: (props) => <em className="italic">{props.children}</em>,
		code: (props) => (
			<code className="bg-gray-100 rounded px-1 py-0.5 font-mono text-sm">
				{props.children}
			</code>
		),
		link: ({ value, children }) => {
			const target = value?.blank ? '_blank' : undefined;
			return (
				<a
					href={value?.href}
					target={target}
					rel={target === '_blank' ? 'noopener noreferrer' : undefined}
					className="text-blue-600 hover:text-blue-800 underline"
				>
					{children}
				</a>
			);
		},
	},
	list: {
		bullet: (props) => <ul className="list-disc list-inside mb-4">{props.children}</ul>,
		number: (props) => <ol className="list-decimal list-inside mb-4">{props.children}</ol>,
	},
	types: {
		cta: ({ value }) => {
			if (!value || !value.title) {
				return null;
			}
			return <CallToAction block={value} index={0} />;
		},
		mainImage: ({ value }) => <div>Image: {value.alt}</div>,
	},
};

interface PortableTextProps {
	value: any[];
}

export default function PortableText({ value }: PortableTextProps) {
	return <BasePortableText value={value} components={components} />;
}
