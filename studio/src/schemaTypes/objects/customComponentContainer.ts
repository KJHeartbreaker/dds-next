import { FcRating as icon } from 'react-icons/fc';
import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
	type: 'object',
	name: 'customComponentContainer',
	title: 'Custom Component',
	icon,
	fields: [
		defineField({
			name: 'title',
			type: 'string',
			title: 'Custom Component',
		}),
		defineField({
			type: 'array',
			name: 'rows',
			of: [defineArrayMember({ type: 'contactHero' })],
		}),
		defineField({
			name: 'fullWidth',
			title: 'Full Width',
			description:
				'This should only be selected if the component is not designed to fit within the standard container (ie: custom hero component, etc...).',
			type: 'boolean',
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
			title: 'title',
			content: 'content.0.title',
		},
		prepare({ title, content }) {
			return {
				title: title ? `Custom Component: ${title}` : `Custom Component`,
				subtitle: content,
			};
		},
	},
});
