import { defineArrayMember, defineField, defineType } from 'sanity';

export const page = defineType({
	type: 'document',
	name: 'page',
	title: 'Page',
	fieldsets: [
		{
			title: 'Visibility',
			name: 'visibility',
			options: { collapsible: true, collapsed: false },
		},
	],
	initialValue: { includeInSitemap: true },
	fields: [
		defineField({ name: 'title', type: 'string', title: 'Title' }),
		defineField({
			name: 'slug',
			type: 'slug',
			title: 'Slug',
			options: { source: 'title', maxLength: 96 },
		}),
		defineField({
			name: 'content',
			type: 'array',
			title: 'Page sections',
			of: [
				defineArrayMember({ type: 'hero' }),
				defineArrayMember({ type: 'grid' }),
				defineArrayMember({ type: 'equipmentGrid' }),
				defineArrayMember({ type: 'customComponentContainer' }),
			],
		}),
		defineField({
			name: 'useSiteTitle',
			type: 'boolean',
			title: 'Use site title?',
			fieldset: 'visibility',
		}),
		defineField({
			name: 'includeInSitemap',
			type: 'boolean',
			title: 'Include in sitemap',
			fieldset: 'visibility',
		}),
		defineField({
			name: 'disallowRobots',
			type: 'boolean',
			title: 'Disallow in robots.txt',
			fieldset: 'visibility',
		}),
		defineField({
			name: 'openGraph',
			type: 'openGraph',
			title: 'Open graph',
			fieldset: 'visibility',
		}),
	],
});
