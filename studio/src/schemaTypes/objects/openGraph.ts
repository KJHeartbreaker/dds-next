import { defineField, defineType } from 'sanity';

export default defineType({
	title: 'Open Graph',
	name: 'openGraph',
	type: 'object',
	fields: [
		defineField({
			title: 'Title',
			name: 'title',
			type: 'string',
			description: 'Heads up! This will override the page title.',
			validation: (Rule) => Rule.max(60).warning('Should be under 60 characters'),
		}),
		defineField({
			title: 'Description',
			name: 'description',
			type: 'text',
			description:
				'This appears on summary pages, on Google, and when shared on social media.',
			validation: (Rule) => Rule.max(155).warning('Should be under 155 characters'),
		}),
		defineField({
			title: 'Image',
			name: 'image',
			type: 'mainImage',
			description: 'Facebook recommends 1200x630 (will be auto resized).',
		}),
	],
	preview: {
		select: {
			title: 'title',
			route: 'route.slug.current',
			link: 'link',
		},
		prepare({ title, route, link }) {
			return {
				title,
				subtitle: route ? `Route: /${route}/` : link ? `External link: ${link}` : 'Not set',
			};
		},
	},
});
