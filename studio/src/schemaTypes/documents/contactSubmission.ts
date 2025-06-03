import { defineField, defineType } from 'sanity';

export default defineType({
	name: 'contactSubmission',
	title: 'Contact Submission',
	type: 'document',
	fields: [
		defineField({
			name: 'name',
			title: 'Name',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'email',
			title: 'Email',
			type: 'string',
			validation: (Rule) => Rule.required().email(),
		}),
		defineField({
			name: 'message',
			title: 'Message',
			type: 'text',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'productInfo',
			title: 'Product Information',
			type: 'object',
			fields: [
				defineField({
					name: 'productId',
					title: 'Product ID',
					type: 'string',
				}),
				defineField({
					name: 'productName',
					title: 'Product Name',
					type: 'string',
				}),
				defineField({
					name: 'productType',
					title: 'Product Type',
					type: 'string',
				}),
			],
		}),
		defineField({
			name: 'submittedAt',
			title: 'Submitted At',
			type: 'datetime',
			validation: (Rule) => Rule.required(),
		}),
	],
	preview: {
		select: {
			title: 'name',
			subtitle: 'email',
		},
	},
});
