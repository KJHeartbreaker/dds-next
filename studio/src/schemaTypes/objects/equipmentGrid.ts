import { GrGrid as icon } from 'react-icons/gr';
import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
	name: 'equipmentGrid',
	type: 'document',
	title: 'Equipment Grid',
	icon,
	fields: [
		defineField({
			title: 'Title',
			name: 'title',
			type: 'string',
		}),
		defineField({
			name: 'content',
			type: 'array',
			title: 'Used Equipment for Sale',
			of: [defineArrayMember({ type: 'equipmentReference' })],
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
			content0: 'content.0.equipment.title',
			content1: 'content.1.equipment.title',
			content2: 'content.2.equipment.title',
			content3: 'content.3.equipment.title',
		},
		prepare({ title, ...content }) {
			const subs = Object.values(content).filter(Boolean);
			const subtitles = subs.length > 0 ? `${subs.join(', ')}` : '';

			return {
				title: title ? `${title}` : `Used Equipment for Sale`,
				subtitle: `${subtitles}`,
			};
		},
	},
});
