import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'mainImage',
  type: 'image',
  title: 'Image',
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: 'caption',
      type: 'string',
      title: 'Caption',
    }),
    defineField({
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
      description: 'Important for SEO and accessibility.',
      validation: (Rule) => Rule.error('You have to fill out the alternative text.').required(),
    }),
  ],
  preview: {
    select: {
      title: 'caption',
      altTitle: 'alt',
      media: 'asset',
    },
    prepare({title, altTitle, media}) {
      return {
        title: title ? title : altTitle,
        media,
      }
    },
  },
})
