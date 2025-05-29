import { FcFlashOn as icon } from 'react-icons/fc';
import { defineField, defineType } from 'sanity';

export default defineType({
	type: 'object',
	name: 'contactHero',
	title: 'Contact Hero',
	icon,
	fields: [
		defineField({
			name: 'heading',
			type: 'string',
			title: 'Heading',
		}),
		defineField({
			name: 'tagline',
			title: 'Hero Copy',
			type: 'pagePortableText',
		}),
		defineField({
			name: 'illustration',
			type: 'mainImage',
			title: 'Image',
		}),
		defineField({
			name: 'contactForm',
			type: 'contactForm',
			title: 'Contact Form',
		}),
		defineField({
			name: 'disabled',
			title: 'Disabled',
			description: 'Setting this to true will disable the component, but not delete it.',
			type: 'boolean',
		}),
	],
	preview: {
		select: {
			title: 'heading',
			disabled: 'disabled',
		},
		prepare({ title, disabled }) {
			return {
				title: `Hero: ${disabled ? 'DISABLED' : title}`,
			};
		},
	},
});
