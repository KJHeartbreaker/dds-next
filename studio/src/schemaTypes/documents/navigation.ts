import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
	type: 'document',
	name: 'nav',
	title: 'Navigation',
	fields: [
		defineField({
			type: 'string',
			name: 'title',
			title: 'Title',
		}),
		defineField({
			type: 'array',
			name: 'navMenuItems',
			title: 'Navigation Menu Items',
			of: [defineArrayMember({ type: 'cta' })],
		}),
	],
});
